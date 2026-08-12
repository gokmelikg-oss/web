import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, COOKIE_OPTIONS, createToken, getSession, requestIp } from '@/lib/adminAuth';
import { findUser, hashPassword, verifyPassword } from '@/lib/adminUsers';
import { readStore, writeStore } from '@/lib/adminStore';
import { createSession, endUserSessions } from '@/lib/adminSessions';
import { writeLog } from '@/lib/adminLog';
import type { AdminUser } from '@/lib/adminUsers';

export const runtime = 'nodejs';

/* Kullanıcının KENDİ şifresini değiştirmesi.
   Yönetici olmak gerekmez; mevcut şifre doğrulanır. */

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  const { currentPassword = '', newPassword = '' } = await req
    .json()
    .catch(() => ({ currentPassword: '', newPassword: '' }));

  if (String(newPassword).length < 6) {
    return NextResponse.json({ ok: false, error: 'Yeni şifre en az 6 karakter olmalıdır.' }, { status: 400 });
  }

  const user = await findUser(session.username);
  if (!user || !verifyPassword(String(currentPassword), user.passwordHash)) {
    await writeLog({
      username: session.username,
      action: 'login_failed',
      detail: 'Şifre değiştirme: mevcut şifre hatalı',
      ip: await requestIp(),
    });
    return NextResponse.json({ ok: false, error: 'Mevcut şifreniz hatalı.' }, { status: 403 });
  }
  if (verifyPassword(String(newPassword), user.passwordHash)) {
    return NextResponse.json({ ok: false, error: 'Yeni şifre eskisiyle aynı olamaz.' }, { status: 400 });
  }

  const users = await readStore<AdminUser[]>('users', []);
  await writeStore(
    'users',
    users.map((u) => (u.username === user.username ? { ...u, passwordHash: hashPassword(String(newPassword)) } : u))
  );

  const ip = await requestIp();
  // Şifre değişti → diğer cihazlardaki oturumlar düşer, bu cihaz açık kalır.
  await endUserSessions(user.username);
  const sid = await createSession(user.username, ip, req.headers.get('user-agent') ?? 'bilinmiyor');
  await writeLog({ username: user.username, action: 'user_update', detail: 'Kendi şifresini değiştirdi', ip });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createToken(user.username, sid), COOKIE_OPTIONS);
  return res;
}
