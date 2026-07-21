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

const familyVisual: Record<string, { icon: typeof Sun; image: string }> = {
  kolektorler: { icon: Sun, image: '/products/orion-300.jpg' },
  boylerler: { icon: Droplets, image: '/products/aquarious-540.jpg' },
  sehpalar: { icon: Layers, image: '/products/sehpa-merkezi-3lu.jpg' },
  baglanti: { icon: Cable, image: '/products/solar-vana.jpg' },
  otomasyon: { icon: Cpu, image: '/products/merkezi-sistem-saha.jpg' },
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

        {/* Bento: ilk iki aile geniş, kalan üçü kompakt — 5 ana grup */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {families.map((family, i) => {
            const visual = familyVisual[family.id] ?? familyVisual.kolektorler;
            const Icon = visual.icon;
            const featured = i < 2;
            return (
              <Reveal
                key={family.id}
                delay={i * 0.06}
                className={featured ? 'lg:col-span-3' : 'lg:col-span-2'}
              >
                <Link
                  href={`/products#${family.id}`}
                  className={`group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl bg-graphite-950 ${
                    featured ? 'min-h-[20rem]' : 'min-h-[15rem]'
                  }`}
                >
                  <Image
                    src={visual.image}
                    alt={family.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/35 to-transparent" aria-hidden />
                  <span className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-volt-700 backdrop-blur-sm">
                    <Icon size={17} strokeWidth={1.9} />
                  </span>
                  <div className="relative p-6">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-volt-400">
                      {countOf(family)} {tCatalog('seriesLabel')}
                    </p>
                    <h3 className={`mt-1.5 font-display font-bold text-white ${featured ? 'text-2xl' : 'text-xl'}`}>
                      {family.title}
                    </h3>
                    {featured && (
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-graphite-200">{family.desc}</p>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-volt-400">
                      İncele
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
            className="group mt-8 flex items-center justify-center gap-2 rounded-full border border-graphite-950/15 px-5 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white sm:hidden"
          >
            {t('viewAll')}
            <ArrowRight size={15} className="rtl:rotate-180" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
