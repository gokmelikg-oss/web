import { NextRequest, NextResponse } from 'next/server';
import { CONTACT_EMAIL, SITE_NAME } from '@/lib/seo';
import { field, LIMITS, isEmail, allowRequest, clientIp } from '@/lib/formGuard';

export const runtime = 'nodejs';

/* İletişim ve bayilik formlarının e-posta ile iletimi.
   Resend üzerinden gönderilir; ortam değişkeni gereklidir:
     RESEND_API_KEY=re_...
     CONTACT_FROM="Şimşek Solar <bildirim@simseksolar.com.tr>"  (opsiyonel; doğrulanmış alan)
   Alıcı: info@simseksolar.com.tr (src/lib/seo.ts → CONTACT_EMAIL). */

interface Payload {
  formType?: 'contact' | 'dealer' | 'service' | 'newsletter';
  hp?: string; // honeypot — doluysa bot
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  city?: string;
  country?: string;
  subject?: string;
  serviceType?: string;
  volume?: string;
  message?: string;
}

const HEADINGS: Record<string, string> = {
  dealer: 'Yeni Bayilik Başvurusu',
  service: 'Yeni Teknik Servis Talebi',
  newsletter: 'Yeni Bülten Aboneliği',
  contact: 'Yeni İletişim Mesajı',
};

function esc(s = '') {
  return s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c] as string);
}

export async function POST(req: NextRequest) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
  }

  // Honeypot: gizli alan doluysa bottur — başarı taklidi yapıp sessizce yut.
  if (data.hp && data.hp.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  /* Hız sınırı: aynı IP 10 dakikada en fazla 5 form gönderebilir. */
  if (!allowRequest(`contact:${clientIp(req.headers)}`, 5)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  /* Alanlar uzunluk sınırıyla ve kontrol karakterleri temizlenerek alınır
     (e-posta başlığı kırma ve aşırı büyük gövde girişimlerine karşı). */
  data = {
    formType: data.formType,
    name: field(data.name, LIMITS.name),
    email: field(data.email, LIMITS.email),
    phone: field(data.phone, LIMITS.phone),
    company: field(data.company, LIMITS.company),
    city: field(data.city, LIMITS.projectLocation),
    country: field(data.country, LIMITS.country),
    subject: field(data.subject, LIMITS.subject),
    serviceType: field(data.serviceType, LIMITS.serviceType),
    volume: field(data.volume, LIMITS.volume),
    message: field(data.message, LIMITS.message),
  };

  const isNewsletter = data.formType === 'newsletter';

  // Basit doğrulama — bültende yalnızca e-posta, diğerlerinde ad + e-posta.
  if (!data.email || !isEmail(data.email) || (!isNewsletter && !data.name)) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  }

  const heading = HEADINGS[data.formType ?? 'contact'] ?? HEADINGS.contact;
  const who = data.name || data.email;

  const rows: [string, string | undefined][] = [
    ['Ad Soyad', data.name],
    ['Firma', data.company],
    ['E-posta', data.email],
    ['Telefon', data.phone],
    ['Şehir / Konum', data.city],
    ['Ülke', data.country],
    ['Servis Türü', data.serviceType],
    ['Konu', data.subject],
    ['Tahmini Hacim', data.volume],
    ['Mesaj', data.message],
  ];
  const html = `
    <h2 style="font-family:sans-serif">${heading}</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .filter(([, v]) => v)
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px;color:#6b7280">${k}</td><td style="padding:6px 12px;font-weight:600">${esc(
              v
            )}</td></tr>`
        )
        .join('')}
    </table>
    <p style="font-family:sans-serif;color:#9ca3af;font-size:12px">${SITE_NAME} web sitesi formu</p>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Anahtar yoksa gönderim yapılamaz; formu bilgilendir.
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  const from = process.env.CONTACT_FROM || `${SITE_NAME} <bildirim@simseksolar.com.tr>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_EMAIL],
        reply_to: data.email,
        subject: `${heading} — ${who}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Resend error', res.status, detail);
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact route error', err);
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 });
  }
}
