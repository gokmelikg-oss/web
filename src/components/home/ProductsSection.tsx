import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Sun, Droplets, Layers, Cable, Cpu } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/Reveal';

interface CatalogFamily {
  id: string;
  title: string;
  desc: string;
  groups: { items: { name: string }[] }[];
}

const familyVisual: Record<string, { icon: typeof Sun; image: string; accent: string }> = {
  kolektorler: { icon: Sun, image: '/products/orion-300.jpg', accent: '#f6bc32' },
  boylerler: { icon: Droplets, image: '/products/aquarious-540.jpg', accent: '#02b7d4' },
  sehpalar: { icon: Layers, image: '/products/sehpa-merkezi-3lu.jpg', accent: '#2da8ff' },
  baglanti: { icon: Cable, image: '/products/solar-vana.jpg', accent: '#10b981' },
  otomasyon: { icon: Cpu, image: '/products/merkezi-sistem-saha.jpg', accent: '#3a4d97' },
};

export function ProductsSection() {
  const t = useTranslations('productsSection');
  const tCatalog = useTranslations('catalog');
  const families = tCatalog.raw('families') as CatalogFamily[];
  const countOf = (f: CatalogFamily) => f.groups.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <section id="urunler" className="section-pad scroll-mt-20 bg-white">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                {t('eyebrow')}
              </p>
              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                {t('title')}
              </h2>
              <p className="mt-4 max-w-lg text-mist-700">{t('subtitle')}</p>
            </div>
            <Link
              href="/products"
              className="group hidden shrink-0 items-center gap-2 rounded-full border border-graphite-950/15 px-5 py-2.5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white sm:flex"
            >
              {t('viewAll')}
              <ArrowRight size={15} className="rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>

        {/* Açık, katalog düzeni: görsel üstte, bilgi altta — 5 ana grup */}
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3 xl:grid-cols-5">
          {families.map((family, i) => {
            const visual = familyVisual[family.id] ?? familyVisual.kolektorler;
            const Icon = visual.icon;
            return (
              <Reveal key={family.id} delay={i * 0.06}>
                <Link href={`/products#${family.id}`} className="group flex h-full flex-col">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-mist-50">
                    <Image
                      src={visual.image}
                      alt={family.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <span
                      className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                      style={{ backgroundColor: visual.accent }}
                      aria-hidden
                    />
                  </div>

                  <div className="mt-4 flex flex-1 flex-col">
                    <div className="flex items-center gap-2">
                      <Icon size={15} strokeWidth={2} style={{ color: visual.accent }} />
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                        {countOf(family)} {tCatalog('seriesLabel')}
                      </p>
                    </div>
                    <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-graphite-950 transition-colors group-hover:text-volt-700">
                      {family.title}
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-mist-600 transition-colors group-hover:text-graphite-950">
                      İncele
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <Link
            href="/products"
            className="group mt-10 flex items-center justify-center gap-2 rounded-full border border-graphite-950/15 px-5 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white sm:hidden"
          >
            {t('viewAll')}
            <ArrowRight size={15} className="rtl:rotate-180" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
