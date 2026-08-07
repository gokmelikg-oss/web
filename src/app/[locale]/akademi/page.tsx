import type { Metadata } from 'next';
import {
  Ruler,
  ArrowUpRight,
  Sun,
  Wrench,
  ClipboardList,
  LineChart,
  Droplets,
  ShieldCheck,
  Calculator,
  Home,
  type LucideIcon,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { PageBreadcrumb } from '@/components/JsonLd';
import { PremiumIndex, type PremiumIndexItem } from '@/components/PremiumIndex';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

/* ---- Bilgi/kaynak index'i (dile bağımsız iskelet) ---- */
const AREA_BASE: Pick<PremiumIndexItem, 'id' | 'href' | 'accent' | 'iconKey'>[] = [
  { id: 'dokumanlar', href: '/resources', accent: '#22c98b', iconKey: 'dokuman' },
  { id: 'muhendislik', href: '/akademi#muhendislik', accent: '#22c9e6', iconKey: 'muhendislik' },
  { id: 'egitimler', href: '/akademi#egitimler', accent: '#f6bc32', iconKey: 'egitim' },
];
/* ---- İnteraktif araçlar (premium bölüm) ---- */
const TOOLS_BASE: { id: string; href: string; icon: LucideIcon; accent: string }[] = [
  { id: 'hesaplama', href: '/calculator', icon: Calculator, accent: 'from-volt-500/20' },
  { id: 'potansiyel', href: '/gunes-potansiyeli', icon: Sun, accent: 'from-amber-500/20' },
  { id: 'cati', href: '/gunes-potansiyeli#cati', icon: Home, accent: 'from-emerald-500/20' },
];
const TRAINING_ICONS: LucideIcon[] = [Sun, Wrench, ClipboardList, ShieldCheck];
const ENGINEERING_ICONS: LucideIcon[] = [LineChart, ClipboardList, Ruler, Droplets];

interface AreaText { title: string; desc: string; meta: string; tags: string[] }
interface ToolText { title: string; desc: string; cta: string }
interface CardText { title: string; desc: string }
interface AcademyText {
  crumb: string;
  hero: { eyebrow: string; title: string; subtitle: string };
  tools: { eyebrow: string; title: string; subtitle: string; items: ToolText[] };
  index: { eyebrow: string; title: string; actionLabel: string };
  areas: AreaText[];
  trainings: { eyebrow: string; title: string; body: string; items: CardText[] };
  engineering: { eyebrow: string; title: string; body: string; items: CardText[] };
  cta: { title: string; body: string; button: string };
  meta: { title: string; description: string };
}

const CONTENT: Record<Locale, AcademyText> = {
  tr: {
    crumb: 'Şimşek Akademi',
    hero: {
      eyebrow: 'Şimşek Akademi',
      title: 'Bilgi, araçlar ve mühendislik tek çatı altında',
      subtitle:
        'Doğru sistemi kendiniz keşfedin: hesaplama araçları, il bazlı güneş potansiyeli ve çatı uygunluk kontrolü; ardından teknik dökümanlar, eğitimler ve uçtan uca mühendislik desteği.',
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
    index: { eyebrow: 'Bilgi & Kaynaklar', title: 'Dökümanlar, eğitimler ve mühendislik', actionLabel: 'Keşfet' },
    areas: [
      { title: 'Teknik Dökümanlar', desc: 'Teknik föyler, ölçü çizimleri, kurulum kılavuzları ve sertifikalar tek arşivde; projelendirme ve montaj için gereken tüm belgeler.', meta: 'Föy · Çizim · Sertifika', tags: ['Teknik föyler', 'Kurulum kılavuzları', 'Sertifikalar'] },
      { title: 'Mühendislik Hizmeti', desc: 'Kapasite hesabı, statik proje, saha etüdü ve sistem şeması ile fikirden devreye almaya uçtan uca mühendislik desteği.', meta: 'Fikirden devreye alma', tags: ['Kapasite hesabı', 'Statik proje', 'Saha etüdü', 'Merkezi sistem'] },
      { title: 'Eğitimler', desc: 'Bayiler, tesisatçılar ve mühendisler için güneş enerjisi, montaj ve projelendirme eğitimleri. Teoriyle uygulamayı birleştiren, sahada işe yarayan içerikler.', meta: '4 program · Uygulamalı', tags: ['Temel eğitim', 'Montaj', 'Projelendirme', 'Bakım'] },
    ],
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
    engineering: {
      eyebrow: 'Mühendislik Hizmeti',
      title: 'Fikirden devreye almaya mühendislik desteği',
      body: 'Projenizin ihtiyacına göre kapasite hesabından statik projeye, saha etüdünden merkezi sistem tasarımına kadar mühendislik ekibimiz yanınızda.',
      items: [
        { title: 'Kapasite ve verim hesabı', desc: 'Hane veya tesis tüketimine göre kolektör ve boyler kapasitesi hesaplanır.' },
        { title: 'Projelendirme ve statik hesap', desc: 'Çatı yapısına özel sistem şeması, statik hesap ve teknik çizimler hazırlanır.' },
        { title: 'Saha etüdü', desc: 'Konum, yönlenim ve gölgelenme analiziyle sahaya özel çözüm belirlenir.' },
        { title: 'Merkezi sistem tasarımı', desc: 'Toplu konut ve tesisler için kolektör tarlası + merkezi boyler kombinasyonu.' },
      ],
    },
    cta: { title: 'Eğitim veya mühendislik desteği alın', body: 'Eğitim talepleriniz, projelendirme ve mühendislik hizmetleri için ekibimizle iletişime geçin.', button: 'Talep oluştur' },
    meta: {
      title: 'Şimşek Akademi — Araçlar, Eğitim ve Teknik Kaynaklar',
      description: 'İnteraktif hesaplama araçları, il bazlı güneş potansiyeli, çatı uygunluk kontrolü, teknik dökümanlar, eğitimler ve mühendislik hizmetleri tek çatı altında: Şimşek Akademi.',
    },
  },
  en: {
    crumb: 'Şimşek Academy',
    hero: {
      eyebrow: 'Şimşek Academy',
      title: 'Knowledge, tools and engineering under one roof',
      subtitle:
        'Discover the right system yourself: calculation tools, solar potential by province and a roof-suitability check; then technical documents, training and end-to-end engineering support.',
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
    index: { eyebrow: 'Knowledge & Resources', title: 'Documents, training and engineering', actionLabel: 'Explore' },
    areas: [
      { title: 'Technical Documents', desc: 'Technical data sheets, dimension drawings, installation guides and certificates in a single archive; every document you need for design and installation.', meta: 'Sheet · Drawing · Certificate', tags: ['Data sheets', 'Installation guides', 'Certificates'] },
      { title: 'Engineering Service', desc: 'End-to-end engineering support from idea to commissioning with capacity calculation, structural design, site survey and system layout.', meta: 'From idea to commissioning', tags: ['Capacity calculation', 'Structural design', 'Site survey', 'Central system'] },
      { title: 'Training', desc: 'Solar energy, installation and design training for dealers, installers and engineers. Content that combines theory with practice and works in the field.', meta: '4 programs · Hands-on', tags: ['Fundamentals', 'Installation', 'Design', 'Maintenance'] },
    ],
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
    engineering: {
      eyebrow: 'Engineering Service',
      title: 'Engineering support from idea to commissioning',
      body: 'From capacity calculation to structural design, from site survey to central system design, our engineering team is at your side according to your project’s needs.',
      items: [
        { title: 'Capacity and efficiency calculation', desc: 'Collector and boiler capacity are calculated based on household or facility consumption.' },
        { title: 'Design and structural calculation', desc: 'A system layout, structural calculation and technical drawings specific to the roof structure are prepared.' },
        { title: 'Site survey', desc: 'A site-specific solution is determined through location, orientation and shading analysis.' },
        { title: 'Central system design', desc: 'A collector field + central boiler combination for mass housing and facilities.' },
      ],
    },
    cta: { title: 'Get training or engineering support', body: 'Contact our team for your training requests, design and engineering services.', button: 'Create a request' },
    meta: {
      title: 'Şimşek Academy — Tools, Training and Technical Resources',
      description: 'Interactive calculation tools, solar potential by province, roof-suitability check, technical documents, training and engineering services under one roof: Şimşek Academy.',
    },
  },
  ar: {
    crumb: 'أكاديمية شمشك',
    hero: {
      eyebrow: 'أكاديمية شمشك',
      title: 'المعرفة والأدوات والهندسة تحت سقف واحد',
      subtitle:
        'اكتشفوا النظام المناسب بأنفسكم: أدوات حساب، والإمكان الشمسي حسب المحافظة، وفحص ملاءمة السطح؛ ثم مستندات فنية وتدريب ودعم هندسي شامل.',
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
    index: { eyebrow: 'المعرفة والموارد', title: 'المستندات والتدريب والهندسة', actionLabel: 'استكشف' },
    areas: [
      { title: 'المستندات الفنية', desc: 'نشرات فنية ورسومات أبعاد وأدلة تركيب وشهادات في أرشيف واحد؛ كل مستند تحتاجونه للتصميم والتركيب.', meta: 'نشرة · رسم · شهادة', tags: ['النشرات الفنية', 'أدلة التركيب', 'الشهادات'] },
      { title: 'الخدمة الهندسية', desc: 'دعم هندسي من الفكرة إلى التشغيل مع حساب السعة والتصميم الإنشائي والمسح الميداني ومخطط النظام.', meta: 'من الفكرة إلى التشغيل', tags: ['حساب السعة', 'التصميم الإنشائي', 'المسح الميداني', 'النظام المركزي'] },
      { title: 'التدريب', desc: 'تدريب على الطاقة الشمسية والتركيب والتصميم للوكلاء والفنيين والمهندسين. محتوى يجمع النظرية بالتطبيق ويفيد في الميدان.', meta: '4 برامج · تطبيقي', tags: ['الأساسيات', 'التركيب', 'التصميم', 'الصيانة'] },
    ],
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
    engineering: {
      eyebrow: 'الخدمة الهندسية',
      title: 'دعم هندسي من الفكرة إلى التشغيل',
      body: 'من حساب السعة إلى التصميم الإنشائي، ومن المسح الميداني إلى تصميم النظام المركزي، فريقنا الهندسي إلى جانبكم وفق احتياجات مشروعكم.',
      items: [
        { title: 'حساب السعة والكفاءة', desc: 'تُحسَب سعة المجمّع والخزان حسب استهلاك الأسرة أو المنشأة.' },
        { title: 'التصميم والحساب الإنشائي', desc: 'يُعَدّ مخطط نظام وحساب إنشائي ورسومات فنية خاصة ببنية السطح.' },
        { title: 'المسح الميداني', desc: 'يُحدَّد حل خاص بالموقع عبر تحليل الموقع والاتجاه والتظليل.' },
        { title: 'تصميم النظام المركزي', desc: 'تركيبة حقل مجمعات + خزان مركزي للإسكان الجماعي والمنشآت.' },
      ],
    },
    cta: { title: 'احصلوا على دعم تدريبي أو هندسي', body: 'تواصلوا مع فريقنا لطلبات التدريب وخدمات التصميم والهندسة.', button: 'إنشاء طلب' },
    meta: {
      title: 'أكاديمية شمشك — الأدوات والتدريب والموارد الفنية',
      description: 'أدوات حساب تفاعلية، والإمكان الشمسي حسب المحافظة، وفحص ملاءمة السطح، ومستندات فنية وتدريب وخدمات هندسية تحت سقف واحد: أكاديمية شمشك.',
    },
  },
  el: {
    crumb: 'Ακαδημία Şimşek',
    hero: {
      eyebrow: 'Ακαδημία Şimşek',
      title: 'Γνώση, εργαλεία και μηχανική υπό μία στέγη',
      subtitle:
        'Ανακαλύψτε μόνοι σας το σωστό σύστημα: εργαλεία υπολογισμού, ηλιακό δυναμικό ανά επαρχία και έλεγχο καταλληλότητας στέγης· έπειτα τεχνικά έγγραφα, εκπαίδευση και ολοκληρωμένη υποστήριξη μηχανικής.',
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
    index: { eyebrow: 'Γνώση & Πόροι', title: 'Έγγραφα, εκπαίδευση και μηχανική', actionLabel: 'Εξερευνήστε' },
    areas: [
      { title: 'Τεχνικά Έγγραφα', desc: 'Τεχνικά φύλλα δεδομένων, σχέδια διαστάσεων, οδηγοί εγκατάστασης και πιστοποιητικά σε ένα αρχείο· κάθε έγγραφο που χρειάζεστε για τον σχεδιασμό και την εγκατάσταση.', meta: 'Φύλλο · Σχέδιο · Πιστοποιητικό', tags: ['Φύλλα δεδομένων', 'Οδηγοί εγκατάστασης', 'Πιστοποιητικά'] },
      { title: 'Υπηρεσία Μηχανικής', desc: 'Ολοκληρωμένη υποστήριξη μηχανικής από την ιδέα έως τη θέση σε λειτουργία με υπολογισμό χωρητικότητας, στατικό σχεδιασμό, επιτόπια μελέτη και διάταξη συστήματος.', meta: 'Από την ιδέα στη λειτουργία', tags: ['Υπολογισμός χωρητικότητας', 'Στατικός σχεδιασμός', 'Επιτόπια μελέτη', 'Κεντρικό σύστημα'] },
      { title: 'Εκπαίδευση', desc: 'Εκπαίδευση σε ηλιακή ενέργεια, εγκατάσταση και σχεδιασμό για αντιπροσώπους, εγκαταστάτες και μηχανικούς. Περιεχόμενο που συνδυάζει θεωρία με πράξη και λειτουργεί στο πεδίο.', meta: '4 προγράμματα · Πρακτικά', tags: ['Βασικά', 'Εγκατάσταση', 'Σχεδιασμός', 'Συντήρηση'] },
    ],
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
    engineering: {
      eyebrow: 'Υπηρεσία Μηχανικής',
      title: 'Υποστήριξη μηχανικής από την ιδέα στη λειτουργία',
      body: 'Από τον υπολογισμό χωρητικότητας έως τον στατικό σχεδιασμό, από την επιτόπια μελέτη έως τον σχεδιασμό κεντρικού συστήματος, η ομάδα μηχανικής μας είναι στο πλευρό σας ανάλογα με τις ανάγκες του έργου σας.',
      items: [
        { title: 'Υπολογισμός χωρητικότητας και απόδοσης', desc: 'Η χωρητικότητα συλλέκτη και μπόιλερ υπολογίζεται με βάση την κατανάλωση νοικοκυριού ή εγκατάστασης.' },
        { title: 'Σχεδιασμός και στατικός υπολογισμός', desc: 'Ετοιμάζονται διάταξη συστήματος, στατικός υπολογισμός και τεχνικά σχέδια ειδικά για τη δομή της στέγης.' },
        { title: 'Επιτόπια μελέτη', desc: 'Καθορίζεται λύση ειδική για τον χώρο μέσω ανάλυσης τοποθεσίας, προσανατολισμού και σκίασης.' },
        { title: 'Σχεδιασμός κεντρικού συστήματος', desc: 'Συνδυασμός πεδίου συλλεκτών + κεντρικού μπόιλερ για μαζικές κατοικίες και εγκαταστάσεις.' },
      ],
    },
    cta: { title: 'Λάβετε εκπαιδευτική ή τεχνική υποστήριξη', body: 'Επικοινωνήστε με την ομάδα μας για τα αιτήματα εκπαίδευσης, τις υπηρεσίες σχεδιασμού και μηχανικής.', button: 'Δημιουργία αιτήματος' },
    meta: {
      title: 'Ακαδημία Şimşek — Εργαλεία, Εκπαίδευση και Τεχνικοί Πόροι',
      description: 'Διαδραστικά εργαλεία υπολογισμού, ηλιακό δυναμικό ανά επαρχία, έλεγχος καταλληλότητας στέγης, τεχνικά έγγραφα, εκπαίδευση και υπηρεσίες μηχανικής υπό μία στέγη: Ακαδημία Şimşek.',
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
  return pageMetadata({ locale, path: '/akademi', title: c.meta.title, description: c.meta.description });
}

export default async function AkademiPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = CONTENT[locale] ?? CONTENT.tr;

  const academyAreas: PremiumIndexItem[] = AREA_BASE.map((base, i) => ({ ...base, ...c.areas[i] }));

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
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-400">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                {c.tools.eyebrow}
              </p>
              <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {c.tools.title}
              </h2>
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

      {/* Bilgi & kaynaklar — premium interaktif index */}
      <PremiumIndex eyebrow={c.index.eyebrow} title={c.index.title} items={academyAreas} actionLabel={c.index.actionLabel} />

      {/* Eğitimler */}
      <section id="egitimler" className="section-pad scroll-mt-24 bg-mist-50">
        <div className="container-page">
          <Reveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                {c.trainings.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                {c.trainings.title}
              </h2>
              <p className="mt-4 text-mist-700">{c.trainings.body}</p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {c.trainings.items.map((item, i) => {
              const Icon = TRAINING_ICONS[i];
              return (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="flex h-full gap-4 rounded-2xl border border-mist-900/10 bg-white p-6 transition-colors hover:border-volt-500/40">
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

      {/* Mühendislik hizmeti */}
      <section id="muhendislik" className="section-pad scroll-mt-24 bg-white">
        <div className="container-page">
          <Reveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                {c.engineering.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                {c.engineering.title}
              </h2>
              <p className="mt-4 text-mist-700">{c.engineering.body}</p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.engineering.items.map((e, i) => {
              const Icon = ENGINEERING_ICONS[i];
              return (
                <Reveal key={e.title} delay={i * 0.06}>
                  <div className="flex h-full flex-col rounded-2xl border border-mist-900/10 bg-mist-50 p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-graphite-950">{e.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-700">{e.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* CTA */}
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-graphite-gradient p-9 text-center text-white sm:p-12">
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
