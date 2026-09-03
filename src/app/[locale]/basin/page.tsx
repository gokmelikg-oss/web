import type { Metadata } from 'next';
import Image from 'next/image';
import { Download, Mail, Phone, Palette, FileText, Building2 } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { PageBreadcrumb } from '@/components/JsonLd';
import { pageMetadata, ORG, SITE_NAME } from '@/lib/seo';
import { FOUNDED_YEAR } from '@/lib/companyFacts';
import type { Locale } from '@/i18n/config';

/* BASIN ODASI / MARKA KİTİ
   =========================
   ISO 500 firmalarının sitelerinde istisnasız bulunan bir bölüm: gazeteci,
   bayi, fuar organizatörü veya iş ortağı logoyu ve künyeyi aramak zorunda
   kalmasın diye tek sayfada toplanır (Arçelik "Medya", Erdemir "Kurumsal →
   Medya", Çimsa "Basın Odası" — hepsinde logo, görsel ve künye indirilebilir).

   ⚠ Bu sayfada UYDURMA BİLGİ YOKTUR. Her alan mevcut ve doğrulanmış
   kaynaklardan gelir:
     · logolar      → public/brand/ altındaki gerçek dosyalar
     · renk kodları → Kurumsal Kimlik Kılavuzu (tailwind.config.ts ile aynı)
     · künye        → lib/seo.ts → ORG (tek kaynak)
     · kuruluş yılı → lib/companyFacts.ts → FOUNDED_YEAR
   Basın bülteni listesi henüz yoktur; eklenince bu sayfaya bağlanır. */

interface Asset {
  file: string;
  label: string;
  note: string;
  dark?: boolean;
}

/* Dosyalar public/brand altında gerçekten mevcuttur. */
const ASSETS: Asset[] = [
  { file: '/brand/simsek-solar.png', label: 'Şimşek Solar — yatay', note: 'PNG · açık zemin' },
  { file: '/brand/simsek-solar-white.png', label: 'Şimşek Solar — beyaz', note: 'PNG · koyu zemin', dark: true },
  { file: '/brand/simsek-grup.png', label: 'Şimşek Grup', note: 'PNG · ana şirket' },
  { file: '/brand/lipus.png', label: 'Lipus', note: 'PNG · grup şirketi' },
];

/* Kurumsal Kimlik Kılavuzu'ndaki iki ana renk. tailwind.config.ts içindeki
   graphite-700 ve volt-500 ile birebir aynıdır — tek kaynak korunur. */
const COLORS = [
  { name: 'Süreklilik Mavisi', hex: '#202c5a', swatch: 'bg-graphite-700' },
  { name: 'Üretim Sarısı', hex: '#f6bc32', swatch: 'bg-volt-500' },
];

interface PressText {
  crumb: string;
  hero: { eyebrow: string; title: string; subtitle: string };
  logos: { title: string; body: string; download: string };
  colors: { title: string; body: string };
  boilerplate: { title: string; body: string; text: string; copyNote: string };
  facts: { title: string; rows: { k: string; v: string }[] };
  contact: { title: string; body: string; mail: string; phone: string };
  meta: { title: string; description: string };
}

