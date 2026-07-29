import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, expectedToken } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: '' }));
  const configured = process.env.ADMIN_PASSWORD;

  if (!configured) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }
  if (password !== configured) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 saat
  });
  return res;
}
