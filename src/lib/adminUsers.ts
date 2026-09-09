import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { readStore, writeStore } from './adminStore';
import { defaultSections, type AdminRole, type AdminSection } from './adminAcl';
import { checkPasswordStrength } from './passwordPolicy';

/* Panel kullanıcıları — Webmin'in "Webmin Users" modülünden uyarlandı.
   Şifreler scrypt ile saklanır; düz metin hiçbir yerde tutulmaz. */

export interface AdminUser {
  username: string;
  fullName: string;
  email?: string;
  role: AdminRole;
  sections: AdminSection[]; // modül ACL'i (yönetici için yok sayılır)
  passwordHash: string;
  active: boolean;
  /* IP kısıtlaması — Webmin'in kullanıcı bazlı "IP access control" ayarı.
     Boş liste = her yerden girebilir. Tam IP veya "1.2.3." ön eki yazılabilir. */
  allowedIps?: string[];
  createdAt: string;
  lastLoginAt?: string;
  lastLoginIp?: string;
}

/* IP, kullanıcının izin listesine uyuyor mu? Liste boşsa kısıtlama yoktur. */
export function ipAllowed(user: AdminUser, ip: string): boolean {
  const list = (user.allowedIps ?? []).map((s) => s.trim()).filter(Boolean);
  if (!list.length) return true;
  return list.some((rule) => (rule.endsWith('.') ? ip.startsWith(rule) : ip === rule));
}

/* İstemciye giden güvenli görünüm — şifre özeti asla dışarı çıkmaz. */
export type SafeUser = Omit<AdminUser, 'passwordHash'>;

const STORE = 'users';

export function safeUser(u: AdminUser): SafeUser {
  const { passwordHash: _drop, ...rest } = u;
  void _drop;
  return rest;
}

/* ---- şifre ---- */

/* scrypt maliyet parametreleri.
   Eskiden Node varsayılanları kullanılıyordu (N=16384). OWASP'ın güncel
   asgarisi N=2^17'dir; kaba kuvvetle kırma maliyeti 8 kat artar.

   ⚠ maxmem AÇIKÇA verilmelidir: Node'un varsayılan 32 MB sınırı N=131072'de
   aşılır ve scrypt "memory limit exceeded" hatası fırlatır.
   Gereken bellek ≈ 128 · N · r = 128 · 131072 · 8 ≈ 134 MB. */
const SCRYPT = { N: 131072, r: 8, p: 1, keylen: 64, maxmem: 192 * 1024 * 1024 } as const;

