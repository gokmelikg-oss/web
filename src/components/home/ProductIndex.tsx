'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sun, Droplets, Layers, Cable, Cpu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/Reveal';
import { familyImages } from '@/data/catalogImages';

interface CatalogFamily {
  id: string;
  title: string;
  desc: string;
  groups: { items: { name: string }[] }[];
}

/* Aile başına küratörlü meta — dev liste + görsel sahnesi için. Gerçek ürün verisi. */
const META: Record<string, { icon: typeof Sun; accent: string; spec: string; tags: string[] }> = {
  kolektorler: {
    icon: Sun,
    accent: '#f6bc32',
    spec: '9 seri · Solar Keymark',
    tags: ['Orion 100–900', 'Ultrasonik / Lazer', 'Düz yüzey absorber'],
  },
  boylerler: {
    icon: Droplets,
    accent: '#22c9e6',
    spec: '93–500 litre · Emaye kaplama',
    tags: ['Aquarious', 'Sirius', 'Açık / Kapalı devre'],
  },
  sehpalar: {
    icon: Layers,
    accent: '#4ba7ff',
    spec: 'Merkezi + Paket · Galvaniz / Alüminyum',
    tags: ['Teras & kiremit çatı', 'Helios serisi', 'OEM üretim'],
  },
  baglanti: {
    icon: Cable,
    accent: '#22c98b',
    spec: 'Fleks · Vana · Emniyet · Transfer sıvısı',
    tags: ['Fleks bağlantı kitleri', 'Emniyet kitleri', 'Solar sıvı'],
  },
  otomasyon: {
    icon: Cpu,
    accent: '#8b9be0',
    spec: 'Uzaktan izleme · Otomasyon panoları',
    tags: ['Kontaktörlü', 'Kartlı', 'AD598 kontrol'],
  },
};

export function ProductIndex() {
  const t = useTranslations('productsSection');
  const tc = useTranslations('catalog');
  const families = tc.raw('families') as CatalogFamily[];
  const [active, setActive] = useState(0);

  const current = families[active];
  const currentMeta = META[current.id] ?? META.kolektorler;

  return (
    <section id="urunler" className="section-pad scroll-mt-20 overflow-hidden bg-graphite-950 text-white">
      <div className="container-page">
        {/* Başlık */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-volt-400">
                <span className="h-px w-8 bg-volt-400" aria-hidden />
                {t('eyebrow')}
              </p>
              <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                {t('title')}
              </h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:border-volt-400 hover:text-volt-300"
            >
              {t('viewAll')}
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-10 lg:mt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* SOL — interaktif dev liste */}
          <ul className="order-2 lg:order-1">
            {families.map((family, i) => {
              const m = META[family.id] ?? META.kolektorler;
              const isActive = i === active;
              const image = familyImages[family.id];
              return (
                <li key={family.id} className="border-b border-white/10">
                  <Link
                    href={`/products#${family.id}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group relative block py-6 lg:py-7"
                  >
                    <div className="flex items-baseline gap-4 lg:gap-7">
                      <span
                        className="font-mono text-sm font-semibold tabular-nums transition-colors duration-300"
                        style={{ color: isActive ? m.accent : 'rgba(255,255,255,0.32)' }}
                      >
                        0{i + 1}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h3
                            className="font-display text-2xl font-bold tracking-tight transition-colors duration-300 sm:text-3xl lg:text-[2.6rem] lg:leading-[1.05]"
                            style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)' }}
                          >
                            {family.title}
                          </h3>
                          <ArrowUpRight
                            size={22}
                            className="shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            style={{ color: isActive ? m.accent : 'rgba(255,255,255,0.3)' }}
                          />
                        </div>

                        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                          {m.spec}
                        </p>

                        {/* MOBİL — satır içi görsel + açıklama (hover yok) */}
                        <div className="mt-4 lg:hidden">
                          {image && (
                            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-white/5">
                              <Image
                                src={image}
                                alt={`${family.title} — Şimşek Solar`}
                                fill
                                sizes="100vw"
                                className="object-cover"
                              />
                            </div>
                          )}
                          <p className="mt-3 text-sm leading-relaxed text-white/60">{family.desc}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {m.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-white/70"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Kinetik alt çizgi — hover'da soldan dolar */}
                    <span
                      className="absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                      style={{ backgroundColor: m.accent }}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* SAĞ — sticky görsel sahnesi (masaüstü). Aktif aileye göre çapraz geçiş. */}
          <div className="order-1 hidden lg:order-2 lg:block">
            <div className="sticky top-24">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border transition-colors duration-500"
                style={{ borderColor: `${currentMeta.accent}44` }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={familyImages[current.id]}
                      alt={`${current.title} — Şimşek Solar`}
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Dev hayalet numara */}
                <span
                  className="pointer-events-none absolute right-5 top-1 select-none font-display text-[9rem] font-bold leading-none text-white/10 mix-blend-overlay"
                  aria-hidden
                >
                  0{active + 1}
                </span>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/40 to-transparent" aria-hidden />

                {/* İçerik katmanı */}
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-graphite-950 shadow-lg"
                    style={{ backgroundColor: currentMeta.accent }}
                  >
                    <currentMeta.icon size={22} strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold">{current.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">{current.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {currentMeta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/products#${current.id}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                    style={{ color: currentMeta.accent }}
                  >
                    Seriyi incele
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tüm ürünler */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-graphite-950 transition-transform hover:scale-[1.03]"
            >
              {t('viewAll')}
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
