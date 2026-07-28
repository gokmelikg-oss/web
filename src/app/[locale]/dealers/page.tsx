import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { MapPinned, GraduationCap, Megaphone } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { DealerForm } from '@/components/DealerForm';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

const icons = [MapPinned, GraduationCap, Megaphone];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'dealers.hero' });
  return pageMetadata({ locale, path: '/dealers', title: t('title'), description: t('subtitle') });
}

export default async function DealersPage() {
  const t = await getTranslations('dealers');
  const benefits = t.raw('benefits.items') as { title: string; desc: string }[];

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section-pad bg-white">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-graphite-950 sm:text-3xl">
                {t('benefits.title')}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-8">
              {benefits.map((b, i) => {
                const Icon = icons[i] ?? MapPinned;
                return (
                  <Reveal key={b.title} delay={i * 0.1} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-600">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-graphite-950">{b.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-mist-700">{b.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={0.1}>
            <DealerForm />
          </Reveal>
        </div>
      </section>

      <section id="bayi-agi" className="section-pad scroll-mt-20 bg-mist-50">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                {t('network.eyebrow')}
                <span className="h-px w-8 bg-volt-500" aria-hidden />
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                {t('network.title')}
              </h2>
              <p className="mt-4 text-mist-700">{t('network.subtitle')}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mt-10 overflow-hidden rounded-2xl border border-mist-900/10 shadow-card">
              <iframe
                src="https://www.google.com/maps?q=T%C3%BCrkiye&hl=tr&z=6&output=embed"
                title={t('network.title')}
                className="h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <span className="absolute bottom-4 start-4 rounded-full bg-graphite-950/80 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                {t('network.mapNote')}
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
