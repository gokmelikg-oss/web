import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { ProvinceExplorer } from '@/components/ProvinceExplorer';
import { RoofCheck } from '@/components/RoofCheck';
import { PageBreadcrumb } from '@/components/JsonLd';
import { Link } from '@/i18n/navigation';
import { pageMetadata } from '@/lib/seo';
import { getProvincesUi } from '@/lib/provincesUi';
import { getRoofCheckUi } from '@/lib/roofCheckUi';
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
  const roof = getRoofCheckUi(locale);
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
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2">
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

      {/* Çatınız uygun mu? — öz-değerlendirme */}
      <section id="cati" className="section-pad scroll-mt-24 bg-mist-50">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
                {roof.eyebrow}
              </p>
              <h2 className="mt-3 text-balance font-display type-h2 font-bold tracking-tight text-graphite-950">
                {roof.title}
              </h2>
              <p className="mt-4 text-mist-700">{roof.subtitle}</p>
            </div>
          </Reveal>
          <div className="mt-10">
            <RoofCheck labels={roof} />
          </div>
        </div>
      </section>
    </>
  );
}
