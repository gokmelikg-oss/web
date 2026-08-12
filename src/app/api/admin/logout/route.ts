import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, getSession, requestIp } from '@/lib/adminAuth';
import { endSession } from '@/lib/adminSessions';
import { writeLog } from '@/lib/adminLog';

export const runtime = 'nodejs';

export async function POST() {
  const session = await getSession();
  if (session) {
    await endSession(session.sid);
    await writeLog({
      username: session.username,
      action: 'logout',
      detail: session.fullName,
      ip: await requestIp(),
    });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
