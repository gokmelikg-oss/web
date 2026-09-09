import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getContent, saveContent, type SiteContent } from '@/lib/content';
import { describeContentChange } from '@/lib/contentDiff';
import { normalizeSiteContent, withinSizeLimit } from '@/lib/contentGuard';
import { allowRequest } from '@/lib/formGuard';
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

  /* Hız sınırı yalnızca giriş ekranında ve halka açık formlarda vardı; oturum
     açmış bir uç sınırsızdı. Bir panel hesabı ele geçirilirse depo saniyeler
     içinde defalarca yazılabilir (her kayıt bir sürüm de üretir). */
  if (!allowRequest(`content:${session.username}`, 60, 10 * 60_000)) {
    return NextResponse.json(
      { ok: false, error: 'Çok fazla kayıt isteği. Lütfen birkaç dakika sonra tekrar deneyin.' },
      { status: 429 }
    );
  }
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
    /* ⚠ Gövde DOĞRUDAN kaydedilmez.
       Eskiden yalnızca üst düzey tip kontrolü vardı (Array.isArray) ve
       dizilerin İÇİ olduğu gibi depoya yazılıyordu. Artık her kayıt alan
       alan yeniden kurulur: yalnızca bilinen alanlar kopyalanır, metinler
       kırpılır, bağlantı şemaları denetlenir (javascript: reddedilir), dizi
       uzunlukları sınırlanır. Bilinmeyen alanlar sessizce düşer. */
    const nextContent: SiteContent = normalizeSiteContent(body);

    // Depoya yazılacak JSON'un boyutu üst sınırı aşmamalı.
    if (!withinSizeLimit(nextContent)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'İçerik boyutu 2 MB sınırını aşıyor. Görselleri metnin içine gömmek yerine yükleyip bağlayın.',
        },
        { status: 413 }
      );
    }

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
