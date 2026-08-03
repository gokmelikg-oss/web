'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sun, BatteryCharging, Wind, Layers } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

interface Company {
  id: string;
  name: string;
  tag: string;
  desc: string;
}

const companyVisual: Record<string, { logo?: string; icon: typeof Sun; accent: string; bar: string }> = {
  solar: { logo: '/brand/simsek-solar.png', icon: Sun, accent: 'bg-volt-100 text-volt-700', bar: '#f6bc32' },
  lipus: { logo: '/brand/lipus.png', icon: BatteryCharging, accent: 'bg-emerald-50 text-emerald-600', bar: '#22c98b' },
  yenilenebilir: { icon: Wind, accent: 'bg-sky-50 text-sky-600', bar: '#4ba7ff' },
  smk: { icon: Layers, accent: 'bg-mist-100 text-mist-600', bar: '#8b9be0' },
};

export function GroupSection() {
  const t = useTranslations('group');
  const companies = t.raw('companies') as Company[];

  return (
    <section id="grup" className="section-pad relative overflow-hidden bg-white scroll-mt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-graphite-700/20 to-transparent" aria-hidden />
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
              <span className="h-px w-8 bg-volt-500" aria-hidden />
              {t('eyebrow')}
              <span className="h-px w-8 bg-volt-500" aria-hidden />
            </p>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-graphite-700 sm:text-5xl">
              {t('title')}
            </h2>
            <p className="mt-5 text-balance leading-relaxed text-mist-600">{t('body')}</p>
          </div>
        </Reveal>

        {/* Parent company — wide horizontal band */}
        <Reveal delay={0.05}>
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-graphite-700/10 bg-graphite-gradient px-8 py-8 shadow-card sm:px-12 sm:py-10">
              <div className="pointer-events-none absolute -end-20 -top-20 h-64 w-64 rounded-full bg-volt-500/15 blur-3xl" aria-hidden />
              <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
                <div className="flex shrink-0 items-center justify-center rounded-2xl bg-white px-8 py-5">
                  <Image
                    src="/brand/simsek-grup.png"
                    alt="Şimşek Grup"
                    width={1000}
                    height={1000}
                    className="h-24 w-auto object-contain sm:h-28"
                  />
                </div>
                <div className="hidden h-24 w-px bg-white/15 sm:block" aria-hidden />
                <div className="text-center sm:text-start">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-volt-400">
                    {t('parentLabel')}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">Şimşek Grup</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-graphite-200">
                    Güneş enerjisinden akıllı ev teknolojilerine, yenilenebilir enerjiden alüminyum üretimine;
                    birbirini tamamlayan dört şirketi tek vizyon altında toplayan ana yapı.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Holding → subsidiaries: soft fan-out beams instead of a rigid tree */}
        <Reveal delay={0.1}>
          <div className="hidden justify-center lg:flex" aria-hidden>
            <svg viewBox="0 0 1000 90" className="h-20 w-full max-w-5xl" fill="none">
              <defs>
                <linearGradient id="grp-beam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f6bc32" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#f6bc32" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              {[125, 375, 625, 875].map((x) => (
                <path
                  key={x}
                  d={`M 500 6 C 500 50, ${x} 38, ${x} 86`}
                  stroke="url(#grp-beam)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ))}
              <circle cx="500" cy="6" r="4" fill="#f6bc32" />
              {[125, 375, 625, 875].map((x) => (
                <circle key={x} cx={x} cy="86" r="3" fill="#f6bc32" opacity="0.7" />
              ))}
            </svg>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4">
          {companies.map((c, i) => {
            const visual = companyVisual[c.id] ?? companyVisual.smk;
            const Icon = visual.icon;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-graphite-700/10 bg-mist-50 p-7 shadow-card transition-all hover:-translate-y-1.5 hover:border-volt-500/50 hover:bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 items-center">
                    {visual.logo ? (
                      <Image
                        src={visual.logo}
                        alt={c.name}
                        width={400}
                        height={120}
                        className="h-10 w-auto object-contain object-left rtl:object-right"
                      />
                    ) : (
                      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${visual.accent}`}>
                        <Icon size={22} strokeWidth={1.75} />
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-2xl font-bold text-graphite-700/10 transition-colors duration-300 group-hover:text-graphite-700/25">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-graphite-700">{c.name}</h3>
                <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-volt-700">
                  {c.tag}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mist-600">{c.desc}</p>
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  style={{ backgroundColor: visual.bar }}
                  aria-hidden
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
