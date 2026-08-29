'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FileText, Ruler, LineChart, Table2, ArrowUpRight, Download } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { products, productImages, getProductDocuments, type Product } from '@/data/products';
import { FilterPill, filterStripClass } from '@/components/FilterPill';
import type { TechDocsUi } from '@/lib/techDocsUi';

type TabId = 'data' | 'curve' | 'dim' | 'docs';

/* EN 12975 ısıl performans modeli (yaklaşık) — düz yüzey kolektör tipik katsayıları. */
const A1 = 3.6; // W/m²K
const A2 = 0.012; // W/m²K²
const G_TEST = 1000; // W/m²
const X_MAX = 0.1; // ΔT/G üst sınır

function eta0Of(p: Product): number {
  const s = p.specs.find((x) => x.key === 'efficiency');
  const m = s?.value.match(/([0-9]*\.?[0-9]+)/);
  return m ? parseFloat(m[1]) : 0.77;
}

/* Verim eğrisi SVG path'i üretir. */
function curvePath(eta0: number, w: number, h: number, pad: number) {
  const yMax = 0.85;
  const pts: string[] = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * X_MAX;
    const eta = Math.max(0, eta0 - A1 * x - A2 * G_TEST * x * x);
    const px = pad + (x / X_MAX) * (w - 2 * pad);
    const py = h - pad - (eta / yMax) * (h - 2 * pad);
    pts.push(`${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`);
  }
  return pts.join(' ');
}

