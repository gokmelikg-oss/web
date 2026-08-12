import type { Locale } from '@/i18n/config';

/* SERTİFİKALAR — /sertifikalar sayfasının veri kaynağı
   ====================================================
   ⚠ Bu dosya BİLİNÇLİ OLARAK BOŞTUR. Sertifika numarası, tarih ve kapsam
   doğrulanabilir bilgilerdir; uydurulmuş bir belge numarası hem müşteri hem
   AI sistemleri nezdinde güven kaybına yol açar (bkz. CLAUDE.md).

   Doldurma biçimi aşağıdaki örnekte gösterilmiştir. Bir alanı bilmiyorsanız
   undefined bırakın — sayfa o satırı hiç basmaz, boş etiket görünmez.

   PDF'ler public/docs/ altına konur ve `file` alanına "/docs/dosya.pdf"
   biçiminde yazılır. PDF'in yanında HTML açıklama (scope/description) olması
   şarttır: arama motorunun tek bilgi kaynağı PDF olmamalıdır. */

export interface Certificate {
  /* URL ve anahtar olarak kullanılır: 'solar-keymark' */
  id: string;
  /* Belge adı — dile göre. Belge adı çevrilmiyorsa dört dilde aynı yazılabilir. */
  name: Record<Locale, string>;
  /* Belgeyi veren kurum: 'DIN CERTCO', 'TSE', 'TÜV' ... */
  issuer: string;
  /* Belge numarası — belgenin üzerindeki numara birebir */
  number?: string;
  /* Veriliş tarihi (YYYY-MM-DD) */
  issuedAt?: string;
  /* Geçerlilik bitişi (YYYY-MM-DD). Süresizse undefined bırakın. */
  validUntil?: string;
  /* Kapsam: belge hangi ürünleri/süreçleri kapsıyor — dile göre */
  scope?: Record<Locale, string>;
  /* Belgenin ne anlama geldiğini anlatan kısa metin — dile göre.
     SEO ve AI için asıl değerli kısım budur; PDF'te kalmamalı. */
  description?: Record<Locale, string>;
  /* PDF yolu: '/docs/solar-keymark.pdf' */
  file?: string;
  /* Belgenin kapsadığı ürün slug'ları (products.ts ile eşleşir).
     Doldurulursa ürün sayfasından sertifikaya iç link kurulabilir. */
  products?: string[];
}

/* ─────────────────────────────────────────────────────────────────────
   ÖRNEK — kopyalayıp doldurun, sonra bu yorumu silin.

   {
     id: 'solar-keymark',
     name: { tr: 'Solar Keymark', en: 'Solar Keymark', ar: 'Solar Keymark', el: 'Solar Keymark' },
     issuer: 'DIN CERTCO',
     number: '011-7S1234 F',
     issuedAt: '2024-03-15',
     validUntil: '2029-03-14',
     scope: {
       tr: 'Orion 413, 433 ve 435 düzlemsel güneş kollektörleri',
       en: 'Orion 413, 433 and 435 flat plate solar collectors',
       ar: '...', el: '...',
     },
     description: {
       tr: 'Solar Keymark, güneş termal ürünlerinin Avrupa genelinde kabul gören kalite işaretidir. Belge, kollektörün EN 12975 standardına göre bağımsız laboratuvarda test edildiğini ve üretim sürecinin düzenli denetlendiğini gösterir.',
       en: '...', ar: '...', el: '...',
     },
     file: '/docs/solar-keymark.pdf',
     products: ['orion-413', 'orion-433', 'orion-435'],
   }
   ───────────────────────────────────────────────────────────────────── */

export const certificates: Certificate[] = [];

export function getCertificate(id: string): Certificate | undefined {
  return certificates.find((c) => c.id === id);
}
