'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Plus, X } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

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
  groups: CatalogGroup[];
}

interface Row {
  id: string;
  name: string;
  note: string;
  groupTitle?: string;
  isNew: boolean;
}

const MAX = 3;

function parseCollector(note: string) {
  const [boru = '', absorber = ''] = note.split('+').map((s) => s.trim());
  return {
    boru: boru.replace(/\s*Boru$/i, '').trim() || '—',
    absorber: absorber.replace(/\s*Absorber$/i, '').trim() || '—',
    selektif: /selektif/i.test(absorber),
  };
}

export function ProductCompare() {
  const tc = useTranslations('catalog');
  const families = tc.raw('families') as CatalogFamily[];

  const [familyId, setFamilyId] = useState(families[0]?.id ?? 'kolektorler');
  const [groupIdx, setGroupIdx] = useState<number | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const family = families.find((f) => f.id === familyId) ?? families[0];
  const hasGroups = family.groups.length > 1;

  const pool: Row[] = useMemo(() => {
    const out: Row[] = [];
    family.groups.forEach((g, gi) => {
      if (groupIdx !== null && gi !== groupIdx) return;
      g.items.forEach((it, ii) => {
        out.push({ id: `${gi}-${ii}`, name: it.name, note: it.note ?? '', groupTitle: g.title, isNew: !!it.new });
      });
    });
    return out;
  }, [family, groupIdx]);

  function selectFamily(id: string) {
    setFamilyId(id);
    setGroupIdx(null);
    setSelected([]);
  }
  function selectGroup(idx: number | null) {
    setGroupIdx(idx);
    setSelected([]);
  }
  function toggle(id: string) {
    setSelected((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      if (cur.length >= MAX) return [...cur.slice(1), id];
      return [...cur, id];
    });
  }

  const cols = pool.filter((r) => selected.includes(r.id));
  const isCollector = family.id === 'kolektorler';

  const badge = (label: string) => (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
      <Check size={12} strokeWidth={3} /> {label}
    </span>
  );
  const dash = <span className="text-mist-400">—</span>;

  const rowDefs: { label: string; render: (r: Row) => ReactNode }[] = isCollector
    ? [
        { label: 'Boru tipi', render: (r) => <span className="text-mist-800">{parseCollector(r.note).boru}</span> },
        { label: 'Absorber tipi', render: (r) => <span className="text-mist-800">{parseCollector(r.note).absorber}</span> },
        { label: 'Selektif yüzey', render: (r) => (parseCollector(r.note).selektif ? badge('Var') : dash) },
        { label: 'Uygulama', render: () => <span className="text-mist-800">Paket & merkezi sistem</span> },
        { label: 'Yeni ürün', render: (r) => (r.isNew ? badge('Yeni') : dash) },
      ]
    : [
        ...(hasGroups
          ? [{ label: 'Tip / Grup', render: (r: Row) => <span className="text-mist-800">{r.groupTitle ?? '—'}</span> }]
          : []),
        {
          label: family.id === 'boylerler' ? 'Kapasite seçenekleri' : family.id === 'sehpalar' ? 'Malzeme / kalınlık' : 'Özellik',
          render: (r: Row) => <span className="text-mist-800">{r.note && r.note !== '-' ? r.note : '—'}</span>,
        },
        { label: 'Yeni ürün', render: (r: Row) => (r.isNew ? badge('Yeni') : dash) },
      ];

  const chip = (active: boolean) =>
    `inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
      active ? 'border-graphite-950 bg-graphite-950 text-white' : 'border-mist-900/15 bg-white text-graphite-800 hover:border-graphite-950'
    }`;
  const stageLabel = 'font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-500';

  return (
    <section className="section-pad border-t border-mist-900/10 bg-white">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
              Ürün Karşılaştırma
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-graphite-950 sm:text-3xl">
              Ürünleri yan yana karşılaştırın
            </h2>
            <p className="mt-3 text-mist-700">
              Önce ürün grubunu, ardından karşılaştırmak istediğiniz ürünleri (en fazla 3) seçin.
              Dilerseniz tip/model ile daraltarak teknik özellikleri yan yana inceleyin.
            </p>
          </div>
        </Reveal>

        {/* Aşama 1 — ürün grubu */}
        <Reveal delay={0.05}>
          <div className="mt-8">
            <p className={stageLabel}>1 · Ürün grubu</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {families.map((f) => (
                <button key={f.id} type="button" onClick={() => selectFamily(f.id)} aria-pressed={f.id === familyId} className={chip(f.id === familyId)}>
                  {f.title}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Aşama 2 — ürünler (max 3) */}
        <Reveal delay={0.07}>
          <div className="mt-6">
            <p className={stageLabel}>2 · Ürünleri seçin ({cols.length}/{MAX})</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {pool.map((r) => {
                const active = selected.includes(r.id);
                return (
                  <button key={r.id} type="button" onClick={() => toggle(r.id)} aria-pressed={active} className={chip(active)}>
                    {active ? <X size={13} /> : <Plus size={13} />}
                    {r.name}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Aşama 3 — model / tip (opsiyonel, yalnızca çok gruplu ailelerde) */}
        {hasGroups && (
          <Reveal delay={0.08}>
            <div className="mt-6">
              <p className={stageLabel}>
                3 · Model / Tip <span className="normal-case text-mist-400">(opsiyonel)</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={() => selectGroup(null)} aria-pressed={groupIdx === null} className={chip(groupIdx === null)}>
                  Tümü
                </button>
                {family.groups.map((g, gi) => (
                  <button key={gi} type="button" onClick={() => selectGroup(gi)} aria-pressed={groupIdx === gi} className={chip(groupIdx === gi)}>
                    {g.title}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Karşılaştırma tablosu */}
        <Reveal delay={0.1}>
          <div className="scroll-fade-x mt-8 overflow-x-auto">
            {cols.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-mist-900/20 py-14 text-center text-sm text-mist-500">
                Karşılaştırmak için yukarıdan en fazla {MAX} ürün seçin.
              </div>
            ) : (
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr>
                    <th className="w-44 py-4 pe-4 text-start align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                      {family.title}
                    </th>
                    {cols.map((r) => (
                      <th key={r.id} className="px-4 py-4 text-start align-bottom">
                        <span className="font-display text-base font-bold leading-snug text-graphite-950">{r.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowDefs.map((row) => (
                    <tr key={row.label} className="border-t border-mist-900/10">
                      <th className="py-4 pe-4 text-start text-sm font-semibold text-mist-600">{row.label}</th>
                      {cols.map((r) => (
                        <td key={r.id} className="px-4 py-4 text-sm">
                          {row.render(r)}
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
          <p className="mt-5 max-w-2xl text-xs leading-relaxed text-mist-500">
            Değerler bilgilendirme amaçlıdır; projeye özel teknik detaylar için teklif alın veya teknik
            föyleri inceleyin.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
