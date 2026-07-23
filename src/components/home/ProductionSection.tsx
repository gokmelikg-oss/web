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
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
              <span className="h-px w-8 bg-volt-500" aria-hidden />
              {t('eyebrow')}
            </p>
            <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-mist-700">{t('body')}</p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="rounded-2xl border border-mist-900/10 bg-mist-50 p-6">
                  <p className="font-tabular font-display text-2xl font-bold text-graphite-950 sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-mist-600">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Teklif isteğinden devreye almaya: uçtan uca süreç şeridi */}
        <div className="mt-16 border-t border-mist-900/10 pt-12">
          <Reveal>
            <h3 className="font-display text-xl font-bold text-graphite-950">{tProcess('title')}</h3>
          </Reveal>
          <ol className="mt-8 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = stepIcons[i] ?? ClipboardList;
              return (
                <Reveal key={step.title} delay={i * 0.07}>
                  <li className="relative flex flex-col">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                        <Icon size={18} strokeWidth={1.85} />
                      </span>
                      <span className="font-tabular font-mono text-xs font-bold text-mist-400">
                        0{i + 1}
                      </span>
                      {/* Adımlar arası bağlayıcı çizgi */}
                      {i < steps.length - 1 && (
                        <span
                          className="ms-1 hidden h-px flex-1 bg-gradient-to-r from-volt-500/40 to-transparent lg:block"
                          aria-hidden
                        />
                      )}
                    </div>
                    <h4 className="mt-4 font-display text-base font-bold text-graphite-950">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-mist-700">{step.desc}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
