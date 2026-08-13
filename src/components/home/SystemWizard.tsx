'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Hotel,
  Factory,
  Users,
  ArrowLeft,
  ArrowUpRight,
  RotateCcw,
  Package,
  Calculator,
  Droplets,
  Thermometer,
  LayoutGrid,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

type Segment = 'home' | 'commercial' | 'industrial';
type Size = 's' | 'm' | 'l';

interface Option {
  id: string;
  title: string;
  desc: string;
}

const segmentIcons = { home: Home, commercial: Hotel, industrial: Factory } as const;

interface SpecChip {
  icon: typeof Droplets;
  label: string;
  value: string;
}

interface Recommendation {
  slug: string | null;
  key: string;
  specs: SpecChip[];
}

/* Öneri matrisi, hesap raporu mantığıyla hizalı: kişi başı ~50 L/gün sıcak su
   kabulüyle hane küçük/orta → Helios 200L, kalabalık → 300L; ticari ve
   endüstriyel ölçekler → projeli merkezi sistem. */
function recommend(segment: Segment, size: Size): Recommendation {
  if (segment === 'home') {
    if (size === 'l') {
      return {
        slug: 'helios-300l',
        key: 'helios-300l',
        specs: [
          { icon: Droplets, label: 'Boyler kapasitesi', value: '300 Litre' },
          { icon: LayoutGrid, label: 'Kolektör', value: '3 × Orion 300' },
          { icon: Thermometer, label: 'Günlük sıcak su', value: '~300–400 L' },
        ],
      };
    }
    return {
      slug: 'helios-200l',
      key: 'helios-200l',
      specs: [
        { icon: Droplets, label: 'Boyler kapasitesi', value: '200 Litre' },
        { icon: LayoutGrid, label: 'Kolektör', value: '2 × Orion 300' },
        { icon: Thermometer, label: 'Günlük sıcak su', value: '~200–250 L' },
      ],
    };
  }
  const scaleSpec: Record<Size, string> = {
    s: 'Butik ölçek — kolektör tarlası + merkezi boyler',
    m: 'Orta ölçek — çoklu kolektör grubu + merkezi boyler',
    l: 'Büyük ölçek — çok gruplu tarla + boyler bataryası',
  };
  return {
    slug: null,
    key: 'central',
    specs: [
      { icon: LayoutGrid, label: 'Sistem tipi', value: 'Orion × N + Aquarious' },
      { icon: Droplets, label: 'Kapasite', value: 'Projeye özel hesap' },
      { icon: Thermometer, label: 'Ölçek', value: scaleSpec[size] },
    ],
  };
}

