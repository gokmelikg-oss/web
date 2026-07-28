import Image from 'next/image';

/* Gerçek saha ve üretim kareleri — yavaş, kesintisiz kayan görsel şerit.
   Marquee CSS'i (animate-marquee) tekrar kullanılır; iki kopya yan yana dizilir. */
const PHOTOS = [
  { src: '/projects/saha-1.jpg', label: 'Merkezi sistem — saha' },
  { src: '/products/fabrika-1.jpg', label: 'Üretim tesisi' },
  { src: '/projects/saha-2.jpg', label: 'Çatı uygulaması' },
  { src: '/products/merkezi-sistem-saha.jpg', label: 'Kolektör tarlası' },
  { src: '/projects/saha-3.jpg', label: 'Toplu konut projesi' },
  { src: '/products/fabrika-2.jpg', label: 'Üretim hattı' },
  { src: '/projects/saha-4.jpg', label: 'Teras montajı' },
  { src: '/projects/saha-5.jpg', label: 'Devreye alma' },
];

export function PhotoShowcase() {
  return (
    <section className="overflow-hidden bg-graphite-950 py-14 text-white sm:py-20" aria-label="Sahadan kareler">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-400">
              <span className="h-px w-8 bg-volt-500" aria-hidden />
              Sahadan &amp; Üretimden
            </p>
            <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Üretim hattından saha uygulamasına
            </h2>
          </div>
        </div>
      </div>

      <div
        className="marquee-paused group relative mt-10 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        }}
      >
        <div className="animate-marquee flex w-max gap-4 pe-4" style={{ animationDuration: '55s' }}>
          {[...PHOTOS, ...PHOTOS].map((photo, i) => (
            <figure
              key={i}
              className="group/card relative h-56 w-80 shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:h-64 sm:w-96"
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                sizes="384px"
                className="object-cover transition-transform duration-700 group-hover/card:scale-105"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/80 via-transparent to-transparent"
                aria-hidden
              />
              <figcaption className="absolute bottom-3 start-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90">
                {photo.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
