import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/PageHero';
import { ResourceCenter } from '@/components/ResourceCenter';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources.hero' });
  return pageMetadata({ locale, path: '/resources', title: t('title'), description: t('subtitle') });
}

export default async function ResourcesPage() {
  const t = await getTranslations('resources.hero');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <ResourceCenter />
        </div>
      </section>
    </>
  );
}
