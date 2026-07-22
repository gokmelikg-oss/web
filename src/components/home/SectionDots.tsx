'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const SECTIONS = [
  { id: 'top', key: 'brand' },
  { id: 'urunler', key: 'products' },
  { id: 'sihirbaz', key: 'products' },
  { id: 'referanslar', key: 'projects' },
  { id: 'uretim', key: 'products' },
  { id: 'grup', key: 'group' },
  { id: 'iletisim', key: 'contact' },
] as const;

const LABELS: Record<string, string | null> = {
  top: null, // uses nav.brand
  sihirbaz: null, // custom below
  grup: 'group',
  vizyon: null, // custom below
  uretim: null, // custom below
  urunler: 'products',
  referanslar: 'projects',
  iletisim: 'contact',
};

export function SectionDots() {
  const tNav = useTranslations('nav');
  const tProduction = useTranslations('production');
  const tVision = useTranslations('vision');
  const tWizard = useTranslations('wizard');
  const [active, setActive] = useState('top');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  function label(id: string) {
    if (id === 'top') return tNav('brand');
    if (id === 'sihirbaz') return tWizard('eyebrow');
    if (id === 'uretim') return tProduction('eyebrow');
    if (id === 'vizyon') return tVision('eyebrow');
    const key = LABELS[id];
    return key ? tNav(key) : id;
  }

  return (
    <nav
      aria-label="Sections"
      className="fixed end-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex"
    >
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-label={label(s.id)}
          className="group relative flex h-4 w-4 items-center justify-center"
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === s.id
                ? 'h-3 w-3 bg-volt-500 shadow-glow'
                : 'h-2 w-2 bg-graphite-700/25 group-hover:bg-graphite-700/50'
            }`}
          />
          <span className="pointer-events-none absolute end-6 whitespace-nowrap rounded-md bg-graphite-900 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white opacity-0 transition-opacity group-hover:opacity-100">
            {label(s.id)}
          </span>
        </a>
      ))}
    </nav>
  );
}
