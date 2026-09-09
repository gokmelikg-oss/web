import type { Metadata } from 'next';
import { ArrowRight, Building2, Landmark, Shield, Hotel, School, LifeBuoy, Siren, type LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { PageBreadcrumb } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { allSegments, segmentText, type SegmentKey } from '@/lib/segments';
import type { Locale } from '@/i18n/config';

/* UYGULAMA ALANLARI — GİRİŞ SAYFASI
   =================================
   İncelenen yedi rakip sitenin üçünde ziyaretçi ürüne göre değil YAPI
   TİPİNE göre geziniyor. Bizde bu yol yoktu: "otelim için ne lazım" diye
   gelen ziyaretçi ürün listesiyle karşılaşıyordu.

   ⚠ Buradaki her rakam 526 TESLİM EDİLMİŞ projeden hesaplanır
   (lib/segments.ts). Elle yazılmış tek bir sayı yoktur. */

const ICONS: Record<SegmentKey, LucideIcon> = {
  konut: Building2,
  adalet: Landmark,
  savunma: Shield,
  ozel: Hotel,
  kamu: School,
  afad: LifeBuoy,
  emniyet: Siren,
};

interface PageText {
  crumb: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  projects: string;
  collectors: string;
  provinces: string;
  explore: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  meta: { title: string; description: string };
}

const UI: Record<Locale, PageText> = {
  tr: {
    crumb: 'Uygulama Alanları',
    eyebrow: 'Uygulama Alanları',
    title: 'Hangi yapı için sistem kuruyorsunuz?',
    subtitle:
      'Toplu konuttan otele, cezaevinden afet konutuna kadar farklı yapı tiplerinin sıcak su ihtiyacı da, çözümü de farklıdır. Aşağıdaki rakamlar teslim ettiğimiz gerçek projelerden gelir.',
    projects: 'proje',
    collectors: 'kollektör',
    provinces: 'il',
    explore: 'İncele',
    ctaTitle: 'Yapı tipinizi listede bulamadınız mı?',
    ctaBody: 'Proje bilgilerinizi paylaşın; mühendislik ekibimiz yapınıza uygun sistemi birlikte belirlesin.',
    ctaButton: 'Teklif Al',
    meta: {
      title: 'Uygulama Alanları',
      description:
        'Toplu konut, otel, kamu binası, adalet ve savunma tesisleri için güneş enerjili merkezi sıcak su sistemleri — her yapı tipinin ihtiyacı ve gerçek proje sayılarımız.',
    },
  },
  en: {
    crumb: 'Applications',
    eyebrow: 'Applications',
    title: 'What kind of building are you equipping?',
    subtitle:
      'From mass housing to hotels, from correctional facilities to disaster housing, each building type has a different hot water need — and a different answer. The figures below come from projects we have delivered.',
    projects: 'projects',
    collectors: 'collectors',
    provinces: 'provinces',
    explore: 'Explore',
    ctaTitle: 'Cannot find your building type?',
    ctaBody: 'Share your project details and our engineering team will help you define the right system.',
    ctaButton: 'Request a Quote',
    meta: {
      title: 'Applications',
      description:
        'Solar central hot water systems for mass housing, hotels, public buildings, justice and defence facilities. The need of each building type and our real delivered project figures.',
    },
  },
  ar: {
    crumb: 'مجالات التطبيق',
    eyebrow: 'مجالات التطبيق',
    title: 'لأي نوع من المباني تبنون النظام؟',
    subtitle:
      'من الإسكان الجماعي إلى الفنادق، ومن المؤسسات العقابية إلى مساكن ما بعد الكوارث، لكل نوع مبنى حاجة مختلفة وحل مختلف. والأرقام أدناه مستمدة من مشاريع سلّمناها فعلياً.',
    projects: 'مشروع',
    collectors: 'لاقط',
    provinces: 'محافظة',
    explore: 'استعراض',
    ctaTitle: 'لم تجدوا نوع مبناكم في القائمة؟',
    ctaBody: 'شاركونا تفاصيل مشروعكم ليحدد فريقنا الهندسي معكم النظام المناسب.',
    ctaButton: 'اطلب عرض سعر',
    meta: {
      title: 'مجالات التطبيق',
      description:
        'أنظمة مركزية شمسية لتسخين المياه للإسكان الجماعي والفنادق والمباني العامة ومنشآت العدالة والدفاع. حاجة كل نوع مبنى وأرقام مشاريعنا المنفَّذة فعلياً.',
    },
  },
  el: {
    crumb: 'Εφαρμογές',
    eyebrow: 'Εφαρμογές',
    title: 'Για τι είδους κτίριο σχεδιάζετε σύστημα;',
    subtitle:
      'Από τα συγκροτήματα κατοικιών ως τα ξενοδοχεία και από τα σωφρονιστικά ως τις κατοικίες μετά από καταστροφή, κάθε τύπος κτιρίου έχει διαφορετική ανάγκη και διαφορετική λύση. Τα παρακάτω μεγέθη προέρχονται από έργα που έχουμε παραδώσει.',
    projects: 'έργα',
    collectors: 'συλλέκτες',
    provinces: 'νομοί',
    explore: 'Δείτε',
    ctaTitle: 'Δεν βρήκατε τον τύπο του κτιρίου σας;',
    ctaBody: 'Μοιραστείτε τα στοιχεία του έργου και η ομάδα μηχανικών μας θα ορίσει μαζί σας το κατάλληλο σύστημα.',
    ctaButton: 'Ζητήστε Προσφορά',
    meta: {
      title: 'Εφαρμογές',
      description:
        'Ηλιακά κεντρικά συστήματα ζεστού νερού για συγκροτήματα κατοικιών, ξενοδοχεία, δημόσια κτίρια και εγκαταστάσεις δικαιοσύνης και άμυνας. Η ανάγκη κάθε τύπου και τα πραγματικά μας μεγέθη.',
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const ui = UI[locale] ?? UI.tr;
  return pageMetadata({
    locale,
    path: '/uygulamalar',
    title: ui.meta.title,
    description: ui.meta.description,
  });
}

export default async function ApplicationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const ui = UI[locale] ?? UI.tr;
  const segments = allSegments();
  const nf = new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : locale === 'el' ? 'el-GR' : locale === 'en' ? 'en-US' : 'tr-TR');

  return (
    <>
      <PageBreadcrumb items={[{ name: ui.crumb, path: '/uygulamalar' }]} />
      <PageHero eyebrow={ui.eyebrow} title={ui.title} subtitle={ui.subtitle} />

      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {segments.map((s, i) => {
              const txt = segmentText(locale, s.key);
              const Icon = ICONS[s.key];
              return (
                <Reveal key={s.key} delay={Math.min(i * 0.05, 0.3)}>
                  <Link
                    href={`/uygulamalar/${s.key}`}
                    className="group flex h-full flex-col rounded-2xl border border-mist-900/10 bg-white p-7 transition-all hover:-translate-y-1 hover:border-volt-500/50 hover:shadow-card"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-volt-100 text-volt-700">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <h2 className="mt-5 font-display type-h3 font-bold text-graphite-950">{txt.title}</h2>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-mist-600">{txt.lead}</p>

                    {/* Rakamlar gerçek proje kayıtlarından hesaplanır. */}
                    <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-mist-900/10 pt-4">
                      {[
                        { v: s.projects, l: ui.projects },
                        { v: s.collectors, l: ui.collectors },
                        { v: s.provinces, l: ui.provinces },
                      ].map((cell) => (
                        <div key={cell.l}>
                          <dt className="sr-only">{cell.l}</dt>
                          <dd className="font-tabular font-display text-lg font-bold text-graphite-950">
                            {nf.format(cell.v)}
                          </dd>
                          <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-mist-500">
                            {cell.l}
                          </p>
                        </div>
                      ))}
                    </dl>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-graphite-950">
                      {ui.explore}
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-graphite-gradient p-8 text-white sm:p-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div>
                <h2 className="font-display type-h2-sm font-bold tracking-tight">{ui.ctaTitle}</h2>
                <p className="mt-3 max-w-lg leading-relaxed text-graphite-200">{ui.ctaBody}</p>
              </div>
              <div className="lg:justify-self-end">
                <Link
                  href="/teklif-al"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-solar-gradient px-7 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
                >
                  {ui.ctaButton}
                  <ArrowRight size={16} className="rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
