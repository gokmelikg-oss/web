import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, Sun, Wrench, ClipboardList, ShieldCheck, Calculator, Home, Clock, type LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { PageBreadcrumb } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { getBlogList } from '@/lib/blog';
import { getBlogUi } from '@/lib/blogUi';
import type { Locale } from '@/i18n/config';

/* İnteraktif araçlar (premium bölüm) */
const TOOLS_BASE: { id: string; href: string; icon: LucideIcon; accent: string }[] = [
  { id: 'hesaplama', href: '/calculator', icon: Calculator, accent: 'from-volt-500/20' },
  { id: 'potansiyel', href: '/gunes-potansiyeli', icon: Sun, accent: 'from-amber-500/20' },
  { id: 'cati', href: '/gunes-potansiyeli#cati', icon: Home, accent: 'from-emerald-500/20' },
];
const TRAINING_ICONS: LucideIcon[] = [Sun, Wrench, ClipboardList, ShieldCheck];

interface ToolText { title: string; desc: string; cta: string }
interface CardText { title: string; desc: string }
interface AcademyText {
  crumb: string;
  hero: { eyebrow: string; title: string; subtitle: string };
  tools: { eyebrow: string; title: string; subtitle: string; items: ToolText[] };
  trainings: { eyebrow: string; title: string; body: string; items: CardText[] };
  blog: { eyebrow: string; title: string; subtitle: string; all: string; readMore: string };
  cta: { title: string; body: string; button: string };
  meta: { title: string; description: string };
}

