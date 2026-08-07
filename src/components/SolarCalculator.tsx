'use client';

import { useMemo, useState } from 'react';
import { Minus, Plus, Sun, Droplets, Zap, Leaf, TrendingUp, Clock, ArrowUpRight, Package } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PROVINCES_SORTED } from '@/data/provinces';
import { computeSystem, CALC_ASSUMPTIONS, type Usage } from '@/lib/calculator';
import type { CalculatorUi } from '@/lib/calculatorUi';

export function SolarCalculator({ labels }: { labels: CalculatorUi }) {
  const [people, setPeople] = useState(4);
  const [province, setProvince] = useState('mersin');
  const [usage, setUsage] = useState<Usage>('normal');
  const [price, setPrice] = useState<string>(String(CALC_ASSUMPTIONS.defaultEnergyPrice));

  const nf = useMemo(() => new Intl.NumberFormat(labels.intlLocale), [labels.intlLocale]);
  const result = useMemo(
    () => computeSystem({ people, provinceSlug: province, usage, energyPrice: parseFloat(price.replace(',', '.')) }),
    [people, province, usage, price]
  );

  const field =
    'w-full rounded-xl border border-mist-900/15 bg-white px-4 py-3 text-sm font-medium text-graphite-950 outline-none focus:border-volt-500';

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
      {/* Girdi paneli */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl border border-mist-900/10 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-lg font-bold text-graphite-950">{labels.inputsTitle}</h2>

          {/* Kişi sayısı */}
          <div className="mt-6">
            <label className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-600">
              {labels.peopleLabel}
            </label>
            <div className="mt-2.5 flex items-center gap-4">
              <button
                type="button"
                aria-label="-"
                onClick={() => setPeople((v) => Math.max(1, v - 1))}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-mist-900/15 text-graphite-950 transition-colors hover:border-volt-500 hover:text-volt-700"
              >
                <Minus size={16} />
              </button>
              <div className="flex-1 text-center">
                <span className="font-tabular font-display text-3xl font-bold text-graphite-950">{people}</span>
                <span className="ms-1.5 text-sm text-mist-500">{labels.peopleUnit}</span>
              </div>
              <button
                type="button"
                aria-label="+"
                onClick={() => setPeople((v) => Math.min(20, v + 1))}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-mist-900/15 text-graphite-950 transition-colors hover:border-volt-500 hover:text-volt-700"
              >
                <Plus size={16} />
              </button>
            </div>
            <input
              type="range"
              min={1}
              max={12}
              value={Math.min(people, 12)}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="mt-4 w-full accent-volt-500"
            />
          </div>

          {/* İl */}
          <div className="mt-6">
            <label className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-600">
              {labels.provinceLabel}
            </label>
            <select value={province} onChange={(e) => setProvince(e.target.value)} className={`${field} mt-2.5 appearance-none`}>
              {PROVINCES_SORTED.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Kullanım */}
          <div className="mt-6">
            <label className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-600">
              {labels.usageLabel}
            </label>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {(['low', 'normal', 'high'] as Usage[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUsage(u)}
                  className={`rounded-xl border px-2 py-2.5 text-center transition-colors ${
                    usage === u
                      ? 'border-volt-500 bg-volt-50 text-graphite-950'
                      : 'border-mist-900/15 text-mist-700 hover:border-volt-500/40'
                  }`}
                >
                  <span className="block text-sm font-semibold">{labels.usage[u]}</span>
                  <span className="mt-0.5 block font-mono text-[9px] text-mist-500">{labels.usageHint[u]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Enerji fiyatı */}
          <div className="mt-6">
            <label className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-600">
              {labels.energyPriceLabel}
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              dir="ltr"
              className={`${field} mt-2.5`}
            />
            <p className="mt-2 text-[11px] leading-relaxed text-mist-500">{labels.energyPriceHint}</p>
          </div>
        </div>
      </div>

      {/* Sonuç paneli */}
      <div>
        {result && (
          <div className="rounded-3xl border border-mist-900/10 bg-mist-50 p-6 sm:p-8">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-volt-700">
              {labels.resultTitle} · {result.provinceName}
            </p>

            {/* Önerilen sistem */}
            <div className="mt-4 rounded-2xl border border-graphite-700/10 bg-graphite-gradient p-6 text-white">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-volt-400">
                {labels.recommendedSystem}
              </p>
              {result.central ? (
                <>
                  <p className="mt-2 flex items-center gap-2 font-display text-2xl font-bold">
                    <Sun size={22} className="text-volt-400" /> {labels.centralSystem}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-graphite-200">{labels.centralNote}</p>
                </>
              ) : (
                <>
                  <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2">
                    <span className="flex items-baseline gap-1.5">
                      <Sun size={18} className="translate-y-0.5 text-volt-400" />
                      <span className="font-tabular font-display text-3xl font-bold">{result.collectorCount}</span>
                      <span className="text-sm text-graphite-300">{labels.collectorsWord}</span>
                    </span>
                    <span className="flex items-baseline gap-1.5">
                      <Droplets size={18} className="translate-y-0.5 text-volt-400" />
                      <span className="font-tabular font-display text-3xl font-bold">{nf.format(result.boilerLiters)}</span>
                      <span className="text-sm text-graphite-300">{labels.boilerWord}</span>
                    </span>
                  </div>
                  {result.packageModel && (
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                      <Package size={13} className="text-volt-400" />
                      {labels.packagePrefix} {result.packageModel}
                    </p>
                  )}
                </>
              )}
              <p className="mt-4 border-t border-white/10 pt-3 font-mono text-[11px] text-graphite-300">
                {labels.demandNote
                  .replace('{liters}', nf.format(result.dailyLiters))
                  .replace('{kwh}', nf.format(result.annualDemandKwh))}
              </p>
            </div>

            {/* Metrikler */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Metric icon={<TrendingUp size={16} />} value={`%${nf.format(result.coveragePct)}`} label={labels.metrics.coverage} />
              <Metric icon={<Zap size={16} />} value={`${nf.format(result.annualSolarKwh)}`} unit={labels.units.kwhYear} label={labels.metrics.production} />
              <Metric icon={<TrendingUp size={16} />} value={`${nf.format(result.annualSaving)}`} unit={labels.currency} label={labels.metrics.saving} accent />
              <Metric
                icon={<Leaf size={16} />}
                value={`${nf.format(result.co2Kg)}`}
                unit={labels.units.kgYear}
                label={labels.metrics.co2}
                sub={labels.treeEqLabel.replace('{n}', nf.format(result.treeEq))}
              />
            </div>

            {/* Geri ödeme */}
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-mist-900/10 bg-white p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                <Clock size={17} />
              </span>
              <div>
                <p className="text-sm font-bold text-graphite-950">
                  {labels.paybackLabel}:{' '}
                  <span className="text-volt-700">
                    {nf.format(result.paybackRange[0])}–{nf.format(result.paybackRange[1])} {labels.units.year}
                  </span>
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-mist-500">{labels.paybackNote}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                {labels.ctaQuote}
                <ArrowUpRight size={15} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-graphite-950/15 px-6 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-mist-100"
              >
                {labels.ctaProducts}
              </Link>
            </div>

            <p className="mt-5 font-mono text-[10.5px] leading-relaxed text-mist-500">{labels.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({
  icon,
  value,
  unit,
  label,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  value: string;
  unit?: string;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${accent ? 'border-volt-500/30 bg-volt-50' : 'border-mist-900/10 bg-white'}`}>
      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent ? 'bg-volt-500 text-graphite-950' : 'bg-volt-100 text-volt-700'}`}>
        {icon}
      </span>
      <p className="mt-3 font-tabular font-display text-2xl font-bold leading-none text-graphite-950">
        {value}
        {unit && <span className="ms-1 text-xs font-semibold text-mist-500">{unit}</span>}
      </p>
      <p className="mt-1.5 text-[11px] leading-snug text-mist-600">{label}</p>
      {sub && <p className="mt-1 font-mono text-[9.5px] text-mist-500">{sub}</p>}
    </div>
  );
}