const CONTENT: Record<Locale, PressText> = {
  tr: {
    crumb: 'Basın Odası',
    hero: {
      eyebrow: 'Basın Odası',
      title: 'Marka kitimiz ve kurumsal künyemiz',
      subtitle:
        'Logolarımızı, renk kodlarımızı ve şirket künyemizi buradan indirebilirsiniz. Haber, röportaj ve fuar talepleriniz için basın iletişim hattımız sayfanın altındadır.',
    },
    logos: {
      title: 'Logolar',
      body: 'Logolarımızı orantısını bozmadan, çevresinde en az logo yüksekliği kadar boşluk bırakarak kullanın. Renklerini değiştirmeyin; koyu zeminlerde beyaz sürümü tercih edin.',
      download: 'İndir',
    },
    colors: {
      title: 'Kurumsal renkler',
      body: 'Kurumsal Kimlik Kılavuzu’ndaki iki ana renk. Baskı ve dijital tüm uygulamalarda bu kodlar kullanılır.',
    },
    boilerplate: {
      title: 'Şirket tanıtım metni',
      body: 'Haber ve bültenlerde kullanabileceğiniz kısa kurumsal tanıtım metni.',
      text: `Şimşek Solar, ${FOUNDED_YEAR} yılından bu yana Mersin’de güneş enerjili su ısıtma sistemleri üreten bir sanayi kuruluşudur. Düz yüzeyli güneş kollektörleri, merkezi sistemler ve paket sistemler üreterek konut, toplu konut, otel ve kamu projelerine çözüm sunar. Ürünleri CE ve TSE standartlarına uygun olarak Mersin 2. Organize Sanayi Bölgesi’ndeki tesisinde üretilir.`,
      copyNote: 'Bu metin serbestçe kullanılabilir.',
    },
    facts: {
      title: 'Künye',
      rows: [
        { k: 'Resmî unvan', v: ORG.legalName },
        { k: 'Kuruluş', v: String(FOUNDED_YEAR) },
        { k: 'Merkez', v: `${ORG.street}, ${ORG.district} / ${ORG.city}` },
        { k: 'Faaliyet', v: 'Güneş enerjili su ısıtma sistemleri üretimi' },
        { k: 'Telefon', v: ORG.phone },
        { k: 'E-posta', v: ORG.email },
      ],
    },
    contact: {
      title: 'Basın iletişimi',
      body: 'Röportaj, görsel talebi, fuar ve etkinlik davetleri için doğrudan yazabilirsiniz.',
      mail: 'E-posta gönder',
      phone: 'Telefon',
    },
    meta: {
      title: 'Basın Odası ve Marka Kiti',
      description:
        'Şimşek Solar basın odası: logolar, kurumsal renk kodları, şirket tanıtım metni ve künye. Basın mensupları için indirilebilir marka kiti.',
    },
  },
  en: {
    crumb: 'Press Room',
    hero: {
      eyebrow: 'Press Room',
      title: 'Our brand kit and corporate details',
      subtitle:
        'Download our logos, colour codes and company details here. For news, interview and trade-fair requests, our press contact is at the bottom of the page.',
    },
    logos: {
      title: 'Logos',
      body: 'Use our logos without distorting their proportions and keep clear space around them at least equal to the logo height. Do not change their colours; use the white version on dark backgrounds.',
      download: 'Download',
    },
    colors: {
      title: 'Corporate colours',
      body: 'The two primary colours from our Corporate Identity Guide. These codes are used across all print and digital applications.',
    },
    boilerplate: {
      title: 'Company boilerplate',
      body: 'A short corporate description you can use in news items and press releases.',
      text: `Şimşek Solar is an industrial manufacturer of solar water heating systems, based in Mersin, Türkiye since ${FOUNDED_YEAR}. It produces flat plate solar collectors, central systems and packaged systems for residential, mass housing, hotel and public projects. Its products are manufactured in compliance with CE and TSE standards at its facility in the Mersin 2nd Organized Industrial Zone.`,
      copyNote: 'This text may be used freely.',
    },
    facts: {
      title: 'Company details',
      rows: [
        { k: 'Legal name', v: ORG.legalName },
        { k: 'Founded', v: String(FOUNDED_YEAR) },
        { k: 'Headquarters', v: `${ORG.street}, ${ORG.district} / ${ORG.city}, Türkiye` },
        { k: 'Activity', v: 'Manufacture of solar water heating systems' },
        { k: 'Phone', v: ORG.phone },
        { k: 'E-mail', v: ORG.email },
      ],
    },
    contact: {
      title: 'Press contact',
      body: 'Write to us directly for interviews, image requests and trade-fair or event invitations.',
      mail: 'Send e-mail',
      phone: 'Phone',
    },
    meta: {
      title: 'Press Room and Brand Kit',
      description:
        'Şimşek Solar press room: logos, corporate colour codes, company boilerplate and details. Downloadable brand kit for the press.',
    },
  },
  ar: {
    crumb: 'الغرفة الصحفية',
    hero: {
      eyebrow: 'الغرفة الصحفية',
      title: 'حقيبة علامتنا التجارية وبيانات الشركة',
      subtitle:
        'يمكنكم تنزيل شعاراتنا ورموز ألواننا وبيانات شركتنا من هنا. للاستفسارات الصحفية والمقابلات ودعوات المعارض، تجدون بيانات التواصل في أسفل الصفحة.',
    },
    logos: {
      title: 'الشعارات',
      body: 'استخدموا شعاراتنا دون تغيير نسبها، مع ترك مساحة حولها لا تقل عن ارتفاع الشعار. لا تغيّروا ألوانها؛ واستخدموا النسخة البيضاء على الخلفيات الداكنة.',
      download: 'تنزيل',
    },
    colors: {
      title: 'ألوان الشركة',
      body: 'اللونان الأساسيان في دليل الهوية المؤسسية. تُستخدم هذه الرموز في جميع التطبيقات المطبوعة والرقمية.',
    },
    boilerplate: {
      title: 'النبذة التعريفية للشركة',
      body: 'نص تعريفي قصير يمكن استخدامه في الأخبار والبيانات الصحفية.',
      text: `شركة شيمشك سولار مؤسسة صناعية تنتج أنظمة تسخين المياه بالطاقة الشمسية في مرسين منذ عام ${FOUNDED_YEAR}. تنتج الشركة اللواقط الشمسية المسطحة والأنظمة المركزية والأنظمة الجاهزة لمشاريع المساكن والإسكان الجماعي والفنادق والمشاريع العامة. تُصنَّع منتجاتها وفق معياري CE وTSE في منشأتها بالمنطقة الصناعية المنظمة الثانية في مرسين.`,
      copyNote: 'يمكن استخدام هذا النص بحرية.',
    },
    facts: {
      title: 'بيانات الشركة',
      rows: [
        { k: 'الاسم الرسمي', v: ORG.legalName },
        { k: 'سنة التأسيس', v: String(FOUNDED_YEAR) },
        { k: 'المقر', v: `${ORG.street}, ${ORG.district} / ${ORG.city}` },
        { k: 'النشاط', v: 'إنتاج أنظمة تسخين المياه بالطاقة الشمسية' },
        { k: 'الهاتف', v: ORG.phone },
        { k: 'البريد الإلكتروني', v: ORG.email },
      ],
    },
    contact: {
      title: 'التواصل الصحفي',
      body: 'راسلونا مباشرةً لطلبات المقابلات والصور ودعوات المعارض والفعاليات.',
      mail: 'إرسال بريد إلكتروني',
      phone: 'الهاتف',
    },
    meta: {
      title: 'الغرفة الصحفية وحقيبة العلامة التجارية',
      description:
        'الغرفة الصحفية لشيمشك سولار: الشعارات ورموز الألوان المؤسسية والنبذة التعريفية وبيانات الشركة. حقيبة علامة تجارية قابلة للتنزيل.',
    },
  },
  el: {
    crumb: 'Γραφείο Τύπου',
    hero: {
      eyebrow: 'Γραφείο Τύπου',
      title: 'Το brand kit και τα εταιρικά μας στοιχεία',
      subtitle:
        'Κατεβάστε εδώ τα λογότυπα, τους κωδικούς χρωμάτων και τα στοιχεία της εταιρείας μας. Για ειδήσεις, συνεντεύξεις και εκθέσεις, τα στοιχεία επικοινωνίας βρίσκονται στο κάτω μέρος.',
    },
    logos: {
      title: 'Λογότυπα',
      body: 'Χρησιμοποιήστε τα λογότυπα χωρίς να αλλοιώνετε τις αναλογίες τους και αφήστε γύρω τους κενό τουλάχιστον ίσο με το ύψος του λογοτύπου. Μην αλλάζετε τα χρώματα· σε σκούρο φόντο χρησιμοποιήστε τη λευκή εκδοχή.',
      download: 'Λήψη',
    },
    colors: {
      title: 'Εταιρικά χρώματα',
      body: 'Τα δύο βασικά χρώματα του Οδηγού Εταιρικής Ταυτότητας. Οι κωδικοί αυτοί χρησιμοποιούνται σε όλες τις έντυπες και ψηφιακές εφαρμογές.',
    },
    boilerplate: {
      title: 'Εταιρικό κείμενο',
      body: 'Σύντομη εταιρική περιγραφή για χρήση σε ειδήσεις και δελτία τύπου.',
      text: `Η Şimşek Solar είναι βιομηχανία παραγωγής ηλιακών συστημάτων θέρμανσης νερού, με έδρα τη Μερσίνα από το ${FOUNDED_YEAR}. Παράγει επίπεδους ηλιακούς συλλέκτες, κεντρικά και πακέτα συστήματα για κατοικίες, συγκροτήματα, ξενοδοχεία και δημόσια έργα. Τα προϊόντα της κατασκευάζονται σύμφωνα με τα πρότυπα CE και TSE στις εγκαταστάσεις της στη 2η Οργανωμένη Βιομηχανική Ζώνη Μερσίνας.`,
      copyNote: 'Το κείμενο μπορεί να χρησιμοποιηθεί ελεύθερα.',
    },
    facts: {
      title: 'Εταιρικά στοιχεία',
      rows: [
        { k: 'Επωνυμία', v: ORG.legalName },
        { k: 'Ίδρυση', v: String(FOUNDED_YEAR) },
        { k: 'Έδρα', v: `${ORG.street}, ${ORG.district} / ${ORG.city}` },
        { k: 'Δραστηριότητα', v: 'Παραγωγή ηλιακών συστημάτων θέρμανσης νερού' },
        { k: 'Τηλέφωνο', v: ORG.phone },
        { k: 'E-mail', v: ORG.email },
      ],
    },
    contact: {
      title: 'Επικοινωνία Τύπου',
      body: 'Γράψτε μας απευθείας για συνεντεύξεις, αιτήματα εικόνων και προσκλήσεις σε εκθέσεις.',
      mail: 'Αποστολή e-mail',
      phone: 'Τηλέφωνο',
    },
    meta: {
      title: 'Γραφείο Τύπου και Brand Kit',
      description:
        'Γραφείο Τύπου Şimşek Solar: λογότυπα, εταιρικοί κωδικοί χρωμάτων, εταιρικό κείμενο και στοιχεία. Brand kit προς λήψη.',
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] ?? CONTENT.tr;
  return pageMetadata({ locale, path: '/basin', title: c.meta.title, description: c.meta.description });
}

export default async function PressPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = CONTENT[locale] ?? CONTENT.tr;

  return (
    <>
      <PageBreadcrumb items={[{ name: c.crumb, path: '/basin' }]} />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} />

      {/* Logolar */}
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <Reveal>
            <h2 className="flex items-center gap-3 font-display type-h2 font-bold tracking-tight text-graphite-950">
              <Download size={22} className="text-volt-600" />
              {c.logos.title}
            </h2>
            <p className="mt-3 max-w-2xl type-lead text-mist-600">{c.logos.body}</p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ASSETS.map((a, i) => (
              <Reveal key={a.file} delay={0.05 * i}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-mist-900/10 bg-white">
                  <div
                    className={`flex h-32 items-center justify-center px-6 ${
                      a.dark ? 'bg-graphite-950' : 'bg-mist-50'
                    }`}
                  >
                    <Image
                      src={a.file}
                      alt={a.label}
                      width={499}
                      height={129}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-display text-sm font-bold text-graphite-950">{a.label}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-mist-500">
                      {a.note}
                    </p>
                    {/* Not: indirme bağlantısı yeni sekmede açılır — bazı
                        tarayıcılar `download` özniteliğini engelleyebiliyor. */}
                    <a
                      href={a.file}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-graphite-950/15 px-5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white"
                    >
                      <Download size={15} />
                      {c.logos.download}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Renkler + künye */}
      <section className="section-pad bg-white">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="flex items-center gap-3 font-display type-h2 font-bold tracking-tight text-graphite-950">
              <Palette size={22} className="text-volt-600" />
              {c.colors.title}
            </h2>
            <p className="mt-3 type-lead text-mist-600">{c.colors.body}</p>
            <div className="mt-6 space-y-3">
              {COLORS.map((col) => (
                <div
                  key={col.hex}
                  className="flex items-center gap-4 rounded-2xl border border-mist-900/10 bg-mist-50 p-4"
                >
                  <span className={`h-12 w-12 shrink-0 rounded-xl ${col.swatch}`} aria-hidden />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-graphite-950">{col.name}</p>
                    <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-mist-500">
                      {col.hex}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="flex items-center gap-3 font-display type-h2 font-bold tracking-tight text-graphite-950">
              <Building2 size={22} className="text-volt-600" />
              {c.facts.title}
            </h2>
            <dl className="mt-6 divide-y divide-mist-900/10 overflow-hidden rounded-2xl border border-mist-900/10">
              {c.facts.rows.map((r) => (
                <div key={r.k} className="grid grid-cols-1 gap-1 bg-white p-4 sm:grid-cols-[minmax(0,140px)_minmax(0,1fr)] sm:gap-4">
                  <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                    {r.k}
                  </dt>
                  <dd className="text-sm text-graphite-900">{r.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Tanıtım metni */}
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <Reveal>
            <h2 className="flex items-center gap-3 font-display type-h2 font-bold tracking-tight text-graphite-950">
              <FileText size={22} className="text-volt-600" />
              {c.boilerplate.title}
            </h2>
            <p className="mt-3 max-w-2xl type-lead text-mist-600">{c.boilerplate.body}</p>
            <blockquote className="mt-6 max-w-3xl rounded-2xl border-s-4 border-volt-500 bg-white p-6 text-sm leading-relaxed text-graphite-900 sm:p-8">
              {c.boilerplate.text}
            </blockquote>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-mist-500">
              {c.boilerplate.copyNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Basın iletişimi */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-graphite-gradient p-8 text-white sm:p-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div>
                <h2 className="font-display type-h2-sm font-bold tracking-tight">{c.contact.title}</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-graphite-200">{c.contact.body}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a
                  href={`mailto:${ORG.email}`}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-solar-gradient px-7 text-sm font-semibold text-graphite-900"
                >
                  <Mail size={16} />
                  {c.contact.mail}
                </a>
                <a
                  href={`tel:${ORG.phone.replace(/\s/g, '')}`}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/25 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Phone size={16} />
                  {c.contact.phone}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 text-center text-sm text-mist-600">
              <Link href="/about" className="font-semibold text-graphite-950 underline-offset-4 hover:underline">
                {SITE_NAME}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
