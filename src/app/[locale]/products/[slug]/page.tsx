import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  Sun,
  Droplets,
  Package as PackageIcon,
  Cpu,
  ArrowLeft,
  ArrowUpRight,
  Check,
  FileText,
  Calculator,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { products, getProduct, productImages } from '@/data/products';
import { BLUR_DATA } from '@/lib/blur';
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

/* Kategoriye göre tipik uygulama alanları — sektör bazlı bağlam + arama terimi. */
const APPLICATIONS: Record<string, string[]> = {
  collector: ['Konut', 'Toplu konut & TOKİ', 'Otel & turizm', 'Yurt & kampüs', 'Hastane', 'Endüstriyel tesis'],
  boiler: ['Konut', 'Toplu konut', 'Otel', 'Merkezi sistemler'],
  package: ['Müstakil konut', 'Villa', 'Yazlık', 'Küçük işletme'],
  smart: ['Merkezi sistemler', 'Toplu konut', 'Kamu & tesis projeleri'],
};

/* Öne çıkarılacak ana teknik değerler (kategoriye göre en anlamlı 3 spec). */
const HERO_SPEC_KEYS: Record<string, string[]> = {
  collector: ['absorberArea', 'efficiency', 'coating'],
  boiler: ['capacity', 'tankMaterial', 'coil'],
  package: ['boilerCapacity', 'collectorArea', 'warranty'],
  smart: ['connectivity', 'sensors', 'protocol'],
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
    images: productImages[slug] ? [productImages[slug]!] : undefined,
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
  const image = productImages[slug];
  const features = t.raw(`items.${slug}.features`) as string[];

  const heroSpecs = (HERO_SPEC_KEYS[product.category] ?? [])
    .map((key) => product.specs.find((s) => s.key === key))
    .filter(Boolean)
    .slice(0, 3) as { key: string; value: string }[];

  const applications = APPLICATIONS[product.category] ?? [];
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
        model={product.model}
        /* SKU olarak ürün slug'ı kullanılır — kararlı ve benzersizdir.
           Gerçek stok kodları products.ts'e eklenirse buraya bağlanmalı.
           GTIN bilinmediği için HİÇ gönderilmiyor. */
        sku={slug}
        specs={product.specs.map((s) => ({ label: t(`specsLabels.${s.key}`), value: s.value }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Ana Sayfa', url: `${SITE_URL}/${locale}` },
          { name: t('hero.title'), url: `${SITE_URL}/${locale}/products` },
          { name: t(`items.${slug}.name`), url: `${SITE_URL}/${locale}/products/${slug}` },
        ]}
      />

      {/* Premium split hero */}
      <section className="relative -mt-20 overflow-hidden bg-graphite-950 pt-20 text-white">
        <div className="pointer-events-none absolute inset-0 aurora" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-25" aria-hidden />

        <div className="container-page relative py-16 sm:py-20">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} className="rtl:rotate-180" />
            {t('backToProducts')}
          </Link>

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            {/* Metin */}
            <Reveal>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-volt-400 backdrop-blur-sm">
                  <Icon size={13} />
                  {t(`categoryLabels.${product.category}`)} · {product.model}
                </span>
                <h1 className="mt-5 text-balance font-display type-h1 font-bold leading-[1.08] tracking-tight">
                  {t(`items.${slug}.name`)}
                </h1>
                <p className="mt-4 max-w-lg text-balance leading-relaxed text-graphite-300">
                  {t(`items.${slug}.tagline`)}
                </p>

                {/* Öne çıkan teknik değerler */}
                {heroSpecs.length > 0 && (
                  <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
                    {heroSpecs.map((s) => (
                      <div key={s.key} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-volt-400">
                          {t(`specsLabels.${s.key}`)}
                        </p>
                        <p className="mt-1.5 text-sm font-bold leading-snug text-white">{s.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    /* Ürün adı teklif formuna taşınır; müşteri hangi ürün için
                       yazdığını tekrar girmek zorunda kalmaz. */
                    href={`/teklif-al?urun=${encodeURIComponent(t(`items.${slug}.name`))}`}
                    className="inline-flex items-center gap-2 rounded-full bg-solar-gradient px-7 py-3.5 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
                  >
                    {t('requestQuote')}
                    <ArrowUpRight size={16} />
                  </Link>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <Calculator size={15} />
                    Kapasite hesapla
                  </Link>
                  <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <FileText size={15} />
                    {t('downloadSheet')}
                  </Link>
                </div>

                <p className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-graphite-400">
                  <ShieldCheck size={14} className="text-volt-400" />
                  CE · TSE · Solar Keymark sertifikalı üretim
                </p>
              </div>
            </Reveal>

            {/* Görsel */}
            <Reveal delay={0.1}>
              <div className="relative">
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                  {image ? (
                    <Image
                      src={image}
                      alt={`${t(`items.${slug}.name`)} — Şimşek Solar`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA}
                      priority
                    />
                  ) : (
                    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${product.gradient}`}>
                      <div className="absolute inset-0 bg-blueprint opacity-20" aria-hidden />
                      <Icon size={110} strokeWidth={1} className="relative text-white/80" />
                    </div>
                  )}
                  <span className="absolute bottom-4 start-4 rounded-full bg-graphite-950/70 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    {product.model}
                  </span>
                </div>
                {/* Dekoratif hâle */}
                <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-volt-500/10 blur-2xl" aria-hidden />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Öne çıkan özellikler */}
      {features?.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-page">
            <Reveal>
              <h2 className="font-display type-h2-sm font-bold tracking-tight text-graphite-950">
                Öne çıkan özellikler
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((f, i) => (
                <Reveal key={f} delay={i * 0.06}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-mist-900/10 bg-mist-50 p-6 transition-colors hover:border-volt-500/40 hover:bg-white">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                      <Check size={18} strokeWidth={2.5} />
                    </span>
                    <p className="leading-relaxed text-graphite-800">{f}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Uygulama alanları */}
      {applications.length > 0 && (
        <section className="border-y border-mist-900/10 bg-white py-14">
          <div className="container-page">
            <Reveal>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
                Uygulama Alanları
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {applications.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-2 rounded-full border border-mist-900/10 bg-mist-50 px-4 py-2 text-sm font-semibold text-graphite-800"
                  >
                    <Building2 size={14} className="text-volt-600" />
                    {a}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Teknik özellikler / dökümanlar */}
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <Reveal>
            <ProductTabs slug={slug} />
          </Reveal>
        </div>
      </section>

      {/* İlgili ürünler */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-graphite-950">{t('relatedTitle')}</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
