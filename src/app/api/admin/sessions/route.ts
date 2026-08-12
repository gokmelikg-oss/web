import { NextRequest, NextResponse } from 'next/server';
import { getSession, requestIp } from '@/lib/adminAuth';
import { clearBlock, endOtherSessions, endSession, listBlocks, listSessions } from '@/lib/adminSessions';
import { writeLog } from '@/lib/adminLog';

export const runtime = 'nodejs';

/* Açık oturumlar + kilitli hesaplar.
   Webmin "View Login Sessions" ve blockhost (hatalı giriş kilidi) ekranlarından uyarlandı. */

async function requireOwner() {
  const session = await getSession();
  if (!session) return { error: NextResponse.json({ ok: false }, { status: 401 }) };
  if (session.role !== 'owner') {
    return { error: NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 }) };
  }
  return { session };
}

async function payload(currentSid: string) {
  return {
    ok: true,
    sessions: await listSessions(),
    blocks: await listBlocks(),
    current: currentSid,
  };
}

export async function GET() {
  const { error, session } = await requireOwner();
  if (error || !session) return error;
  return NextResponse.json(await payload(session.sid));
}

export async function DELETE(req: NextRequest) {
  const { error, session } = await requireOwner();
  if (error || !session) return error;

  const params = new URL(req.url).searchParams;
  const ip = await requestIp();

  // Kilidi kaldır
  const unblock = params.get('unblock');
  if (unblock) {
    await clearBlock(unblock);
    await writeLog({ username: session.username, action: 'block_clear', detail: unblock, ip });
    return NextResponse.json(await payload(session.sid));
  }

  // Bu cihaz dışındaki tüm oturumları kapat
  if (params.get('others') === '1') {
    const count = await endOtherSessions(session.sid);
    await writeLog({
      username: session.username,
      action: 'session_end',
      detail: `Diğer tüm oturumlar kapatıldı (${count})`,
      ip,
    });
    return NextResponse.json(await payload(session.sid));
  }

  // Tek oturum
  const sid = params.get('sid') ?? '';
  const target = (await listSessions()).find((s) => s.sid === sid);
  await endSession(sid);
  await writeLog({
    username: session.username,
    action: 'session_end',
    detail: target ? `${target.username} · ${target.ip}` : sid,
    ip,
  });
  return NextResponse.json(await payload(session.sid));
}