const CONTENT: Record<Locale, AcademyText> = {
  tr: {
    crumb: 'Şimşek Akademi',
    hero: {
      eyebrow: 'Şimşek Akademi',
      title: 'Hesaplama, eğitim ve rehberler tek çatı altında',
      subtitle:
        'Doğru sistemi kendiniz keşfedin: interaktif hesaplama araçları, uygulamalı eğitimler ve güneş enerjisinde bilgi veren rehber içerikler.',
    },
    tools: {
      eyebrow: 'İnteraktif Araçlar',
      title: 'Birkaç tıkla kendi sisteminizi planlayın',
      subtitle: 'Ücretsiz, anında sonuç veren araçlarla ihtiyacınızı netleştirin; sonra ekibimizle kesinleştirelim.',
      items: [
        { title: 'Hesaplama Aracı', desc: 'Hane ve ilinize göre önerilen kollektör + boyler kapasitesi, yıllık üretim, önlenen CO₂ ve tahmini tasarruf.', cta: 'Hesapla' },
        { title: 'İl Güneş Potansiyeli', desc: '81 il için yıllık ışınım, güneşlenme süresi ve tahmini üretim; GEPA verilerine dayalı potansiyel rehberi.', cta: 'İlini seç' },
        { title: 'Çatı Uygunluk Kontrolü', desc: 'Üç soruda çatınızın güneş enerjisine uygunluğunu değerlendirin; öneri ve ücretsiz keşif.', cta: 'Kontrol et' },
      ],
    },
    trainings: {
      eyebrow: 'Eğitimler',
      title: 'Sahada işe yarayan, uygulamalı eğitimler',
      body: '35 yıllık üretim ve saha tecrübemizi; bayilerimize, iş ortaklarımıza ve mühendislere aktarıyoruz. Eğitimler tesisimizde veya sahada, teoriyle uygulamayı birleştirerek verilir.',
      items: [
        { title: 'Güneş Enerjisi Temel Eğitimi', desc: 'Termal güneş enerjisinin çalışma prensibi, sistem tipleri ve doğru ürün seçimi.' },
        { title: 'Montaj ve Kurulum Eğitimi', desc: 'Çatı, teras ve zemin uygulamaları; sehpa montajı, hidrolik bağlantı ve devreye alma.' },
        { title: 'Projelendirme Eğitimi', desc: 'Kapasite hesabı, kolektör tarlası tasarımı ve merkezi sistem projelendirme esasları.' },
        { title: 'Bakım ve Servis Eğitimi', desc: 'Periyodik bakım, arıza teşhisi, verim takibi ve satış sonrası hizmet süreçleri.' },
      ],
    },
    blog: {
      eyebrow: 'Blog & Rehberler',
      title: 'Güneş enerjisinde bilgi ve rehberler',
      subtitle: 'Termal sistemlerin çalışma prensibinden boyler seçimine kadar merak edilenleri uzman gözüyle anlatıyoruz.',
      all: 'Tüm yazılar',
      readMore: 'Devamını oku',
    },
    cta: { title: 'Eğitim veya mühendislik desteği alın', body: 'Eğitim talepleriniz, projelendirme ve mühendislik hizmetleri için ekibimizle iletişime geçin.', button: 'Talep oluştur' },
    meta: {
      title: 'Şimşek Akademi — Hesaplama Araçları, Eğitim ve Rehberler',
      description: 'İnteraktif hesaplama araçları, il bazlı güneş potansiyeli, çatı uygunluk kontrolü, uygulamalı eğitimler ve güneş enerjisi rehberleri tek çatı altında: Şimşek Akademi.',
    },
  },
  en: {
    crumb: 'Şimşek Academy',
    hero: {
      eyebrow: 'Şimşek Academy',
      title: 'Calculators, training and guides under one roof',
      subtitle:
        'Discover the right system yourself: interactive calculation tools, hands-on training and guide content that teaches you about solar energy.',
    },
    tools: {
      eyebrow: 'Interactive Tools',
      title: 'Plan your own system in a few clicks',
      subtitle: 'Clarify your needs with free, instant tools; then let’s finalize it together with our team.',
      items: [
        { title: 'Calculator', desc: 'Recommended collector + boiler capacity, annual output, CO₂ avoided and estimated savings based on your household and province.', cta: 'Calculate' },
        { title: 'Solar Potential by Province', desc: 'Annual irradiance, sunshine duration and estimated output for 81 provinces; a potential guide based on GEPA data.', cta: 'Pick province' },
        { title: 'Roof Suitability Check', desc: 'Assess your roof’s solar suitability in three questions; get a recommendation and a free survey.', cta: 'Check' },
      ],
    },
    trainings: {
      eyebrow: 'Training',
      title: 'Hands-on training that works in the field',
      body: 'We pass on our 35 years of manufacturing and field experience to our dealers, partners and engineers. Training is delivered at our facility or on-site, combining theory with practice.',
      items: [
        { title: 'Solar Energy Fundamentals', desc: 'The working principle of solar thermal, system types and correct product selection.' },
        { title: 'Assembly and Installation', desc: 'Roof, terrace and ground applications; frame assembly, hydraulic connection and commissioning.' },
        { title: 'System Design', desc: 'Capacity calculation, collector field design and the fundamentals of central system design.' },
        { title: 'Maintenance and Service', desc: 'Periodic maintenance, fault diagnosis, efficiency monitoring and after-sales service processes.' },
      ],
    },
    blog: {
      eyebrow: 'Blog & Guides',
      title: 'Knowledge and guides in solar energy',
      subtitle: 'From the working principle of thermal systems to boiler selection, we explain the essentials through an expert lens.',
      all: 'All posts',
      readMore: 'Read more',
    },
    cta: { title: 'Get training or engineering support', body: 'Contact our team for your training requests, design and engineering services.', button: 'Create a request' },
    meta: {
      title: 'Şimşek Academy — Calculators, Training and Guides',
      description: 'Interactive calculation tools, solar potential by province, roof-suitability check, hands-on training and solar energy guides under one roof: Şimşek Academy.',
    },
  },
  ar: {
    crumb: 'أكاديمية شمشك',
    hero: {
      eyebrow: 'أكاديمية شمشك',
      title: 'الحساب والتدريب والأدلة تحت سقف واحد',
      subtitle:
        'اكتشفوا النظام المناسب بأنفسكم: أدوات حساب تفاعلية، وتدريب تطبيقي، ومحتوى إرشادي يعرّفكم بالطاقة الشمسية.',
    },
    tools: {
      eyebrow: 'أدوات تفاعلية',
      title: 'خطّطوا نظامكم بنقرات قليلة',
      subtitle: 'وضّحوا احتياجكم بأدوات مجانية فورية؛ ثم لنُنهِ التفاصيل معاً مع فريقنا.',
      items: [
        { title: 'أداة الحساب', desc: 'سعة المجمّع والخزان الموصى بها والإنتاج السنوي وCO₂ المتجنَّب والتوفير التقديري حسب أسرتكم ومحافظتكم.', cta: 'احسبوا' },
        { title: 'الإمكان الشمسي حسب المحافظة', desc: 'الإشعاع السنوي وساعات السطوع والإنتاج التقديري لـ 81 محافظة؛ دليل يستند إلى بيانات GEPA.', cta: 'اختاروا محافظة' },
        { title: 'فحص ملاءمة السطح', desc: 'قيّموا ملاءمة سطحكم للطاقة الشمسية في ثلاثة أسئلة؛ مع توصية ومسح مجاني.', cta: 'افحصوا' },
      ],
    },
    trainings: {
      eyebrow: 'التدريب',
      title: 'تدريب تطبيقي يفيد في الميدان',
      body: 'ننقل خبرتنا في التصنيع والميدان الممتدة 35 عاماً إلى وكلائنا وشركائنا ومهندسينا. يُقدَّم التدريب في منشأتنا أو في الموقع، جامعاً بين النظرية والتطبيق.',
      items: [
        { title: 'أساسيات الطاقة الشمسية', desc: 'مبدأ عمل الطاقة الشمسية الحرارية وأنواع الأنظمة واختيار المنتج الصحيح.' },
        { title: 'التجميع والتركيب', desc: 'تطبيقات السطح والتراس والأرض؛ تركيب القواعد والتوصيل الهيدروليكي والتشغيل.' },
        { title: 'تصميم الأنظمة', desc: 'حساب السعة وتصميم حقل المجمعات وأساسيات تصميم النظام المركزي.' },
        { title: 'الصيانة والخدمة', desc: 'الصيانة الدورية وتشخيص الأعطال ومتابعة الكفاءة وعمليات ما بعد البيع.' },
      ],
    },
    blog: {
      eyebrow: 'المدونة والأدلة',
      title: 'معرفة وأدلة في الطاقة الشمسية',
      subtitle: 'من مبدأ عمل الأنظمة الحرارية إلى اختيار الخزان، نشرح الأساسيات بعين الخبير.',
      all: 'كل المقالات',
      readMore: 'اقرأ المزيد',
    },
    cta: { title: 'احصلوا على دعم تدريبي أو هندسي', body: 'تواصلوا مع فريقنا لطلبات التدريب وخدمات التصميم والهندسة.', button: 'إنشاء طلب' },
    meta: {
      title: 'أكاديمية شمشك — أدوات الحساب والتدريب والأدلة',
      description: 'أدوات حساب تفاعلية، والإمكان الشمسي حسب المحافظة، وفحص ملاءمة السطح، وتدريب تطبيقي وأدلة الطاقة الشمسية تحت سقف واحد: أكاديمية شمشك.',
    },
  },
  el: {
    crumb: 'Ακαδημία Şimşek',
    hero: {
      eyebrow: 'Ακαδημία Şimşek',
      title: 'Υπολογιστές, εκπαίδευση και οδηγοί υπό μία στέγη',
      subtitle:
        'Ανακαλύψτε μόνοι σας το σωστό σύστημα: διαδραστικά εργαλεία υπολογισμού, πρακτική εκπαίδευση και οδηγοί που σας ενημερώνουν για την ηλιακή ενέργεια.',
    },
    tools: {
      eyebrow: 'Διαδραστικά Εργαλεία',
      title: 'Σχεδιάστε το δικό σας σύστημα με λίγα κλικ',
      subtitle: 'Διευκρινίστε τις ανάγκες σας με δωρεάν, άμεσα εργαλεία· έπειτα ας το οριστικοποιήσουμε μαζί με την ομάδα μας.',
      items: [
        { title: 'Υπολογιστής', desc: 'Συνιστώμενη χωρητικότητα συλλέκτη + μπόιλερ, ετήσια παραγωγή, CO₂ που αποφεύγεται και εκτιμώμενη εξοικονόμηση με βάση το νοικοκυριό και την επαρχία σας.', cta: 'Υπολογίστε' },
        { title: 'Ηλιακό Δυναμικό ανά Επαρχία', desc: 'Ετήσια ακτινοβολία, διάρκεια ηλιοφάνειας και εκτιμώμενη παραγωγή για 81 επαρχίες· οδηγός βάσει δεδομένων GEPA.', cta: 'Επιλέξτε επαρχία' },
        { title: 'Έλεγχος Καταλληλότητας Στέγης', desc: 'Αξιολογήστε την καταλληλότητα της στέγης σας σε τρεις ερωτήσεις· με σύσταση και δωρεάν μελέτη.', cta: 'Ελέγξτε' },
      ],
    },
    trainings: {
      eyebrow: 'Εκπαίδευση',
      title: 'Πρακτική εκπαίδευση που λειτουργεί στο πεδίο',
      body: 'Μεταφέρουμε τα 35 χρόνια εμπειρίας μας στην παραγωγή και το πεδίο στους αντιπροσώπους, τους συνεργάτες και τους μηχανικούς μας. Η εκπαίδευση παρέχεται στις εγκαταστάσεις μας ή επιτόπου, συνδυάζοντας θεωρία με πράξη.',
      items: [
        { title: 'Βασικές Αρχές Ηλιακής Ενέργειας', desc: 'Η αρχή λειτουργίας του ηλιακού θερμικού, οι τύποι συστημάτων και η σωστή επιλογή προϊόντος.' },
        { title: 'Συναρμολόγηση και Εγκατάσταση', desc: 'Εφαρμογές σε στέγη, ταράτσα και έδαφος· συναρμολόγηση βάσης, υδραυλική σύνδεση και θέση σε λειτουργία.' },
        { title: 'Σχεδιασμός Συστήματος', desc: 'Υπολογισμός χωρητικότητας, σχεδιασμός πεδίου συλλεκτών και βασικές αρχές σχεδιασμού κεντρικού συστήματος.' },
        { title: 'Συντήρηση και Εξυπηρέτηση', desc: 'Περιοδική συντήρηση, διάγνωση βλαβών, παρακολούθηση απόδοσης και διαδικασίες μετά την πώληση.' },
      ],
    },
    blog: {
      eyebrow: 'Ιστολόγιο & Οδηγοί',
      title: 'Γνώση και οδηγοί στην ηλιακή ενέργεια',
      subtitle: 'Από την αρχή λειτουργίας των θερμικών συστημάτων έως την επιλογή μπόιλερ, εξηγούμε τα βασικά με το μάτι του ειδικού.',
      all: 'Όλα τα άρθρα',
      readMore: 'Διαβάστε περισσότερα',
    },
    cta: { title: 'Λάβετε εκπαιδευτική ή τεχνική υποστήριξη', body: 'Επικοινωνήστε με την ομάδα μας για τα αιτήματα εκπαίδευσης, τις υπηρεσίες σχεδιασμού και μηχανικής.', button: 'Δημιουργία αιτήματος' },
    meta: {
      title: 'Ακαδημία Şimşek — Εργαλεία Υπολογισμού, Εκπαίδευση και Οδηγοί',
      description: 'Διαδραστικά εργαλεία υπολογισμού, ηλιακό δυναμικό ανά επαρχία, έλεγχος καταλληλότητας στέγης, πρακτική εκπαίδευση και οδηγοί ηλιακής ενέργειας υπό μία στέγη: Ακαδημία Şimşek.',
    },
  },
};

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] ?? CONTENT.tr;
  return pageMetadata({ locale, path: '/akademi', title: c.meta.title, description: c.meta.description });
}

