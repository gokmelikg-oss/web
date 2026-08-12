import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/adminAuth';

export const runtime = 'nodejs';

/* Görsel yükleme. Dosya public/uploads altına yazılır ve site içi yolu döner.
   ⚠ Vercel gibi sunucusuz ortamlarda dosya sistemi salt okunurdur; orada
   yükleme çalışmaz ve kullanıcıya bunu açıkça söyleyen bir hata döner. */

const DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_BYTES = 5 * 1024 * 1024;
const TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/avif': '.avif',
  'image/svg+xml': '.svg',
};

/* "Orion 435 Kollektör.JPG" → "orion-435-kollektor" */
function slugifyName(name: string): string {
  return name
    .replace(/\.[^.]+$/, '')
    .toLocaleLowerCase('tr-TR')
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'gorsel';
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  if (!session.canWrite) {
    return NextResponse.json({ ok: false, error: 'Yükleme yetkiniz yok.' }, { status: 403 });
  }

  let file: File | null = null;
  try {
    const form = await req.formData();
    const f = form.get('file');
    if (f instanceof File) file = f;
  } catch {
    return NextResponse.json({ ok: false, error: 'Dosya okunamadı.' }, { status: 400 });
  }
  if (!file) return NextResponse.json({ ok: false, error: 'Dosya seçilmedi.' }, { status: 400 });

  const ext = TYPES[file.type];
  if (!ext) {
    return NextResponse.json(
      { ok: false, error: 'Yalnızca JPG, PNG, WebP, AVIF ve SVG yüklenebilir.' },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: 'Dosya 5 MB sınırını aşıyor.' },
      { status: 400 }
    );
  }

  // Dosya adı SEO için anlamlı tutulur; çakışmayı önlemek için kısa sonek eklenir.
  const stamp = Date.now().toString(36).slice(-5);
  const filename = `${slugifyName(file.name)}-${stamp}${ext}`;

  try {
    if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(DIR, filename), buffer);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === 'EROFS' || code === 'EACCES' || code === 'EPERM') {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Sunucunun dosya sistemi salt okunur (Vercel gibi sunucusuz ortamlarda normaldir). ' +
            'Görsel yükleme için Vercel Blob bağlanmalı ya da görseller projeye public/ altında eklenmelidir.',
        },
        { status: 501 }
      );
    }
    console.error('upload error', err);
    return NextResponse.json({ ok: false, error: 'Dosya kaydedilemedi.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, path: `/uploads/${filename}` });
}
