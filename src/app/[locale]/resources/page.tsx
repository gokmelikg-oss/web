import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { ResourceCenter } from '@/components/ResourceCenter';
import { TechnicalLibrary } from '@/components/TechnicalLibrary';
import { PageBreadcrumb } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { getContent } from '@/lib/content';
import { getTechDocsUi } from '@/lib/techDocsUi';
import type { Locale } from '@/i18n/config';

// ISR: statik olarak servis edilir, saatte bir yeniden üretilir.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources.hero' });
  return pageMetadata({ locale, path: '/resources', title: t('title'), description: t('subtitle') });
}

export default async function ResourcesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations('resources.hero');
  const tNav = await getTranslations('nav');
  const tech = getTechDocsUi(locale);
  const adminDocs = (await getContent()).documents;

  return (
    <>
      <PageBreadcrumb items={[{ name: tNav('resources'), path: '/resources' }]} />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      {/* Detaylı teknik veri sayfaları — ürün seçici + sekmeler */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
                {tech.browseEyebrow}
              </p>
              <h2 className="mt-3 font-display type-h2 font-bold tracking-tight text-graphite-950">
                {tech.browseTitle}
              </h2>
              <p className="mt-4 text-mist-700">{tech.browseSubtitle}</p>
            </div>
          </Reveal>
          <div className="mt-10">
            <TechnicalLibrary labels={tech} />
          </div>
        </div>
      </section>

      {/* Sertifikalar + genel dökümanlar */}
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <ResourceCenter adminDocs={adminDocs} hideProductDocs />
        </div>
      </section>
    </>
  );
}
