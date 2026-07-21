'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { ArrowRight, Map, Building2, Home, Globe2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/Reveal';

const ReferenceDotMap = dynamic(
  () => import('./ReferenceDotMap').then((m) => m.ReferenceDotMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full min-h-[420px] w-full animate-pulse rounded-2xl bg-mist-100" aria-hidden />
    ),
  }
);

/* Ana sayfada tekil iş isimleri gösterilmez; toplam ayak izi anlatılır.
   İş isimleri /projects sayfasında listelenir. */
const highlights = [
  { icon: Map, value: '81', label: 'İlde referans' },
  { icon: Building2, value: 'On binlerce', label: 'Tamamlanan proje' },
  { icon: Home, value: 'Yüz binlerce', label: 'Konut ve tesis' },
  { icon: Globe2, value: '40+', label: 'İhracat ülkesi' },
];

export function ReferencesMapSection() {
  const t = useTranslations('projectsMap');
  const tTeaser = useTranslations('projectsTeaser');

  return (
    <section id="referanslar" className="section-pad scroll-mt-20 bg-mist-50">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
              <span className="h-px w-8 bg-volt-500" aria-hidden />
              {tTeaser('eyebrow')}
              <span className="h-px w-8 bg-volt-500" aria-hidden />
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-balance text-mist-700">{t('subtitle')}</p>
          </div>
        </Reveal>

        {/* Map sits directly on the section background — no card frame */}
        <Reveal delay={0.08}>
          <div className="relative mx-auto mt-6 max-w-5xl">
            <ReferenceDotMap />
          </div>
        </Reveal>

        <div className="mx-auto mt-4 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {highlights.map((h, i) => (
            <Reveal key={h.label} delay={i * 0.06}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-mist-900/10 bg-white px-4 py-5 text-center shadow-sm transition-colors hover:border-volt-500/40">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                  <h.icon size={17} strokeWidth={1.75} />
                </span>
                <p className="mt-3 font-display text-lg font-bold leading-tight text-graphite-950">{h.value}</p>
                <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-mist-600">{h.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-8 flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-graphite-950 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-graphite-800"
            >
              {tTeaser('cta')}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
