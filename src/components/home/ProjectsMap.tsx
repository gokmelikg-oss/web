'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/Reveal';

const LeafletProjectsMap = dynamic(
  () => import('./LeafletProjectsMap').then((m) => m.LeafletProjectsMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[480px] w-full animate-pulse rounded-2xl bg-graphite-900/60" aria-hidden />
    ),
  }
);

export function ProjectsMap() {
  const t = useTranslations('projectsMap');

  return (
    <section id="harita" className="scroll-mt-20 bg-graphite-950 py-16 text-white sm:py-20">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite-300">
                {t('eyebrow')}
              </p>
              <h2 className="mt-3 max-w-xl text-balance font-display type-h2-sm font-bold tracking-tight">
                {t('title')}
              </h2>
              <p className="mt-3 max-w-lg text-sm text-graphite-300">{t('subtitle')}</p>
            </div>
            <div className="flex flex-wrap gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5">
                <i className="h-2.5 w-2.5 rounded-full bg-volt-500" aria-hidden />
                {t('legend.factory')}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5">
                <i className="h-2.5 w-2.5 rounded-full bg-sky-400" aria-hidden />
                {t('legend.project')}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5">
                <i className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
                {t('legend.export')}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10">
            <LeafletProjectsMap />
            <span className="pointer-events-none absolute bottom-4 start-4 z-[500] rounded-full bg-graphite-950/80 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              {t('note')}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
