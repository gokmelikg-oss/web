import type { Metadata } from 'next';
import { locales, defaultLocale, type Locale } from '@/i18n/config';

/* Yayın alan adı — tek kaynak. Gerçek alan adı farklıysa yalnızca burayı değiştirin. */
export const SITE_URL = 'https://www.simseksolar.com.tr';

export const SITE_NAME = 'Şimşek Solar';

/* Kurumsal künye — JSON-LD Organization ve iletişim yapısal verisi için. */
/* Sosyal medya hesapları — footer + JSON-LD sameAs. */
export const SOCIAL = {
  instagram: 'https://www.instagram.com/simsek.solar/',
  facebook: 'https://www.facebook.com/simsekguneskollektorleri/',
  linkedin: 'https://tr.linkedin.com/company/simsek-solar',
} as const;

/* WhatsApp iletişim hattı (uluslararası biçim, sadece rakam). */
export const WHATSAPP_NUMBER = '905495800501';

/* Form mesajlarının iletileceği adres. */
export const CONTACT_EMAIL = 'info@simseksolar.com.tr';

export const ORG = {
  legalName: 'Şimşek Güneş Kollektörleri San. Tic. Ltd. Şti.',
  foundingDate: '1992',
  phone: '+90 324 324 12 35',
  email: 'info@simseksolar.com.tr',
  street: '2. Organize Sanayi Bölgesi Rasim Dokur Bulvarı No:32',
  district: 'Akdeniz',
  city: 'Mersin',
  country: 'TR',
  postalCode: '33000',
  latitude: 36.9152,
  longitude: 34.773,
  sameAs: [SOCIAL.instagram, SOCIAL.facebook, SOCIAL.linkedin] as string[],
} as const;

/* Bir yolun her dildeki mutlak URL'lerini üretir (hreflang + canonical için).
   path her zaman "/" ile başlar veya boş string ("/" ana sayfa demektir). */
export function localizedUrls(path: string) {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${SITE_URL}/${loc}${clean}`;
  }
  languages['x-default'] = `${SITE_URL}/${defaultLocale}${clean}`;
  return languages;
}

/* Sayfa metadata'sı üretir: canonical + hreflang + Open Graph + Twitter.
   Her sayfanın generateMetadata'sında çağrılır. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  images,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  images?: string[];
}): Metadata {
  const languages = localizedUrls(path);
  const canonical = languages[locale];
  const ogLocale: Record<Locale, string> = {
    tr: 'tr_TR',
    en: 'en_US',
    ar: 'ar_EG',
    el: 'el_GR',
  };

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: ogLocale[locale],
      url: canonical,
      title,
      description,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}
