import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/PageHero';
import { ResourceCenter } from '@/components/ResourceCenter';

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
