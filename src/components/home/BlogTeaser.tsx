import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/Reveal';
import { articles } from '@/data/news';

const nf = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

/* Ana sayfa blog önizlemesi — son 3 yazı. Bilgi merkezine trafik + tazelik sinyali. */
export function BlogTeaser() {
  const latest = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

  return (
    <section className="section-pad bg-mist-50">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                Bilgi Merkezi
              </p>
              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                Güneş enerjisinde rehberler ve içerikler
              </h2>
            </div>
            <Link
              href="/blog"
              className="group hidden shrink-0 items-center gap-2 rounded-full border border-graphite-950/15 px-5 py-2.5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white sm:flex"
            >
              Tüm yazılar
              <ArrowRight size={15} className="rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist-900/10 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-volt-500/40 hover:shadow-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-mist-100">
                  {a.cover && (
                    <Image
                      src={a.cover}
                      alt={a.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute start-3 top-3 rounded-full bg-white/95 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-graphite-900 backdrop-blur-sm">
                    {a.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-mist-500">
                    <span>{nf.format(new Date(a.date))}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {a.readMin} dk
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug text-graphite-950 transition-colors group-hover:text-volt-700">
                    {a.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-relaxed text-mist-700">{a.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-graphite-950 transition-colors group-hover:text-volt-700">
                    Devamını oku
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
