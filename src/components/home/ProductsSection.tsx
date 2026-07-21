import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Sun, Droplets, Layers, Cpu } from 'lucide-react';
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
  otomasyon: { icon: Cpu, image: '/products/solar-vana.jpg' },
};

export function ProductsSection() {
  const t = useTranslations('productsSection');
  const tCatalog = useTranslations('catalog');
  const families = tCatalog.raw('families') as CatalogFamily[];
  const countOf = (f: CatalogFamily) => f.groups.reduce((sum, g) => sum + g.items.length, 0);

  const [featured, ...rest] = families;
  const featuredVisual = familyVisual[featured.id] ?? familyVisual.kolektorler;
  const FeaturedIcon = featuredVisual.icon;

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

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* Öne çıkan aile — büyük görsel kart */}
          <Reveal>
            <Link
              href={`/products#${featured.id}`}
              className="group relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl bg-graphite-950"
            >
              <Image
                src={featuredVisual.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/40 to-transparent" aria-hidden />
              <span className="absolute start-6 top-6 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-graphite-950 backdrop-blur-sm">
                <FeaturedIcon size={14} className="text-volt-600" strokeWidth={2} />
                Öne çıkan aile
              </span>
              <div className="relative p-7 text-white sm:p-9">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-volt-400">
                  {countOf(featured)} {tCatalog('seriesLabel')}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{featured.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-graphite-200">{featured.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-volt-400">
                  {t('viewAll')}
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Diğer aileler — yatay liste kartları */}
          <div className="flex flex-col gap-6">
            {rest.map((family, i) => {
              const visual = familyVisual[family.id] ?? familyVisual.kolektorler;
              const Icon = visual.icon;
              return (
                <Reveal key={family.id} delay={i * 0.08} className="flex-1">
                  <Link
                    href={`/products#${family.id}`}
                    className="group flex h-full items-stretch gap-5 overflow-hidden rounded-2xl border border-mist-900/10 bg-mist-50 p-3 transition-all hover:-translate-y-0.5 hover:border-volt-500/40 hover:bg-white hover:shadow-card"
                  >
                    <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl bg-mist-50 sm:w-32">
                      <Image
                        src={visual.image}
                        alt={family.title}
                        fill
                        sizes="128px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex min-w-0 flex-col justify-center py-1 pe-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-volt-100 text-volt-700">
                          <Icon size={15} strokeWidth={1.75} />
                        </span>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                          {countOf(family)} {tCatalog('seriesLabel')}
                        </p>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-bold text-graphite-950 transition-colors group-hover:text-volt-700">
                        {family.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-snug text-mist-700">{family.desc}</p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="mt-3 me-2 shrink-0 self-start text-mist-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-volt-600"
                    />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
