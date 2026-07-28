import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

interface CatalogItem {
  name: string;
  note?: string;
  new?: boolean;
}
interface CatalogFamily {
  id: string;
  groups: { items: CatalogItem[] }[];
}

/* "Bakır Boru + Alüminyum Selektif Absorber" → { boru, absorber } */
function parseNote(note = '') {
  const [boru = '', absorber = ''] = note.split('+').map((s) => s.trim());
  return {
    boru: boru.replace(/\s*Boru$/i, '').trim(),
    absorber: absorber.replace(/\s*Absorber$/i, '').trim(),
    selektif: /selektif/i.test(absorber),
  };
}

/* Orion serisi seçim tablosu — boru ve absorber malzeme kombinasyonunu
   yan yana karşılaştırır. Seri sayısı arttıkça alıcı doğru modeli hızlı seçer. */
export function CollectorMatrix() {
  const t = useTranslations('catalog');
  const tp = useTranslations('collectorMatrix');
  const families = t.raw('families') as CatalogFamily[];
  const items = families.find((f) => f.id === 'kolektorler')?.groups[0]?.items ?? [];

  return (
    <section className="section-pad border-t border-mist-900/10 bg-white">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
              <span className="h-px w-8 bg-volt-500" aria-hidden />
              {tp('eyebrow')}
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-graphite-950 sm:text-3xl">
              {tp('title')}
            </h2>
            <p className="mt-3 text-mist-700">{tp('subtitle')}</p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="scroll-fade-x mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-mist-900/15 text-start">
                  <th className="py-3 pe-4 text-start font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                    {tp('col.series')}
                  </th>
                  <th className="py-3 pe-4 text-start font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                    {tp('col.pipe')}
                  </th>
                  <th className="py-3 pe-4 text-start font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                    {tp('col.absorber')}
                  </th>
                  <th className="py-3 text-start font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                    {tp('col.selective')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const p = parseNote(item.note);
                  return (
                    <tr
                      key={item.name}
                      className="border-b border-mist-900/8 transition-colors hover:bg-mist-50"
                    >
                      <td className="py-3.5 pe-4">
                        <span className="flex items-center gap-2 font-display font-bold text-graphite-950">
                          {item.name}
                          {item.new && (
                            <span className="rounded-full bg-volt-100 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-volt-700">
                              {tp('new')}
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="py-3.5 pe-4 text-mist-700">{p.boru}</td>
                      <td className="py-3.5 pe-4 text-mist-700">{p.absorber}</td>
                      <td className="py-3.5">
                        {p.selektif ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            <Check size={13} strokeWidth={2.5} />
                            {tp('yes')}
                          </span>
                        ) : (
                          <span className="text-xs text-mist-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-xs leading-relaxed text-mist-500">{tp('note')}</p>
        </Reveal>
      </div>
    </section>
  );
}