export function TechnicalLibrary({ labels }: { labels: TechDocsUi }) {
  const tProducts = useTranslations('products');
  const [slug, setSlug] = useState<string>('orion-300');

  const grouped = useMemo(() => {
    const map: Record<string, Product[]> = {};
    for (const p of products) (map[p.category] ??= []).push(p);
    return Object.entries(map);
  }, []);

  const product = products.find((p) => p.slug === slug)!;
  const hasDim = product.specs.some((s) => s.key === 'dimensions');
  const isCollector = product.category === 'collector';
  const tabs: TabId[] = ['data', ...(isCollector ? (['curve'] as TabId[]) : []), ...(hasDim ? (['dim'] as TabId[]) : []), 'docs'];
  const [tab, setTab] = useState<TabId>('data');
  const activeTab = tabs.includes(tab) ? tab : 'data';

  const img = productImages[product.slug];
  const dims = product.specs.find((s) => s.key === 'dimensions')?.value ?? '';

  const tabMeta: Record<TabId, { label: string; icon: typeof Table2 }> = {
    data: { label: labels.dataTab, icon: Table2 },
    curve: { label: labels.curveTab, icon: LineChart },
    dim: { label: labels.dimTab, icon: Ruler },
    docs: { label: labels.docsTab, icon: FileText },
  };

  function pick(s: string) {
    setSlug(s);
    setTab('data');
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-8">
      {/* Ürün seçici */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl border border-mist-900/10 bg-white p-3">
          {grouped.map(([cat, list]) => (
            <div key={cat} className="mb-2 last:mb-0">
              <p className="px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                {tProducts(`categoryLabels.${cat}`)}
              </p>
              <ul>
                {list.map((p) => (
                  <li key={p.slug}>
                    <button
                      type="button"
                      onClick={() => pick(p.slug)}
                      className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-start text-sm transition-colors ${
                        p.slug === slug ? 'bg-graphite-950 font-semibold text-white' : 'text-graphite-800 hover:bg-mist-50'
                      }`}
                    >
                      <span className="min-w-0 truncate">{tProducts(`items.${p.slug}.name`)}</span>
                      <span className={`shrink-0 font-mono text-[9px] ${p.slug === slug ? 'text-volt-400' : 'text-mist-400'}`}>
                        {p.model}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Ürün paneli */}
      <div className="min-w-0">
        <div className="overflow-hidden rounded-3xl border border-mist-900/10 bg-white">
          {/* Kimlik */}
          <div className="flex flex-col gap-5 border-b border-mist-900/8 bg-mist-50 p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white">
              {img ? (
                <Image src={img} alt={tProducts(`items.${product.slug}.name`)} fill className="object-cover" sizes="112px" />
              ) : (
                <FileText size={40} strokeWidth={1.1} className="text-mist-300" />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-volt-700">
                {tProducts(`categoryLabels.${product.category}`)} · {product.model}
              </p>
              <h3 className="mt-1.5 font-display text-2xl font-bold text-graphite-950">
                {tProducts(`items.${product.slug}.name`)}
              </h3>
              <p className="mt-1.5 text-sm text-mist-700">{tProducts(`items.${product.slug}.tagline`)}</p>
            </div>
          </div>

          {/* Sekmeler — site genelindeki filtre düğmeleriyle aynı bileşen. */}
          <div className={`${filterStripClass} border-b border-mist-900/8 px-4 pb-3 pt-4 sm:px-6`}>
            {tabs.map((id) => (
              <FilterPill
                key={id}
                icon={tabMeta[id].icon}
                label={tabMeta[id].label}
                active={activeTab === id}
                onClick={() => setTab(id)}
              />
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {/* Teknik veriler */}
            {activeTab === 'data' && (
              <dl className="divide-y divide-mist-900/8">
                {product.specs.map((s) => (
                  <div key={s.key} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[minmax(0,240px)_1fr] sm:gap-4">
                    <dt className="text-sm font-medium text-mist-600">{tProducts(`specsLabels.${s.key}`)}</dt>
                    <dd className="text-sm font-semibold text-graphite-950" dir="ltr">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {/* Verim eğrisi */}
            {activeTab === 'curve' && (
              <div>
                <p className="font-display text-base font-bold text-graphite-950">{labels.curveTitle}</p>
                <div className="mt-4 overflow-x-auto">
                  <svg viewBox="0 0 420 280" className="h-auto w-full min-w-[340px]" role="img" aria-label={labels.curveTitle}>
                    {/* Izgara + eksenler */}
                    {[0, 0.25, 0.5, 0.75, 1].map((f) => {
                      const y = 40 + f * (280 - 80);
                      return <line key={`h${f}`} x1={54} y1={y} x2={400} y2={y} stroke="#e6e8ee" strokeWidth={1} />;
                    })}
                    {[0, 0.25, 0.5, 0.75, 1].map((f) => {
                      const x = 54 + f * (400 - 54);
                      return <line key={`v${f}`} x1={x} y1={40} x2={x} y2={240} stroke="#eef0f4" strokeWidth={1} />;
                    })}
                    <line x1={54} y1={40} x2={54} y2={240} stroke="#9aa2b1" strokeWidth={1.2} />
                    <line x1={54} y1={240} x2={400} y2={240} stroke="#9aa2b1" strokeWidth={1.2} />
                    {/* η0 etiketi */}
                    <text x={48} y={44} textAnchor="end" fontSize="10" fill="#6b7280">0.85</text>
                    <text x={48} y={244} textAnchor="end" fontSize="10" fill="#6b7280">0</text>
                    <text x={54} y={258} textAnchor="middle" fontSize="10" fill="#6b7280">0</text>
                    <text x={400} y={258} textAnchor="middle" fontSize="10" fill="#6b7280">0.10</text>
                    {/* Eğri */}
                    <path d={curvePath(eta0Of(product), 420, 280, 40)} fill="none" stroke="#f6bc32" strokeWidth={2.5} strokeLinecap="round" />
                    {/* η0 noktası */}
                    <circle cx={54} cy={240 - (eta0Of(product) / 0.85) * (240 - 40)} r={4} fill="#f6bc32" />
                    {/* Eksen başlıkları */}
                    <text x={227} y={276} textAnchor="middle" fontSize="10.5" fill="#374151">{labels.curveX}</text>
                    <text x={16} y={140} textAnchor="middle" fontSize="10.5" fill="#374151" transform="rotate(-90 16 140)">{labels.curveY}</text>
                  </svg>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] text-graphite-700">
                  <span>η₀ = {eta0Of(product).toFixed(2)}</span>
                  <span>a₁ ≈ {A1} W/m²K</span>
                  <span>a₂ ≈ {A2} W/m²K²</span>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-mist-500">{labels.curveNote}</p>
              </div>
            )}

            {/* Boyutlar */}
            {activeTab === 'dim' && (
              <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="font-display text-base font-bold text-graphite-950">{labels.dimTab}</p>
                  <p className="mt-2 font-tabular text-lg font-bold text-volt-700" dir="ltr">{dims}</p>
                  <p className="mt-3 text-[11px] leading-relaxed text-mist-500">{labels.dimNote}</p>
                </div>
                <svg viewBox="0 0 200 140" className="h-auto w-full max-w-[220px]" role="img" aria-label={labels.dimTab}>
                  <rect x={30} y={20} width={140} height={90} rx={4} fill="#f6f7f9" stroke="#c7ccd6" strokeWidth={1.5} />
                  <rect x={44} y={34} width={112} height={62} rx={2} fill="#fff" stroke="#e2e5ec" strokeWidth={1} />
                  <line x1={30} y1={124} x2={170} y2={124} stroke="#9aa2b1" strokeWidth={1} />
                  <line x1={30} y1={120} x2={30} y2={128} stroke="#9aa2b1" strokeWidth={1} />
                  <line x1={170} y1={120} x2={170} y2={128} stroke="#9aa2b1" strokeWidth={1} />
                  <line x1={184} y1={20} x2={184} y2={110} stroke="#9aa2b1" strokeWidth={1} />
                  <line x1={180} y1={20} x2={188} y2={20} stroke="#9aa2b1" strokeWidth={1} />
                  <line x1={180} y1={110} x2={188} y2={110} stroke="#9aa2b1" strokeWidth={1} />
                  <text x={100} y={135} textAnchor="middle" fontSize="9" fill="#6b7280">W</text>
                  <text x={196} y={68} textAnchor="middle" fontSize="9" fill="#6b7280" transform="rotate(-90 196 68)">H</text>
                </svg>
              </div>
            )}

            {/* Belgeler */}
            {activeTab === 'docs' && (
              <ul className="divide-y divide-mist-900/8">
                {getProductDocuments(product.slug).map((d) => (
                  <li key={d.id} className="flex items-center gap-3.5 py-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-volt-100 text-volt-700">
                      <FileText size={16} strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-medium text-graphite-950">{labels.docTypes[d.type]}</span>
                    <span className="shrink-0 rounded-full bg-mist-100 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-mist-600">
                      {d.format}
                    </span>
                    <button
                      type="button"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-mist-900/12 px-3.5 py-1.5 text-xs font-semibold text-graphite-800 transition-colors hover:border-volt-500 hover:text-volt-700"
                    >
                      <Download size={13} />
                      {labels.download}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Alt aksiyonlar */}
          <div className="flex flex-wrap gap-3 border-t border-mist-900/8 bg-mist-50 p-6 sm:px-8">
            <Link
              /* O an seçili ürün teklif formuna taşınır. */
              href={`/teklif-al?urun=${encodeURIComponent(tProducts(`items.${product.slug}.name`))}`}
              className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              {labels.quote}
              <ArrowUpRight size={15} />
            </Link>
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-graphite-950/15 px-6 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-white"
            >
              {labels.detail}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
