import { NextRequest, NextResponse } from 'next/server';
import { CONTACT_EMAIL, SITE_NAME } from '@/lib/seo';
import { field, LIMITS, isEmail, allowRequest, clientIp } from '@/lib/formGuard';

export const runtime = 'nodejs';

/* Teklif (RFQ) formu — iletişim formundan ayrıdır çünkü:
   - ticari alanlar taşır (ülke, adet, proje tipi/lokasyonu)
   - DOSYA EKİ kabul eder (proje çizimi, şartname, keşif listesi)
   Bu yüzden JSON değil multipart/form-data ile gelir.

   Gönderim Resend üzerinden; RESEND_API_KEY gerekir. */

const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8 MB — Resend eki için güvenli sınır
const ALLOWED_EXT = /\.(pdf|dwg|dxf|xlsx|xls|docx|doc|jpg|jpeg|png|zip)$/i;

function esc(s = '') {
  return s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c] as string);
}

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
  }

  /* Her alan uzunluk sınırıyla ve kontrol karakterleri temizlenerek okunur. */
  const get = (k: keyof typeof LIMITS) => field(form.get(k), LIMITS[k]);

  // Honeypot — gizli alan doluysa bot; başarı taklidi yapıp sessizce yut.
  if (field(form.get('website'), 50) !== '') return NextResponse.json({ ok: true });

  /* Hız sınırı: aynı IP 10 dakikada en fazla 5 teklif talebi gönderebilir. */
  if (!allowRequest(`teklif:${clientIp(req.headers)}`, 5)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const name = get('name');
  const email = get('email');
  if (!name || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  }

  // Ek dosya — isteğe bağlı
  const file = form.get('file');
  let attachment: { filename: string; content: string } | undefined;
  if (file instanceof File && file.size > 0) {
    if (!ALLOWED_EXT.test(file.name)) {
      return NextResponse.json({ ok: false, error: 'file_type' }, { status: 415 });
    }
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ ok: false, error: 'file_size' }, { status: 413 });
    }
    attachment = {
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()).toString('base64'),
    };
  }

  const rows: [string, string][] = [
    ['Ad Soyad', name],
    ['Firma', get('company')],
    ['Ülke', get('country')],
    ['E-posta', email],
    ['Telefon', get('phone')],
    ['İlgilenilen ürün', get('product')],
    ['Tahmini adet / kapasite', get('quantity')],
    ['Proje lokasyonu', get('projectLocation')],
    ['Proje tipi', get('projectType')],
    ['Mesaj', get('message')],
  ];

  const html = `
    <h2 style="font-family:sans-serif">Yeni Teklif Talebi (RFQ)</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .filter(([, v]) => v)
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px;color:#6b7280">${k}</td><td style="padding:6px 12px;font-weight:600">${esc(v)}</td></tr>`
        )
        .join('')}
    </table>
    ${attachment ? `<p style="font-family:sans-serif;color:#374151">📎 Ek: ${esc(attachment.filename)}</p>` : ''}
    <p style="font-family:sans-serif;color:#9ca3af;font-size:12px">${SITE_NAME} web sitesi teklif formu</p>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || `${SITE_NAME} <bildirim@simseksolar.com.tr>`,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `Teklif Talebi — ${name}${get('country') ? ` (${get('country')})` : ''}`,
        html,
        ...(attachment ? { attachments: [attachment] } : {}),
      }),
    });
    if (!res.ok) {
      console.error('Resend error', res.status, await res.text());
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('RFQ route error', err);
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 });
  }
}
