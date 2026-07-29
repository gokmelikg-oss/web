import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { SOCIAL } from '@/lib/seo';

/* Instagram bölümü. Canlı feed (Instagram Basic Display API) için erişim jetonu
   gerektiğinden, şimdilik kendi kurumsal görsellerimizle profile yönlendirir.
   Gerçek gönderiler gelince `posts` dizisini {image, permalink} ile doldurmak
   yeterli — tasarım değişmez. */
const posts = [
  { image: '/products/merkezi-sistem-saha.jpg' },
  { image: '/projects/saha-1.jpg' },
  { image: '/products/orion-500.jpg' },
  { image: '/projects/saha-3.jpg' },
  { image: '/products/fabrika-1.jpg' },
  { image: '/projects/saha-4.jpg' },
];

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SocialFeed() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
              <span className="h-px w-8 bg-volt-500" aria-hidden />
              Instagram
            </p>
            <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
              Sahadan ve üretimden kareler
            </h2>
            <p className="mt-3 max-w-md text-mist-700">
              Projelerimizi, ürünlerimizi ve üretim sürecimizi Instagram’da paylaşıyoruz.
            </p>
          </div>
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-graphite-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-graphite-800"
          >
            <InstagramGlyph className="h-4 w-4" />
            @simsek.solar
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {posts.map((post, i) => (
            <a
              key={i}
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-mist-100"
              aria-label="Instagram"
            >
              <Image
                src={post.image}
                alt="Şimşek Solar Instagram"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-graphite-950/0 opacity-0 transition-all duration-300 group-hover:bg-graphite-950/40 group-hover:opacity-100">
                <InstagramGlyph className="h-7 w-7 text-white" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