export function SystemWizard() {
  const t = useTranslations('wizard');
  const tProducts = useTranslations('products');
  const [segment, setSegment] = useState<Segment | null>(null);
  const [size, setSize] = useState<Size | null>(null);

  const step = segment === null ? 0 : size === null ? 1 : 2;

  const segments = t.raw('segments') as Record<Segment, Option>;
  const sizes = segment ? (t.raw(`sizes.${segment}`) as Option[]) : [];

  function reset() {
    setSegment(null);
    setSize(null);
  }

  function back() {
    if (size !== null) setSize(null);
    else setSegment(null);
  }

  const rec = segment && size ? recommend(segment, size) : null;

  return (
    <section id="sihirbaz" className="section-pad scroll-mt-20 bg-mist-50">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
            {t('eyebrow')}
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-graphite-700 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-balance text-mist-600">{t('body')}</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          {/* Step indicator */}
          <div className="mb-6 flex items-center justify-center gap-2" aria-hidden>
            {[0, 1].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step > i ? 'w-8 bg-volt-500' : step === i ? 'w-8 bg-graphite-700' : 'w-4 bg-graphite-700/20'
                }`}
              />
            ))}
          </div>

          <div className="relative rounded-3xl border border-graphite-700/10 bg-white p-6 shadow-card sm:p-10">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <WizardStep key="segment" title={t('steps.segment')}>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {(Object.keys(segments) as Segment[]).map((key) => {
                      const Icon = segmentIcons[key];
                      return (
                        <OptionCard
                          key={key}
                          icon={<Icon size={26} strokeWidth={1.6} />}
                          title={segments[key].title}
                          desc={segments[key].desc}
                          onClick={() => setSegment(key)}
                        />
                      );
                    })}
                  </div>
                </WizardStep>
              )}

              {step === 1 && segment && (
                <WizardStep key="size" title={t('steps.size')}>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {sizes.map((opt) => (
                      <OptionCard
                        key={opt.id}
                        icon={<Users size={26} strokeWidth={1.6} />}
                        title={opt.title}
                        desc={opt.desc}
                        onClick={() => setSize(opt.id as Size)}
                      />
                    ))}
                  </div>
                </WizardStep>
              )}

              {step === 2 && rec && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-volt-700">
                    {t('resultEyebrow')}
                  </p>

                  {/* Seçim özeti */}
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                    {[segments[segment!].title, sizes.find((s) => s.id === size)?.title]
                      .filter(Boolean)
                      .map((label) => (
                        <span
                          key={label as string}
                          className="rounded-full border border-graphite-700/15 bg-mist-50 px-3 py-1 text-xs font-semibold text-mist-700"
                        >
                          {label}
                        </span>
                      ))}
                  </div>

                  <div className="mt-5 rounded-2xl bg-graphite-gradient p-7 text-white sm:p-9">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-volt-400">
                          {rec.slug
                            ? (tProducts(`items.${rec.slug}.name`) as string)
                            : t('centralTitle')}
                        </p>
                        <h3 className="mt-2 max-w-md font-display text-2xl font-bold sm:text-3xl">
                          {rec.slug ? tProducts(`items.${rec.slug}.tagline`) : t('centralModel')}
                        </h3>
                      </div>
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                        <Package size={26} strokeWidth={1.5} />
                      </span>
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-graphite-200">
                      {t(`results.${rec.key}`)}
                    </p>

                    {/* Sistem özet kartları */}
                    <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
                      {rec.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3"
                        >
                          <div className="flex items-center gap-2 text-volt-400">
                            <spec.icon size={14} strokeWidth={1.75} />
                            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em]">
                              {spec.label}
                            </span>
                          </div>
                          <p className="mt-1.5 text-sm font-semibold leading-snug text-white">{spec.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        /* Sihirbazın önerdiği sistem teklif formuna taşınır. */
                        href={`/teklif-al?urun=${encodeURIComponent(t(`results.${rec.key}`))}`}
                        className="inline-flex items-center gap-2 rounded-full bg-solar-gradient px-6 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
                      >
                        {t('resultCta')}
                        <ArrowUpRight size={15} />
                      </Link>
                      {rec.slug && (
                        <Link
                          href={`/products/${rec.slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                          {t('resultDetail')}
                          <ArrowUpRight size={15} />
                        </Link>
                      )}
                      <Link
                        href="/calculator"
                        className="inline-flex items-center gap-2 rounded-full border border-volt-500/40 bg-volt-500/10 px-6 py-3 text-sm font-semibold text-volt-400 transition-colors hover:bg-volt-500/20"
                      >
                        <Calculator size={15} />
                        Detaylı hesap raporu al
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {step > 0 && (
              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist-600 transition-colors hover:text-graphite-700"
                >
                  <ArrowLeft size={15} className="rtl:rotate-180" />
                  {t('back')}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist-600 transition-colors hover:text-graphite-700"
                >
                  <RotateCcw size={14} />
                  {t('restart')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function WizardStep({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="text-center font-display text-xl font-bold text-graphite-700 sm:text-2xl">{title}</h3>
      <div className="mt-7">{children}</div>
    </motion.div>
  );
}

function OptionCard({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center rounded-2xl border border-graphite-700/12 bg-mist-50 px-5 py-7 text-center transition-all hover:-translate-y-1 hover:border-volt-500 hover:bg-white hover:shadow-card"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-volt-100 text-volt-700 transition-colors group-hover:bg-volt-500 group-hover:text-graphite-900">
        {icon}
      </span>
      <span className="mt-4 font-display text-base font-bold text-graphite-700">{title}</span>
      <span className="mt-1 text-xs text-mist-500">{desc}</span>
    </button>
  );
}
