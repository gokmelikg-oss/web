import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Calculator, HelpCircle, Lightbulb, Wrench } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { PageBreadcrumb } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { referenceProjects } from '@/data/references';
import { allSegments, segmentStats, segmentText, SEGMENT_KEYS, type SegmentKey } from '@/lib/segments';
import { locales, type Locale } from '@/i18n/config';

/* UYGULAMA ALANI — DETAY SAYFASI
   ==============================
   Yapı tipine göre giriş yolu. Rakiplerde ("Uygulamalar" bölümleri) bu
   sayfalar genellikle birkaç cümlelik tanıtım metnidir; buradaki fark,
   her rakamın 526 TESLİM EDİLMİŞ projeden hesaplanmasıdır.

   ⚠ Sayfada ölçülmemiş performans veya tasarruf iddiası YOKTUR. Anlatılan
   şey ihtiyaç, kurulan çözüm ve dikkat edilen teknik noktadır; sayılar ise
   yalnızca gerçekten yapılmış işlerdir. */

const SEGMENT_LABELS: Record<Locale, Record<string, string>> = {
  tr: { need: 'İhtiyaç', solution: 'Kurduğumuz çözüm', detail: 'Dikkat ettiğimiz nokta' },
  en: { need: 'The need', solution: 'What we build', detail: 'What we watch for' },
  ar: { need: 'الحاجة', solution: 'الحل الذي ننفّذه', detail: 'ما ننتبه إليه' },
  el: { need: 'Η ανάγκη', solution: 'Τι κατασκευάζουμε', detail: 'Τι προσέχουμε' },
};

const UI: Record<Locale, {
  crumbRoot: string;
  eyebrow: string;
  statsTitle: string;
  projects: string;
  homes: string;
  collectors: string;
  aperture: string;
  provinces: string;
  statsNote: string;
  examplesTitle: string;
  colProject: string;
  colProvince: string;
  colHomes: string;
  colCollectors: string;
  allRefs: string;
  ctaTitle: string;
  ctaBody: string;
  ctaQuote: string;
  ctaCalc: string;
  other: string;
}> = {
  tr: {
    crumbRoot: 'Uygulama Alanları',
    eyebrow: 'Uygulama Alanı',
    statsTitle: 'Bu alanda teslim ettiklerimiz',
    projects: 'Proje',
    homes: 'Konut',
    collectors: 'Kollektör',
    aperture: 'm² ışınım alanı',
    provinces: 'İl',
    statsNote: 'Rakamlar tamamlanmış proje kayıtlarımızdan hesaplanır; tahmin değildir.',
    examplesTitle: 'Bu alandan örnek projeler',
    colProject: 'Proje',
    colProvince: 'İl',
    colHomes: 'Konut',
    colCollectors: 'Kollektör',
    allRefs: 'Tüm referansları görün',
    ctaTitle: 'Projeniz için sistem kuralım',
    ctaBody: 'Yapı tipinizi, daire veya yatak sayınızı paylaşın; uygun sistemi birlikte belirleyelim.',
    ctaQuote: 'Teklif Al',
    ctaCalc: 'Önce hesaplayın',
    other: 'Diğer uygulama alanları',
  },
  en: {
    crumbRoot: 'Applications',
    eyebrow: 'Application',
    statsTitle: 'What we have delivered in this field',
    projects: 'Projects',
    homes: 'Dwellings',
    collectors: 'Collectors',
    aperture: 'm² aperture area',
    provinces: 'Provinces',
    statsNote: 'Figures are calculated from our completed project records; they are not estimates.',
    examplesTitle: 'Example projects in this field',
    colProject: 'Project',
    colProvince: 'Province',
    colHomes: 'Dwellings',
    colCollectors: 'Collectors',
    allRefs: 'See all references',
    ctaTitle: 'Let us design a system for your project',
    ctaBody: 'Share your building type and the number of dwellings or beds, and we will define the right system together.',
    ctaQuote: 'Request a Quote',
    ctaCalc: 'Calculate first',
    other: 'Other applications',
  },
  ar: {
    crumbRoot: 'مجالات التطبيق',
    eyebrow: 'مجال التطبيق',
    statsTitle: 'ما سلّمناه في هذا المجال',
    projects: 'مشروع',
    homes: 'وحدة سكنية',
    collectors: 'لاقط',
    aperture: 'م² مساحة استقبال',
    provinces: 'محافظة',
    statsNote: 'تُحتسب الأرقام من سجلات مشاريعنا المنجزة، وليست تقديرات.',
    examplesTitle: 'مشاريع نموذجية في هذا المجال',
    colProject: 'المشروع',
    colProvince: 'المحافظة',
    colHomes: 'وحدات',
    colCollectors: 'لواقط',
    allRefs: 'عرض جميع المراجع',
    ctaTitle: 'لنصمّم نظاماً لمشروعكم',
    ctaBody: 'شاركونا نوع المبنى وعدد الوحدات أو الأسرّة، ولنحدّد معاً النظام المناسب.',
    ctaQuote: 'اطلب عرض سعر',
    ctaCalc: 'احسب أولاً',
    other: 'مجالات تطبيق أخرى',
  },
  el: {
    crumbRoot: 'Εφαρμογές',
    eyebrow: 'Εφαρμογή',
    statsTitle: 'Τι έχουμε παραδώσει σε αυτόν τον τομέα',
    projects: 'Έργα',
    homes: 'Κατοικίες',
    collectors: 'Συλλέκτες',
    aperture: 'm² επιφάνεια',
    provinces: 'Νομοί',
    statsNote: 'Τα μεγέθη υπολογίζονται από τα ολοκληρωμένα έργα μας· δεν είναι εκτιμήσεις.',
    examplesTitle: 'Ενδεικτικά έργα του τομέα',
    colProject: 'Έργο',
    colProvince: 'Νομός',
    colHomes: 'Κατοικίες',
    colCollectors: 'Συλλέκτες',
    allRefs: 'Δείτε όλα τα έργα',
    ctaTitle: 'Ας σχεδιάσουμε σύστημα για το έργο σας',
    ctaBody: 'Πείτε μας τον τύπο κτιρίου και τον αριθμό κατοικιών ή κλινών και θα ορίσουμε μαζί το κατάλληλο σύστημα.',
    ctaQuote: 'Ζητήστε Προσφορά',
    ctaCalc: 'Υπολογίστε πρώτα',
    other: 'Άλλες εφαρμογές',
  },
};

