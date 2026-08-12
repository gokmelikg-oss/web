import { createHmac, timingSafeEqual } from 'crypto';
import { cookies, headers } from 'next/headers';
import { touchSession, SESSION_MAX_AGE_SEC } from './adminSessions';
import { findUser, ensureBootstrapUser, type AdminUser } from './adminUsers';
import { allowedSections, canWrite, type AdminRole, type AdminSection } from './adminAcl';

export const ADMIN_COOKIE = 'ss-admin';

/* Oturum: kullanıcı adı + oturum kimliği HMAC ile imzalanıp cookie'ye yazılır.
   Sunucu tarafında oturum kaydı da tutulur; böylece bir oturum uzaktan
   sonlandırılabilir (Webmin "View Login Sessions"). */

export interface SessionPayload {
  u: string; // kullanıcı adı
  sid: string; // oturum kimliği
  exp: number; // bitiş (saniye)
}

export interface AdminSessionUser {
  username: string;
  fullName: string;
  role: AdminRole;
  sections: AdminSection[];
  canWrite: boolean;
  sid: string;
}

function secret(): string {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'simsek-solar-dev-secret';
}

function sign(data: string): string {
  return createHmac('sha256', secret()).update(data).digest('base64url');
}

export function createToken(username: string, sid: string): string {
  const payload: SessionPayload = {
    u: username,
    sid,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SEC,
  };
  const body = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  return `${body}.${sign(body)}`;
}

export function readToken(token: string | undefined): SessionPayload | undefined {
  if (!token) return undefined;
  const [body, mac] = token.split('.');
  if (!body || !mac) return undefined;
  const expected = Buffer.from(sign(body));
  const actual = Buffer.from(mac);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return undefined;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload;
    if (!payload.u || !payload.sid || payload.exp * 1000 < Date.now()) return undefined;
    return payload;
  } catch {
    return undefined;
  }
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: SESSION_MAX_AGE_SEC,
};

/* Geçerli oturumu çözer. Cookie imzası, oturum kaydı ve hesabın açık olması aranır. */
export async function getSession(): Promise<AdminSessionUser | undefined> {
  const store = await cookies();
  const payload = readToken(store.get(ADMIN_COOKIE)?.value);
  if (!payload) return undefined;

  // Oturum sunucuda hâlâ duruyor mu? (uzaktan sonlandırma bu kontrolle çalışır)
  const record = await touchSession(payload.sid);
  if (!record || record.username !== payload.u) return undefined;

  await ensureBootstrapUser();
  const user: AdminUser | undefined = await findUser(payload.u);
  if (!user || !user.active) return undefined;

  return {
    username: user.username,
    fullName: user.fullName,
    role: user.role,
    sections: allowedSections(user.role, user.sections),
    canWrite: canWrite(user.role),
    sid: payload.sid,
  };
}

export async function isAuthed(): Promise<boolean> {
  return Boolean(await getSession());
}

/* İstek sahibinin IP'si — Vercel/proxy başlıkları önce denenir. */
export async function requestIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return h.get('x-real-ip') ?? 'bilinmiyor';
}
