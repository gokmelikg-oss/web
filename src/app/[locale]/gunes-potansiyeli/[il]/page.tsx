import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Sun, Clock, Zap, Leaf, ArrowUpRight, Wrench, MapPin } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { PageBreadcrumb, FaqJsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { getProvincesUi } from '@/lib/provincesUi';
import { PROVINCES, getProvinceData } from '@/data/provinces';
import type { Locale } from '@/i18n/config';

export function generateStaticParams() {
  return PROVINCES.map((p) => ({ il: p.slug }));
}

const STAT_ICONS = [Sun, Clock, Zap, Leaf];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; il: string }>;
}): Promise<Metadata> {
  const { locale, il } = await params;
  const data = getProvinceData(il);
  if (!data) return {};
  const ui = getProvincesUi(locale);
  const nf = new Intl.NumberFormat(ui.intlLocale);
  return pageMetadata({
    locale,
    path: `/gunes-potansiyeli/${il}`,
    title: ui.detail.metaTitle(data.name),
    description: ui.detail.metaDesc(data.name, nf.format(data.radiation), nf.format(data.sunshine)),
  });
}

export default async function ProvinceDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; il: string }>;
}) {
  const { locale, il } = await params;
  const data = getProvinceData(il);
  if (!data) notFound();

  const ui = getProvincesUi(locale);
  const nf = new Intl.NumberFormat(ui.intlLocale);
  const tierWord = ui.tier(data.radiation);
  const faq = ui.faq(data, (n) => nf.format(n));
  const sameRegion = PROVINCES.filter(
    (p) => getProvinceData(p.slug)?.region.name === data.region.name && p.slug !== data.slug
  );

  const stats = ui.statLabels.map((s, i) => ({
    icon: STAT_ICONS[i],
    value: nf.format([data.radiation, data.sunshine, data.homeAnnual, data.homeCo2][i]),
    unit: s.unit,
    label: s.label,
  }));

  return (
    <>
      <PageBreadcrumb
        items={[
          { name: ui.list.crumb, path: '/gunes-potansiyeli' },
          { name: data.name, path: `/gunes-potansiyeli/${data.slug}` },
        ]}
      />
      <FaqJsonLd items={faq} />

      <PageHero
        eyebrow={ui.detail.heroEyebrow(data.region.name)}
        title={ui.detail.heroTitle(data.name)}
        subtitle={ui.detail.heroSubtitle(data.name, nf.format(data.radiation), nf.format(data.sunshine), tierWord)}
      />

      {/* İstatistikler */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-mist-900/10 bg-mist-50 p-6">
                  <s.icon size={18} className="text-volt-600" strokeWidth={1.9} />
                  <p className="mt-3 font-tabular font-display text-2xl font-bold leading-none text-graphite-950 sm:text-3xl">
                    {s.value}
                    <span className="ms-1 text-xs font-semibold text-mist-500">{s.unit}</span>
                  </p>
                  <p className="mt-2 font-mono text-[9.5px] uppercase leading-snug tracking-[0.12em] text-mist-600">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-5 font-mono text-[11px] leading-relaxed text-mist-500">{ui.gepaNote}</p>

          {/* Bilgilendirme + öneri */}
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div>
                <h2 className="font-display text-2xl font-bold text-graphite-950">
                  {ui.detail.sectionTitle(data.name)}
                </h2>
                <p className="mt-4 leading-relaxed text-mist-700">
                  {ui.detail.body1(
                    data.name,
                    data.region.name,
                    nf.format(data.radiation),
                    nf.format(data.sunshine),
                    tierWord
                  )}
                </p>
                <p className="mt-4 leading-relaxed text-mist-700">{ui.detail.body2(data.name)}</p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-mist-900/10 bg-mist-50 p-7">
                <h2 className="font-display text-lg font-bold text-graphite-950">{ui.detail.recommendedTitle}</h2>
                <p className="mt-3 leading-relaxed text-mist-700">{ui.systemRec(data.radiation)}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                  >
                    {ui.detail.quoteButton(data.name)}
                    <ArrowUpRight size={15} />
                  </Link>
                  <Link
                    href="/contact#servis"
                    className="inline-flex items-center gap-2 rounded-full border border-graphite-950/15 px-6 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-mist-100"
                  >
                    <Wrench size={15} />
                    {ui.detail.surveyButton}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="section-pad bg-mist-50">
        <div className="container-page max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-graphite-950 sm:text-3xl">
            {ui.detail.faqTitle(data.name)}
          </h2>
          <div className="mt-8 divide-y divide-mist-900/10 border-y border-mist-900/10">
            {faq.map((item) => (
              <div key={item.q} className="py-6">
                <h3 className="font-display text-base font-bold text-graphite-950 sm:text-lg">{item.q}</h3>
                <p className="mt-2.5 leading-relaxed text-mist-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aynı bölgedeki iller — iç bağlantı */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-volt-600" />
            <h2 className="font-display text-xl font-bold text-graphite-950">
              {ui.detail.sameRegionTitle(data.region.name)}
            </h2>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {sameRegion.map((p) => (
              <Link
                key={p.slug}
                href={`/gunes-potansiyeli/${p.slug}`}
                className="rounded-full border border-mist-900/10 bg-mist-50 px-4 py-2 text-sm font-medium text-graphite-800 transition-colors hover:border-volt-500/40 hover:text-volt-700"
              >
                {p.name}
              </Link>
            ))}
            <Link
              href="/gunes-potansiyeli"
              className="rounded-full bg-graphite-950 px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              {ui.detail.allProvincesLink}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
