'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { faqItems, type FaqItem } from '@/data/faq';

/* Sık sorulan sorular — iki sütunlu akordeon. İçerik itiraz karşılama + arama
   terimi optimizasyonu için tasarlandı; FAQPage JSON-LD ayrıca eklenir.
   Değişken yükseklikte hizalama bozulmasın diye iki bağımsız sütuna bölünür. */
export function Faq({ showHeader = true }: { showHeader?: boolean }) {
  const [open, setOpen] = useState<string | null>(faqItems[0]?.q ?? null);

  const left = faqItems.filter((_, i) => i % 2 === 0);
  const right = faqItems.filter((_, i) => i % 2 === 1);

  const Column = ({ items }: { items: FaqItem[] }) => (
    <ul className="divide-y divide-mist-900/10 border-y border-mist-900/10">
      {items.map((item) => {
        const isOpen = open === item.q;
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.q)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 py-5 text-start"
            >
              <span className="font-display text-sm font-bold text-graphite-950 sm:text-base">
                {item.q}
              </span>
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
                  isOpen
                    ? 'rotate-45 border-volt-500 bg-volt-500 text-graphite-950'
                    : 'border-mist-900/15 text-mist-500'
                }`}
              >
                <Plus size={15} strokeWidth={2.2} />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-sm leading-relaxed text-mist-700">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section id="sss" className="section-pad scroll-mt-20 bg-white">
      <div className="container-page">
        {showHeader && (
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                Sık Sorulan Sorular
                <span className="h-px w-8 bg-volt-500" aria-hidden />
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                Güneş enerjili sıcak su hakkında merak edilenler
              </h2>
              <p className="mt-4 text-mist-700">
                Sistem çalışması, boyler kapasitesi, tasarruf, bakım, TOKİ ve kamu projeleri hakkında en çok
                sorulanlar. Aradığınızı bulamazsanız bize ulaşın.
              </p>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <div className={`grid items-start gap-x-8 gap-y-0 lg:grid-cols-2 ${showHeader ? 'mt-10' : ''}`}>
            <Column items={left} />
            <Column items={right} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
