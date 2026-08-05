import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { ArticleJsonLd, PageBreadcrumb } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { articles } from '@/data/news';
import { getBlogList, getBlogPost } from '@/lib/blog';
import type { Locale } from '@/i18n/config';

// Statik yazılar önceden üretilir; admin yazıları talep üzerine (ISR).
export const dynamicParams = true;
export const revalidate = 3600;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getBlogPost(slug);
  if (!article) return {};
  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: article.title,
    description: article.excerpt,
    images: article.cover ? [article.cover] : undefined,
  });
}

const nf = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = await getBlogPost(slug);
  if (!article) notFound();

  const related = (await getBlogList()).filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <ArticleJsonLd
        locale={locale}
        slug={article.slug}
        title={article.title}
        description={article.excerpt}
        datePublished={article.date}
        image={article.cover}
      />
      <PageBreadcrumb
        items={[
          { name: 'Blog', path: '/blog' },
          { name: article.title, path: `/blog/${article.slug}` },
        ]}
      />

      {/* Başlık */}
      <section className="relative -mt-20 overflow-hidden bg-graphite-950 pb-16 pt-40 text-white sm:pb-20 sm:pt-48">
        <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-40 fade-mask-b" aria-hidden />
        <div className="container-page relative">
          <Link href="/blog" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-graphite-300 transition-colors hover:text-white">
            <ArrowLeft size={13} /> Blog
          </Link>
          <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-volt-400">
            <span>{article.category}</span>
            <span className="h-1 w-1 rounded-full bg-volt-500" aria-hidden />
            <span>{nf.format(new Date(article.date))}</span>
            <span className="flex items-center gap-1 text-graphite-400">
              <Clock size={11} /> {article.readMin} dk okuma
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-mist-300">{article.excerpt}</p>
        </div>
      </section>

      {/* İçerik */}
      <article className="section-pad bg-white">
        <div className="container-page max-w-3xl">
          {article.cover && (
            <Reveal>
              <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl">
                <Image src={article.cover} alt={article.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
              </div>
            </Reveal>
          )}

          {article.body.map((section) => (
            <Reveal key={section.heading} className="mt-10 first:mt-0">
              <h2 className="font-display text-xl font-bold text-graphite-950 sm:text-2xl">{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 leading-relaxed text-mist-700">
                  {p}
                </p>
              ))}
            </Reveal>
          ))}

          {/* CTA */}
          <Reveal>
            <div className="mt-14 flex flex-col items-start gap-4 rounded-3xl bg-graphite-gradient p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <h3 className="font-display text-xl font-bold">Projeniz için çözüm mü arıyorsunuz?</h3>
                <p className="mt-2 text-sm text-graphite-300">Mühendislik ekibimiz doğru sistemi birlikte belirleyelim.</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-solar-gradient px-6 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
              >
                İletişime geç
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </article>

      {/* İlgili yazılar */}
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-graphite-950">Diğer yazılar</h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist-900/10 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-volt-500/40 hover:shadow-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-mist-100">
                  {a.cover && (
                    <Image src={a.cover} alt={a.title} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-mist-500">{a.category}</span>
                  <h3 className="mt-2 font-display text-base font-bold leading-snug text-graphite-950 transition-colors group-hover:text-volt-700">
                    {a.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
