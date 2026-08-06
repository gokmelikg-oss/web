import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { ProvinceExplorer } from '@/components/ProvinceExplorer';
import { PageBreadcrumb } from '@/components/JsonLd';
import { Link } from '@/i18n/navigation';
import { pageMetadata } from '@/lib/seo';
import { getProvincesUi } from '@/lib/provincesUi';
import { PROVINCES_SORTED } from '@/data/provinces';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ui = getProvincesUi(locale).list;
  return pageMetadata({ locale, path: '/gunes-potansiyeli', title: ui.meta.title, description: ui.meta.description });
}

export default async function SolarPotentialPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const ui = getProvincesUi(locale).list;
  return (
    <>
      <PageBreadcrumb items={[{ name: ui.crumb, path: '/gunes-potansiyeli' }]} />
      <PageHero eyebrow={ui.hero.eyebrow} title={ui.hero.title} subtitle={ui.hero.subtitle} />

      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <ProvinceExplorer labels={getProvincesUi(locale).explorer} />
          </Reveal>
        </div>
      </section>

      {/* Bilgilendirme */}
      <section className="section-pad bg-mist-50">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          {ui.info.map((block, i) => (
            <Reveal key={block.title} delay={i * 0.05}>
              <div>
                <h2 className="font-display text-2xl font-bold text-graphite-950">{block.title}</h2>
                <p className="mt-4 leading-relaxed text-mist-700">{block.body1}</p>
                <p className="mt-4 leading-relaxed text-mist-700">{block.body2}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tüm iller — il sayfalarına bağlantı */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-graphite-950">{ui.allTitle}</h2>
            <p className="mt-3 max-w-2xl text-mist-700">{ui.allSubtitle}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {PROVINCES_SORTED.map((p) => (
                <Link
                  key={p.slug}
                  href={`/gunes-potansiyeli/${p.slug}`}
                  className="rounded-full border border-mist-900/10 bg-mist-50 px-4 py-2 text-sm font-medium text-graphite-800 transition-colors hover:border-volt-500/40 hover:text-volt-700"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
