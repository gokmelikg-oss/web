'use client';

import { useMemo, useState } from 'react';
import { Search, MapPin, X, ChevronDown, ArrowDownWideNarrow } from 'lucide-react';
import { computeImpact, type ReferenceProject } from '@/data/references';

const PAGE_SIZE = 24;
const nf = new Intl.NumberFormat('tr-TR');
const nf1 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 });

export function ReferenceList({ projects }: { projects: ReferenceProject[] }) {
  const [query, setQuery] = useState('');
  const [province, setProvince] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

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

  /* Liste her zaman kollektör adedine göre büyükten küçüğe sıralanır. */
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr-TR');
    return projects
      .filter((p) => {
        if (province && p.il !== province) return false;
        if (!q) return true;
        return (
          p.title.toLocaleLowerCase('tr-TR').includes(q) ||
          p.il.toLocaleLowerCase('tr-TR').includes(q) ||
          p.ilce.toLocaleLowerCase('tr-TR').includes(q)
        );
      })
      .sort((a, b) => b.collectors - a.collectors);
  }, [query, province, projects]);

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
  const hasFilter = Boolean(query || province);

  function reset() {
    setQuery('');
    setProvince(null);
    setVisible(PAGE_SIZE);
  }

  return (
    <div>
      {/* Arama + il filtresi */}
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
            placeholder="Proje, il veya ilçe ara…"
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
            <option value="">Tüm iller ({provinceSummaries.length})</option>
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
            Temizle
          </button>
        )}
      </div>

      {/* Seçkinin canlı özeti */}
      <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-mist-900/10 bg-mist-50 p-4 sm:grid-cols-4">
        {[
          { label: 'Proje', value: nf.format(filtered.length) },
          { label: 'Konut', value: nf.format(subtotal.homes) },
          { label: 'Kollektör', value: nf.format(subtotal.collectors) },
          { label: 'Işınım alanı', value: `${nf.format(Math.round(subtotal.aperture))} m²` },
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
          Bu seçki yılda yaklaşık{' '}
          <strong className="font-semibold text-graphite-950">
            {nf1.format(subtotal.impact.annualGwh)} GWh
          </strong>{' '}
          temiz ısı enerjisi üretiyor,{' '}
          <strong className="font-semibold text-emerald-600">
            {nf.format(Math.round(subtotal.impact.co2TonsPerYear))} ton CO₂
          </strong>{' '}
          salımını önlüyor.
        </p>
      )}

      {/* Sıralama bilgisi */}
      {filtered.length > 0 && (
        <p className="mt-6 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
          <ArrowDownWideNarrow size={13} className="shrink-0" />
          Kollektör adedine göre büyükten küçüğe sıralı
        </p>
      )}

      {/* Liste */}
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-mist-900/20 py-16 text-center">
          <p className="font-display text-lg font-bold text-graphite-950">Sonuç bulunamadı</p>
          <p className="mt-1.5 text-sm text-mist-600">Farklı bir arama veya il deneyin.</p>
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
                  {nf.format(p.collectors)} kollektör
                </span>
              </div>

              <div className="mt-2.5 flex items-start gap-3">
                <span className="mt-0.5 shrink-0 font-tabular font-mono text-xs font-bold text-mist-400">
                  {nf.format(i + 1)}
                </span>
                <h3 className="text-balance font-display text-base font-bold leading-snug text-graphite-950">
                  {p.title}
                </h3>
              </div>

              <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-mist-900/8 pt-3.5">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-mist-500">Konut</dt>
                  <dd className="mt-0.5 font-tabular text-sm font-bold text-graphite-950">
                    {nf.format(p.homes)}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-mist-500">Işınım</dt>
                  <dd className="mt-0.5 font-tabular text-sm font-bold text-graphite-950">
                    {nf.format(Math.round(p.aperture))} m²
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-mist-500">Brüt</dt>
                  <dd className="mt-0.5 font-tabular text-sm font-bold text-graphite-950">
                    {nf.format(Math.round(p.gross))} m²
                  </dd>
                </div>
              </dl>

              <p className="mt-3 text-xs leading-relaxed text-mist-600">
                {nf.format(p.homes)} konutun sıcak su ihtiyacı güneş enerjisiyle karşılanıyor
                {p.blocks > 0 && ` · ${nf.format(p.blocks)} blok`}.
              </p>
            </li>
          ))}
        </ul>
      )}

      {visible < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border border-graphite-950/15 px-7 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white"
          >
            Daha fazla göster ({nf.format(filtered.length - visible)})
          </button>
        </div>
      )}
    </div>
  );
}
