import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Sun, Droplets, Layers, Cable, Cpu } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/Reveal';
import { familyImages } from '@/data/catalogImages';

interface CatalogFamily {
  id: string;
  title: string;
  desc: string;
  groups: { items: { name: string }[] }[];
}

const familyVisual: Record<string, { icon: typeof Sun; accent: string }> = {
  kolektorler: { icon: Sun, accent: '#f6bc32' },
  boylerler: { icon: Droplets, accent: '#02b7d4' },
  sehpalar: { icon: Layers, accent: '#2da8ff' },
  baglanti: { icon: Cable, accent: '#10b981' },
  otomasyon: { icon: Cpu, accent: '#3a4d97' },
};

export function ProductPillars() {
  const t = useTranslations('productsSection');
  const tc = useTranslations('catalog');
  const families = tc.raw('families') as CatalogFamily[];
  const countOf = (f: CatalogFamily) => f.groups.reduce((s, g) => s + g.items.length, 0);

  return (
    <section id="urunler" className="section-pad scroll-mt-20 bg-mist-50">
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

        {/* Akademi kart mantığı — tek satır: grup başına tek görsel + ikon + açıklama */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {families.map((family, i) => {
            const visual = familyVisual[family.id] ?? familyVisual.kolektorler;
            const Icon = visual.icon;
            const image = familyImages[family.id];
            return (
              <Reveal key={family.id} delay={i * 0.07}>
                <Link
                  href={`/products#${family.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist-900/10 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-volt-500/40 hover:shadow-card"
                >
                  {/* Görsel */}
                  <div className="relative aspect-square overflow-hidden bg-mist-100">
                    {image && (
                      <Image
                        src={image}
                        alt={`${family.title} — Şimşek Solar`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/45 via-transparent to-transparent" aria-hidden />
                    <span
                      className="absolute -bottom-5 start-4 flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg ring-4 ring-white"
                      style={{ backgroundColor: visual.accent }}
                    >
                      <Icon size={20} strokeWidth={1.85} />
                    </span>
                    <span className="absolute end-3 top-3 rounded-full bg-white/95 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-graphite-900 backdrop-blur-sm">
                      {countOf(family)} {tc('seriesLabel')}
                    </span>
                  </div>

                  {/* İçerik */}
                  <div className="flex flex-1 flex-col p-5 pt-8">
                    <h3 className="font-display text-base font-bold leading-snug text-graphite-950 transition-colors group-hover:text-volt-700">
                      {family.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-mist-700">{family.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-graphite-950 transition-colors group-hover:text-volt-700">
                      İncele
                      <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Tüm ürünler */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-graphite-950 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-graphite-800"
            >
              {t('viewAll')}
              <ArrowRight size={15} className="rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
