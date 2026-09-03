'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Plus, X } from 'lucide-react';
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

interface Series {
  name: string;
  boru: string;
  absorber: string;
  selektif: boolean;
  isNew: boolean;
}

function parse(item: CatalogItem): Series {
  const [boru = '', absorber = ''] = (item.note ?? '').split('+').map((s) => s.trim());
  return {
    name: item.name.replace(/\s*Serisi$/i, ''),
    boru: boru.replace(/\s*Boru$/i, '').trim() || '—',
    absorber: absorber.replace(/\s*Absorber$/i, '').trim() || '—',
    selektif: /selektif/i.test(absorber),
    isNew: !!item.new,
  };
}

const MAX = 4;

export function CollectorMatrix() {
  const t = useTranslations('catalog');
  const tp = useTranslations('collectorMatrix');
  const families = t.raw('families') as CatalogFamily[];
  const allSeries = (families.find((f) => f.id === 'kolektorler')?.groups[0]?.items ?? []).map(parse);

  const [selected, setSelected] = useState<string[]>(allSeries.slice(0, 3).map((s) => s.name));

  function toggle(name: string) {
    setSelected((cur) => {
      if (cur.includes(name)) return cur.filter((n) => n !== name);
      if (cur.length >= MAX) return [...cur.slice(1), name];
      return [...cur, name];
    });
  }

  const cols = allSeries.filter((s) => selected.includes(s.name));

  const rows: { label: string; render: (s: Series) => React.ReactNode }[] = [
    { label: tp('col.pipe'), render: (s) => <span className="text-mist-800">{s.boru}</span> },
    { label: tp('col.absorber'), render: (s) => <span className="text-mist-800">{s.absorber}</span> },
    {
      label: tp('col.selective'),
      render: (s) =>
        s.selektif ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <Check size={12} strokeWidth={3} />
            {tp('yes')}
          </span>
        ) : (
          <span className="text-mist-400">—</span>
        ),
    },
    {
      label: tp('new'),
      render: (s) =>
        s.isNew ? (
          <span className="rounded-full bg-volt-100 px-2.5 py-1 text-xs font-semibold text-volt-700">
            {tp('yes')}
          </span>
        ) : (
          <span className="text-mist-400">—</span>
        ),
    },
  ];

  return (
    <section className="section-pad border-t border-mist-900/10 bg-white">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
              {tp('eyebrow')}
            </p>
            <h2 className="mt-3 font-display type-h2-sm font-bold tracking-tight text-graphite-950">
              {tp('title')}
            </h2>
            <p className="mt-3 text-mist-700">{tp('subtitle')}</p>
          </div>
        </Reveal>

        {/* Seri seçici */}
        <Reveal delay={0.05}>
          <div className="mt-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-500">
              {tp('pick')} ({cols.length}/{MAX})
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {allSeries.map((s) => {
                const active = selected.includes(s.name);
                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => toggle(s.name)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? 'border-graphite-950 bg-graphite-950 text-white'
                        : 'border-mist-900/15 bg-white text-graphite-800 hover:border-graphite-950'
                    }`}
                  >
                    {active ? <X size={13} /> : <Plus size={13} />}
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Karşılaştırma tablosu */}
        <Reveal delay={0.1}>
          <div className="scroll-fade-x mt-8 overflow-x-auto">
            {cols.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-mist-900/20 py-14 text-center text-sm text-mist-500">
                {tp('empty')}
              </div>
            ) : (
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr>
                    <th className="w-40 py-4 pe-4 text-start align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                      {tp('col.series')}
                    </th>
                    {cols.map((s) => (
                      <th key={s.name} className="px-4 py-4 text-start align-bottom">
                        <span className="font-display text-lg font-bold text-graphite-950">{s.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-t border-mist-900/10">
                      <th className="py-4 pe-4 text-start text-sm font-semibold text-mist-600">{row.label}</th>
                      {cols.map((s) => (
                        <td key={s.name} className="px-4 py-4 text-sm">
                          {row.render(s)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-xs leading-relaxed text-mist-500">{tp('note')}</p>
        </Reveal>
      </div>
    </section>
  );
}
