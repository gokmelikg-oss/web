'use client';

import { useState } from 'react';
import { Sun, Clock, Zap, Leaf, MapPin, ArrowUpRight, Wrench } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PROVINCES_SORTED, getProvinceData } from '@/data/provinces';
import type { ExplorerLabels } from '@/lib/provincesUi';

const STAT_ICONS = [Sun, Clock, Zap, Leaf];

const DEFAULT_LABELS: ExplorerLabels = {
  intlLocale: 'tr-TR',
  selectLabel: 'İlinizi seçin',
  regionLabel: 'Bölge',
  rec: [
    'Çok yüksek güneş potansiyeli. Paket ve merkezi sistemler yıl boyu yüksek verimle çalışır; yatırım geri dönüşü hızlıdır.',
    'Yüksek güneş potansiyeli. Güneş enerjili sıcak su sistemleri verimli çalışır; hem konut hem toplu projeler için uygundur.',
    'İyi güneş potansiyeli. Doğru boyutlandırma ve destek ısıtma entegrasyonuyla dört mevsim verimli sıcak su sağlanır.',
    'Uygun potansiyel. Kapalı devre (antifrizli) sistemler ve destek ısıtma ile kesintisiz sıcak su elde edilir.',
  ],
  title: '{name}’de güneş enerjisi potansiyeli',
  statLabels: [
    { unit: 'kWh/m²·yıl', label: 'Yıllık güneş ışınımı' },
    { unit: 'saat/yıl', label: 'Güneşlenme süresi' },
    { unit: 'kWh/yıl', label: 'Tek hane tahmini üretim' },
    { unit: 'kg/yıl', label: 'Önlenen CO₂ (tek hane)' },
  ],
  gepaNote:
    'Değerler GEPA bölgesel ortalamalarına dayalı yaklaşık verilerdir. Kesin değer için ücretsiz saha keşfi öneririz.',
  quoteButton: '{name} için teklif alın',
  surveyButton: 'Keşif talebi',
};

function recIndex(radiation: number): number {
  if (radiation >= 1380) return 0;
  if (radiation >= 1280) return 1;
  if (radiation >= 1150) return 2;
  return 3;
}

export function ProvinceExplorer({ labels = DEFAULT_LABELS }: { labels?: ExplorerLabels }) {
  const [slug, setSlug] = useState('mersin');
  const data = getProvinceData(slug)!;
  const nf = new Intl.NumberFormat(labels.intlLocale);

  const values = [nf.format(data.radiation), nf.format(data.sunshine), nf.format(data.homeAnnual), nf.format(data.homeCo2)];
  const stats = labels.statLabels.map((s, i) => ({ icon: STAT_ICONS[i], value: values[i], unit: s.unit, label: s.label }));

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
      {/* Seçici */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-volt-700">
            {labels.selectLabel}
          </span>
          <div className="relative">
            <MapPin size={18} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-mist-500" />
            <select
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full appearance-none rounded-xl border border-mist-900/15 bg-white py-3.5 pe-4 ps-11 text-sm font-semibold text-graphite-950 shadow-sm outline-none focus:border-volt-500"
            >
              {PROVINCES_SORTED.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </label>

        <div className="mt-6 rounded-2xl border border-mist-900/10 bg-mist-50 p-5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">{labels.regionLabel}</p>
          <p className="mt-1 font-display text-lg font-bold text-graphite-950">{data.region.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-mist-700">{labels.rec[recIndex(data.radiation)]}</p>
        </div>
      </div>

      {/* Sonuç */}
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-graphite-950 sm:text-3xl">
            {labels.title.replace('{name}', data.name)}
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-mist-900/10 bg-white p-5 shadow-sm">
              <s.icon size={18} className="text-volt-600" strokeWidth={1.9} />
              <p className="mt-3 font-tabular font-display text-2xl font-bold leading-none text-graphite-950 sm:text-3xl">
                {s.value}
                <span className="ms-1 text-xs font-semibold text-mist-500">{s.unit}</span>
              </p>
              <p className="mt-2 font-mono text-[9.5px] uppercase leading-snug tracking-[0.12em] text-mist-600">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 font-mono text-[11px] leading-relaxed text-mist-500">{labels.gepaNote}</p>

        {/* CTA */}
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            /* İl adı proje lokasyonu olarak taşınır. */
            href={`/teklif-al?konum=${encodeURIComponent(data.name)}`}
            className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            {labels.quoteButton.replace('{name}', data.name)}
            <ArrowUpRight size={15} />
          </Link>
          <Link
            href="/contact#servis"
            className="inline-flex items-center gap-2 rounded-full border border-graphite-950/15 px-6 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-mist-100"
          >
            <Wrench size={15} />
            {labels.surveyButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
