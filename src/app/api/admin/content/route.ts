import { NextRequest, NextResponse } from 'next/server';
import { getContent, saveContent, type SiteContent } from '@/lib/content';
import { isAuthed } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, content: getContent() });
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
    saveContent({
      documents: Array.isArray(body.documents) ? body.documents : [],
      references: Array.isArray(body.references) ? body.references : [],
      groupImages: body.groupImages && typeof body.groupImages === 'object' ? body.groupImages : {},
      updatedAt: '',
    });
    return NextResponse.json({ ok: true, content: getContent() });
  } catch (err) {
    console.error('content save error', err);
    return NextResponse.json({ ok: false, error: 'write_failed' }, { status: 500 });
  }
}
