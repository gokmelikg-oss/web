import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Package as PackageIcon } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { ProductsShowcase } from '@/components/ProductsShowcase';
import { ProductCompare } from '@/components/ProductCompare';
import { HowItWorks } from '@/components/HowItWorks';
import { TrustStrip } from '@/components/TrustStrip';
import { CapacityGuide } from '@/components/CapacityGuide';
import { Reveal } from '@/components/Reveal';
import { PageBreadcrumb } from '@/components/JsonLd';
import { getContent } from '@/lib/content';
import { BLUR_DATA } from '@/lib/blur';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

// Admin panelinden ürün eklenebildiği için ISR.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products.hero' });
  return pageMetadata({ locale, path: '/products', title: t('title'), description: t('subtitle') });
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations('products.hero');
  const { products } = await getContent();
  const adminProducts = products.filter((p) => p.name);

  return (
    <>
      <PageBreadcrumb items={[{ name: 'Ürünler', path: '/products' }]} />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <TrustStrip locale={locale} />
      <HowItWorks locale={locale} className="bg-mist-50" />
      <section className="section-pad bg-white">
        <div className="container-page">
          <ProductsShowcase />
        </div>
      </section>

      {adminProducts.length > 0 && (
        <section className="section-pad bg-mist-50">
          <div className="container-page">
            <Reveal>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                Öne Çıkan Ürünler
              </p>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {adminProducts.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist-900/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-card">
                    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-mist-100">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={`${p.name} — Şimşek Solar`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA}
                        />
                      ) : (
                        <PackageIcon size={48} strokeWidth={1.25} className="text-mist-400" />
                      )}
                      <span className="absolute end-4 top-4 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-graphite-900 backdrop-blur-sm">
                        {p.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {p.model && (
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-volt-700">{p.model}</p>
                      )}
                      <h3 className="mt-1.5 font-display text-lg font-bold text-graphite-950">{p.name}</h3>
                      {p.description && <p className="mt-2 text-sm leading-relaxed text-mist-700">{p.description}</p>}
                      {p.specs && p.specs.length > 0 && (
                        <dl className="mt-4 space-y-1.5 border-t border-mist-900/8 pt-3.5">
                          {p.specs.slice(0, 5).map((s, si) => (
                            <div key={si} className="flex items-baseline justify-between gap-3 text-xs">
                              <dt className="text-mist-500">{s.label}</dt>
                              <dd className="text-end font-semibold text-graphite-900">{s.value}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ProductCompare />
      <CapacityGuide locale={locale} className="bg-mist-50" />
    </>
  );
}
