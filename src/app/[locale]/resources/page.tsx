import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/PageHero';
import { ResourceCenter } from '@/components/ResourceCenter';
import { PageBreadcrumb } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { getContent } from '@/lib/content';
import type { Locale } from '@/i18n/config';

// ISR: statik olarak servis edilir, saatte bir yeniden üretilir. Admin kaydında
// api/admin/content revalidatePath ile anında tazelenir → Function Invocation ~sıfır.
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

export default async function ResourcesPage() {
  const t = await getTranslations('resources.hero');
  const adminDocs = getContent().documents;

  return (
    <>
      <PageBreadcrumb items={[{ name: 'Teknik Kaynaklar', path: '/resources' }]} />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <ResourceCenter adminDocs={adminDocs} />
        </div>
      </section>
    </>
  );
}
