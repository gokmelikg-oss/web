import type { Metadata } from 'next';
import { Leaf, Zap, TreePine, Home, Building2, Grid3x3, MapPinned, Sun } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { ReferenceList } from '@/components/ReferenceList';
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
import type { Locale } from '@/i18n/config';

// Admin panelinden referans eklenebildiği için ISR.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: '/projects',
    title: 'Referanslar — Sahadaki İşlerimiz',
    description:
      'Türkiye genelinde tamamladığımız toplu konut projeleri: kollektör adedi, ışınım ve brüt alan verileriyle referans listemiz ve çevresel etkisi.',
  });
}

const nf = new Intl.NumberFormat('tr-TR');
const nf1 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 });

const scaleStats = [
  { icon: Grid3x3, value: referenceTotals.projects, suffix: '', label: 'Tamamlanan proje' },
  { icon: MapPinned, value: referenceTotals.provinces, suffix: '', label: 'İl' },
  { icon: Home, value: referenceTotals.homes, suffix: '', label: 'Konut' },
  { icon: Building2, value: referenceTotals.blocks, suffix: '', label: 'Blok' },
  { icon: Sun, value: referenceTotals.collectors, suffix: '', label: 'Kollektör' },
  { icon: Grid3x3, value: referenceTotals.aperture, suffix: ' m²', label: 'Işınım alanı' },
];

export default async function ProjectsPage() {
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
      <PageBreadcrumb items={[{ name: 'Referanslar', path: '/projects' }]} />
      <PageHero
        eyebrow="Referanslar"
        title="Sahadaki işlerimiz"
        subtitle={`Türkiye'nin ${referenceTotals.provinces} ilinde tamamladığımız ${nf.format(
          referenceTotals.projects
        )} toplu konut projesinde ${nf.format(
          referenceTotals.collectors
        )} kollektör ile ${nf.format(referenceTotals.homes)} konutun sıcak su ihtiyacını güneşten karşılıyoruz.`}
      />

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
                <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
                  <span className="h-px w-8 bg-emerald-500" aria-hidden />
                  Çevresel Etki
                </p>
                <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Kurduğumuz sistemler her yıl bir orman kadar karbon tutuyor
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-graphite-300">
                  Sahadaki {nf.format(referenceTotals.aperture)} m² ışınım alanı, güneşi ücretsiz ve
                  temiz ısıya çeviriyor. Aşağıdaki değerler, bu alanın yıllık üretimi ve fosil yakıt
                  yerine ikame edilmesiyle önlenen sera gazı salımını gösterir.
                </p>

                <div className="mt-8 space-y-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 font-mono text-[11px] leading-relaxed text-graphite-300 backdrop-blur-sm">
                  <p className="font-semibold uppercase tracking-[0.14em] text-white">Hesap yöntemi</p>
                  <p>
                    Işınım alanı = kollektör adedi × 2,33 m² · Brüt alan = kollektör adedi × 2,55 m²
                  </p>
                  <p>
                    Yıllık üretim = {nf.format(referenceTotals.aperture)} m² ×{' '}
                    {IMPACT_ASSUMPTIONS.yieldPerM2} kWh/m²·yıl
                  </p>
                  <p>
                    Önlenen salım = üretim × {String(IMPACT_ASSUMPTIONS.co2PerKwh).replace('.', ',')} kg
                    CO₂/kWh (doğal gaz ikamesi)
                  </p>
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
                    <p className="mt-2.5 text-sm leading-snug text-graphite-200">
                      Yıllık üretilen temiz ısı enerjisi
                    </p>
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
                      <span className="ms-1.5 text-xl text-emerald-400">ton</span>
                    </p>
                    <p className="mt-2.5 text-sm leading-snug text-graphite-200">
                      Yılda önlenen CO₂ salımı
                    </p>
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
                      <span className="ms-1.5 text-xl text-emerald-400">milyon</span>
                    </p>
                    <p className="mt-2.5 text-sm leading-snug text-graphite-200">
                      Ağacın yıllık karbon tutumuna eşdeğer
                    </p>
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
                      <span className="ms-1.5 text-xl text-volt-400">bin</span>
                    </p>
                    <p className="mt-2.5 text-sm leading-snug text-graphite-200">
                      Hanenin yıllık sıcak su enerjisine eşdeğer
                    </p>
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
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                Referans Listesi
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                Proje proje sahadaki işlerimiz
              </h2>
              <p className="mt-4 text-mist-700">
                Her kayıtta kollektör adedi, toplam ışınım ve brüt alan ile karşılanan konut sayısı yer
                alır. İl seçerek veya arayarak listeyi daraltabilirsiniz.
              </p>
            </div>
          </Reveal>

          <div className="mt-10">
            <ReferenceList projects={allProjects} />
          </div>
        </div>
      </section>
    </>
  );
}
