import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getContent, saveContent, type SiteContent } from '@/lib/content';
import { isAuthed } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, content: await getContent() });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ ok: false }, { status: 401 });
  let body: SiteContent;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
  }
  try {
    await saveContent({
      documents: Array.isArray(body.documents) ? body.documents : [],
      references: Array.isArray(body.references) ? body.references : [],
      products: Array.isArray(body.products) ? body.products : [],
      posts: Array.isArray(body.posts) ? body.posts : [],
      groupImages: body.groupImages && typeof body.groupImages === 'object' ? body.groupImages : {},
      updatedAt: '',
    });
    // Admin içeriği gösteren ISR sayfalarını anında tazele (tüm diller için).
    for (const p of ['/[locale]/resources', '/[locale]/blog', '/[locale]/blog/[slug]', '/[locale]/products', '/[locale]/projects']) {
      revalidatePath(p, 'page');
    }
    return NextResponse.json({ ok: true, content: await getContent() });
  } catch (err) {
    console.error('content save error', err);
    return NextResponse.json({ ok: false, error: 'write_failed' }, { status: 500 });
  }
}
