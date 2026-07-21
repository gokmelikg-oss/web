import { useTranslations } from 'next-intl';
import { Factory, BadgeCheck, ClipboardCheck, Wrench, Layers, Cpu } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const icons = [Factory, BadgeCheck, ClipboardCheck, Wrench, Layers, Cpu];

export function WhyUs() {
  const t = useTranslations('whyUs');
  const items = t.raw('items') as { title: string; desc: string }[];

  return (
    <section className="section-pad bg-mist-900 text-mist-50">
      <div className="container-page">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-400">
            <span className="h-px w-8 bg-volt-500" aria-hidden />
            {t('eyebrow')}
          </p>
          <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i] ?? Factory;
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-volt-500/15 text-volt-400">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist-300">{item.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
