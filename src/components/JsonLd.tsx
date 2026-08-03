import { getLocale } from 'next-intl/server';
import { SITE_URL, SITE_NAME, ORG } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

/* Yapısal veri (JSON-LD). Arama motorları ve AI botları için makine-okunur künye.
   dangerouslySetInnerHTML script enjeksiyonu SEO'da standarttır; içerik statiktir. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrgJsonLd({ locale }: { locale: Locale }) {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: ORG.legalName,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/brand/simsek-solar.png`,
    foundingDate: ORG.foundingDate,
    email: ORG.email,
    telephone: ORG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ORG.street,
      addressLocality: ORG.city,
      addressRegion: ORG.district,
      postalCode: ORG.postalCode,
      addressCountry: ORG.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ORG.latitude,
      longitude: ORG.longitude,
    },
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    // AI motorlarının şirketi doğru uzmanlık alanlarıyla ilişkilendirmesi için.
    knowsAbout: [
      'Güneş termal enerji sistemleri',
      'Güneş kollektörü üretimi',
      'Emayeli sıcak su boyleri',
      'Merkezi güneş enerjisi sistemleri',
      'Toplu konut ve kamu projeleri sıcak su sistemleri',
      'Solar Keymark sertifikalı kollektörler',
    ],
    naics: '333414',
    ...(ORG.sameAs.length ? { sameAs: ORG.sameAs } : {}),
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: locale,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  /* Yerel işletme — "Mersin güneş enerjisi" gibi yerel aramalar ve harita
     sonuçları için. Çalışma saatleri + coğrafi konum + hizmet alanı. */
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    image: `${SITE_URL}/brand/simsek-solar.png`,
    url: `${SITE_URL}/${locale}`,
    telephone: ORG.phone,
    email: ORG.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: ORG.street,
      addressLocality: ORG.city,
      addressRegion: ORG.district,
      postalCode: ORG.postalCode,
      addressCountry: ORG.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ORG.latitude,
      longitude: ORG.longitude,
    },
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
  };

  return (
    <>
      <JsonLd data={org} />
      <JsonLd data={website} />
      <JsonLd data={localBusiness} />
    </>
  );
}

/* Ürün sayfaları için Product yapısal verisi. */
export function ProductJsonLd({
  locale,
  slug,
  name,
  description,
  category,
}: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
  category?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    ...(category ? { category } : {}),
    brand: { '@type': 'Brand', name: SITE_NAME },
    manufacturer: { '@id': `${SITE_URL}/#organization` },
    url: `${SITE_URL}/${locale}/products/${slug}`,
    image: `${SITE_URL}/products/${slug}.jpg`,
  };
  return <JsonLd data={data} />;
}

/* Makale yapısal verisi — blog/haber yazıları için (Google + AI alıntıları). */
export function ArticleJsonLd({
  locale,
  slug,
  title,
  description,
  datePublished,
  image,
}: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  image?: string;
}) {
  const url = `${SITE_URL}/${locale}/blog/${slug}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    inLanguage: locale,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    ...(image ? { image: `${SITE_URL}${image}` } : {}),
    author: { '@type': 'Organization', name: SITE_NAME, '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
  return <JsonLd data={data} />;
}

/* SSS yapısal verisi — Google zengin sonuçları ve AI asistanı alıntıları için. */
export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
  return <JsonLd data={data} />;
}

/* Sayfa breadcrumb'ı — "Ana Sayfa > Sayfa" hiyerarşisini otomatik kurar.
   locale request'ten okunur; her iç sayfa yalnızca kendi kırıntılarını verir. */
const HOME_LABEL: Record<Locale, string> = {
  tr: 'Ana Sayfa',
  en: 'Home',
  ar: 'الرئيسية',
};

export async function PageBreadcrumb({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const locale = (await getLocale()) as Locale;
  const trail = [{ name: HOME_LABEL[locale] ?? HOME_LABEL.tr, path: '/' }, ...items];
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}/${locale}${t.path === '/' ? '' : t.path}`,
    })),
  };
  return <JsonLd data={data} />;
}

/* Gezinme kırıntısı — sayfa hiyerarşisi. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
  return <JsonLd data={data} />;
}
