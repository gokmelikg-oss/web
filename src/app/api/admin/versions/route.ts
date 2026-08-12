import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession, requestIp } from '@/lib/adminAuth';
import { getContent, listVersions, saveContent } from '@/lib/content';
import { describeContentChange } from '@/lib/contentDiff';
import { writeLog } from '@/lib/adminLog';

export const runtime = 'nodejs';

/* İçerik sürüm geçmişi: son 10 kayıt listelenir, biri geri yüklenebilir. */

const REVALIDATE = [
  '/[locale]', '/[locale]/resources', '/[locale]/blog', '/[locale]/blog/[slug]',
  '/[locale]/products', '/[locale]/projects', '/[locale]/about', '/[locale]/contact',
];

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  // Sürüm listesi içerik verisini taşır; ağır olduğu için özetle döner.
  const versions = (await listVersions()).map((v, i) => ({
    index: i,
    at: v.at,
    by: v.by,
    summary: v.summary,
    counts: {
      products: v.content.products?.length ?? 0,
      posts: v.content.posts?.length ?? 0,
      references: v.content.references?.length ?? 0,
    },
  }));
  return NextResponse.json({ ok: true, versions });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  if (!session.canWrite) {
    return NextResponse.json({ ok: false, error: 'Geri yükleme yetkiniz yok.' }, { status: 403 });
  }

  const { index } = await req.json().catch(() => ({ index: -1 }));
  const versions = await listVersions();
  const target = versions[Number(index)];
  if (!target) {
    return NextResponse.json({ ok: false, error: 'Sürüm bulunamadı.' }, { status: 404 });
  }

  const current = await getContent();
  const summary = describeContentChange(current, target.content);
  // Geri yükleme de bir kayıttır: mevcut hâl geçmişe eklenir, geri dönülebilir.
  await saveContent(target.content, { by: session.username, summary });
  for (const p of REVALIDATE) revalidatePath(p, 'page');

  await writeLog({
    username: session.username,
    action: 'content_restore',
    detail: `${new Date(target.at).toLocaleString('tr-TR')} sürümüne dönüldü · ${summary}`,
    ip: await requestIp(),
  });

  return NextResponse.json({ ok: true });
}
