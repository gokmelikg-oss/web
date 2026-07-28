import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Josefin_Sans, Inter, JetBrains_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { locales, isRtl, type Locale } from '@/i18n/config';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { pageMetadata, SITE_URL, SITE_NAME } from '@/lib/seo';
import { OrgJsonLd } from '@/components/JsonLd';
import '../globals.css';

const josefinSans = Josefin_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const base = pageMetadata({
    locale,
    path: '/',
    title: t('title'),
    description: t('description'),
  });
  return {
    ...base,
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: `%s | ${SITE_NAME}`,
    },
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    keywords: [
      'güneş enerjisi',
      'güneş kollektörü',
      'solar termal',
      'emayeli boyler',
      'paket sistem',
      'merkezi sistem',
      'Orion kollektör',
      'Aquarious boyler',
      'Şimşek Solar',
      'Mersin güneş enerjisi',
      'Solar Keymark',
    ],
    formatDetection: { telephone: true, address: true, email: true },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = isRtl(locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${josefinSans.variable} ${inter.variable} ${jetbrainsMono.variable} ${plexArabic.variable} ${
          isRtl(locale) ? 'font-arabic' : 'font-body'
        } bg-background text-foreground antialiased`}
      >
        <OrgJsonLd locale={locale} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
