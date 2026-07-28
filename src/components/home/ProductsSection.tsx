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

        {/* Editoryal katalog dizini: numaralı, tam genişlik satırlar */}
        <div className="mt-12 border-t border-mist-900/10">
          {families.map((family, i) => {
            const visual = familyVisual[family.id] ?? familyVisual.kolektorler;
            const Icon = visual.icon;
            return (
              <Reveal key={family.id} delay={i * 0.05}>
                <Link
                  href={`/products#${family.id}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-mist-900/10 py-6 transition-colors hover:bg-mist-50 sm:gap-8 sm:py-7"
                >
                  {/* Numara + ikon */}
                  <div className="flex items-center gap-4 ps-1 sm:ps-3">
                    <span className="font-tabular font-mono text-sm font-bold text-mist-400">
                      0{i + 1}
                    </span>
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors sm:h-12 sm:w-12"
                      style={{ backgroundColor: `${visual.accent}1a`, color: visual.accent }}
                    >
                      <Icon size={21} strokeWidth={1.8} />
                    </span>
                  </div>

                  {/* Başlık + açıklama */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-xl font-bold text-graphite-950 transition-colors group-hover:text-volt-700 sm:text-2xl">
                        {family.title}
                      </h3>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                        {countOf(family)} {tCatalog('seriesLabel')}
                      </span>
                    </div>
                    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-mist-700">{family.desc}</p>
                  </div>

                  {/* Küçük görsel + ok */}
                  <div className="flex items-center gap-4 pe-1 sm:pe-2">
                    <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-mist-100 md:block lg:h-[4.5rem] lg:w-32">
                      <Image
                        src={visual.image}
                        alt={`${family.title} — Şimşek Solar güneş enerjisi ürün ailesi`}
                        fill
                        sizes="128px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-mist-900/12 text-mist-500 transition-all group-hover:border-volt-500 group-hover:bg-volt-500 group-hover:text-graphite-950">
                      <ArrowUpRight size={16} />
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
