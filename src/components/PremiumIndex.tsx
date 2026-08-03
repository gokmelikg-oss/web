'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  GraduationCap,
  Ruler,
  FileText,
  Calculator,
  Sun,
  Droplets,
  Layers,
  Cable,
  Cpu,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/Reveal';

/* Sunucu bileşenleri ikon fonksiyonu geçemez → string anahtarla çözülür. */
const ICONS = {
  egitim: GraduationCap,
  muhendislik: Ruler,
  dokuman: FileText,
  hesaplama: Calculator,
  kolektor: Sun,
  boyler: Droplets,
  sehpa: Layers,
  baglanti: Cable,
  otomasyon: Cpu,
} as const;

export type PremiumIconKey = keyof typeof ICONS;

export interface PremiumIndexItem {
  id: string;
  title: string;
  desc: string;
  href: string;
  accent: string;
  iconKey: PremiumIconKey;
  meta?: string;
  tags?: string[];
  image?: string;
}

/* Ürünler bölümüyle aynı imza: koyu editoryal, dev numaralı liste + hover'da
   senkron açığa çıkan sticky panel. Görsel varsa görsel, yoksa ikonlu detay kartı. */
export function PremiumIndex({
  eyebrow,
  title,
  items,
  ctaLabel,
  ctaHref,
  actionLabel = 'İncele',
}: {
  eyebrow: string;
  title: string;
  items: PremiumIndexItem[];
  ctaLabel?: string;
  ctaHref?: string;
  actionLabel?: string;
}) {
  const [active, setActive] = useState(0);
  const current = items[active];
  const CurrentIcon = ICONS[current.iconKey];

  return (
    <section className="section-pad overflow-hidden bg-graphite-950 text-white">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-volt-400">
                <span className="h-px w-8 bg-volt-400" aria-hidden />
                {eyebrow}
              </p>
              <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">
                {title}
              </h2>
            </div>
            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:border-volt-400 hover:text-volt-300"
              >
                {ctaLabel}
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-1" />
              </Link>
            )}
          </div>
        </Reveal>

        <div className="mt-4 grid gap-10 lg:mt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* SOL — dev interaktif liste */}
          <ul className="order-2 lg:order-1">
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.id} className="border-b border-white/10">
                  <Link
                    href={item.href}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group relative block py-6 lg:py-7"
                  >
                    <div className="flex items-baseline gap-4 lg:gap-7">
                      <span
                        className="font-mono text-sm font-semibold tabular-nums transition-colors duration-300"
                        style={{ color: isActive ? item.accent : 'rgba(255,255,255,0.32)' }}
                      >
                        0{i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h3
                            className="font-display text-2xl font-bold tracking-tight transition-colors duration-300 sm:text-3xl lg:text-[2.4rem] lg:leading-[1.06]"
                            style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)' }}
                          >
                            {item.title}
                          </h3>
                          <ArrowUpRight
                            size={22}
                            className="shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            style={{ color: isActive ? item.accent : 'rgba(255,255,255,0.3)' }}
                          />
                        </div>
                        {item.meta && (
                          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                            {item.meta}
                          </p>
                        )}

                        {/* MOBİL — satır içi detay */}
                        <div className="mt-3 lg:hidden">
                          {item.image && (
                            <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-xl bg-white/5">
                              <Image src={item.image} alt={item.title} fill sizes="100vw" className="object-cover" />
                            </div>
                          )}
                          <p className="text-sm leading-relaxed text-white/60">{item.desc}</p>
                          {item.tags && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {item.tags.map((tag) => (
                                <span key={tag} className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-white/70">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <span
                      className="absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                      style={{ backgroundColor: item.accent }}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* SAĞ — sticky panel (masaüstü) */}
          <div className="order-1 hidden lg:order-2 lg:block">
            <div className="sticky top-24">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border transition-colors duration-500"
                style={{ borderColor: `${current.accent}44` }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {current.image ? (
                      <Image src={current.image} alt={current.title} fill sizes="40vw" className="object-cover" />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ background: `radial-gradient(120% 120% at 15% 10%, ${current.accent}2e, transparent 55%), linear-gradient(160deg, #1a2233, #0f141f)` }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                <span
                  className="pointer-events-none absolute right-5 top-1 select-none font-display text-[9rem] font-bold leading-none text-white/10 mix-blend-overlay"
                  aria-hidden
                >
                  0{active + 1}
                </span>

                {!current.image && (
                  <span
                    className="absolute left-7 top-8 flex h-16 w-16 items-center justify-center rounded-2xl text-graphite-950 shadow-lg"
                    style={{ backgroundColor: current.accent }}
                  >
                    <CurrentIcon size={30} strokeWidth={1.8} />
                  </span>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/40 to-transparent" aria-hidden />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  {current.image && (
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-graphite-950 shadow-lg"
                      style={{ backgroundColor: current.accent }}
                    >
                      <CurrentIcon size={22} strokeWidth={1.9} />
                    </span>
                  )}
                  <h3 className="mt-4 font-display text-2xl font-bold">{current.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">{current.desc}</p>
                  {current.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {current.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link
                    href={current.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                    style={{ color: current.accent }}
                  >
                    {actionLabel}
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
