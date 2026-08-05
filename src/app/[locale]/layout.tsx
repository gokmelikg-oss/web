import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Sora, Inter, JetBrains_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { locales, isRtl, type Locale } from '@/i18n/config';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { MobileCtaBar } from '@/components/MobileCtaBar';
import { pageMetadata, SITE_URL, SITE_NAME } from '@/lib/seo';
import { OrgJsonLd } from '@/components/JsonLd';
import { Analytics } from '@/components/Analytics';
import { CookieBanner } from '@/components/CookieBanner';
import { SmoothScroll } from '@/components/SmoothScroll';
import '../globals.css';

const sora = Sora({
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
      'güneş enerjisi sistemleri',
      'termal güneş enerjisi',
      'güneş kollektörü',
      'solar enerji',
      'solar termal',
      'güneş enerjisi ile sıcak su',
      'sıcak su sistemi',
      'sıcak su boyleri',
      'emayeli boyler',
      'paket güneş enerjisi sistemi',
      'merkezi güneş enerjisi sistemi',
      'TOKİ güneş enerjisi',
      'toplu konut sıcak su sistemi',
      'kamu projeleri güneş enerjisi',
      'cezaevi sıcak su sistemi',
      'yurt sıcak su sistemi',
      'Adalet Bakanlığı güneş enerjisi',
      'Orion kollektör',
      'Aquarious boyler',
      'Şimşek Solar',
      'Mersin güneş enerjisi',
      'Solar Keymark kollektör',
    ],
    formatDetection: { telephone: true, address: true, email: true },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
      : {}),
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
        className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} ${plexArabic.variable} ${
          isRtl(locale) ? 'font-arabic' : 'font-body'
        } bg-background text-foreground antialiased`}
      >
        <OrgJsonLd locale={locale} />
        <Analytics />
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-graphite-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          İçeriğe geç
        </a>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
          <MobileCtaBar />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