/* Özet biçimi SÜRÜMLÜDÜR: `scrypt2$N$r$p$salt$hash`.
   Parametreler özetin içinde durduğu için ileride maliyet yükseltilse bile
   eski şifreler doğrulanmaya devam eder — kimse panelden kilitlenmez. */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, SCRYPT.keylen, {
    N: SCRYPT.N,
    r: SCRYPT.r,
    p: SCRYPT.p,
    maxmem: SCRYPT.maxmem,
  }).toString('hex');
  return `scrypt2$${SCRYPT.N}$${SCRYPT.r}$${SCRYPT.p}$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split('$');

  /* Eski biçim: `scrypt$salt$hash` (Node varsayılan parametreleri).
     Geriye dönük okunur; kullanıcı şifresini değiştirdiğinde yeni biçime geçer. */
  if (parts[0] === 'scrypt' && parts.length === 3) {
    const [, salt, hash] = parts;
    if (!salt || !hash) return false;
    const expected = Buffer.from(hash, 'hex');
    const actual = scryptSync(password, salt, expected.length);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  }

  if (parts[0] === 'scrypt2' && parts.length === 6) {
    const [, n, r, p, salt, hash] = parts;
    const N = Number(n);
    const R = Number(r);
    const P = Number(p);
    if (!Number.isSafeInteger(N) || !Number.isSafeInteger(R) || !Number.isSafeInteger(P)) return false;
    // Depodan gelen parametreler saçmaysa hesaplamaya hiç girme (DoS koruması).
    if (N < 16384 || N > 1 << 21 || R < 1 || R > 32 || P < 1 || P > 16) return false;
    if (!salt || !hash) return false;
    const expected = Buffer.from(hash, 'hex');
    let actual: Buffer;
    try {
      actual = scryptSync(password, salt, expected.length, {
        N,
        r: R,
        p: P,
        maxmem: SCRYPT.maxmem,
      });
    } catch {
      return false;
    }
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  }

  return false;
}

/* Özet eski biçimdeyse true döner — başarılı girişte sessizce yükseltmek için. */
export function needsRehash(stored: string): boolean {
  return stored.startsWith('scrypt$');
}

/* ---- depo ---- */

export async function listUsers(): Promise<AdminUser[]> {
  return readStore<AdminUser[]>(STORE, []);
}

async function persist(users: AdminUser[]): Promise<void> {
  await writeStore(STORE, users);
}

export function normalizeUsername(name: string): string {
  return name.trim().toLocaleLowerCase('tr-TR');
}

export async function findUser(username: string): Promise<AdminUser | undefined> {
  const key = normalizeUsername(username);
  return (await listUsers()).find((u) => u.username === key);
}

/* İlk kurulum: hiç kullanıcı yoksa ADMIN_PASSWORD ile "admin" hesabı açılır.
   Böylece mevcut kurulumlar şifre değiştirmeden çalışmaya devam eder. */
export async function ensureBootstrapUser(): Promise<AdminUser | undefined> {
  const users = await listUsers();
  if (users.length) return undefined;
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return undefined;

  /* İlk yönetici hesabı da güç politikasına tabidir. Zayıf bir ADMIN_PASSWORD
     ile hesap AÇILMAZ: panelin zayıf şifreyle açık olmasındansa hiç açılmaması
     yeğdir (fail-closed). Günlüğe neden açılmadığı yazılır. */
  const strength = checkPasswordStrength(pw, ['admin', 'yonetici']);
  if (!strength.ok) {
    console.error(
      `[güvenlik] ADMIN_PASSWORD şifre politikasını karşılamadığı için ilk yönetici hesabı oluşturulmadı: ${strength.error}`
    );
    return undefined;
  }

  const admin: AdminUser = {
    username: 'admin',
    fullName: 'Yönetici',
    role: 'owner',
    sections: defaultSections('owner'),
    passwordHash: hashPassword(pw),
    active: true,
    createdAt: new Date().toISOString(),
  };
  await persist([admin]);
  return admin;
}

export interface UserInput {
  username: string;
  fullName: string;
  email?: string;
  role: AdminRole;
  sections: AdminSection[];
  active: boolean;
  allowedIps?: string[];
  password?: string; // düzenlemede boş bırakılırsa şifre değişmez
}

export async function createUser(input: UserInput): Promise<AdminUser> {
  const username = normalizeUsername(input.username);
  if (!/^[a-z0-9._-]{3,32}$/.test(username)) {
    throw new Error('Kullanıcı adı 3-32 karakter olmalı; harf, rakam, nokta, tire ve alt çizgi kullanılabilir.');
  }
  /* Şifre gücü SUNUCUDA denetlenir — arayüzdeki kontrol yalnızca kolaylıktır,
     istek doğrudan API'ye de gönderilebilir. */
  const password = input.password ?? '';
  const strength = checkPasswordStrength(password, [username, input.fullName ?? '', input.email ?? '']);
  if (!strength.ok) throw new Error(`Şifre: ${strength.error}`);
  const users = await listUsers();
  if (users.some((u) => u.username === username)) {
    throw new Error('Bu kullanıcı adı zaten kayıtlı.');
  }
  const user: AdminUser = {
    username,
    fullName: input.fullName.trim() || username,
    email: input.email?.trim() || undefined,
    role: input.role,
    sections: input.role === 'owner' ? defaultSections('owner') : input.sections,
    allowedIps: input.allowedIps?.filter(Boolean),
    passwordHash: hashPassword(password),
    active: input.active,
    createdAt: new Date().toISOString(),
  };
  await persist([...users, user]);
  return user;
}

export async function updateUser(username: string, input: Partial<UserInput>): Promise<AdminUser> {
  const key = normalizeUsername(username);
  const users = await listUsers();
  const idx = users.findIndex((u) => u.username === key);
  if (idx < 0) throw new Error('Kullanıcı bulunamadı.');

  const cur = users[idx];
  const role = input.role ?? cur.role;

  /* Son yönetici kilidi: paneli yönetecek kimse kalmamalı. */
  const owners = users.filter((u) => u.role === 'owner' && u.active);
  const losingOwner = cur.role === 'owner' && (role !== 'owner' || input.active === false);
  if (losingOwner && owners.length <= 1) {
    throw new Error('Son yönetici hesabının rolü değiştirilemez veya kapatılamaz.');
  }
  if (input.password !== undefined && input.password !== '') {
    const strength = checkPasswordStrength(input.password, [
      cur.username,
      input.fullName ?? cur.fullName,
      input.email ?? cur.email ?? '',
    ]);
    if (!strength.ok) throw new Error(`Şifre: ${strength.error}`);
  }

  const next: AdminUser = {
    ...cur,
    fullName: input.fullName?.trim() || cur.fullName,
    email: input.email !== undefined ? input.email.trim() || undefined : cur.email,
    role,
    sections: role === 'owner' ? defaultSections('owner') : (input.sections ?? cur.sections),
    allowedIps: input.allowedIps !== undefined ? input.allowedIps.filter(Boolean) : cur.allowedIps,
    active: input.active ?? cur.active,
    passwordHash: input.password ? hashPassword(input.password) : cur.passwordHash,
  };
  users[idx] = next;
  await persist(users);
  return next;
}

export async function deleteUser(username: string): Promise<void> {
  const key = normalizeUsername(username);
  const users = await listUsers();
  const target = users.find((u) => u.username === key);
  if (!target) throw new Error('Kullanıcı bulunamadı.');
  if (target.role === 'owner' && users.filter((u) => u.role === 'owner').length <= 1) {
    throw new Error('Son yönetici hesabı silinemez.');
  }
  await persist(users.filter((u) => u.username !== key));
}

export async function markLogin(username: string, ip: string): Promise<void> {
  const key = normalizeUsername(username);
  const users = await listUsers();
  const idx = users.findIndex((u) => u.username === key);
  if (idx < 0) return;
  users[idx] = { ...users[idx], lastLoginAt: new Date().toISOString(), lastLoginIp: ip };
  await persist(users);
}
