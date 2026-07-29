'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { faqItems } from '@/data/faq';

/* Sık sorulan sorular — açılır-kapanır akordeon. İçerik itiraz karşılama + arama
   terimi optimizasyonu için tasarlandı; JSON-LD ana sayfada ayrıca eklenir. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="sss" className="section-pad scroll-mt-20 bg-white">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                Sık Sorulan Sorular
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                Güneş enerjili sıcak su hakkında merak edilenler
              </h2>
              <p className="mt-4 max-w-md text-mist-700">
                Güneş enerjisi sistemleri, boyler kapasitesi, TOKİ ve kamu projeleri ile bakım hakkında
                en çok sorulan sorular. Aradığınızı bulamazsanız bize ulaşın.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <ul className="divide-y divide-mist-900/10 border-y border-mist-900/10">
              {faqItems.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-4 py-5 text-start"
                    >
                      <span className="font-display text-base font-bold text-graphite-950 sm:text-lg">
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
                        <p className="max-w-2xl text-sm leading-relaxed text-mist-700">{item.a}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
