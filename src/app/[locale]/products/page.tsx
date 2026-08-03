import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/PageHero';
import { ProductsShowcase } from '@/components/ProductsShowcase';
import { CollectorMatrix } from '@/components/CollectorMatrix';
import { PageBreadcrumb } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products.hero' });
  return pageMetadata({ locale, path: '/products', title: t('title'), description: t('subtitle') });
}

export default async function ProductsPage() {
  const t = await getTranslations('products.hero');

  return (
    <>
      <PageBreadcrumb items={[{ name: 'Ürünler', path: '/products' }]} />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <section className="section-pad bg-white">
        <div className="container-page">
          <ProductsShowcase />
        </div>
      </section>
      <CollectorMatrix />
    </>
  );
}
