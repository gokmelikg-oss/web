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

        {/* Akademi kart mantığı — grup başına tek görsel + ikon + açıklama */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {families.map((family, i) => {
            const visual = familyVisual[family.id] ?? familyVisual.kolektorler;
            const Icon = visual.icon;
            const image = familyImages[family.id];
            return (
              <Reveal key={family.id} delay={i * 0.07}>
                <Link
                  href={`/products#${family.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-mist-900/10 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-volt-500/40 hover:shadow-card"
                >
                  {/* Görsel */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-mist-100">
                    {image && (
                      <Image
                        src={image}
                        alt={`${family.title} — Şimşek Solar`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/45 via-transparent to-transparent" aria-hidden />
                    {/* Renkli ikon rozeti */}
                    <span
                      className="absolute -bottom-6 start-6 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg ring-4 ring-white"
                      style={{ backgroundColor: visual.accent }}
                    >
                      <Icon size={22} strokeWidth={1.85} />
                    </span>
                    {/* Seri sayısı rozeti */}
                    <span className="absolute end-4 top-4 rounded-full bg-white/95 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-graphite-900 backdrop-blur-sm">
                      {countOf(family)} {tc('seriesLabel')}
                    </span>
                  </div>

                  {/* İçerik */}
                  <div className="flex flex-1 flex-col p-6 pt-9">
                    <h3 className="font-display text-xl font-bold text-graphite-950 transition-colors group-hover:text-volt-700">
                      {family.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-mist-700">{family.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-graphite-950 transition-colors group-hover:text-volt-700">
                      İncele
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}

          {/* Tüm ürünler kartı (6. hücre) */}
          <Reveal delay={0.35}>
            <Link
              href="/products"
              className="group flex h-full min-h-[16rem] flex-col justify-center rounded-3xl border border-dashed border-graphite-950/20 bg-white p-8 text-center transition-all hover:-translate-y-1.5 hover:border-graphite-950 hover:bg-graphite-950 hover:text-white"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-graphite-950 text-white transition-colors group-hover:bg-white group-hover:text-graphite-950">
                <ArrowUpRight size={26} />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">{t('viewAll')}</h3>
              <p className="mt-2 text-sm text-mist-600 group-hover:text-graphite-300">
                Tüm seriler, teknik özellikler ve karşılaştırma tablosu.
              </p>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
