import { randomBytes } from 'crypto';
import { readStore, writeStore } from './adminStore';

/* Oturum kayıtları ve başarısız giriş kilidi.
   Webmin'in "View Login Sessions" ve blockhost (kaç hatalı denemeden sonra kilit)
   davranışlarından uyarlandı. */

export interface AdminSessionRecord {
  sid: string;
  username: string;
  ip: string;
  userAgent: string;
  createdAt: string;
  lastSeenAt: string;
}

interface FailRecord {
  key: string; // kullanıcı@ip
  count: number;
  firstAt: string;
  blockedUntil?: string;
}

interface SessionStore {
  sessions: AdminSessionRecord[];
  fails: FailRecord[];
}

const STORE = 'sessions';
const EMPTY: SessionStore = { sessions: [], fails: [] };

export const SESSION_MAX_AGE_SEC = 60 * 60 * 8; // 8 saat
export const MAX_FAILED_ATTEMPTS = 5;
export const BLOCK_MINUTES = 15;

async function read(): Promise<SessionStore> {
  const data = await readStore<SessionStore>(STORE, EMPTY);
  return { sessions: data.sessions ?? [], fails: data.fails ?? [] };
}

/* Süresi dolmuş oturumları ve eskimiş hata kayıtlarını temizler. */
function prune(store: SessionStore): SessionStore {
  const now = Date.now();
  return {
    sessions: store.sessions.filter(
      (s) => now - new Date(s.lastSeenAt).getTime() < SESSION_MAX_AGE_SEC * 1000
    ),
    fails: store.fails.filter((f) => now - new Date(f.firstAt).getTime() < BLOCK_MINUTES * 60_000),
  };
}

async function write(store: SessionStore): Promise<void> {
  await writeStore(STORE, prune(store));
}

export async function listSessions(): Promise<AdminSessionRecord[]> {
  const store = prune(await read());
  return [...store.sessions].sort((a, b) => (a.lastSeenAt < b.lastSeenAt ? 1 : -1));
}

export async function createSession(username: string, ip: string, userAgent: string): Promise<string> {
  const store = prune(await read());
  const sid = randomBytes(18).toString('hex');
  const now = new Date().toISOString();
  store.sessions.push({ sid, username, ip, userAgent, createdAt: now, lastSeenAt: now });
  await write(store);
  return sid;
}

/* Oturum hâlâ geçerli mi? Geçerliyse son görülme zamanı tazelenir. */
export async function touchSession(sid: string): Promise<AdminSessionRecord | undefined> {
  const store = prune(await read());
  const rec = store.sessions.find((s) => s.sid === sid);
  if (!rec) return undefined;
  const now = Date.now();
  // Her istekte yazmamak için yalnızca 5 dakikada bir tazele.
  if (now - new Date(rec.lastSeenAt).getTime() > 5 * 60_000) {
    rec.lastSeenAt = new Date(now).toISOString();
    await write(store);
  }
  return rec;
}

export async function endSession(sid: string): Promise<void> {
  const store = prune(await read());
  await write({ ...store, sessions: store.sessions.filter((s) => s.sid !== sid) });
}

/* Bir kullanıcının tüm oturumlarını kapat (şifresi değişince / hesabı kapanınca). */
export async function endUserSessions(username: string): Promise<void> {
  const store = prune(await read());
  await write({ ...store, sessions: store.sessions.filter((s) => s.username !== username) });
}

/* Bu cihaz dışındaki tüm oturumları kapat. Kaç oturum düştüğünü döner. */
export async function endOtherSessions(keepSid: string): Promise<number> {
  const store = prune(await read());
  const kept = store.sessions.filter((s) => s.sid === keepSid);
  const removed = store.sessions.length - kept.length;
  await write({ ...store, sessions: kept });
  return removed;
}

/* ---- başarısız giriş kilidi ---- */

function failKey(username: string, ip: string) {
  return `${username}@${ip}`;
}

export async function isBlocked(username: string, ip: string): Promise<number> {
  const store = prune(await read());
  const rec = store.fails.find((f) => f.key === failKey(username, ip));
  if (!rec?.blockedUntil) return 0;
  const left = new Date(rec.blockedUntil).getTime() - Date.now();
  return left > 0 ? Math.ceil(left / 60_000) : 0;
}

export async function noteFailedLogin(username: string, ip: string): Promise<number> {
  const store = prune(await read());
  const key = failKey(username, ip);
  let rec = store.fails.find((f) => f.key === key);
  if (!rec) {
    rec = { key, count: 0, firstAt: new Date().toISOString() };
    store.fails.push(rec);
  }
  rec.count += 1;
  if (rec.count >= MAX_FAILED_ATTEMPTS) {
    rec.blockedUntil = new Date(Date.now() + BLOCK_MINUTES * 60_000).toISOString();
  }
  await write(store);
  return Math.max(0, MAX_FAILED_ATTEMPTS - rec.count);
}

export async function clearFailedLogins(username: string, ip: string): Promise<void> {
  const store = prune(await read());
  await write({ ...store, fails: store.fails.filter((f) => f.key !== failKey(username, ip)) });
}

/* Kilit ekranı için: hatalı deneme kayıtları (Webmin blockhost listesi). */
export interface BlockRow {
  key: string;
  username: string;
  ip: string;
  count: number;
  firstAt: string;
  blockedUntil?: string;
  minutesLeft: number;
}

export async function listBlocks(): Promise<BlockRow[]> {
  const store = prune(await read());
  return store.fails
    .map((f) => {
      const [username, ...rest] = f.key.split('@');
      const left = f.blockedUntil ? new Date(f.blockedUntil).getTime() - Date.now() : 0;
      return {
        key: f.key,
        username,
        ip: rest.join('@'),
        count: f.count,
        firstAt: f.firstAt,
        blockedUntil: f.blockedUntil,
        minutesLeft: left > 0 ? Math.ceil(left / 60_000) : 0,
      };
    })
    .sort((a, b) => b.count - a.count);
}

/* Kilidi elle kaldır. */
export async function clearBlock(key: string): Promise<void> {
  const store = prune(await read());
  await write({ ...store, fails: store.fails.filter((f) => f.key !== key) });
}
