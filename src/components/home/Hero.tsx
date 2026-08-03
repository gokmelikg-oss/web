'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, ShieldCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { CountUp } from '@/components/CountUp';

const NUMBER_LOCALE: Record<string, string> = { tr: 'tr-TR', en: 'en-US', ar: 'ar-EG' };

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const stats = t.raw('stats') as { value: number; suffix: string; label: string }[];

  return (
    <section id="top" className="relative -mt-20 overflow-hidden bg-white pt-20">
      {/* Açık tonlu, yumuşak ışık huzmeleri */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(48% 55% at 88% 0%, rgba(246,188,50,0.20), transparent 60%), radial-gradient(45% 55% at 0% 100%, rgba(75,167,255,0.14), transparent 55%), linear-gradient(180deg, #fbfcfe 0%, #ffffff 45%)',
        }}
        aria-hidden
      />
      {/* İnce teknik ızgara — çok hafif */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-[0.5] fade-mask-b" aria-hidden />

      <div className="container-page relative z-10 grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16 lg:py-0">
        {/* SOL — editoryal metin */}
        <div className="max-w-2xl text-center lg:text-start">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-volt-700 lg:justify-start"
          >
            <span className="h-px w-8 bg-volt-500" aria-hidden />
            {t('eyebrow')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-balance font-display text-4xl font-bold leading-[1.06] tracking-tight text-graphite-950 sm:text-6xl lg:text-[4.1rem]"
          >
            {t('titleLine1')}
            <br />
            <span className="bg-gradient-to-r from-amber-500 via-volt-600 to-volt-700 bg-clip-text text-transparent">
              {t('titleLine2')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-mist-700 sm:text-lg lg:mx-0"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start"
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-solar-gradient px-8 py-3.5 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
            >
              {t('ctaPrimary')}
              <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-graphite-950/15 px-8 py-3.5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white"
            >
              {t('ctaSecondary')}
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mx-auto mt-12 grid w-full max-w-xl grid-cols-3 divide-x divide-graphite-900/10 overflow-hidden rounded-2xl border border-graphite-900/10 bg-white/70 backdrop-blur-sm rtl:divide-x-reverse lg:mx-0"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center px-4 py-4 text-center">
                <p className="font-tabular font-display text-2xl font-bold text-graphite-950 sm:text-3xl">
                  <CountUp value={s.value} suffix={s.suffix} locale={NUMBER_LOCALE[locale] ?? 'tr-TR'} />
                </p>
                <p className="mt-1.5 font-mono text-[9.5px] uppercase leading-tight tracking-[0.14em] text-mist-600">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* SAĞ — premium görsel kartı */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden w-full max-w-xl lg:block"
        >
          {/* dekoratif accent blob */}
          <div className="pointer-events-none absolute -end-6 -top-6 h-40 w-40 rounded-full bg-volt-400/25 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-8 -start-8 h-44 w-44 rounded-full bg-sky-400/15 blur-3xl" aria-hidden />

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-graphite-950/10 shadow-2xl">
            <Image
              src="/products/merkezi-sistem-saha.jpg"
              alt="Şimşek Solar — sahada kurulu merkezi güneş enerjisi sistemi"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 40vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/35 via-transparent to-transparent" aria-hidden />

            {/* yüzen sertifika rozeti */}
            <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl border border-white/40 bg-white/85 p-3.5 shadow-lg backdrop-blur-md">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-500 text-graphite-950">
                <ShieldCheck size={22} strokeWidth={1.9} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-graphite-950">Solar Keymark · CE · TSE</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mist-600">
                  Sertifikalı üretim · 1992
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* aşağı kaydır */}
      <motion.a
        href="#urunler"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute inset-x-0 bottom-6 z-10 mx-auto flex w-max flex-col items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.26em] text-mist-500 transition-colors hover:text-graphite-950"
        aria-label="Aşağı kaydır"
      >
        <ChevronDown size={14} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
