import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Sun, Droplets, Package as PackageIcon, Cpu, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { products, getProduct } from '@/data/products';
import { locales, type Locale } from '@/i18n/config';
import { Reveal } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { ProductTabs } from '@/components/ProductTabs';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { pageMetadata, SITE_URL } from '@/lib/seo';

const categoryIcon = {
  collector: Sun,
  boiler: Droplets,
  package: PackageIcon,
  smart: Cpu,
};

export function generateStaticParams() {
  return locales.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const t = await getTranslations({ locale, namespace: 'products' });
  return pageMetadata({
    locale,
    path: `/products/${slug}`,
    title: t(`items.${slug}.name`),
    description: t(`items.${slug}.description`),
    images: [`/products/${slug}.jpg`],
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const t = await getTranslations('products');
  const Icon = categoryIcon[product.category];
  const related = products.filter((p) => p.slug !== slug && p.category === product.category).slice(0, 3);
  const relatedFallback = related.length > 0 ? related : products.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <ProductJsonLd
        locale={locale}
        slug={slug}
        name={t(`items.${slug}.name`)}
        description={t(`items.${slug}.description`)}
        category={t(`categoryLabels.${product.category}`)}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Ana Sayfa', url: `${SITE_URL}/${locale}` },
          { name: t('hero.title'), url: `${SITE_URL}/${locale}/products` },
          { name: t(`items.${slug}.name`), url: `${SITE_URL}/${locale}/products/${slug}` },
        ]}
      />
      <section className={`relative overflow-hidden bg-gradient-to-br ${product.gradient} py-24 text-white sm:py-32`}>
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 75% 20%, white, transparent 55%)' }} />
        <div className="container-page relative">
          <Link href="/products" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white">
            <ArrowLeft size={15} className="rtl:rotate-180" />
            {t('backToProducts')}
          </Link>
          <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                {t(`categoryLabels.${product.category}`)} · {product.model}
              </span>
              <h1 className="mt-5 max-w-xl text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {t(`items.${slug}.name`)}
              </h1>
              <p className="mt-4 max-w-lg text-balance text-white/85">{t(`items.${slug}.tagline`)}</p>
            </div>
            <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm sm:h-32 sm:w-32">
              <Icon size={56} strokeWidth={1.25} />
            </span>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <ProductTabs slug={slug} />
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-graphite-950">{t('relatedTitle')}</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedFallback.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
