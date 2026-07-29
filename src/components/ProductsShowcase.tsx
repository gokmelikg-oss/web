import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Sun, Droplets, Layers, Cable, Cpu } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { familyImages } from '@/data/catalogImages';

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

export function ProductsShowcase() {
  const t = useTranslations('catalog');
  const families = t.raw('families') as CatalogFamily[];

  return (
    <div>
      {/* Kategori hızlı erişim çubuğu */}
      <div className="sticky top-20 z-30 -mx-4 border-y border-mist-900/10 bg-white/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-full sm:border sm:px-3">
        <nav className="scroll-fade-x flex items-center gap-1.5 overflow-x-auto sm:justify-center">
          {families.map((family) => {
            const Icon = familyIcon[family.id] ?? Sun;
            const count = family.groups.reduce((s, g) => s + g.items.length, 0);
            return (
              <a
                key={family.id}
                href={`#${family.id}`}
                className="group flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-mist-700 transition-colors hover:bg-mist-50 hover:text-graphite-950"
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

      <div className="mt-16 space-y-20">
        {families.map((family, fi) => {
          const Icon = familyIcon[family.id] ?? Sun;
          const accent = familyAccent[family.id] ?? '#f6bc32';
          const count = family.groups.reduce((s, g) => s + g.items.length, 0);
          const image = familyImages[family.id];
          const reversed = fi % 2 === 1;

          return (
            <section
              key={family.id}
              id={family.id}
              className="scroll-mt-40 overflow-hidden rounded-3xl border border-mist-900/10 bg-white shadow-sm"
            >
              <div className={`grid lg:grid-cols-2 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                {/* Grup görseli — grup başına tek temsili görsel */}
                <div className="relative min-h-[16rem] bg-mist-100 lg:min-h-[24rem]">
                  {image && (
                    <Image
                      src={image}
                      alt={`${family.title} — Şimşek Solar`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  )}
                  <span
                    className="absolute start-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{ backgroundColor: accent }}
                  >
                    <Icon size={22} strokeWidth={1.85} />
                  </span>
                </div>

                {/* İçerik + model listesi */}
                <div className="p-7 sm:p-10">
                  <Reveal>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: accent }}>
                      {count} {t('seriesLabel')}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-graphite-950 sm:text-3xl">
                      {family.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-mist-700">{family.desc}</p>
                  </Reveal>

                  <Reveal delay={0.05}>
                    <div className="mt-6 space-y-5">
                      {family.groups.map((group, gi) => (
                        <div key={group.title ?? gi}>
                          {group.title && (
                            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-volt-700">
                              {group.title}
                            </p>
                          )}
                          <ul className={group.title ? 'mt-2' : ''}>
                            {group.items.map((item) => (
                              <li
                                key={item.name}
                                className="flex items-baseline justify-between gap-3 border-b border-mist-900/8 py-2 text-sm last:border-0"
                              >
                                <span className="flex items-center gap-2 font-medium text-graphite-900">
                                  {item.name}
                                  {item.new && (
                                    <span className="rounded-full bg-volt-100 px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wide text-volt-700">
                                      {t('newBadge').split('·')[0].trim()}
                                    </span>
                                  )}
                                </span>
                                {item.note && <span className="shrink-0 text-xs text-mist-500">{item.note}</span>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
