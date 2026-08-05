'use client';

import { useState } from 'react';
import { Sun, Clock, Zap, Leaf, MapPin, ArrowUpRight, Wrench } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PROVINCES_SORTED, getProvinceData } from '@/data/provinces';

const nf = new Intl.NumberFormat('tr-TR');

function recommendation(radiation: number): string {
  if (radiation >= 1380)
    return 'Çok yüksek güneş potansiyeli. Paket ve merkezi sistemler yıl boyu yüksek verimle çalışır; yatırım geri dönüşü hızlıdır.';
  if (radiation >= 1280)
    return 'Yüksek güneş potansiyeli. Güneş enerjili sıcak su sistemleri verimli çalışır; hem konut hem toplu projeler için uygundur.';
  if (radiation >= 1150)
    return 'İyi güneş potansiyeli. Doğru boyutlandırma ve destek ısıtma entegrasyonuyla dört mevsim verimli sıcak su sağlanır.';
  return 'Uygun potansiyel. Kapalı devre (antifrizli) sistemler ve destek ısıtma ile kesintisiz sıcak su elde edilir.';
}

export function ProvinceExplorer() {
  const [slug, setSlug] = useState('mersin');
  const data = getProvinceData(slug)!;

  const stats = [
    { icon: Sun, value: `${nf.format(data.radiation)}`, unit: 'kWh/m²·yıl', label: 'Yıllık güneş ışınımı' },
    { icon: Clock, value: `${nf.format(data.sunshine)}`, unit: 'saat/yıl', label: 'Güneşlenme süresi' },
    { icon: Zap, value: `${nf.format(data.homeAnnual)}`, unit: 'kWh/yıl', label: 'Tek hane tahmini üretim' },
    { icon: Leaf, value: `${nf.format(data.homeCo2)}`, unit: 'kg/yıl', label: 'Önlenen CO₂ (tek hane)' },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
      {/* Seçici */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-volt-700">
            İlinizi seçin
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
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">Bölge</p>
          <p className="mt-1 font-display text-lg font-bold text-graphite-950">{data.region.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-mist-700">{recommendation(data.radiation)}</p>
        </div>
      </div>

      {/* Sonuç */}
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-graphite-950 sm:text-3xl">
            {data.name}’de güneş enerjisi potansiyeli
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

        <p className="mt-5 font-mono text-[11px] leading-relaxed text-mist-500">
          Değerler GEPA bölgesel ortalamalarına dayalı yaklaşık verilerdir. Tek hane hesabı; ~
          {2.5} m² ışınım alanlı paket sistem ve %50 sistem verimi varsayımıyla hesaplanmıştır. Kesin
          değer için ücretsiz saha keşfi öneririz.
        </p>

        {/* CTA */}
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            {data.name} için teklif alın
            <ArrowUpRight size={15} />
          </Link>
          <Link
            href="/contact#servis"
            className="inline-flex items-center gap-2 rounded-full border border-graphite-950/15 px-6 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-mist-100"
          >
            <Wrench size={15} />
            Keşif talebi
          </Link>
        </div>
      </div>
    </div>
  );
}
