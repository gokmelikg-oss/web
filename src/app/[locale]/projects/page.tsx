import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Leaf, Zap, TreePine, Home, Building2, Grid3x3, MapPinned, Sun, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { ReferenceList } from '@/components/ReferenceList';
import { TrustStrip } from '@/components/home/TrustStrip';
import { CountUp } from '@/components/CountUp';
import {
  referenceTotals,
  totalImpact,
  IMPACT_ASSUMPTIONS,
  visibleReferenceProjects,
  type ReferenceProject,
} from '@/data/references';
import { PageBreadcrumb } from '@/components/JsonLd';
import { getContent } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { getReferencesUi } from '@/lib/referencesUi';
import type { Locale } from '@/i18n/config';

// Admin panelinden referans eklenebildiği için ISR.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ui = getReferencesUi(locale);
  return pageMetadata({ locale, path: '/projects', title: ui.meta.title, description: ui.meta.description });
}

const SCALE_ICONS = [Grid3x3, MapPinned, Home, Building2, Sun, Grid3x3];

export default async function ProjectsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const ui = getReferencesUi(locale);
  const tCta = await getTranslations('ctaBand');
  const nf = new Intl.NumberFormat(ui.intlLocale);
  const nf1 = new Intl.NumberFormat(ui.intlLocale, { maximumFractionDigits: 1 });

  const scaleStats = [
    { icon: SCALE_ICONS[0], value: referenceTotals.projects, suffix: '', label: ui.scaleLabels[0] },
    { icon: SCALE_ICONS[1], value: referenceTotals.provinces, suffix: '', label: ui.scaleLabels[1] },
    { icon: SCALE_ICONS[2], value: referenceTotals.homes, suffix: '', label: ui.scaleLabels[2] },
    { icon: SCALE_ICONS[3], value: referenceTotals.blocks, suffix: '', label: ui.scaleLabels[3] },
    { icon: SCALE_ICONS[4], value: referenceTotals.collectors, suffix: '', label: ui.scaleLabels[4] },
    { icon: SCALE_ICONS[5], value: referenceTotals.aperture, suffix: ' m²', label: ui.scaleLabels[5] },
  ];

  const { references, hiddenRefs } = await getContent();
  const hiddenSet = new Set(hiddenRefs ?? []);
  const adminProjects: ReferenceProject[] = references
    .filter((r) => r.title && r.il)
    .map((r) => {
      const collectors = r.collectors ?? 0;
      return {
        title: r.title,
        il: r.il,
        ilce: r.ilce ?? '',
        homes: r.homes ?? 0,
        blocks: 0,
        collectors,
        aperture: Math.round(collectors * 2.33),
        gross: Math.round(collectors * 2.55),
      };
    });
  const staticVisible = visibleReferenceProjects.filter((p) => !hiddenSet.has(p.title));
  const allProjects = [...staticVisible, ...adminProjects];

  return (
    <>
      <PageBreadcrumb items={[{ name: ui.crumb, path: '/projects' }]} />
      <PageHero
        eyebrow={ui.hero.eyebrow}
        title={ui.hero.title}
        subtitle={ui.hero.subtitle(
          referenceTotals.provinces,
          nf.format(referenceTotals.projects),
          nf.format(referenceTotals.collectors),
          nf.format(referenceTotals.homes)
        )}
      />

      {/* Bize güvenen kurumlar — kayan referans şeridi (Tasfen/Lipus deseni) */}
      <TrustStrip />

      {/* Ölçek — ince ayraçlı premium editoryal ızgara + dev index */}
      <section className="border-b border-mist-900/8 bg-white py-14">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-mist-900/10 bg-mist-900/10 sm:grid-cols-3 lg:grid-cols-6">
            {scaleStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="group relative h-full bg-white p-6 transition-colors duration-300 hover:bg-mist-50">
                  <div className="flex items-center justify-between">
                    <s.icon size={18} strokeWidth={1.75} className="text-volt-600" />
                    <span className="font-mono text-lg font-bold text-graphite-950/10 transition-colors group-hover:text-volt-600/40">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="mt-3 font-tabular font-display text-2xl font-bold leading-none text-graphite-950">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-mist-600">
                    {s.label}
                  </p>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-volt-500 transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Çevresel etki */}
      <section className="relative overflow-hidden bg-graphite-950 py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute inset-0 aurora" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-20" aria-hidden />
        <div
          className="pointer-events-none absolute -end-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl"
          aria-hidden
        />

        <div className="container-page relative">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal>
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite-300">
                  {ui.impact.eyebrow}
                </p>
                <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {ui.impact.title}
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-graphite-300">
                  {ui.impact.body(nf.format(referenceTotals.aperture))}
                </p>

                <div className="mt-8 space-y-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 font-mono text-[11px] leading-relaxed text-graphite-300 backdrop-blur-sm">
                  <p className="font-semibold uppercase tracking-[0.14em] text-white">{ui.impact.methodTitle}</p>
                  <p>{ui.impact.methodLine1}</p>
                  <p>{ui.impact.methodLine2(nf.format(referenceTotals.aperture), IMPACT_ASSUMPTIONS.yieldPerM2)}</p>
                  <p>{ui.impact.methodLine3(nf.format(IMPACT_ASSUMPTIONS.co2PerKwh))}</p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.05}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-7 backdrop-blur-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-graphite-950">
                    <Zap size={22} strokeWidth={1.9} />
                  </span>
                  <div className="mt-6">
                    <p className="font-tabular font-display text-4xl font-bold leading-none text-white">
                      {nf1.format(totalImpact.annualGwh)}
                      <span className="ms-1.5 text-xl text-emerald-400">GWh</span>
                    </p>
                    <p className="mt-2.5 text-sm leading-snug text-graphite-200">{ui.impact.card1}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-emerald-400">
                    <Leaf size={22} strokeWidth={1.9} />
                  </span>
                  <div className="mt-6">
                    <p className="font-tabular font-display text-4xl font-bold leading-none text-white">
                      {nf.format(Math.round(totalImpact.co2TonsPerYear))}
                      <span className="ms-1.5 text-xl text-emerald-400">{ui.impact.tonUnit}</span>
                    </p>
                    <p className="mt-2.5 text-sm leading-snug text-graphite-200">{ui.impact.card2}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-emerald-400">
                    <TreePine size={22} strokeWidth={1.9} />
                  </span>
                  <div className="mt-6">
                    <p className="font-tabular font-display text-4xl font-bold leading-none text-white">
                      {nf1.format(totalImpact.treeEquivalent / 1_000_000)}
                      <span className="ms-1.5 text-xl text-emerald-400">{ui.impact.millionUnit}</span>
                    </p>
                    <p className="mt-2.5 text-sm leading-snug text-graphite-200">{ui.impact.card3}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-volt-400">
                    <Home size={22} strokeWidth={1.9} />
                  </span>
                  <div className="mt-6">
                    <p className="font-tabular font-display text-4xl font-bold leading-none text-white">
                      {nf.format(Math.round(totalImpact.homeEquivalent / 1000))}
                      <span className="ms-1.5 text-xl text-volt-400">{ui.impact.thousandUnit}</span>
                    </p>
                    <p className="mt-2.5 text-sm leading-snug text-graphite-200">{ui.impact.card4}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Referans listesi */}
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <Reveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
                {ui.listSection.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                {ui.listSection.title}
              </h2>
              <p className="mt-4 text-mist-700">{ui.listSection.subtitle}</p>
            </div>
          </Reveal>

          <div className="mt-10">
            <ReferenceList projects={allProjects} labels={ui.listLabels} intlLocale={ui.intlLocale} />
          </div>
        </div>
      </section>

      {/* Kapanış CTA — bir sonraki proje sizinki olsun */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col items-center gap-4 rounded-3xl bg-graphite-gradient p-9 text-center text-white sm:p-14">
              <h2 className="max-w-2xl text-balance font-display text-2xl font-bold sm:text-3xl">{tCta('title')}</h2>
              <p className="max-w-xl text-sm leading-relaxed text-graphite-200">{tCta('subtitle')}</p>
              <Link
                href="/teklif-al"
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-solar-gradient px-7 py-3.5 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
              >
                {tCta('cta')}
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
