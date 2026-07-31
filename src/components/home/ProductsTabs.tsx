'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Sun, Droplets, Layers, Cable, Cpu } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/Reveal';
import { catalogImages, familyImages } from '@/data/catalogImages';

interface CatalogItem {
  name: string;
  note?: string;
  new?: boolean;
}
interface CatalogGroup {
  title?: string;
  items: CatalogItem[];
}
interface CatalogFamily {
  id: string;
  title: string;
  desc: string;
  groups: CatalogGroup[];
}

const familyIcon: Record<string, typeof Sun> = {
  kolektorler: Sun,
  boylerler: Droplets,
  sehpalar: Layers,
  baglanti: Cable,
  otomasyon: Cpu,
};

interface Shot {
  name: string;
  note?: string;
  image: string;
  isNew?: boolean;
}

function familyShots(family: CatalogFamily): Shot[] {
  const shots: Shot[] = [];
  family.groups.forEach((group, gi) => {
    const images = catalogImages[`${family.id}-${gi}`] ?? [];
    group.items.forEach((item, ii) => {
      const image = images[ii];
      if (image) shots.push({ name: item.name, note: item.note, image, isNew: item.new });
    });
  });
  return shots;
}

export function ProductsTabs() {
  const t = useTranslations('productsSection');
  const tc = useTranslations('catalog');
  const families = tc.raw('families') as CatalogFamily[];
  const [active, setActive] = useState(families[0]?.id ?? '');

  const family = families.find((f) => f.id === active) ?? families[0];
  const shots = familyShots(family).slice(0, 8);
  const fallback = familyImages[family.id];

  return (
    <section id="urunler" className="section-pad scroll-mt-20 bg-white">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                {t('eyebrow')}
              </p>
              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                {t('title')}
              </h2>
              <p className="mt-4 max-w-lg text-mist-700">{t('subtitle')}</p>
            </div>
            <Link
              href="/products"
              className="group hidden shrink-0 items-center gap-2 rounded-full border border-graphite-950/15 px-5 py-2.5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white sm:flex"
            >
              {t('viewAll')}
              <ArrowRight size={15} className="rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>

        {/* Kategori sekmeleri */}
        <div className="scroll-fade-x mt-8 flex gap-2 overflow-x-auto pb-1">
          {families.map((f) => {
            const Icon = familyIcon[f.id] ?? Sun;
            const isActive = f.id === active;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-graphite-950 text-white'
                    : 'border border-mist-900/12 bg-white text-graphite-700 hover:border-graphite-950'
                }`}
              >
                <Icon size={15} strokeWidth={1.9} className={isActive ? 'text-volt-400' : 'text-volt-600'} />
                {f.title}
              </button>
            );
          })}
        </div>

        {/* Ürün kartları */}
        <div key={active} className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {(shots.length > 0
            ? shots
            : fallback
            ? [{ name: family.title, note: family.desc, image: fallback, isNew: false }]
            : []
          ).map((shot, i) => (
            <Reveal key={`${shot.name}-${i}`} delay={Math.min(i * 0.05, 0.3)}>
              <Link
                href={`/products#${family.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist-900/10 bg-white transition-all hover:-translate-y-1 hover:border-volt-500/40 hover:shadow-card"
              >
                <div className="relative aspect-square overflow-hidden bg-mist-50">
                  <Image
                    src={shot.image}
                    alt={`${shot.name} — Şimşek Solar`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {shot.isNew && (
                    <span className="absolute end-2.5 top-2.5 rounded-full bg-volt-500 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-graphite-950">
                      {tc('newBadge').split('·')[0].trim()}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                    {family.title}
                  </p>
                  <h3 className="mt-1 font-display text-sm font-bold leading-snug text-graphite-950 transition-colors group-hover:text-volt-700">
                    {shot.name}
                  </h3>
                  {shot.note && <p className="mt-1 line-clamp-2 text-xs leading-snug text-mist-600">{shot.note}</p>}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Aktif kategoriyi tümüyle gör */}
        <div className="mt-8 flex justify-center">
          <Link
            href={`/products#${family.id}`}
            className="group inline-flex items-center gap-2 rounded-full bg-graphite-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-graphite-800"
          >
            {family.title} — tüm ürünler
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
