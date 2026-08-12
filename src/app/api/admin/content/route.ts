import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getContent, saveContent, type SiteContent } from '@/lib/content';
import { describeContentChange } from '@/lib/contentDiff';
import { getSession, requestIp } from '@/lib/adminAuth';
import { writeLog } from '@/lib/adminLog';

export const runtime = 'nodejs';

export async function GET() {
  if (!(await getSession())) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, content: await getContent() });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  // İzleyici rolü salt okurdur.
  if (!session.canWrite) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  let body: SiteContent & { baseUpdatedAt?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
  }

  /* Eşzamanlı düzenleme koruması: istemci, düzenlemeye başladığı sürümün
     damgasını gönderir. Aralıkta başkası kaydettiyse üzerine yazdırmayız. */
  const current = await getContent();
  if (
    body.baseUpdatedAt !== undefined &&
    current.updatedAt &&
    body.baseUpdatedAt !== current.updatedAt
  ) {
    return NextResponse.json(
      { ok: false, error: 'conflict', currentUpdatedAt: current.updatedAt },
      { status: 409 }
    );
  }

  try {
    const nextContent: SiteContent = {
      documents: Array.isArray(body.documents) ? body.documents : [],
      references: Array.isArray(body.references) ? body.references : [],
      products: Array.isArray(body.products) ? body.products : [],
      posts: Array.isArray(body.posts) ? body.posts : [],
      hiddenRefs: Array.isArray(body.hiddenRefs) ? body.hiddenRefs : [],
      texts: body.texts && typeof body.texts === 'object' ? body.texts : {},
      groupImages: body.groupImages && typeof body.groupImages === 'object' ? body.groupImages : {},
      textsByLocale:
        body.textsByLocale && typeof body.textsByLocale === 'object' ? body.textsByLocale : {},
      updatedAt: '',
    };

    // İşlem kaydına "ne değişti" yazabilmek için farkı önceden çıkar.
    const summary = describeContentChange(current, nextContent);
    await saveContent(nextContent, { by: session.username, summary });

    // Admin içeriği gösteren ISR sayfalarını anında tazele (tüm diller için).
    for (const p of [
      '/[locale]',
      '/[locale]/resources',
      '/[locale]/blog',
      '/[locale]/blog/[slug]',
      '/[locale]/products',
      '/[locale]/projects',
      '/[locale]/about',
      '/[locale]/contact',
    ]) {
      revalidatePath(p, 'page');
    }
    await writeLog({
      username: session.username,
      action: 'content_save',
      detail: summary,
      ip: await requestIp(),
    });
    return NextResponse.json({ ok: true, content: await getContent() });
  } catch (err) {
    console.error('content save error', err);
    return NextResponse.json({ ok: false, error: 'write_failed' }, { status: 500 });
  }
}
