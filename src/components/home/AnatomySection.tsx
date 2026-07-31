'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/* Gerçek montaj aşama görselleri (public/anatomy/stage-1..5). Sayfa kaydırıldıkça
   aşamalar arasında yumuşak geçiş yapılır; yanında parça listesi (BOM) sırayla
   aydınlanır. Soyut SVG model yerine gerçek render'lar kullanıldı. */
const STAGES = [
  '/anatomy/stage-1.jpeg',
  '/anatomy/stage-2.jpeg',
  '/anatomy/stage-3.jpeg',
  '/anatomy/stage-4.jpeg',
  '/anatomy/stage-5.jpeg',
];

/* Her aşamanın scroll penceresi (giriş → tut → çıkış). */
const STAGE_KEYS: number[][] = [
  [0, 0, 0.14, 0.2],
  [0.16, 0.24, 0.34, 0.42],
  [0.38, 0.46, 0.54, 0.62],
  [0.58, 0.66, 0.74, 0.82],
  [0.78, 0.86, 1, 1],
];

/* Parça listesi satırlarının aydınlanma pencereleri. */
const ROW_WINDOWS: [number, number][] = [
  [0.06, 0.14],
  [0.24, 0.32],
  [0.44, 0.52],
  [0.64, 0.72],
  [0.82, 0.9],
];

function StageImage({ src, progress, keys }: { src: string; progress: MotionValue<number>; keys: number[] }) {
  const opacity = useTransform(progress, keys, keys.length === 4 ? [0, 1, 1, 0] : [0, 1]);
  const scale = useTransform(progress, [keys[0], keys[keys.length - 1]], [1.04, 1]);
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <Image src={src} alt="Orion kolektör montaj aşaması" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain p-6" />
    </motion.div>
  );
}

export function AnatomySection() {
  const t = useTranslations('anatomy');
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const layers = t.raw('layers') as { no: string; name: string; spec: string }[];
  const tb = t.raw('titleBlock') as Record<string, string>;

  const r0 = useTransform(scrollYProgress, ROW_WINDOWS[0], [0.3, 1]);
  const r1 = useTransform(scrollYProgress, ROW_WINDOWS[1], [0.3, 1]);
  const r2 = useTransform(scrollYProgress, ROW_WINDOWS[2], [0.3, 1]);
  const r3 = useTransform(scrollYProgress, ROW_WINDOWS[3], [0.3, 1]);
  const r4 = useTransform(scrollYProgress, ROW_WINDOWS[4], [0.3, 1]);
  const rows = [r0, r1, r2, r3, r4];

  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section id="anatomi" ref={sectionRef} className="relative h-[320vh] bg-graphite-950">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-20" aria-hidden />
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-page w-full">
          <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            {/* Metin + parça listesi */}
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-400">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                {t('eyebrow')}
              </p>
              <h2 className="mt-4 max-w-md text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t('title')}
              </h2>
              <p className="mt-4 hidden max-w-md leading-relaxed text-graphite-300 sm:block">{t('body')}</p>

              <ul className="mt-6 border-t border-white/10 sm:mt-8">
                {layers.map((layer, i) => (
                  <motion.li
                    key={layer.no}
                    style={{ opacity: reduce ? 1 : rows[i] }}
                    className="flex items-baseline gap-4 border-b border-white/10 py-2.5"
                  >
                    <span className="font-mono text-xs font-bold text-volt-400">{layer.no}</span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-white">{layer.name}</span>
                      <span className="mt-0.5 block font-mono text-[11px] tracking-wide text-graphite-400">
                        {layer.spec}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Görsel sahne */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
              {/* Üst başlık şeridi */}
              <div className="relative z-10 flex items-center justify-between gap-3 border-b border-graphite-700/10 bg-mist-100/90 px-4 py-2.5">
                <span className="flex items-center gap-1.5" aria-hidden>
                  <i className="h-2.5 w-2.5 rounded-full bg-mist-300" />
                  <i className="h-2.5 w-2.5 rounded-full bg-volt-400" />
                  <i className="h-2.5 w-2.5 rounded-full bg-graphite-300" />
                </span>
                <span className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-graphite-600">
                  {t('viewerLabel')}
                </span>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-mist-500 sm:block">
                  {tb.model}
                </span>
              </div>

              {/* Aşama görselleri (üst üste, geçişli) */}
              <div
                className="relative aspect-[4/3] w-full"
                style={{ background: 'radial-gradient(85% 85% at 50% 30%, #ffffff 0%, #eef1f8 80%, #e4e9f4 100%)' }}
              >
                {STAGES.map((src, i) => (
                  <StageImage
                    key={src}
                    src={src}
                    progress={scrollYProgress}
                    keys={reduce ? [0, 1] : STAGE_KEYS[i]}
                  />
                ))}

                {/* İlerleme rayı */}
                <div className="absolute inset-x-5 bottom-4 z-10 h-1 overflow-hidden rounded-full bg-graphite-700/15">
                  <motion.div
                    style={{ scaleX: reduce ? 1 : scrollYProgress }}
                    className="h-full w-full origin-left bg-volt-500 rtl:origin-right"
                  />
                </div>
              </div>

              {/* Teknik künye şeridi */}
              <div className="grid grid-cols-3 border-t border-graphite-700/10 font-mono md:grid-cols-6" aria-hidden>
                {[tb.model, tb.scale, tb.dims, tb.code, tb.rev, tb.sheet].map((cell, i) => (
                  <div
                    key={i}
                    className={`px-3 py-2 text-[9px] uppercase tracking-[0.14em] ${
                      i > 0 ? 'border-s border-graphite-700/10' : ''
                    } ${i === 0 ? 'font-bold text-volt-700' : 'text-mist-500'} ${i > 2 ? 'hidden md:block' : ''}`}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.p
            style={{ opacity: reduce ? 0 : hintOpacity }}
            className="mt-6 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-graphite-400"
          >
            <ChevronDown size={12} className="animate-bounce" />
            {t('hint')}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
