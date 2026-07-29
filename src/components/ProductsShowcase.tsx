import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Sun, Droplets, Layers, Cable, Cpu, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { catalogImages } from '@/data/catalogImages';

interface CatalogItem {
  name: string;
  note?: string;
  new?: boolean;
}
interface CatalogGroup {
  title?: string;
  items: CatalogItem[];
}
interface CatalogFamily {
  id: string;
  title: string;
  desc: string;
  groups: CatalogGroup[];
}

const familyIcon: Record<string, typeof Sun> = {
  kolektorler: Sun,
  boylerler: Droplets,
  sehpalar: Layers,
  baglanti: Cable,
  otomasyon: Cpu,
};
const familyAccent: Record<string, string> = {
  kolektorler: '#f6bc32',
  boylerler: '#02b7d4',
  sehpalar: '#2da8ff',
  baglanti: '#10b981',
  otomasyon: '#3a4d97',
};

interface Shot {
  name: string;
  note?: string;
  image: string;
  isNew?: boolean;
}

/* Aile içindeki tüm görselli ürünleri toplar (grup sırasına göre). */
function familyShots(family: CatalogFamily): Shot[] {
  const shots: Shot[] = [];
  family.groups.forEach((group, gi) => {
    const images = catalogImages[`${family.id}-${gi}`] ?? [];
    group.items.forEach((item, ii) => {
      const image = images[ii];
      if (image) shots.push({ name: item.name, note: item.note, image, isNew: item.new });
    });
  });
  return shots;
}

export function ProductsShowcase() {
  const t = useTranslations('catalog');
  const families = t.raw('families') as CatalogFamily[];

  return (
    <div>
      {/* Kategori hızlı erişim çubuğu */}
      <div className="sticky top-20 z-30 -mx-4 border-y border-mist-900/10 bg-mist-50/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-full sm:border sm:px-3">
        <nav className="scroll-fade-x flex items-center gap-1.5 overflow-x-auto sm:justify-center">
          {families.map((family) => {
            const Icon = familyIcon[family.id] ?? Sun;
            const count = family.groups.reduce((s, g) => s + g.items.length, 0);
            return (
              <a
                key={family.id}
                href={`#${family.id}`}
                className="group flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-mist-700 transition-colors hover:bg-white hover:text-graphite-950"
              >
                <Icon size={16} strokeWidth={1.9} className="text-volt-600" />
                {family.title}
                <span className="rounded-full bg-mist-900/8 px-1.5 py-0.5 font-mono text-[10px] text-mist-600">
                  {count}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      <div className="mt-16 space-y-24">
        {families.map((family, fi) => {
          const Icon = familyIcon[family.id] ?? Sun;
          const accent = familyAccent[family.id] ?? '#f6bc32';
          const count = family.groups.reduce((s, g) => s + g.items.length, 0);
          const shots = familyShots(family);
          const [featured, ...rest] = shots;
          const reversed = fi % 2 === 1;

          return (
            <section key={family.id} id={family.id} className="scroll-mt-40">
              {/* Aile başlığı + öne çıkan görsel (alternatif düzen) */}
              <div className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <Reveal>
                  <div className="border-s-4 ps-6" style={{ borderColor: accent }}>
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: `${accent}1a`, color: accent }}
                      >
                        <Icon size={24} strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: accent }}>
                        {count} {t('seriesLabel')}
                      </span>
                    </div>
                    <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl lg:text-5xl">
                      {family.title}
                    </h2>
                    <p className="mt-4 max-w-md leading-relaxed text-mist-700">{family.desc}</p>
                  </div>
                </Reveal>

                {featured && (
                  <Reveal delay={0.1}>
                    <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-mist-100 shadow-card">
                      <Image
                        src={featured.image}
                        alt={`${featured.name} — Şimşek Solar`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/55 via-transparent to-transparent" aria-hidden />
                      <div className="absolute bottom-4 start-5">
                        <p className="font-display text-lg font-bold text-white">{featured.name}</p>
                        {featured.note && <p className="mt-0.5 text-xs text-white/80">{featured.note}</p>}
                      </div>
                    </div>
                  </Reveal>
                )}
              </div>

              {/* Ürün fotoğraf galerisi */}
              {rest.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {rest.map((shot, i) => (
                    <Reveal key={`${shot.name}-${i}`} delay={Math.min(i * 0.05, 0.3)}>
                      <figure className="group relative aspect-square overflow-hidden rounded-2xl border border-mist-900/10 bg-mist-50">
                        <Image
                          src={shot.image}
                          alt={`${shot.name} — Şimşek Solar`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {shot.isNew && (
                          <span className="absolute end-2.5 top-2.5 rounded-full bg-volt-500 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-graphite-950">
                            {t('newBadge').split('·')[0].trim()}
                          </span>
                        )}
                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite-950/80 to-transparent p-3">
                          <p className="text-xs font-semibold leading-tight text-white">{shot.name}</p>
                        </figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              )}

              {/* Tam liste (görselsiz kalanlar dahil) satır olarak */}
              <Reveal delay={0.05}>
                <details className="group mt-6 rounded-2xl border border-mist-900/10 bg-mist-50">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold text-graphite-950">
                    <span>{family.title} — tüm seriler ve modeller</span>
                    <ArrowUpRight size={16} className="text-mist-500 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="border-t border-mist-900/10 px-6 py-5">
                    {family.groups.map((group, gi) => (
                      <div key={group.title ?? gi} className={gi > 0 ? 'mt-5' : ''}>
                        {group.title && (
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-volt-700">
                            {group.title}
                          </p>
                        )}
                        <ul className="mt-2 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                          {group.items.map((item) => (
                            <li key={item.name} className="flex items-baseline justify-between gap-3 border-b border-mist-900/5 py-1.5 text-sm">
                              <span className="font-medium text-graphite-900">{item.name}</span>
                              {item.note && <span className="shrink-0 text-xs text-mist-500">{item.note}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              </Reveal>
            </section>
          );
        })}
      </div>
    </div>
  );
}
