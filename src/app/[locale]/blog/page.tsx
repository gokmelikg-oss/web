import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, Clock } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { PageBreadcrumb } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { getBlogList } from '@/lib/blog';
import { getBlogUi } from '@/lib/blogUi';
import type { Locale } from '@/i18n/config';

// Admin blog yazıları eklenebildiği için ISR; admin kaydında revalidatePath ile tazelenir.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ui = getBlogUi(locale);
  return pageMetadata({ locale, path: '/blog', title: ui.metaTitle, description: ui.metaDescription });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const ui = getBlogUi(locale);
  const nf = new Intl.DateTimeFormat(ui.intlLocale, { day: 'numeric', month: 'long', year: 'numeric' });
  const sorted = await getBlogList(locale);

  return (
    <>
      <PageBreadcrumb items={[{ name: ui.crumb, path: '/blog' }]} />
      <PageHero eyebrow={ui.heroEyebrow} title={ui.heroTitle} subtitle={ui.heroSubtitle} />

      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((a, i) => (
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
                        <Clock size={11} /> {a.readMin} {ui.minRead}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-lg font-bold leading-snug text-graphite-950 transition-colors group-hover:text-volt-700">
                      {a.title}
                    </h2>
                    <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-mist-700">{a.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-graphite-950 transition-colors group-hover:text-volt-700">
                      {ui.readMore}
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
