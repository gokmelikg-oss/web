'use client';

import { useMemo, useState } from 'react';
import { MapPin, Phone, Search, Factory, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { dealers, dealersIn, type Dealer } from '@/data/dealers';
import { PROVINCES_SORTED } from '@/data/provinces';
import { referenceProjects } from '@/data/references';

/* BAYİ BUL
   ========
   Rakip incelemesinde (Eraslan "Bayi Bul") bulunan, bizde olmayan özellik.

   ⚠ TASARIM KARARI: bayi listesi BOŞ olsa bile sayfa işe yarar.
   Bir bayi bulucunun kolay hatası, bayisi olmayan ilde ziyaretçiyi
   çıkmaza sokmasıdır ("sonuç bulunamadı"). Burada o durum bir ÇIKMAZ değil,
   iki yönlü bir fırsata çevrilir:
     · müşteri → doğrudan fabrikadan destek + teklif
     · o bölgede iş yapmak isteyen firma → bayilik başvurusu
   Böylece bayi verisi girilene kadar da sayfa gelir üretir.

   İkinci dürüstlük noktası: o ilde TESLİM ETTİĞİMİZ proje sayısı gösterilir.
   Bu gerçek veridir (526 proje kaydı) ve bayimiz olmasa bile o bölgede iş
   yaptığımızı kanıtlar. Bayi varlığıyla KARIŞTIRILMAZ — ayrı ayrı yazılır. */

export interface DealerFinderLabels {
  selectLabel: string;
  selectPlaceholder: string;
  found: string;
  noDealer: string;
  noDealerBody: string;
  projectsHere: string;
  projectsNone: string;
  contactFactory: string;
  becomeDealer: string;
  emptyStateTitle: string;
  emptyStateBody: string;
  callFactory: string;
}

export function DealerFinder({ labels }: { labels: DealerFinderLabels }) {
  const [il, setIl] = useState('');

  /* İl adları referans verisinde BÜYÜK HARF ("MERSİN"), il listesinde ise
     normal yazımdadır ("Mersin"). Karşılaştırma için tek biçime indirilir. */
  const norm = (s: string) => s.toLocaleUpperCase('tr-TR');

  const matches: Dealer[] = useMemo(() => (il ? dealersIn(norm(il)) : []), [il]);

  const projectCount = useMemo(
    () => (il ? referenceProjects.filter((p) => norm(p.il) === norm(il)).length : 0),
    [il]
  );

  return (
    <div className="mx-auto max-w-2xl">
      <label className="block">
        <span className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-wide text-mist-500">
          {labels.selectLabel}
        </span>
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-mist-400"
            aria-hidden
          />
          <select
            value={il}
            onChange={(e) => setIl(e.target.value)}
            className="w-full appearance-none rounded-xl border border-mist-900/15 bg-white ps-12 pe-4 py-3.5 text-sm text-graphite-900 outline-none transition-colors focus:border-volt-500"
          >
            <option value="">{labels.selectPlaceholder}</option>
            {PROVINCES_SORTED.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </label>

      {/* Henüz il seçilmediyse ne yapılacağını anlat. */}
      {!il && (
        <p className="mt-5 text-center text-sm text-mist-600">{labels.emptyStateBody}</p>
      )}

      {il && (
        <div className="mt-7">
          {/* O ilde teslim ettiğimiz proje sayısı — gerçek veri, bayi
              varlığından AYRI bir bilgi olarak sunulur. */}
          <p className="rounded-xl border border-mist-900/10 bg-mist-50 px-5 py-3.5 text-sm text-mist-700">
            {projectCount > 0
              ? labels.projectsHere.replace('{il}', il).replace('{n}', String(projectCount))
              : labels.projectsNone.replace('{il}', il)}
          </p>

          {matches.length > 0 ? (
            <>
              <h2 className="mt-7 font-display type-h3 font-bold text-graphite-950">
                {labels.found.replace('{n}', String(matches.length))}
              </h2>
              <ul className="mt-4 space-y-3">
                {matches.map((d, i) => (
                  <li
                    key={`${d.title}-${i}`}
                    className="rounded-2xl border border-mist-900/10 bg-white p-5"
                  >
                    <p className="font-display font-bold text-graphite-950">{d.title}</p>
                    {/* Yetkili kişi — müşteri aramadan önce kime soracağını görsün. */}
                    {d.contact ? (
                      <p className="mt-0.5 text-sm text-mist-500">{d.contact}</p>
                    ) : null}
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-mist-600">
                      <MapPin size={14} className="shrink-0 text-volt-600" />
                      {d.ilce ? `${d.ilce} / ${d.il}` : d.il}
                    </p>
                    {/* Telefon YALNIZCA doğrulanmışsa basılır (bkz. data/dealers.ts).
                        Sabit ve cep AYRI bağlantıdır: `tel:` tek numara kabul eder,
                        birleştirilirse hiçbiri aranamaz. */}
                    {d.phone ? (
                      <span className="mt-3 flex flex-wrap gap-2">
                        {[d.phone, d.phone2].filter(Boolean).map((tel) => (
                          <a
                            key={tel}
                            href={`tel:${tel!.replace(/\s/g, '')}`}
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-graphite-950/15 px-5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white"
                          >
                            <Phone size={15} />
                            {tel}
                          </a>
                        ))}
                      </span>
                    ) : (
                      <Link
                        href="/contact"
                        className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-graphite-950/15 px-5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white"
                      >
                        {labels.callFactory}
                        <ArrowRight size={15} className="rtl:rotate-180" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            /* ⚠ "Sonuç yok" bir çıkmaz DEĞİL, iki yönlü fırsattır. */
            <div className="mt-7 rounded-2xl border border-mist-900/10 bg-white p-7 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-volt-100 text-volt-700">
                <Factory size={22} strokeWidth={1.75} />
              </span>
              <h2 className="mt-4 font-display type-h3 font-bold text-graphite-950">
                {labels.noDealer.replace('{il}', il)}
              </h2>
              <p className="mt-2.5 text-balance text-sm leading-relaxed text-mist-600">
                {labels.noDealerBody}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/teklif-al"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-graphite-950 px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  {labels.contactFactory}
                  <ArrowRight size={16} className="rtl:rotate-180" />
                </Link>
                <Link
                  href="/bayi"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-graphite-950/15 px-7 text-sm font-semibold text-graphite-950 transition-colors hover:bg-mist-100"
                >
                  {labels.becomeDealer}
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hiç bayi kaydı yokken sayfanın ne durumda olduğunu dürüstçe söyler. */}
      {dealers.length === 0 && (
        <p className="mt-8 rounded-xl border border-dashed border-mist-900/20 px-5 py-4 text-center text-xs leading-relaxed text-mist-500">
          {labels.emptyStateTitle}
        </p>
      )}
    </div>
  );
}
