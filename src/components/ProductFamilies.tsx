import { useTranslations } from 'next-intl';
import { Sun, Droplets, Layers, Cable, Cpu } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ProductShelf } from '@/components/ProductShelf';
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

/* Aile başına raf vurgu rengi — mevcut Tailwind paletinden. */
const familyAccent: Record<string, string> = {
  kolektorler: '#f6bc32', // volt-500
  boylerler: '#02b7d4', // aqua-500
  sehpalar: '#2da8ff', // spark-500
  baglanti: '#10b981', // emerald-500
  otomasyon: '#3a4d97', // graphite-500
};

export function ProductFamilies() {
  const t = useTranslations('catalog');
  const families = t.raw('families') as CatalogFamily[];

  return (
    <div>
      {/* Kategori hızlı erişim çubuğu */}
      <div className="sticky top-20 z-30 -mx-4 mb-14 border-y border-mist-900/10 bg-mist-50/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-full sm:border sm:px-3">
        <nav className="scroll-fade-x flex items-center gap-1.5 overflow-x-auto sm:justify-center">
          {families.map((family) => {
            const Icon = familyIcon[family.id] ?? Sun;
            const count = family.groups.reduce((sum, g) => sum + g.items.length, 0);
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

      <div className="space-y-20">
      {families.map((family) => {
        const Icon = familyIcon[family.id] ?? Sun;
        const accent = familyAccent[family.id] ?? '#f6bc32';
        const count = family.groups.reduce((sum, g) => sum + g.items.length, 0);
        return (
          <section key={family.id} id={family.id} className="scroll-mt-40">
            <Reveal>
              <div className="flex items-start gap-5 border-s-4 ps-5" style={{ borderColor: accent }}>
                <span
                  className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${accent}1a`, color: accent }}
                >
                  <Icon size={27} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: accent }}>
                    {count} {t('seriesLabel')}
                  </p>
                  <h2 className="mt-1 font-display type-h1 font-bold tracking-tight text-graphite-950">
                    {family.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist-700 sm:text-base">
                    {family.desc}
                  </p>
                </div>
              </div>
            </Reveal>

            {family.groups.map((group, gi) => {
              const images = catalogImages[`${family.id}-${gi}`] ?? [];
              const shelfItems = group.items.map((item, ii) => ({
                name: item.name,
                note: item.note,
                isNew: item.new,
                image: images[ii] ?? null,
              }));
              return (
                <div key={group.title ?? gi} className="mt-8">
                  {group.title && (
                    <Reveal>
                      <h3 className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-700">
                        <span className="h-px w-6 bg-volt-500" aria-hidden />
                        {group.title}
                      </h3>
                    </Reveal>
                  )}
                  <Reveal delay={0.05} className={group.title ? 'mt-5 block' : 'block'}>
                    <ProductShelf
                      items={shelfItems}
                      accent={accent}
                      fallbackIcon={<Icon size={56} strokeWidth={1.25} className="text-white/25" />}
                      groupLabel={group.title ?? family.title}
                      detailSoonLabel={t('detailSoon')}
                      newLabel={t('newBadge')}
                    />
                  </Reveal>
                </div>
              );
            })}
          </section>
        );
      })}
      </div>
    </div>
  );
}
