import { NextRequest, NextResponse } from 'next/server';
import { getSession, requestIp } from '@/lib/adminAuth';
import { writeLog } from '@/lib/adminLog';
import { endUserSessions } from '@/lib/adminSessions';
import {
  createUser, deleteUser, listUsers, safeUser, updateUser, type UserInput,
} from '@/lib/adminUsers';
import { ADMIN_SECTIONS, type AdminRole, type AdminSection } from '@/lib/adminAcl';

export const runtime = 'nodejs';

/* Kullanıcı yönetimi yalnızca yöneticiye (owner) açıktır. */
async function requireOwner() {
  const session = await getSession();
  if (!session) return { error: NextResponse.json({ ok: false }, { status: 401 }) };
  if (session.role !== 'owner') {
    return { error: NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 }) };
  }
  return { session };
}

function parseInput(body: Record<string, unknown>): UserInput {
  const role = (['owner', 'editor', 'viewer'] as AdminRole[]).includes(body.role as AdminRole)
    ? (body.role as AdminRole)
    : 'editor';
  const sections = Array.isArray(body.sections)
    ? (body.sections as string[]).filter((s): s is AdminSection =>
        ADMIN_SECTIONS.includes(s as AdminSection))
    : [];
  return {
    username: String(body.username ?? ''),
    fullName: String(body.fullName ?? ''),
    email: body.email ? String(body.email) : undefined,
    role,
    sections,
    // Alan hiç gönderilmediyse undefined kalır → güncellemede mevcut liste korunur.
    allowedIps: Array.isArray(body.allowedIps)
      ? (body.allowedIps as unknown[]).map((v) => String(v).trim()).filter(Boolean)
      : undefined,
    active: body.active !== false,
    password: body.password ? String(body.password) : undefined,
  };
}

export async function GET() {
  const { error } = await requireOwner();
  if (error) return error;
  return NextResponse.json({ ok: true, users: (await listUsers()).map(safeUser) });
}

export async function POST(req: NextRequest) {
  const { error, session } = await requireOwner();
  if (error || !session) return error;
  const body = await req.json().catch(() => ({}));
  try {
    const user = await createUser(parseInput(body));
    await writeLog({
      username: session.username,
      action: 'user_create',
      detail: `${user.username} (${user.role})`,
      ip: await requestIp(),
    });
    return NextResponse.json({ ok: true, users: (await listUsers()).map(safeUser) });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const { error, session } = await requireOwner();
  if (error || !session) return error;
  const body = await req.json().catch(() => ({}));
  const username = String(body.username ?? '');
  try {
    const input = parseInput(body);
    const user = await updateUser(username, input);
    // Şifre değiştiyse veya hesap kapandıysa açık oturumlar düşürülür.
    if (input.password || !user.active) await endUserSessions(user.username);
    await writeLog({
      username: session.username,
      action: 'user_update',
      detail: `${user.username} (${user.role}${user.active ? '' : ' · kapalı'})`,
      ip: await requestIp(),
    });
    return NextResponse.json({ ok: true, users: (await listUsers()).map(safeUser) });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const { error, session } = await requireOwner();
  if (error || !session) return error;
  const username = new URL(req.url).searchParams.get('username') ?? '';
  if (username === session.username) {
    return NextResponse.json({ ok: false, error: 'Kendi hesabınızı silemezsiniz.' }, { status: 400 });
  }
  try {
    await deleteUser(username);
    await endUserSessions(username);
    await writeLog({
      username: session.username,
      action: 'user_delete',
      detail: username,
      ip: await requestIp(),
    });
    return NextResponse.json({ ok: true, users: (await listUsers()).map(safeUser) });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 400 });
  }
}