export default async function AkademiPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = CONTENT[locale] ?? CONTENT.tr;
  const ui = getBlogUi(locale);
  const nf = new Intl.DateTimeFormat(ui.intlLocale, { day: 'numeric', month: 'long', year: 'numeric' });
  const posts = (await getBlogList(locale)).slice(0, 3);

  return (
    <>
      <PageBreadcrumb items={[{ name: c.crumb, path: '/akademi' }]} />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} />

      {/* İnteraktif araçlar — premium koyu bölüm */}
      <section className="relative overflow-hidden bg-graphite-950 py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-25" aria-hidden />
        <div className="pointer-events-none absolute -end-32 -top-24 h-96 w-96 rounded-full bg-volt-500/10 blur-3xl" aria-hidden />
        <div className="container-page relative">
          <Reveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite-300">
                {c.tools.eyebrow}
              </p>
              <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">{c.tools.title}</h2>
              <p className="mt-4 text-graphite-300">{c.tools.subtitle}</p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {TOOLS_BASE.map((tool, i) => {
              const Icon = tool.icon;
              const txt = c.tools.items[i];
              return (
                <Reveal key={tool.id} delay={i * 0.08}>
                  <Link
                    href={tool.href}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b ${tool.accent} to-transparent p-7 transition-all hover:-translate-y-1 hover:border-volt-500/50`}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-volt-400 transition-colors group-hover:bg-volt-500 group-hover:text-graphite-950">
                      <Icon size={26} strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-bold">{txt.title}</h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-graphite-300">{txt.desc}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-volt-400 transition-colors group-hover:text-white">
                      {txt.cta}
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eğitimler */}
      <section id="egitimler" className="section-pad scroll-mt-24 bg-white">
        <div className="container-page">
          <Reveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
                {c.trainings.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">{c.trainings.title}</h2>
              <p className="mt-4 text-mist-700">{c.trainings.body}</p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {c.trainings.items.map((item, i) => {
              const Icon = TRAINING_ICONS[i];
              return (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="flex h-full gap-4 rounded-2xl border border-mist-900/10 bg-mist-50 p-6 transition-colors hover:border-volt-500/40">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-graphite-950">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-mist-700">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog & Rehberler */}
      {posts.length > 0 && (
        <section className="section-pad bg-mist-50">
          <div className="container-page">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
                    {c.blog.eyebrow}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">{c.blog.title}</h2>
                  <p className="mt-4 text-mist-700">{c.blog.subtitle}</p>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-volt-700 hover:text-volt-800">
                  {c.blog.all}
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((a, i) => (
                <Reveal key={a.slug} delay={i * 0.06}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist-900/10 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-volt-500/40 hover:shadow-card"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-mist-100">
                      {a.cover && (
                        <Image
                          src={a.cover}
                          alt={a.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute start-3 top-3 rounded-full bg-white/95 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-graphite-900 backdrop-blur-sm">
                        {a.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-mist-500">
                        <span>{nf.format(new Date(a.date))}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {a.readMin} {ui.minRead}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold leading-snug text-graphite-950 transition-colors group-hover:text-volt-700">
                        {a.title}
                      </h3>
                      <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-mist-700">{a.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-graphite-950 transition-colors group-hover:text-volt-700">
                        {c.blog.readMore}
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col items-center gap-4 rounded-3xl bg-graphite-gradient p-9 text-center text-white sm:p-12">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">{c.cta.title}</h3>
              <p className="max-w-xl text-sm leading-relaxed text-graphite-200">{c.cta.body}</p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-solar-gradient px-7 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
              >
                {c.cta.button}
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
