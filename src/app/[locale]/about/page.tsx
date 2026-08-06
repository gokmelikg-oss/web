import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import {
  Factory,
  ShieldCheck,
  Globe2,
  Target,
  Eye,
  Quote,
  PenLine,
  BadgeCheck,
  ArrowUpRight,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { PageBreadcrumb } from '@/components/JsonLd';
import { getContent } from '@/lib/content';
import { txt } from '@/lib/siteTexts';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

// Admin metin düzenlemeleri için ISR.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.hero' });
  return pageMetadata({ locale, path: '/about', title: t('title'), description: t('subtitle') });
}

const valueIcons = [ShieldCheck, Factory, Globe2];

interface Cert {
  label: string;
  scope?: string;
  file?: string;
}

/* Kurucunun mektubundan özet notlar; tam metin /founder sayfasında. */
const founderNotes = [
  'Her şey basit ama güçlü bir hedefle başladı: Doğru işi, en iyi şekilde yapmak. İlk günden itibaren odağımız kalite, güven ve sürdürülebilir üretim oldu.',
  'Solar termal sistemlerle attığımız ilk adım, markamızın Türkiye’de ve uluslararası pazarlarda çıkacağı yolculuğun güçlü bir işaretiydi. Yıllar içinde üretim kapasitemiz kadar etki alanımız da büyüdü; grup şirketlerimizle üretimden sahaya uzanan güçlü bir ekosistem kurduk.',
];

export default async function AboutPage() {
  const t = await getTranslations('about');
  const tCerts = await getTranslations('certs');
  const { texts } = await getContent();
  const stats = t.raw('stats') as { value: string; label: string }[];
  const values = t.raw('values.items') as { title: string; desc: string }[];
  const certs = tCerts.raw('items') as Cert[];

  return (
    <>
      <PageBreadcrumb items={[{ name: 'Hakkımızda', path: '/about' }]} />
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      {/* Hikayemiz */}
      <section className="section-pad bg-white">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-graphite-950">
              {txt(texts, 'about.story.title', t('story.title'))}
            </h2>
            <p className="mt-6 text-balance leading-relaxed text-mist-700">{txt(texts, 'about.story.body1', t('story.body1'))}</p>
            <p className="mt-4 text-balance leading-relaxed text-mist-700">{txt(texts, 'about.story.body2', t('story.body2'))}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-mist-900/8 bg-mist-50 p-6">
                  <p className="font-display text-3xl font-bold text-graphite-950">{s.value}</p>
                  <p className="mt-2 text-sm text-mist-700">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Kurucumuzdan */}
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                Kurucumuzdan
              </p>
              <figure className="relative mt-6 rounded-3xl bg-graphite-gradient p-9 text-white sm:p-11">
                <Quote size={38} className="absolute -top-5 start-8 rounded-2xl bg-volt-500 p-2 text-graphite-950" aria-hidden />
                <blockquote className="mt-2 font-display text-lg font-semibold leading-relaxed sm:text-2xl">
                  &ldquo;Bizim için her şey 1992&apos;de Mersin&apos;deki küçük bir atölyede başladı. O atölyede
                  bugün Şimşek Grup&apos;un temellerini oluşturan cesaret, emek ve büyük bir vizyon vardı.&rdquo;
                </blockquote>
              </figure>
            </Reveal>

            <div className="mt-8 space-y-5">
              {founderNotes.map((p, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="leading-[1.85] text-mist-800">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-mist-900/10 pt-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-volt-100 text-volt-700">
                    <PenLine size={22} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold text-graphite-950">Sinan Şimşek</p>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-600">
                      Şimşek Grup Kurucu &amp; Başkanı
                    </p>
                  </div>
                </div>
                <Link
                  href="/founder"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-graphite-950 transition-colors hover:text-volt-700"
                >
                  Mektubun tamamını okuyun
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-3xl bg-graphite-gradient p-9 text-white sm:p-11">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-volt-500 text-graphite-950">
                  <Target size={26} strokeWidth={1.75} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold sm:text-3xl">Misyonumuz</h2>
                <p className="mt-4 font-display text-lg font-semibold leading-relaxed text-volt-400">
                  &ldquo;{txt(texts, 'about.mission.quote')}&rdquo;
                </p>
                <p className="mt-4 leading-relaxed text-graphite-200">{txt(texts, 'about.mission.body')}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-3xl border border-graphite-700/10 bg-mist-50 p-9 sm:p-11">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-volt-100 text-volt-700">
                  <Eye size={26} strokeWidth={1.75} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold text-graphite-950 sm:text-3xl">Vizyonumuz</h2>
                <p className="mt-4 font-display text-lg font-semibold leading-relaxed text-volt-700">
                  &ldquo;{txt(texts, 'about.vision.quote')}&rdquo;
                </p>
                <p className="mt-4 leading-relaxed text-mist-700">{txt(texts, 'about.vision.body')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Kalite Belgelerimiz */}
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <Reveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                Kalite Belgelerimiz
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                Uluslararası standartlarda belgelendirilmiş kalite
              </h2>
              <p className="mt-4 text-mist-700">
                Ürünlerimiz CE, TSE ve Solar Keymark başta olmak üzere ulusal ve uluslararası kalite
                belgelerine sahiptir. Belgelere tıklayarak ulaşabilirsiniz.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {certs.map((c, i) => {
              const inner = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                    <BadgeCheck size={18} strokeWidth={1.85} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-graphite-950">{c.label}</span>
                    {c.scope && <span className="mt-0.5 block text-[11px] leading-snug text-mist-600">{c.scope}</span>}
                  </span>
                  {c.file && <ArrowUpRight size={15} className="ms-auto shrink-0 text-mist-400 transition-colors group-hover:text-volt-700" />}
                </>
              );
              const cls =
                'group flex h-full items-center gap-3 rounded-2xl border border-mist-900/10 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-volt-500/40 hover:shadow-sm';
              return (
                <Reveal key={`${c.label}-${i}`} delay={i * 0.03}>
                  {c.file ? (
                    <a href={c.file} target="_blank" rel="noopener noreferrer" title={tCerts('viewLabel')} className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8">
              <Link
                href="/kalite-politikasi"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-graphite-950 transition-colors hover:text-volt-700"
              >
                Kalite politikamızı inceleyin
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section className="section-pad bg-mist-900 text-mist-50">
        <div className="container-page">
          <Reveal>
            <h2 className="max-w-lg text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t('values.title')}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] sm:grid-cols-3">
            {values.map((item, i) => {
              const Icon = valueIcons[i] ?? ShieldCheck;
              return (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="group relative h-full bg-mist-900 p-7 transition-colors duration-300 hover:bg-graphite-900">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-volt-500/15 text-volt-400 transition-colors group-hover:bg-volt-500 group-hover:text-graphite-950">
                        <Icon size={22} strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-3xl font-bold text-white/10 transition-colors duration-300 group-hover:text-volt-400/50">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-mist-300">{item.desc}</p>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-volt-500 transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden />
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-solar-gradient px-7 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
              >
                Bizimle iletişime geçin
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
