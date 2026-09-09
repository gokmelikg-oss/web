import fs from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getSession, requestIp } from '@/lib/adminAuth';
import { inspectUpload, MAX_UPLOAD_BYTES } from '@/lib/fileGuard';
import { allowRequest } from '@/lib/formGuard';

export const runtime = 'nodejs';

/* Görsel yükleme. Dosya public/uploads altına yazılır ve site içi yolu döner.
   ⚠ Vercel gibi sunucusuz ortamlarda dosya sistemi salt okunurdur; orada
   yükleme çalışmaz ve kullanıcıya bunu açıkça söyleyen bir hata döner.

   ⚠ Biçim kararı `file.type`'a DEĞİL dosyanın sihirli baytlarına bakılarak
   verilir; SVG kabul edilmez (gerekçe: lib/fileGuard.ts). */

const DIR = path.join(process.cwd(), 'public', 'uploads');

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

  /* Hız sınırı: yetkili bir hesap ele geçirilse bile disk saniyeler içinde
     doldurulamasın. Kullanıcı başına 10 dakikada 30 yükleme. */
  if (!allowRequest(`upload:${session.username}:${await requestIp()}`, 30, 10 * 60_000)) {
    return NextResponse.json(
      { ok: false, error: 'Çok fazla yükleme yaptınız. Lütfen birkaç dakika sonra tekrar deneyin.' },
      { status: 429 }
    );
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

  /* Boyut sınırı baytları BELLEĞE ALMADAN ÖNCE bakılır; aksi hâlde 500 MB'lık
     bir istek okunup sonra reddedilirdi. */
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ ok: false, error: 'Dosya 5 MB sınırını aşıyor.' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Kabul kararı İÇERİĞE göre — istemcinin beyan ettiği türe göre değil.
  const check = inspectUpload(new Uint8Array(buffer), file.type);
  if (!check.ok || !check.ext) {
    return NextResponse.json({ ok: false, error: check.error }, { status: 400 });
  }

  /* Dosya adı SEO için anlamlı tutulur; sonek RASTGELEDİR.
     Eskiden Date.now() kullanılıyordu: aynı anda yüklenen iki dosya
     çakışabiliyor ve yüklenen dosyaların adresleri tahmin edilebiliyordu. */
  const suffix = randomBytes(5).toString('hex');
  const filename = `${slugifyName(file.name)}-${suffix}${check.ext}`;

  try {
    if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
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
