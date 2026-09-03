import { useTranslations } from 'next-intl';
import { ClipboardList, PencilRuler, Factory, Wrench } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const stepIcons = [ClipboardList, PencilRuler, Factory, Wrench];

export function ProductionSection() {
  const t = useTranslations('production');
  const tProcess = useTranslations('process');
  const stats = t.raw('stats') as { value: string; label: string }[];
  const steps = tProcess.raw('steps') as { title: string; desc: string }[];

  return (
    <section id="uretim" className="section-pad scroll-mt-20 bg-white">
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
              {t('eyebrow')}
            </p>
            <h2 className="mt-3 max-w-xl text-balance font-display type-h2 font-bold tracking-tight text-graphite-950">
              {t('title')}
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-mist-700">{t('body')}</p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-mist-900/10 bg-mist-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-volt-500/40 hover:bg-white">
                  <span className="absolute end-4 top-4 font-mono text-lg font-bold text-graphite-950/10 transition-colors group-hover:text-volt-600/40">
                    0{i + 1}
                  </span>
                  <p className="font-tabular font-display type-h2-sm font-bold text-graphite-950">
                    {s.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-mist-600">
                    {s.label}
                  </p>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-volt-500 transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Teklif isteğinden devreye almaya: uçtan uca süreç akışı */}
        <div className="mt-20">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
                {tProcess('eyebrow')}
              </p>
              <h3 className="mt-4 text-balance font-display type-h2-sm font-bold tracking-tight text-graphite-950">
                {tProcess('title')}
              </h3>
            </div>
          </Reveal>

          <div className="relative mt-12">
            {/* Adımları birbirine bağlayan sürekli akış çizgisi */}
            <span
              className="pointer-events-none absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-volt-500/45 to-transparent lg:block"
              aria-hidden
            />

            <ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => {
                const Icon = stepIcons[i] ?? ClipboardList;
                return (
                  <Reveal key={step.title} delay={i * 0.08}>
                    <li className="group relative flex flex-col items-center text-center">
                      {/* Numaralı ikon dairesi */}
                      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-volt-500/25 bg-white text-volt-700 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-volt-500 group-hover:bg-volt-500 group-hover:text-graphite-950">
                        <Icon size={22} strokeWidth={1.8} />
                        <span className="absolute -end-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-graphite-950 font-tabular font-mono text-[10px] font-bold text-white">
                          {i + 1}
                        </span>
                      </span>

                      <h4 className="mt-5 font-display text-base font-bold text-graphite-950">
                        {step.title}
                      </h4>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist-700">{step.desc}</p>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
