'use client';

import { useMemo, useState } from 'react';
import {
  Search, MapPin, X, ChevronDown, ArrowDownWideNarrow,
  LayoutGrid, Home, Scale, Shield, LifeBuoy, ShieldCheck, Building2, Briefcase, type LucideIcon,
} from 'lucide-react';
import { computeImpact, type ReferenceProject } from '@/data/references';

const PAGE_SIZE = 24;

/* Kategori ikonları — proje tipine göre (dilden bağımsız). */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  konut: Home,
  adalet: Scale,
  savunma: Shield,
  afad: LifeBuoy,
  emniyet: ShieldCheck,
  kamu: Building2,
  ozel: Briefcase,
};

/* Kategori düğmesi — ikon + ad + sayaç.
   Dokunma hedefi en az 42px (mobilde parmakla isabet için) ve seçili durum
   hem renk hem halka ile gösterilir; yalnızca renge güvenmek renk körlüğünde
   ayırt edilemiyordu. */
function FilterPill({
  icon: Icon, label, count, active, onClick,
}: {
  icon: LucideIcon;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-[42px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all ${
        active
          ? 'border-volt-500 bg-volt-500 text-graphite-950 shadow-sm ring-2 ring-volt-500/25'
          : 'border-mist-900/12 bg-white text-graphite-800 hover:border-volt-500/50 hover:bg-volt-50/50'
      }`}
    >
      <Icon size={15} className="shrink-0" />
      {label}
      <span
        className={`rounded-full px-1.5 py-0.5 font-tabular text-[10px] font-bold ${
          active ? 'bg-graphite-950/15 text-graphite-900' : 'bg-mist-100 text-mist-600'
        }`}
      >
        {count}
      </span>
    </button>
  );
}

/* Uygulanan tek bir filtre — çarpıya basınca yalnızca o kalkar. */
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex min-h-[32px] items-center gap-1.5 rounded-full bg-graphite-950 px-3 text-xs font-semibold text-white transition-opacity hover:opacity-80"
    >
      {label}
      <X size={13} className="shrink-0" />
    </button>
  );
}

export interface ReferenceListLabels {
  searchPlaceholder: string;
  allProvinces: string; // "Tüm iller"
  allCategories: string; // "Tüm tipler"
  categoryNames: Record<string, string>; // konut/adalet/... → görünen ad
  clear: string;
  proje: string;
  konut: string;
  kollektor: string;
  isinimAlani: string;
  isinim: string;
  brut: string;
  collectorWord: string; // "kollektör"
  sortedByCollectors: string;
  noResults: string;
  noResultsHint: string;
  homesServed: string; // "{n} konutun sıcak su ihtiyacı güneş enerjisiyle karşılanıyor" — {n} önce eklenir
  institutionLine: string; // konut sayısı olmayan (kurumsal) projeler için: "{n} kollektörlü güneş enerjili sıcak su sistemi"
  blockWord: string; // "blok"
  showMore: string; // "Daha fazla göster"
  selBefore: string;
  selMiddle: string;
  selAfter: string;
  tonUnit: string; // "ton"
}

export function ReferenceList({
  projects,
  labels,
  intlLocale = 'tr-TR',
}: {
  projects: ReferenceProject[];
  labels: ReferenceListLabels;
  intlLocale?: string;
}) {
  const [query, setQuery] = useState('');
  const [province, setProvince] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const nf = useMemo(() => new Intl.NumberFormat(intlLocale), [intlLocale]);
  const nf1 = useMemo(() => new Intl.NumberFormat(intlLocale, { maximumFractionDigits: 1 }), [intlLocale]);

  /* İl özetleri — verilen projelerden hesaplanır (filtre menüsü için). */
  const provinceSummaries = useMemo(() => {
    const map = projects.reduce<Record<string, { il: string; projects: number; collectors: number }>>((acc, p) => {
      acc[p.il] ??= { il: p.il, projects: 0, collectors: 0 };
      acc[p.il].projects += 1;
      acc[p.il].collectors += p.collectors;
      return acc;
    }, {});
    return Object.values(map).sort((a, b) => b.collectors - a.collectors);
  }, [projects]);

  /* Kategori özetleri — proje tipine göre (filtre menüsü için). */
  const categorySummaries = useMemo(() => {
    const map = projects.reduce<Record<string, number>>((acc, p) => {
      const c = p.category || 'konut';
      acc[c] = (acc[c] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(map)
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count);
  }, [projects]);

  /* Liste her zaman kollektör adedine göre büyükten küçüğe sıralanır. */
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr-TR');
    return projects
      .filter((p) => {
        if (province && p.il !== province) return false;
        if (category && (p.category || 'konut') !== category) return false;
        if (!q) return true;
        return (
          p.title.toLocaleLowerCase('tr-TR').includes(q) ||
          p.il.toLocaleLowerCase('tr-TR').includes(q) ||
          p.ilce.toLocaleLowerCase('tr-TR').includes(q)
        );
      })
      .sort((a, b) => b.collectors - a.collectors);
  }, [query, province, category, projects]);

  /* Filtrelenen seçkinin toplamları — arama yapıldıkça canlı güncellenir. */
  const subtotal = useMemo(() => {
    const t = filtered.reduce(
      (acc, p) => ({
        homes: acc.homes + p.homes,
        collectors: acc.collectors + p.collectors,
        aperture: acc.aperture + p.aperture,
      }),
      { homes: 0, collectors: 0, aperture: 0 }
    );
    return { ...t, impact: computeImpact(t.aperture) };
  }, [filtered]);

  const shown = filtered.slice(0, visible);
  const hasFilter = Boolean(query || province || category);

  function reset() {
    setQuery('');
    setProvince(null);
    setCategory(null);
    setVisible(PAGE_SIZE);
  }

  return (
    <div>
      {/* Filtre çubuğu — sayfa kaydırılırken başlığın altına yapışır.
          526 kayıtlık listede aşağı inince filtreye dönmek için yukarı
          kaydırmak gerekiyordu; yapışkan çubuk bunu ortadan kaldırır.
          Header h-20 (80px) olduğu için top-20 ile onun hemen altına oturur. */}
      <div className="sticky top-20 z-20 -mx-2 rounded-2xl bg-white/85 px-2 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-mist-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-full border border-mist-900/12 bg-white py-3 pe-4 ps-11 text-sm outline-none transition-colors focus:border-volt-500"
          />
        </div>
        <div className="relative">
          <select
            value={province ?? ''}
            onChange={(e) => {
              setProvince(e.target.value || null);
              setVisible(PAGE_SIZE);
            }}
            className="w-full appearance-none rounded-full border border-mist-900/12 bg-white py-3 pe-10 ps-5 text-sm font-medium outline-none transition-colors focus:border-volt-500 sm:w-56"
          >
            <option value="">
              {labels.allProvinces} ({provinceSummaries.length})
            </option>
            {provinceSummaries.map((p) => (
              <option key={p.il} value={p.il}>
                {p.il} ({p.projects})
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-mist-400"
          />
        </div>
        {hasFilter && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-mist-900/12 px-5 py-3 text-sm font-semibold text-mist-700 transition-colors hover:border-graphite-950 hover:text-graphite-950"
          >
            <X size={14} />
            {labels.clear}
          </button>
        )}
      </div>

      {/* Kategori filtresi — mobilde satır satır sarmak yerine yatay kayar şerit.
          7-8 kategori telefonda 4 satıra yayılıp ekranı yiyordu. */}
      {categorySummaries.length > 1 && (
        <div className="-mx-2 mt-3 flex gap-2 overflow-x-auto px-2 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          <FilterPill
            icon={LayoutGrid}
            label={labels.allCategories}
            count={projects.length}
            active={category === null}
            onClick={() => { setCategory(null); setVisible(PAGE_SIZE); }}
          />
          {categorySummaries.map((c) => (
            <FilterPill
              key={c.id}
              icon={CATEGORY_ICONS[c.id] ?? Building2}
              label={labels.categoryNames[c.id] ?? c.id}
              count={c.count}
              active={category === c.id}
              onClick={() => { setCategory(category === c.id ? null : c.id); setVisible(PAGE_SIZE); }}
            />
          ))}
        </div>
      )}

      {/* Uygulanan filtreler — tek tek kaldırılabilir.
          Önceden yalnızca toplu "Temizle" vardı; kullanıcı ilden vazgeçip
          kategoriyi korumak isteyince her şeyi sıfırlamak zorunda kalıyordu. */}
      {hasFilter && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {query && (
            <FilterChip label={`“${query}”`} onRemove={() => { setQuery(''); setVisible(PAGE_SIZE); }} />
          )}
          {province && (
            <FilterChip label={province} onRemove={() => { setProvince(null); setVisible(PAGE_SIZE); }} />
          )}
          {category && (
            <FilterChip
              label={labels.categoryNames[category] ?? category}
              onRemove={() => { setCategory(null); setVisible(PAGE_SIZE); }}
            />
          )}
        </div>
      )}
      </div>

      {/* Seçkinin canlı özeti */}
      <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-mist-900/10 bg-mist-50 p-4 sm:grid-cols-4">
        {[
          { label: labels.proje, value: nf.format(filtered.length) },
          { label: labels.konut, value: nf.format(subtotal.homes) },
          { label: labels.kollektor, value: nf.format(subtotal.collectors) },
          { label: labels.isinimAlani, value: `${nf.format(Math.round(subtotal.aperture))} m²` },
        ].map((s) => (
          <div key={s.label}>
            <p className="font-tabular font-display text-xl font-bold text-graphite-950">{s.value}</p>
            <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-mist-600">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {hasFilter && filtered.length > 0 && (
        <p className="mt-3 text-sm text-mist-700">
          {labels.selBefore}{' '}
          <strong className="font-semibold text-graphite-950">
            {nf1.format(subtotal.impact.annualGwh)} GWh
          </strong>{' '}
          {labels.selMiddle}{' '}
          <strong className="font-semibold text-emerald-600">
            {nf.format(Math.round(subtotal.impact.co2TonsPerYear))} {labels.tonUnit} CO₂
          </strong>{' '}
          {labels.selAfter}
        </p>
      )}

      {/* Sıralama bilgisi */}
      {filtered.length > 0 && (
        <p className="mt-6 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
          <ArrowDownWideNarrow size={13} className="shrink-0" />
          {labels.sortedByCollectors}
        </p>
      )}

      {/* Liste */}
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-mist-900/20 py-16 text-center">
          <p className="font-display text-lg font-bold text-graphite-950">{labels.noResults}</p>
          <p className="mt-1.5 text-sm text-mist-600">{labels.noResultsHint}</p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-3 lg:grid-cols-2">
          {shown.map((p, i) => (
            <li
              key={`${p.il}-${p.ilce}-${p.title}-${i}`}
              className="group flex flex-col rounded-2xl border border-mist-900/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-volt-500/40 hover:shadow-card"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-volt-700">
                  <MapPin size={11} className="shrink-0" />
                  {p.il} · {p.ilce}
                </p>
                <span className="shrink-0 rounded-full bg-volt-100 px-2.5 py-1 font-tabular font-mono text-[10px] font-bold text-volt-800">
                  {nf.format(p.collectors)} {labels.collectorWord}
                </span>
              </div>

              <div className="mt-2.5 flex items-start gap-3">
                <span className="mt-0.5 shrink-0 font-tabular font-mono text-xs font-bold text-mist-400">
                  {nf.format(i + 1)}
                </span>
                <div className="min-w-0">
                  <h3 className="text-balance font-display text-base font-bold leading-snug text-graphite-950">
                    {p.title}
                  </h3>
                  {(labels.categoryNames[p.category || 'konut'] ?? '') && (
                    <span className="mt-1.5 inline-flex items-center rounded-full bg-graphite-950/[0.06] px-2.5 py-0.5 text-[10px] font-semibold text-graphite-700">
                      {labels.categoryNames[p.category || 'konut']}
                    </span>
                  )}
                </div>
              </div>

              <dl className={`mt-4 grid gap-3 border-t border-mist-900/8 pt-3.5 ${p.homes > 0 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {p.homes > 0 && (
                  <div>
                    <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-mist-500">{labels.konut}</dt>
                    <dd className="mt-0.5 font-tabular text-sm font-bold text-graphite-950">
                      {nf.format(p.homes)}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-mist-500">{labels.isinim}</dt>
                  <dd className="mt-0.5 font-tabular text-sm font-bold text-graphite-950">
                    {nf.format(Math.round(p.aperture))} m²
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-mist-500">{labels.brut}</dt>
                  <dd className="mt-0.5 font-tabular text-sm font-bold text-graphite-950">
                    {nf.format(Math.round(p.gross))} m²
                  </dd>
                </div>
              </dl>

              <p className="mt-3 text-xs leading-relaxed text-mist-600">
                {p.homes > 0 ? (
                  <>
                    {nf.format(p.homes)} {labels.homesServed}
                    {p.blocks > 0 && ` · ${nf.format(p.blocks)} ${labels.blockWord}`}.
                  </>
                ) : (
                  <>
                    {nf.format(p.collectors)} {labels.institutionLine}
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Yükleme ilerlemesi — 526 kayıtta "nerede kaldım" sorusunu cevaplar.
          Önceden yalnızca kalan sayı yazıyordu; toplamın neresinde olunduğu
          görünmüyordu. */}
      {filtered.length > PAGE_SIZE && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-mist-200">
            <div
              className="h-full rounded-full bg-volt-500 transition-all duration-300"
              style={{ width: `${Math.min(100, (Math.min(visible, filtered.length) / filtered.length) * 100)}%` }}
            />
          </div>
          <p className="font-tabular font-mono text-[11px] text-mist-500">
            {nf.format(Math.min(visible, filtered.length))} / {nf.format(filtered.length)}
          </p>
          {visible < filtered.length && (
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="min-h-[46px] rounded-full border border-graphite-950/15 px-7 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white"
            >
              {labels.showMore} ({nf.format(filtered.length - visible)})
            </button>
          )}
        </div>
      )}
    </div>
  );
}
