import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import {
  MapPin,
  Phone,
  Mail,
  Briefcase,
  ArrowUpRight,
  FileText,
  PhoneCall,
  PencilRuler,
  PackageCheck,
  Wrench,
  Package,
  ShieldCheck,
  Headphones,
  Settings,
  MessageCircle,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { ServiceForm, type ServiceFormLabels } from '@/components/ServiceForm';
import { Faq } from '@/components/home/Faq';
import { FaqJsonLd } from '@/components/JsonLd';
import { FACTORY_MAP_EMBED } from '@/components/home/HomeContact';
import { getFaqItems } from '@/data/faq';
import { getContent, textsFor } from '@/lib/content';
import { txt } from '@/lib/siteTexts';
import { pageMetadata, ORG, WHATSAPP_NUMBER } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

// Admin iletişim metni düzenlemeleri için ISR.
export const revalidate = 3600;

const HR_EMAIL = 'info@simseksolar.com.tr';

const SERVICE_ICONS = [Wrench, ShieldCheck, Package, Headphones, Settings, MapPin];
const PROCESS_ICONS = [FileText, PhoneCall, PencilRuler, PackageCheck];

interface CardT { title: string; desc: string }
interface ContactExtra {
  mapBadge: string;
  channels: { whatsappValue: string; whatsappNote: string; emailNote: string };
  process: { eyebrow: string; title: string; steps: CardT[] };
  service: {
    eyebrow: string;
    title: string;
    body: string;
    benefits: CardT[];
    urgentTitle: string;
    urgentBody: string;
    call: string;
  };
  career: {
    eyebrow: string;
    title: string;
    body: string;
    cardBody: string;
    button: string;
    mailSubject: string;
  };
  serviceForm: ServiceFormLabels;
}

const CONTACT_EXTRA: Record<Locale, ContactExtra> = {
  tr: {
    mapBadge: 'Şimşek Solar Üretim Tesisi',
    channels: { whatsappValue: 'Hızlı destek hattı', whatsappNote: 'Mesajınıza kısa sürede dönüyoruz', emailNote: '24 saat içinde yanıt veriyoruz' },
    process: {
      eyebrow: 'Çalışma Sürecimiz',
      title: 'Talebiniz sonrası ne oluyor?',
      steps: [
        { title: 'Formu gönderin', desc: 'Talebinizi birkaç dakikada iletin.' },
        { title: 'Uzmanımız sizi arasın', desc: 'İhtiyacınızı birlikte netleştirelim.' },
        { title: 'Projelendirme & teklif', desc: 'Size özel çözüm ve fiyat hazırlanır.' },
        { title: 'Montaj & devreye alma', desc: 'Anahtar teslim uygulama ve satış sonrası destek.' },
      ],
    },
    service: {
      eyebrow: 'Satış Sonrası Hizmet',
      title: 'Kurulumdan sonra da yanınızdayız',
      body: 'Periyodik bakım, garanti kapsamında onarım, orijinal yedek parça ve teknik destekle sistemlerinizin ömrü boyunca yanınızdayız. Servis talebinizi aşağıdaki formdan oluşturun.',
      benefits: [
        { title: 'Periyodik bakım', desc: 'Sistem verimini korumak için düzenli bakım, kontrol ve performans takibi.' },
        { title: 'Garanti & onarım', desc: 'Garanti kapsamında hızlı arıza teşhisi, onarım ve parça değişimi.' },
        { title: 'Orijinal yedek parça', desc: 'Kollektör, boyler, sehpa ve bağlantı ekipmanları için orijinal yedek parça tedariki.' },
        { title: 'Teknik destek', desc: 'Telefon ve uzaktan destekle hızlı çözüm; kurulum ve kullanım danışmanlığı.' },
        { title: 'Devreye alma', desc: 'Kurulum sonrası devreye alma, ayar ve kullanıcı eğitimi.' },
        { title: 'Türkiye geneli servis ağı', desc: 'Bayi ve yetkili servis noktalarıyla ülke genelinde saha desteği.' },
      ],
      urgentTitle: 'Acil servis mi gerekiyor?',
      urgentBody: 'Doğrudan arayın, hızlıca yönlendirelim.',
      call: 'Ara',
    },
    career: {
      eyebrow: 'Kariyer',
      title: 'Ekibimize dahil olun',
      body: 'Enerjiyi geleceğe bırakacağımız en önemli miraslardan biri olarak görüyoruz. Sorumluluk sahibi, öğrenmeye açık ve birlikte başarmaya inanan ekip arkadaşları arıyoruz. Özgeçmişinizi, çalışmak istediğiniz alanı belirterek iletin.',
      cardBody: 'Başvurularınızı ve staj taleplerinizi doğrudan insan kaynakları ekibimize gönderebilirsiniz.',
      button: 'Özgeçmişinizi gönderin',
      mailSubject: 'Kariyer — İş Başvurusu',
    },
    serviceForm: {
      title: 'Servis talebi oluşturun',
      success: 'Servis talebiniz alındı. Teknik ekibimiz en kısa sürede sizinle iletişime geçecek.',
      name: 'Ad Soyad',
      phone: 'Telefon',
      email: 'E-posta',
      city: 'Sistem konumu / Şehir',
      serviceTypeLabel: 'Servis türü',
      selectPlaceholder: 'Seçiniz…',
      serviceTypes: ['Periyodik Bakım', 'Arıza / Onarım', 'Yedek Parça Talebi', 'Garanti Kapsamı', 'Devreye Alma', 'Genel Soru'],
      descriptionLabel: 'Açıklama',
      descriptionHint: '(sistem tipi, arıza belirtisi, kurulum yılı…)',
      submit: 'Talebi gönder',
      error: 'Gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.',
    },
  },
  en: {
    mapBadge: 'Şimşek Solar Production Plant',
    channels: { whatsappValue: 'Quick support line', whatsappNote: 'We reply to your message shortly', emailNote: 'We reply within 24 hours' },
    process: {
      eyebrow: 'Our Process',
      title: 'What happens after your request?',
      steps: [
        { title: 'Send the form', desc: 'Submit your request in a few minutes.' },
        { title: 'Our expert calls you', desc: 'Let’s clarify your needs together.' },
        { title: 'Design & quote', desc: 'A tailored solution and price are prepared.' },
        { title: 'Installation & commissioning', desc: 'Turnkey delivery and after-sales support.' },
      ],
    },
    service: {
      eyebrow: 'After-Sales Service',
      title: 'We’re with you after installation too',
      body: 'With periodic maintenance, warranty repairs, original spare parts and technical support, we stand by you throughout the life of your systems. Create your service request using the form below.',
      benefits: [
        { title: 'Periodic maintenance', desc: 'Regular maintenance, inspection and performance monitoring to preserve system efficiency.' },
        { title: 'Warranty & repair', desc: 'Fast fault diagnosis, repair and part replacement under warranty.' },
        { title: 'Original spare parts', desc: 'Original spare-part supply for collectors, boilers, frames and connection equipment.' },
        { title: 'Technical support', desc: 'Fast solutions via phone and remote support; installation and usage consulting.' },
        { title: 'Commissioning', desc: 'Post-installation commissioning, adjustment and user training.' },
        { title: 'Nationwide service network', desc: 'Field support across the country through dealers and authorized service points.' },
      ],
      urgentTitle: 'Need urgent service?',
      urgentBody: 'Call us directly and we’ll route you quickly.',
      call: 'Call',
    },
    career: {
      eyebrow: 'Careers',
      title: 'Join our team',
      body: 'We see energy as one of the most important legacies we will leave to the future. We are looking for responsible teammates who are open to learning and believe in succeeding together. Send us your CV, indicating the field you’d like to work in.',
      cardBody: 'You can send your applications and internship requests directly to our human resources team.',
      button: 'Send your CV',
      mailSubject: 'Careers — Job Application',
    },
    serviceForm: {
      title: 'Create a service request',
      success: 'Your service request has been received. Our technical team will contact you shortly.',
      name: 'Full Name',
      phone: 'Phone',
      email: 'Email',
      city: 'System location / City',
      serviceTypeLabel: 'Service type',
      selectPlaceholder: 'Select…',
      serviceTypes: ['Periodic Maintenance', 'Fault / Repair', 'Spare Part Request', 'Warranty Coverage', 'Commissioning', 'General Question'],
      descriptionLabel: 'Description',
      descriptionHint: '(system type, fault symptom, year of installation…)',
      submit: 'Send request',
      error: 'Could not be sent. Please try again or call us.',
    },
  },
  ar: {
    mapBadge: 'مصنع شمشك سولار',
    channels: { whatsappValue: 'خط دعم سريع', whatsappNote: 'نردّ على رسالتكم خلال وقت قصير', emailNote: 'نردّ خلال 24 ساعة' },
    process: {
      eyebrow: 'آلية عملنا',
      title: 'ماذا يحدث بعد طلبكم؟',
      steps: [
        { title: 'أرسلوا النموذج', desc: 'قدّموا طلبكم في دقائق.' },
        { title: 'يتصل بكم خبيرنا', desc: 'لنوضّح احتياجكم معاً.' },
        { title: 'التصميم والعرض', desc: 'يُعَدّ حل وسعر مخصّصان لكم.' },
        { title: 'التركيب والتشغيل', desc: 'تسليم مفتاحي ودعم ما بعد البيع.' },
      ],
    },
    service: {
      eyebrow: 'خدمة ما بعد البيع',
      title: 'نحن معكم بعد التركيب أيضاً',
      body: 'بالصيانة الدورية والإصلاح ضمن الضمان وقطع الغيار الأصلية والدعم الفني، نقف إلى جانبكم طوال عمر أنظمتكم. أنشئوا طلب الخدمة عبر النموذج أدناه.',
      benefits: [
        { title: 'الصيانة الدورية', desc: 'صيانة منتظمة وفحص ومتابعة أداء للحفاظ على كفاءة النظام.' },
        { title: 'الضمان والإصلاح', desc: 'تشخيص سريع للأعطال وإصلاح واستبدال قطع ضمن الضمان.' },
        { title: 'قطع غيار أصلية', desc: 'توريد قطع غيار أصلية للمجمعات والخزانات والقواعد ومعدات التوصيل.' },
        { title: 'الدعم الفني', desc: 'حلول سريعة عبر الهاتف والدعم عن بُعد؛ استشارات التركيب والاستخدام.' },
        { title: 'التشغيل', desc: 'تشغيل وضبط بعد التركيب وتدريب المستخدم.' },
        { title: 'شبكة خدمة تغطّي تركيا', desc: 'دعم ميداني في عموم البلاد عبر الوكلاء ونقاط الخدمة المعتمدة.' },
      ],
      urgentTitle: 'هل تحتاجون خدمة عاجلة؟',
      urgentBody: 'اتصلوا بنا مباشرة وسنوجّهكم بسرعة.',
      call: 'اتصال',
    },
    career: {
      eyebrow: 'الوظائف',
      title: 'انضمّوا إلى فريقنا',
      body: 'نرى الطاقة إحدى أهم الموروثات التي سنتركها للمستقبل. نبحث عن زملاء مسؤولين ومنفتحين على التعلّم ويؤمنون بالنجاح المشترك. أرسلوا سيرتكم الذاتية مع تحديد المجال الذي ترغبون في العمل فيه.',
      cardBody: 'يمكنكم إرسال طلباتكم وطلبات التدريب مباشرة إلى فريق الموارد البشرية لدينا.',
      button: 'أرسلوا سيرتكم الذاتية',
      mailSubject: 'الوظائف — طلب توظيف',
    },
    serviceForm: {
      title: 'أنشئوا طلب خدمة',
      success: 'تم استلام طلب الخدمة. سيتواصل معكم فريقنا الفني في أقرب وقت.',
      name: 'الاسم الكامل',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      city: 'موقع النظام / المدينة',
      serviceTypeLabel: 'نوع الخدمة',
      selectPlaceholder: 'اختاروا…',
      serviceTypes: ['صيانة دورية', 'عطل / إصلاح', 'طلب قطع غيار', 'ضمن الضمان', 'التشغيل', 'سؤال عام'],
      descriptionLabel: 'الوصف',
      descriptionHint: '(نوع النظام، أعراض العطل، سنة التركيب…)',
      submit: 'إرسال الطلب',
      error: 'تعذّر الإرسال. يُرجى المحاولة مجدداً أو الاتصال بنا هاتفياً.',
    },
  },
  el: {
    mapBadge: 'Εργοστάσιο Şimşek Solar',
    channels: { whatsappValue: 'Γραμμή γρήγορης υποστήριξης', whatsappNote: 'Απαντάμε στο μήνυμά σας σύντομα', emailNote: 'Απαντάμε εντός 24 ωρών' },
    process: {
      eyebrow: 'Η Διαδικασία μας',
      title: 'Τι συμβαίνει μετά το αίτημά σας;',
      steps: [
        { title: 'Στείλτε τη φόρμα', desc: 'Υποβάλετε το αίτημά σας σε λίγα λεπτά.' },
        { title: 'Ο ειδικός μας σας καλεί', desc: 'Ας διευκρινίσουμε τις ανάγκες σας μαζί.' },
        { title: 'Σχεδιασμός & προσφορά', desc: 'Ετοιμάζεται εξατομικευμένη λύση και τιμή.' },
        { title: 'Εγκατάσταση & λειτουργία', desc: 'Παράδοση με το κλειδί στο χέρι και υποστήριξη μετά την πώληση.' },
      ],
    },
    service: {
      eyebrow: 'Υποστήριξη Μετά την Πώληση',
      title: 'Είμαστε δίπλα σας και μετά την εγκατάσταση',
      body: 'Με περιοδική συντήρηση, επισκευές εντός εγγύησης, γνήσια ανταλλακτικά και τεχνική υποστήριξη, στεκόμαστε στο πλευρό σας σε όλη τη διάρκεια ζωής των συστημάτων σας. Δημιουργήστε το αίτημα εξυπηρέτησής σας με την παρακάτω φόρμα.',
      benefits: [
        { title: 'Περιοδική συντήρηση', desc: 'Τακτική συντήρηση, έλεγχος και παρακολούθηση απόδοσης για τη διατήρηση της απόδοσης του συστήματος.' },
        { title: 'Εγγύηση & επισκευή', desc: 'Γρήγορη διάγνωση βλαβών, επισκευή και αντικατάσταση εξαρτημάτων εντός εγγύησης.' },
        { title: 'Γνήσια ανταλλακτικά', desc: 'Προμήθεια γνήσιων ανταλλακτικών για συλλέκτες, μπόιλερ, βάσεις και εξοπλισμό σύνδεσης.' },
        { title: 'Τεχνική υποστήριξη', desc: 'Γρήγορες λύσεις μέσω τηλεφώνου και απομακρυσμένης υποστήριξης· συμβουλευτική εγκατάστασης και χρήσης.' },
        { title: 'Θέση σε λειτουργία', desc: 'Θέση σε λειτουργία μετά την εγκατάσταση, ρύθμιση και εκπαίδευση χρήστη.' },
        { title: 'Δίκτυο εξυπηρέτησης σε όλη τη χώρα', desc: 'Υποστήριξη πεδίου σε όλη τη χώρα μέσω αντιπροσώπων και εξουσιοδοτημένων σημείων εξυπηρέτησης.' },
      ],
      urgentTitle: 'Χρειάζεστε επείγουσα εξυπηρέτηση;',
      urgentBody: 'Καλέστε μας απευθείας και θα σας κατευθύνουμε γρήγορα.',
      call: 'Κλήση',
    },
    career: {
      eyebrow: 'Καριέρα',
      title: 'Γίνετε μέλος της ομάδας μας',
      body: 'Βλέπουμε την ενέργεια ως μία από τις σημαντικότερες κληρονομιές που θα αφήσουμε στο μέλλον. Αναζητούμε υπεύθυνους συνεργάτες, ανοιχτούς στη μάθηση, που πιστεύουν στην κοινή επιτυχία. Στείλτε μας το βιογραφικό σας, αναφέροντας τον τομέα στον οποίο θα θέλατε να εργαστείτε.',
      cardBody: 'Μπορείτε να στείλετε τις αιτήσεις σας και τα αιτήματα πρακτικής άσκησης απευθείας στην ομάδα ανθρώπινου δυναμικού μας.',
      button: 'Στείλτε το βιογραφικό σας',
      mailSubject: 'Καριέρα — Αίτηση Εργασίας',
    },
    serviceForm: {
      title: 'Δημιουργήστε αίτημα εξυπηρέτησης',
      success: 'Το αίτημα εξυπηρέτησής σας ελήφθη. Η τεχνική μας ομάδα θα επικοινωνήσει μαζί σας σύντομα.',
      name: 'Ονοματεπώνυμο',
      phone: 'Τηλέφωνο',
      email: 'Email',
      city: 'Τοποθεσία συστήματος / Πόλη',
      serviceTypeLabel: 'Τύπος εξυπηρέτησης',
      selectPlaceholder: 'Επιλέξτε…',
      serviceTypes: ['Περιοδική Συντήρηση', 'Βλάβη / Επισκευή', 'Αίτημα Ανταλλακτικού', 'Κάλυψη Εγγύησης', 'Θέση σε Λειτουργία', 'Γενική Ερώτηση'],
      descriptionLabel: 'Περιγραφή',
      descriptionHint: '(τύπος συστήματος, σύμπτωμα βλάβης, έτος εγκατάστασης…)',
      submit: 'Αποστολή αιτήματος',
      error: 'Δεν στάλθηκε. Δοκιμάστε ξανά ή καλέστε μας.',
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.hero' });
  return pageMetadata({ locale, path: '/contact', title: t('title'), description: t('subtitle') });
}

const FAQ_HEADER: Record<Locale, { eyebrow: string; title: string; subtitle: string }> = {
  tr: {
    eyebrow: 'Sık Sorulan Sorular',
    title: 'Güneş enerjili sıcak su hakkında merak edilenler',
    subtitle:
      'Sistem çalışması, boyler kapasitesi, tasarruf, bakım, TOKİ ve kamu projeleri hakkında en çok sorulanlar. Aradığınızı bulamazsanız bize ulaşın.',
  },
  en: {
    eyebrow: 'Frequently Asked Questions',
    title: 'What people ask about solar hot water',
    subtitle:
      'The most common questions about system operation, boiler capacity, savings, maintenance and public projects. Can’t find what you need? Get in touch.',
  },
  ar: {
    eyebrow: 'الأسئلة الشائعة',
    title: 'ما يتساءل عنه الناس حول الماء الساخن الشمسي',
    subtitle:
      'أكثر الأسئلة شيوعاً حول تشغيل النظام وسعة الخزان والتوفير والصيانة والمشاريع العامة. لم تجدوا ما تبحثون عنه؟ تواصلوا معنا.',
  },
  el: {
    eyebrow: 'Συχνές Ερωτήσεις',
    title: 'Τι ρωτούν οι άνθρωποι για το ηλιακό ζεστό νερό',
    subtitle:
      'Οι πιο συχνές ερωτήσεις για τη λειτουργία του συστήματος, τη χωρητικότητα μπόιλερ, την εξοικονόμηση, τη συντήρηση και τα δημόσια έργα. Δεν βρίσκετε αυτό που ψάχνετε; Επικοινωνήστε μαζί μας.',
  },
};

export default async function ContactPage() {
  const t = await getTranslations('contact');
  const locale = (await getLocale()) as Locale;
  const faq = getFaqItems(locale);
  const ce = CONTACT_EXTRA[locale] ?? CONTACT_EXTRA.tr;
  const texts = textsFor(await getContent(), locale);
  const tel = `tel:${ORG.phone.replace(/\s/g, '')}`;

  const phone = txt(texts, 'contact.phone', t('info.phone'));
  const email = txt(texts, 'contact.email', t('info.email'));
  const address = txt(texts, 'contact.address', t('info.address'));
  const hours = txt(texts, 'contact.hours', t('info.hours'));

  const channels = [
    { icon: Phone, title: t('info.phoneTitle'), value: phone, note: hours, href: tel, dir: 'ltr' as const, external: false },
    { icon: MessageCircle, title: 'WhatsApp', value: ce.channels.whatsappValue, note: ce.channels.whatsappNote, href: `https://wa.me/${WHATSAPP_NUMBER}`, dir: undefined, external: true },
    { icon: Mail, title: t('info.emailTitle'), value: email, note: ce.channels.emailNote, href: `mailto:${email}`, dir: 'ltr' as const, external: false },
    { icon: MapPin, title: t('info.addressTitle'), value: address, note: null, href: null, dir: undefined, external: false },
  ];

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section-pad bg-white">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {channels.map((c, i) => {
                const inner = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-600 transition-colors group-hover:bg-volt-500 group-hover:text-graphite-950">
                      <c.icon size={20} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-sm font-bold text-graphite-950">{c.title}</h3>
                      <p className="mt-1 break-words text-sm leading-relaxed text-mist-700" dir={c.dir}>
                        {c.value}
                      </p>
                      {c.note && <p className="mt-1 text-[11px] font-medium text-volt-700">{c.note}</p>}
                    </div>
                  </>
                );
                const cls =
                  'group flex h-full gap-3.5 rounded-2xl border border-mist-900/10 bg-mist-50 p-5 transition-all';
                return (
                  <Reveal key={c.title} delay={i * 0.06}>
                    {c.href ? (
                      <a
                        href={c.href}
                        {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className={`${cls} hover:-translate-y-0.5 hover:border-volt-500/40 hover:bg-white hover:shadow-card`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.3} className="mt-3">
              <div className="group relative overflow-hidden rounded-2xl border border-mist-900/10 bg-mist-100 shadow-card">
                <iframe
                  src={FACTORY_MAP_EMBED}
                  title={t('info.addressTitle')}
                  className="h-72 w-full border-0 grayscale-[0.85] contrast-[0.95] transition-all duration-500 group-hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/80 to-transparent" aria-hidden />
                <div className="pointer-events-none absolute start-3 top-3 flex items-center gap-2 rounded-full border border-mist-900/10 bg-white/95 py-1.5 pe-4 ps-2 shadow-sm backdrop-blur-sm">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-volt-500 text-graphite-950">
                    <MapPin size={13} strokeWidth={2} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs font-bold text-graphite-950">{ce.mapBadge}</p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-mist-600">Mersin 2. OSB</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Çalışma sürecimiz — talep sonrası ne olacağını gösteren akış */}
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
                {ce.process.eyebrow}
              </p>
              <h2 className="mt-4 text-balance font-display type-h2-sm font-bold tracking-tight text-graphite-950">
                {ce.process.title}
              </h2>
            </div>
          </Reveal>

          <div className="relative mt-12">
            <span
              className="pointer-events-none absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-volt-500/45 to-transparent lg:block"
              aria-hidden
            />
            <ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {ce.process.steps.map((step, i) => {
                const Icon = PROCESS_ICONS[i];
                return (
                <Reveal key={step.title} delay={i * 0.08}>
                  <li className="group relative flex flex-col items-center text-center">
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-volt-500/25 bg-white text-volt-700 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-volt-500 group-hover:bg-volt-500 group-hover:text-graphite-950">
                      <Icon size={22} strokeWidth={1.8} />
                      <span className="absolute -end-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-graphite-950 font-tabular font-mono text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                    </span>
                    <h3 className="mt-5 font-display text-base font-bold text-graphite-950">{step.title}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist-700">{step.desc}</p>
                  </li>
                </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Satış Sonrası Hizmet — servis sayfasından iletişime gömüldü */}
      <section id="servis" className="section-pad scroll-mt-24 bg-white">
        <div className="container-page">
          <Reveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-mist-500">
                {ce.service.eyebrow}
              </p>
              <h2 className="mt-3 font-display type-h2 font-bold tracking-tight text-graphite-950">
                {ce.service.title}
              </h2>
              <p className="mt-4 text-mist-700">{ce.service.body}</p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {ce.service.benefits.map((b, i) => {
                  const Icon = SERVICE_ICONS[i];
                  return (
                  <Reveal key={b.title} delay={i * 0.06} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
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

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-mist-900/10 bg-mist-50 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display text-sm font-bold text-graphite-950">{ce.service.urgentTitle}</p>
                    <p className="mt-1 text-sm text-mist-700">{ce.service.urgentBody}</p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href={tel}
                      className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                    >
                      <Phone size={15} />
                      {ce.service.call}
                    </a>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                    >
                      <MessageCircle size={15} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <ServiceForm labels={ce.serviceForm} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sık sorulan sorular */}
      <Faq items={faq} header={FAQ_HEADER[locale] ?? FAQ_HEADER.tr} />
      <FaqJsonLd items={faq} />

      {/* Kariyer — İnsan Kaynakları iletişim ile birleştirildi */}
      <section id="kariyer" className="scroll-mt-24 bg-mist-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 items-center gap-10 rounded-3xl bg-graphite-gradient p-9 text-white sm:p-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite-300">
                {ce.career.eyebrow}
              </p>
              <h2 className="mt-4 font-display type-h2-sm font-bold">{ce.career.title}</h2>
              <p className="mt-4 max-w-lg leading-relaxed text-graphite-200">{ce.career.body}</p>
            </div>
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-volt-500 text-graphite-950">
                <Briefcase size={22} strokeWidth={1.75} />
              </span>
              <p className="text-sm leading-relaxed text-graphite-200">{ce.career.cardBody}</p>
              <a
                href={`mailto:${HR_EMAIL}?subject=${encodeURIComponent(ce.career.mailSubject)}`}
                className="inline-flex items-center gap-2 rounded-full bg-solar-gradient px-6 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
              >
                <Mail size={15} />
                {ce.career.button}
                <ArrowUpRight size={15} />
              </a>
              <p className="font-mono text-[11px] tracking-tight text-graphite-400">{HR_EMAIL}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
