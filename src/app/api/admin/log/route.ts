import { NextResponse } from 'next/server';
import { getSession } from '@/lib/adminAuth';
import { listLog } from '@/lib/adminLog';

export const runtime = 'nodejs';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  if (session.role !== 'owner') {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }
  return NextResponse.json({ ok: true, entries: await listLog() });
}
