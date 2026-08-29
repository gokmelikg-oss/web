'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion , useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { CountUp } from '@/components/CountUp';
import { MeshBackground } from '@/components/home/MeshBackground';
import { txt } from '@/lib/siteTexts';

const NUMBER_LOCALE: Record<string, string> = { tr: 'tr-TR', en: 'en-US', ar: 'ar-EG' };

export function Hero({ texts }: { texts?: Record<string, string> }) {
  /* Hareket azaltma tercihi: hero giriş animasyonunda kayma yapılmaz,
     yalnızca kısa bir opaklık geçişi kalır (WCAG 2.3.3). */
  const reduce = useReducedMotion();
  const rise = (y: number, duration: number, delay = 0) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
      : { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { duration, delay } };
  const t = useTranslations('hero');
  const locale = useLocale();
  const stats = t.raw('stats') as { value: number; suffix: string; label: string }[];

  return (
    <section id="top" className="relative -mt-20 overflow-hidden bg-graphite-950 pt-20 text-white">
      {/* Canlı renk mesh arka planı */}
      <MeshBackground />
      <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-20 fade-mask-b" aria-hidden />

      {/* Star dust */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 15% 18%, rgba(255,255,255,0.45) 50%, transparent 51%), radial-gradient(1px 1px at 82% 12%, rgba(255,255,255,0.3) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 62% 26%, rgba(246,188,50,0.4) 50%, transparent 51%), radial-gradient(1px 1px at 28% 34%, rgba(255,255,255,0.25) 50%, transparent 51%)',
        }}
        aria-hidden
      />

      {/* Sun horizon glow behind the model */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center" aria-hidden>
        <div className="relative h-[34vw] max-h-72 w-[170%]">
          <div
            className="absolute inset-x-0 top-0 h-[200%] rounded-[100%]"
            style={{
              background: 'radial-gradient(50% 50% at 50% 100%, #1a244c 0%, #10182f 55%, transparent 56%)',
              boxShadow: '0 -2px 90px 10px rgba(246,188,50,0.22), 0 -1px 26px 2px rgba(248,202,92,0.4)',
              borderTop: '1.5px solid rgba(248,202,92,0.75)',
            }}
          />
        </div>
      </div>

      <div className="container-page relative z-10 flex min-h-[calc(100vh)] flex-col items-center justify-center py-24 text-center sm:py-28">
        <motion.p
          {...rise(12, 0.7)}
          className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-volt-400"
        >
          {txt(texts, 'hero.eyebrow', t('eyebrow'))}
        </motion.p>

        <motion.h1
          {...rise(24, 0.9, 0.15)}
          className="mt-7 max-w-4xl text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {txt(texts, 'hero.titleLine1', t('titleLine1'))}
          <br />
          <span className="bg-gradient-to-r from-volt-300 via-volt-500 to-volt-600 bg-clip-text text-transparent">
            {txt(texts, 'hero.titleLine2', t('titleLine2'))}
          </span>
        </motion.h1>

        <motion.p
          {...rise(20, 0.8, 0.3)}
          className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-graphite-300 sm:text-lg"
        >
          {txt(texts, 'hero.subtitle', t('subtitle'))}
        </motion.p>

        <motion.div
          {...rise(20, 0.8, 0.42)}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-solar-gradient px-8 py-3.5 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
          >
            {t('ctaPrimary')}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
          <Link
            href="/teklif-al"
            className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            {t('ctaSecondary')}
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          {...rise(24, 0.8, 0.6)}
          className="mt-16 grid w-full max-w-2xl grid-cols-3 divide-x divide-white/12 border border-white/12 bg-white/[0.03] backdrop-blur-sm rtl:divide-x-reverse"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center px-4 py-3.5 text-center">
              <p className="font-tabular font-display text-2xl font-bold text-white sm:text-3xl">
                <CountUp value={s.value} suffix={s.suffix} locale={NUMBER_LOCALE[locale] ?? 'tr-TR'} />
              </p>
              <p className="mt-1.5 font-mono text-[9.5px] uppercase leading-tight tracking-[0.14em] text-graphite-400">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#grup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-12 flex flex-col items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.26em] text-graphite-400 transition-colors hover:text-white"
        >
          <ChevronDown size={14} className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