/* Statik üretim: 4 dil × mevcut segment sayısı. */
export function generateStaticParams() {
  const keys = allSegments().map((s) => s.key);
  return locales.flatMap((locale) => keys.map((segment) => ({ locale, segment })));
}

function isSegment(value: string): value is SegmentKey {
  return (SEGMENT_KEYS as readonly string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; segment: string }>;
}): Promise<Metadata> {
  const { locale, segment } = (await params) as { locale: Locale; segment: string };
  if (!isSegment(segment)) return {};
  const txt = segmentText(locale, segment);
  const s = segmentStats(segment);
  const ui = UI[locale] ?? UI.tr;
  return pageMetadata({
    locale,
    path: `/uygulamalar/${segment}`,
    title: `${txt.title} — ${ui.eyebrow}`,
    /* Açıklama, segmentin kendi anlatısı + gerçek ölçek. Uydurma yok. */
    description: `${txt.lead} ${s.projects} ${ui.projects.toLowerCase()}, ${s.collectors.toLocaleString('tr-TR')} ${ui.collectors.toLowerCase()}.`.slice(0, 160),
  });
}

export default async function SegmentPage({
  params,
}: {
  params: Promise<{ locale: string; segment: string }>;
}) {
  const { locale, segment } = (await params) as { locale: Locale; segment: string };
  if (!isSegment(segment)) notFound();

  const stats = segmentStats(segment);
  // Projesi olmayan segment sayfası açılmaz — boş sayfa yanlış izlenim verir.
  if (stats.projects === 0) notFound();

  const txt = segmentText(locale, segment);
  const ui = UI[locale] ?? UI.tr;
  const labels = SEGMENT_LABELS[locale] ?? SEGMENT_LABELS.tr;
  const nf = new Intl.NumberFormat(
    locale === 'ar' ? 'ar-EG' : locale === 'el' ? 'el-GR' : locale === 'en' ? 'en-US' : 'tr-TR'
  );

  /* En büyük on proje — ölçeği en iyi anlatanlar. */
  const examples = referenceProjects
    .filter((p) => p.category === segment)
    .sort((a, b) => b.collectors - a.collectors)
    .slice(0, 10);

  const others = allSegments().filter((s) => s.key !== segment);

  const cells = [
    { v: stats.projects, l: ui.projects },
    { v: stats.homes, l: ui.homes },
    { v: stats.collectors, l: ui.collectors },
    { v: stats.aperture, l: ui.aperture },
    { v: stats.provinces, l: ui.provinces },
  ].filter((c) => c.v > 0);

  const blocks = [
    { icon: HelpCircle, label: labels.need, body: txt.need },
    { icon: Wrench, label: labels.solution, body: txt.solution },
    { icon: Lightbulb, label: labels.detail, body: txt.detail },
  ];

  return (
    <>
      <PageBreadcrumb
        items={[
          { name: ui.crumbRoot, path: '/uygulamalar' },
          { name: txt.title, path: `/uygulamalar/${segment}` },
        ]}
      />
      <PageHero eyebrow={ui.eyebrow} title={txt.title} subtitle={txt.lead} />

      {/* Gerçek ölçek */}
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display type-h2 font-bold tracking-tight text-graphite-950">
              {ui.statsTitle}
            </h2>
            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {cells.map((c) => (
                <div key={c.l} className="rounded-2xl border border-mist-900/10 bg-white p-5">
                  <dd className="font-tabular font-display text-[clamp(1.5rem,1.2rem+1.4vw,2rem)] font-bold leading-none text-graphite-950">
                    {nf.format(c.v)}
                  </dd>
                  <dt className="mt-2 font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-mist-500">
                    {c.l}
                  </dt>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-mist-500">{ui.statsNote}</p>
          </Reveal>
        </div>
      </section>

      {/* İhtiyaç → çözüm → dikkat noktası */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {blocks.map((b, i) => (
              <Reveal key={b.label} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-mist-900/10 bg-mist-50 p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                    <b.icon size={20} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-volt-700">
                    {b.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-700">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Örnek projeler */}
      {examples.length > 0 && (
        <section className="section-pad bg-mist-50">
          <div className="container-page">
            <Reveal>
              <h2 className="font-display type-h2 font-bold tracking-tight text-graphite-950">
                {ui.examplesTitle}
              </h2>
              {/* Geniş tablo dar ekranda kendi içinde kayar. */}
              <div className="scroll-fade-x mt-6 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-mist-900/15">
                      {[ui.colProject, ui.colProvince, ui.colHomes, ui.colCollectors].map((h, i) => (
                        <th
                          key={h}
                          className={`py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500 ${
                            i === 0 ? 'text-start' : 'text-end'
                          }`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {examples.map((p, i) => (
                      <tr key={`${p.title}-${p.il}-${i}`} className="border-b border-mist-900/8 last:border-0">
                        <td className="py-3 pe-4 font-medium text-graphite-900">{p.title}</td>
                        <td className="py-3 text-end text-mist-600">
                          {p.il}
                          {p.ilce ? ` / ${p.ilce}` : ''}
                        </td>
                        <td className="py-3 text-end font-tabular text-mist-700">
                          {p.homes ? nf.format(p.homes) : '—'}
                        </td>
                        <td className="py-3 text-end font-tabular font-semibold text-graphite-950">
                          {nf.format(p.collectors)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link
                href="/projects"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-graphite-950 underline-offset-4 hover:underline"
              >
                {ui.allRefs}
                <ArrowRight size={15} className="rtl:rotate-180" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-graphite-gradient p-8 text-white sm:p-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div>
                <h2 className="font-display type-h2-sm font-bold tracking-tight">{ui.ctaTitle}</h2>
                <p className="mt-3 max-w-lg leading-relaxed text-graphite-200">{ui.ctaBody}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/teklif-al"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-solar-gradient px-7 text-sm font-semibold text-graphite-900 shadow-glow"
                >
                  {ui.ctaQuote}
                  <ArrowRight size={16} className="rtl:rotate-180" />
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/25 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Calculator size={16} />
                  {ui.ctaCalc}
                </Link>
              </div>
            </div>
          </Reveal>

          {/* İç linkleme: diğer segmentler */}
          <Reveal delay={0.05}>
            <div className="mt-12">
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-mist-500">
                {ui.other}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {others.map((o) => (
                  <Link
                    key={o.key}
                    href={`/uygulamalar/${o.key}`}
                    className="inline-flex min-h-[42px] items-center rounded-full border border-graphite-950/15 px-5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white"
                  >
                    {segmentText(locale, o.key).title}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
