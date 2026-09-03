'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useEntrance } from '@/lib/useEntrance';

export function VisionSection() {
  /* Hareket azaltma tercihini dinleyen ortak giriş animasyonu. */
  const entrance = useEntrance();
  const t = useTranslations('vision');
  const lines = t.raw('lines') as string[];

  return (
    <section
      id="vizyon"
      className="relative overflow-hidden bg-graphite-950 py-32 text-white scroll-mt-20 sm:py-44"
    >
      {/* Star-dust field */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 12% 22%, rgba(255,255,255,0.5) 50%, transparent 51%), radial-gradient(1px 1px at 78% 14%, rgba(255,255,255,0.35) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 55% 34%, rgba(246,188,50,0.45) 50%, transparent 51%), radial-gradient(1px 1px at 32% 8%, rgba(255,255,255,0.3) 50%, transparent 51%), radial-gradient(1px 1px at 90% 42%, rgba(255,255,255,0.25) 50%, transparent 51%)',
        }}
        aria-hidden
      />

      {/* Sun horizon — giant rim-lit arc rising from the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center" aria-hidden>
        <div className="relative h-[38vw] max-h-80 w-[160%]">
          <div
            className="absolute inset-x-0 top-0 h-[200%] rounded-[100%]"
            style={{
              background: 'radial-gradient(50% 50% at 50% 100%, #1a244c 0%, #10182f 55%, transparent 56%)',
              boxShadow: '0 -2px 80px 8px rgba(246,188,50,0.28), 0 -1px 24px 2px rgba(248,202,92,0.5)',
              borderTop: '1.5px solid rgba(248,202,92,0.9)',
            }}
          />
          <div
            className="absolute inset-x-[10%] -top-24 h-48 opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(50% 60% at 50% 100%, rgba(246,188,50,0.5), transparent 75%)' }}
          />
        </div>
      </div>

      <div className="container-page relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-volt-400"
        >
          {t('eyebrow')}
        </motion.p>

        <div className="mx-auto mt-12 max-w-4xl text-center">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              {...entrance(24, 0.9, i * 0.18)}
              className={`text-balance font-display font-bold leading-[1.15] tracking-tight ${
                i === lines.length - 1
                  ? 'mt-6 bg-gradient-to-r from-volt-300 via-volt-500 to-volt-600 bg-clip-text text-transparent sm:mt-8'
                  : 'mt-4 text-white sm:mt-5'
              } type-h1`}
            >
              {line}
            </motion.p>
          ))}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mx-auto mt-10 max-w-xl text-balance text-sm leading-relaxed text-graphite-300 sm:text-base"
          >
            {t('footer')}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
