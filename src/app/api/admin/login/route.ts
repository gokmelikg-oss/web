import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, COOKIE_OPTIONS, createToken, requestIp } from '@/lib/adminAuth';
import { ensureBootstrapUser, findUser, ipAllowed, markLogin, normalizeUsername, verifyPassword } from '@/lib/adminUsers';
import { clearFailedLogins, createSession, isBlocked, noteFailedLogin } from '@/lib/adminSessions';
import { writeLog } from '@/lib/adminLog';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { username = '', password = '' } = await req
    .json()
    .catch(() => ({ username: '', password: '' }));

  const ip = await requestIp();
  const userAgent = req.headers.get('user-agent') ?? 'bilinmiyor';
  const name = normalizeUsername(String(username));

  // İlk kurulumda ADMIN_PASSWORD ile "admin" hesabını oluştur.
  await ensureBootstrapUser();

  const blockedMinutes = await isBlocked(name, ip);
  if (blockedMinutes > 0) {
    return NextResponse.json(
      { ok: false, error: 'blocked', minutes: blockedMinutes },
      { status: 429 }
    );
  }

  const user = await findUser(name);
  if (!user || !user.active || !verifyPassword(String(password), user.passwordHash)) {
    const remaining = await noteFailedLogin(name, ip);
    await writeLog({
      username: name || '(boş)',
      action: 'login_failed',
      detail: user && !user.active ? 'Hesap kapalı' : 'Kullanıcı adı veya şifre hatalı',
      ip,
    });
    return NextResponse.json({ ok: false, error: 'invalid', remaining }, { status: 401 });
  }

  // Şifre doğru olsa bile kullanıcıya tanımlı IP kısıtlaması varsa geçilmez.
  if (!ipAllowed(user, ip)) {
    await writeLog({
      username: user.username,
      action: 'login_blocked_ip',
      detail: `İzin verilmeyen adres: ${ip}`,
      ip,
    });
    return NextResponse.json({ ok: false, error: 'ip_denied' }, { status: 403 });
  }

  await clearFailedLogins(name, ip);
  const sid = await createSession(user.username, ip, userAgent);
  await markLogin(user.username, ip);
  await writeLog({ username: user.username, action: 'login', detail: user.fullName, ip });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createToken(user.username, sid), COOKIE_OPTIONS);
  return res;
}
