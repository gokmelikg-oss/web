import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession, requestIp } from '@/lib/adminAuth';
import { getContent, saveContent, type SiteContent } from '@/lib/content';
import { writeLog } from '@/lib/adminLog';

export const runtime = 'nodejs';

/* İçerik yedeği indir / geri yükle — Webmin "Backup Configuration Files" modülünden uyarlandı.
   Yedek yalnızca site içeriğidir; kullanıcı hesapları ve şifre özetleri YEDEĞE GİRMEZ. */

const REVALIDATE = [
  '/[locale]', '/[locale]/resources', '/[locale]/blog', '/[locale]/blog/[slug]',
  '/[locale]/products', '/[locale]/projects', '/[locale]/about', '/[locale]/contact',
];

async function requireOwner() {
  const session = await getSession();
  if (!session) return { error: NextResponse.json({ ok: false }, { status: 401 }) };
  if (session.role !== 'owner') {
    return { error: NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 }) };
  }
  return { session };
}

export async function GET() {
  const { error, session } = await requireOwner();
  if (error || !session) return error;

  const content = await getContent();
  const stamp = new Date().toISOString().slice(0, 10).split('-').reverse().join('');
  await writeLog({
    username: session.username,
    action: 'backup_download',
    detail: `${content.products?.length ?? 0} ürün · ${content.posts?.length ?? 0} yazı`,
    ip: await requestIp(),
  });

  return new NextResponse(JSON.stringify(content, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="simsek-icerik-yedek-${stamp}.json"`,
    },
  });
}

export async function POST(req: NextRequest) {
  const { error, session } = await requireOwner();
  if (error || !session) return error;

  let body: Partial<SiteContent>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Dosya okunamadı — geçerli bir JSON değil.' }, { status: 400 });
  }

  // Yedek dosyası gerçekten içerik yedeği mi?
  const looksValid = ['documents', 'references', 'products', 'posts'].some((k) =>
    Array.isArray((body as Record<string, unknown>)[k])
  );
  if (!looksValid) {
    return NextResponse.json(
      { ok: false, error: 'Bu dosya bir içerik yedeği gibi görünmüyor.' },
      { status: 400 }
    );
  }

  await saveContent({
    documents: body.documents ?? [],
    references: body.references ?? [],
    products: body.products ?? [],
    posts: body.posts ?? [],
    hiddenRefs: body.hiddenRefs ?? [],
    texts: body.texts ?? {},
    groupImages: body.groupImages ?? {},
    updatedAt: '',
  });
  for (const p of REVALIDATE) revalidatePath(p, 'page');

  await writeLog({
    username: session.username,
    action: 'backup_restore',
    detail: `${body.products?.length ?? 0} ürün · ${body.posts?.length ?? 0} yazı geri yüklendi`,
    ip: await requestIp(),
  });

  return NextResponse.json({ ok: true });
}
