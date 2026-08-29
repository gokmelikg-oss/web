import type { Metadata } from 'next';
import { Hammer, Globe2, Factory, Rocket, ArrowRight, type LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { PageBreadcrumb } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { GroupCompanies } from '@/components/GroupCompanies';
import type { Locale } from '@/i18n/config';

/* Dile bağımsız iskelet: dönem id/ikon ve kilometre taşı yılları (metin dilden gelir). */
const ERA_META: { id: string; icon: LucideIcon; years: string[] }[] = [
  { id: 'kurulus', icon: Hammer, years: ['1992', '1997', '2000', '2002'] },
  { id: 'uluslararasi', icon: Globe2, years: ['2003', '2008', '2011', '2012'] },
  { id: 'modern-uretim', icon: Factory, years: ['2013', '2014', '2015'] },
  { id: 'kuresel-donusum', icon: Rocket, years: ['2018', '2019', '2022', '2023', '2024', '2025'] },
];

interface MilestoneText { title: string; desc: string }
interface EraText { label: string; range: string; milestones: MilestoneText[] }
interface HistoryText {
  crumb: string;
  hero: { eyebrow: string; title: string; subtitle: string };
  eras: EraText[];
  today: { eyebrow: string; title: string; body: string; button: string };
  meta: { title: string; description: string };
}

const CONTENT: Record<Locale, HistoryText> = {
  tr: {
    crumb: 'Tarihçe',
    hero: {
      eyebrow: 'Tarihçe',
      title: 'Küçük bir atölyeden entegre enerji ekosistemine',
      subtitle: "1992'den bugüne, her adımı bir öncekini ileri taşıyan 30 yılı aşkın bir yolculuk.",
    },
    eras: [
      {
        label: 'Kuruluş Yılları',
        range: '1992 — 2002',
        milestones: [
          { title: 'Temellerin atılması', desc: "Mersin'de küçük bir atölyede alüminyum ve metal işleriyle kurulan hayaller, yıllar içinde güçlü hedeflere dönüşecek yolculuğuna başladı." },
          { title: 'Solar termal kolektör üretimi', desc: 'Geliştirilen ürünlerle markanın yenilenebilir enerji sektöründeki tanınırlığı hızla arttı.' },
          { title: 'Türkiye genelinde bayi ağı', desc: 'Ürün çeşitliliğinin artmasıyla bayi ağı kuruldu; Türkiye genelindeki çözüm ortaklarına ulaşan güçlü bir yapı oluşturuldu.' },
          { title: 'Kurumsal kimlik', desc: 'Kurumsal yapının oluşturulmasıyla marka kimliği güçlendirildi.' },
        ],
      },
      {
        label: 'Uluslararası Açılım',
        range: '2003 — 2012',
        milestones: [
          { title: 'İlk ihracat: Bulgaristan', desc: "Solar termal kolektörlerin Bulgaristan'daki projelerde kullanılmasıyla uluslararası pazarın kapısı açıldı." },
          { title: 'Boyler üretimine geçiş', desc: 'Kolektör üretimine ek olarak boyler üretimi hız kazandı; makine parkuru yatırımları büyüdü.' },
          { title: 'Ultrasonik kaynak teknolojisi', desc: 'Ultrasonik kaynak makinasının devreye alınmasıyla ulusal ve uluslararası birçok sertifikasyon ve Ar-Ge süreci tamamlandı.' },
          { title: 'Van deprem konutları', desc: "Van deprem konutlarındaki büyük ölçekli uygulamalar; kalite, uzun ömür ve satış sonrası hizmet yaklaşımıyla sektör liderliğini pekiştirdi." },
        ],
      },
      {
        label: 'Modern Üretim Dönemi',
        range: '2013 — 2017',
        milestones: [
          { title: "2. OSB'de yeni tesis inşaatı", desc: "Mersin Tarsus 2. Organize Sanayi Bölgesi'nde 11.575 m²'lik arsa üzerinde fabrika ve idari bina inşaatına başlandı; aynı yıl Solar Keymark sertifikası alındı." },
          { title: 'Üretim kampüsünün açılışı', desc: "5.700 m² kapalı üretim alanı ve 1.300 m² idari bina tamamlandı. Emaye fırını yatırımıyla boyler üretimi tamamen şirket bünyesine alındı; üretim zinciri tam bağımsız hâle geldi." },
          { title: 'AFAD projeleri', desc: 'Mülteci kamplarındaki elektrikli ısıtmanın güneş enerjisine dönüştürülmesi projeleri başarıyla tamamlandı.' },
        ],
      },
      {
        label: 'Küresel Dönüşüm',
        range: '2018 — Bugün',
        milestones: [
          { title: 'Yeni dönemin başlangıcı', desc: "Sinan Şimşek'in şirket hisselerinin tamamına sahip olmasıyla daha vizyoner ve küresel bir büyüme dönemi başladı." },
          { title: 'Dijital dönüşüm ve ihracat atağı', desc: 'Üretimden sevkiyata tüm iş akışları ERP sistemine taşındı; ihracat ağı birçok yeni pazara genişletildi.' },
          { title: "SMK Alüminyum'un kuruluşu", desc: 'Alüminyum profil, krom ve fleks borular ile sarf malzemeleri grup bünyesinde tedarik edilmeye başlandı; tedarik zinciri tamamen iç kaynaklara taşındı.' },
          { title: 'Lazer kaynak yatırımı', desc: 'Kolektör üretim kalitesini yükselten lazer kaynak makinası devreye alındı.' },
          { title: "Şimşek Yenilenebilir Enerji Sistemleri'nin kurulması", desc: 'Yurt içi satış, proje uygulamaları, montaj, servis ve satış sonrası süreçler tek merkezden yönetilmeye başlandı.' },
          { title: 'Lipus markasının doğuşu', desc: 'Enerji depolama, ısı pompası, havuz ısıtma, PV ve şarj istasyonu teknolojilerini birleştiren yeni nesil enerji markası kuruldu.' },
        ],
      },
    ],
    today: {
      eyebrow: 'Bugün',
      title: 'Entegre yenilenebilir enerji ekosistemi',
      body: 'Şimşek Grup; Şimşek Solar, SMK Alüminyum, Şimşek Yenilenebilir Enerji Sistemleri ve Lipus markalarıyla bireysel, ticari ve endüstriyel tüm segmentlere entegre çözümler sunan güçlü bir yapı hâline geldi.',
      button: 'Grup şirketlerini keşfedin',
    },
    meta: {
      title: "Tarihçe — 1992'den Bugüne",
      description:
        "1992'de Mersin'deki küçük bir atölyeden entegre yenilenebilir enerji ekosistemine: Şimşek Grup'un kilometre taşları.",
    },
  },
  en: {
    crumb: 'History',
    hero: {
      eyebrow: 'History',
      title: 'From a small workshop to an integrated energy ecosystem',
      subtitle: 'From 1992 to today, a journey of over 30 years in which each step carried the previous one forward.',
    },
    eras: [
      {
        label: 'Founding Years',
        range: '1992 — 2002',
        milestones: [
          { title: 'Laying the foundations', desc: 'Dreams founded on aluminum and metalwork in a small workshop in Mersin began their journey toward strong goals over the years.' },
          { title: 'Solar thermal collector production', desc: 'With the products developed, the brand’s recognition in the renewable energy sector rose rapidly.' },
          { title: 'Nationwide dealer network', desc: 'As product variety grew, a dealer network was established; a strong structure reaching solution partners across Türkiye was created.' },
          { title: 'Corporate identity', desc: 'With the establishment of the corporate structure, the brand identity was strengthened.' },
        ],
      },
      {
        label: 'International Expansion',
        range: '2003 — 2012',
        milestones: [
          { title: 'First export: Bulgaria', desc: 'The door to the international market opened with the use of solar thermal collectors in projects in Bulgaria.' },
          { title: 'Move into boiler production', desc: 'In addition to collector production, boiler production gained pace; machinery-park investments grew.' },
          { title: 'Ultrasonic welding technology', desc: 'With the commissioning of the ultrasonic welding machine, many national and international certification and R&D processes were completed.' },
          { title: 'Van earthquake housing', desc: 'Large-scale applications in the Van earthquake housing reinforced sector leadership through quality, longevity and an after-sales service approach.' },
        ],
      },
      {
        label: 'Modern Production Era',
        range: '2013 — 2017',
        milestones: [
          { title: 'New plant construction in the 2nd OIZ', desc: 'Construction of a factory and administrative building began on an 11,575 m² plot in the Mersin Tarsus 2nd Organized Industrial Zone; the Solar Keymark certificate was obtained the same year.' },
          { title: 'Opening of the production campus', desc: '5,700 m² of enclosed production space and a 1,300 m² administrative building were completed. With the enamel-kiln investment, boiler production was brought entirely in-house; the production chain became fully independent.' },
          { title: 'AFAD projects', desc: 'Projects converting electric heating in refugee camps to solar energy were completed successfully.' },
        ],
      },
      {
        label: 'Global Transformation',
        range: '2018 — Today',
        milestones: [
          { title: 'The beginning of a new era', desc: 'With Sinan Şimşek acquiring all the company shares, a more visionary and global growth era began.' },
          { title: 'Digital transformation and export drive', desc: 'All workflows from production to shipping were moved to an ERP system; the export network was expanded to many new markets.' },
          { title: 'Founding of SMK Aluminum', desc: 'Aluminum profiles, chrome and flex tubes and consumables began to be supplied within the group; the supply chain was moved entirely to internal resources.' },
          { title: 'Laser welding investment', desc: 'A laser welding machine that raises collector production quality was commissioned.' },
          { title: 'Establishment of Şimşek Renewable Energy Systems', desc: 'Domestic sales, project applications, installation, service and after-sales processes began to be managed from a single center.' },
          { title: 'The birth of the Lipus brand', desc: 'A new-generation energy brand combining energy storage, heat pump, pool heating, PV and charging-station technologies was founded.' },
        ],
      },
    ],
    today: {
      eyebrow: 'Today',
      title: 'An integrated renewable energy ecosystem',
      body: 'With its Şimşek Solar, SMK Aluminum, Şimşek Renewable Energy Systems and Lipus brands, the Şimşek Group has become a strong structure offering integrated solutions to all residential, commercial and industrial segments.',
      button: 'Explore the group companies',
    },
    meta: {
      title: 'History — From 1992 to Today',
      description:
        'From a small workshop in Mersin in 1992 to an integrated renewable energy ecosystem: the milestones of the Şimşek Group.',
    },
  },
  ar: {
    crumb: 'التاريخ',
    hero: {
      eyebrow: 'التاريخ',
      title: 'من ورشة صغيرة إلى منظومة طاقة متكاملة',
      subtitle: 'من عام 1992 حتى اليوم، رحلة تتجاوز 30 عاماً حملت فيها كل خطوة السابقة إلى الأمام.',
    },
    eras: [
      {
        label: 'سنوات التأسيس',
        range: '1992 — 2002',
        milestones: [
          { title: 'إرساء الأسس', desc: 'الأحلام التي تأسست على أعمال الألمنيوم والمعادن في ورشة صغيرة بمرسين بدأت رحلتها نحو أهداف قوية على مرّ السنين.' },
          { title: 'إنتاج المجمعات الشمسية الحرارية', desc: 'بالمنتجات المطوّرة، ارتفع تعارف العلامة في قطاع الطاقة المتجددة بسرعة.' },
          { title: 'شبكة وكلاء تغطّي تركيا', desc: 'مع تنوّع المنتجات أُنشئت شبكة وكلاء؛ وتشكّل كيان قوي يصل إلى شركاء الحلول في عموم تركيا.' },
          { title: 'الهوية المؤسسية', desc: 'بإنشاء البنية المؤسسية تعزّزت هوية العلامة.' },
        ],
      },
      {
        label: 'الانفتاح الدولي',
        range: '2003 — 2012',
        milestones: [
          { title: 'أول تصدير: بلغاريا', desc: 'انفتح باب السوق الدولية باستخدام المجمعات الشمسية الحرارية في مشاريع ببلغاريا.' },
          { title: 'الانتقال إلى إنتاج الخزانات', desc: 'إضافة إلى إنتاج المجمعات، اكتسب إنتاج الخزانات زخماً؛ ونمت استثمارات مجموعة الآلات.' },
          { title: 'تقنية اللحام بالموجات فوق الصوتية', desc: 'بتشغيل آلة اللحام بالموجات فوق الصوتية اكتملت شهادات وطنية ودولية عديدة وعمليات بحث وتطوير.' },
          { title: 'مساكن زلزال فان', desc: 'التطبيقات واسعة النطاق في مساكن زلزال فان عزّزت ريادة القطاع بنهج الجودة وطول العمر وخدمة ما بعد البيع.' },
        ],
      },
      {
        label: 'حقبة الإنتاج الحديث',
        range: '2013 — 2017',
        milestones: [
          { title: 'إنشاء مصنع جديد في المنطقة الصناعية الثانية', desc: 'بدأ إنشاء مصنع ومبنى إداري على أرض بمساحة 11.575 م² في المنطقة الصناعية المنظمة الثانية بمرسين طرسوس؛ وحُصِل في العام نفسه على شهادة Solar Keymark.' },
          { title: 'افتتاح مجمّع الإنتاج', desc: 'اكتمل 5.700 م² من مساحة الإنتاج المغلقة ومبنى إداري بمساحة 1.300 م². وباستثمار فرن المينا انتقل إنتاج الخزانات بالكامل إلى داخل الشركة؛ وأصبحت سلسلة الإنتاج مستقلة تماماً.' },
          { title: 'مشاريع AFAD', desc: 'أُنجزت بنجاح مشاريع تحويل التدفئة الكهربائية في مخيمات اللاجئين إلى الطاقة الشمسية.' },
        ],
      },
      {
        label: 'التحوّل العالمي',
        range: '2018 — اليوم',
        milestones: [
          { title: 'بداية حقبة جديدة', desc: 'بامتلاك سنان شمشك كامل أسهم الشركة بدأت حقبة نمو أكثر رؤية وعالمية.' },
          { title: 'التحوّل الرقمي وطفرة التصدير', desc: 'نُقِلت جميع سير العمل من الإنتاج إلى الشحن إلى نظام ERP؛ وتوسّعت شبكة التصدير إلى أسواق جديدة عديدة.' },
          { title: 'تأسيس SMK للألمنيوم', desc: 'بدأ توريد بروفيلات الألمنيوم وأنابيب الكروم والمرنة والمواد الاستهلاكية داخل المجموعة؛ ونُقِلت سلسلة التوريد بالكامل إلى موارد داخلية.' },
          { title: 'استثمار اللحام بالليزر', desc: 'شُغِّلت آلة لحام بالليزر ترفع جودة إنتاج المجمعات.' },
          { title: 'تأسيس شمشك لأنظمة الطاقة المتجددة', desc: 'بدأت إدارة المبيعات المحلية وتطبيقات المشاريع والتركيب والخدمة وعمليات ما بعد البيع من مركز واحد.' },
          { title: 'ولادة علامة Lipus', desc: 'تأسست علامة طاقة من جيل جديد تجمع تقنيات تخزين الطاقة والمضخة الحرارية وتدفئة المسابح والطاقة الكهروضوئية ومحطات الشحن.' },
        ],
      },
    ],
    today: {
      eyebrow: 'اليوم',
      title: 'منظومة طاقة متجددة متكاملة',
      body: 'أصبحت مجموعة شمشك، بعلاماتها شمشك سولار وSMK للألمنيوم وشمشك لأنظمة الطاقة المتجددة وLipus، كياناً قوياً يقدّم حلولاً متكاملة لجميع الشرائح الفردية والتجارية والصناعية.',
      button: 'اكتشفوا شركات المجموعة',
    },
    meta: {
      title: 'التاريخ — من 1992 حتى اليوم',
      description:
        'من ورشة صغيرة بمرسين عام 1992 إلى منظومة طاقة متجددة متكاملة: معالم مجموعة شمشك.',
    },
  },
  el: {
    crumb: 'Ιστορία',
    hero: {
      eyebrow: 'Ιστορία',
      title: 'Από ένα μικρό εργαστήριο σε ένα ολοκληρωμένο ενεργειακό οικοσύστημα',
      subtitle: 'Από το 1992 έως σήμερα, ένα ταξίδι άνω των 30 ετών όπου κάθε βήμα μετέφερε το προηγούμενο πιο μπροστά.',
    },
    eras: [
      {
        label: 'Χρόνια Ίδρυσης',
        range: '1992 — 2002',
        milestones: [
          { title: 'Θεμελίωση', desc: 'Όνειρα που θεμελιώθηκαν σε εργασίες αλουμινίου και μετάλλου σε ένα μικρό εργαστήριο στη Μερσίνα ξεκίνησαν το ταξίδι τους προς ισχυρούς στόχους με τα χρόνια.' },
          { title: 'Παραγωγή ηλιακών θερμικών συλλεκτών', desc: 'Με τα προϊόντα που αναπτύχθηκαν, η αναγνωρισιμότητα της μάρκας στον τομέα των ανανεώσιμων πηγών αυξήθηκε ραγδαία.' },
          { title: 'Πανεθνικό δίκτυο αντιπροσώπων', desc: 'Καθώς αυξανόταν η ποικιλία προϊόντων, δημιουργήθηκε δίκτυο αντιπροσώπων· χτίστηκε μια ισχυρή δομή που έφτανε σε συνεργάτες σε όλη την Τουρκία.' },
          { title: 'Εταιρική ταυτότητα', desc: 'Με τη δημιουργία της εταιρικής δομής ενισχύθηκε η ταυτότητα της μάρκας.' },
        ],
      },
      {
        label: 'Διεθνής Επέκταση',
        range: '2003 — 2012',
        milestones: [
          { title: 'Πρώτη εξαγωγή: Βουλγαρία', desc: 'Η πόρτα της διεθνούς αγοράς άνοιξε με τη χρήση ηλιακών θερμικών συλλεκτών σε έργα στη Βουλγαρία.' },
          { title: 'Μετάβαση στην παραγωγή μπόιλερ', desc: 'Εκτός από την παραγωγή συλλεκτών, η παραγωγή μπόιλερ απέκτησε ταχύτητα· οι επενδύσεις σε μηχανήματα μεγάλωσαν.' },
          { title: 'Τεχνολογία υπερηχητικής συγκόλλησης', desc: 'Με τη θέση σε λειτουργία της μηχανής υπερηχητικής συγκόλλησης ολοκληρώθηκαν πολλές εθνικές και διεθνείς πιστοποιήσεις και διαδικασίες Ε&Α.' },
          { title: 'Κατοικίες σεισμού Van', desc: 'Οι εφαρμογές μεγάλης κλίμακας στις κατοικίες του σεισμού του Van ενίσχυσαν την ηγεσία στον κλάδο με προσέγγιση ποιότητας, μακροζωίας και εξυπηρέτησης μετά την πώληση.' },
        ],
      },
      {
        label: 'Εποχή Σύγχρονης Παραγωγής',
        range: '2013 — 2017',
        milestones: [
          { title: 'Κατασκευή νέας μονάδας στη 2η ΒΙ.ΠΕ.', desc: 'Ξεκίνησε η κατασκευή εργοστασίου και διοικητικού κτιρίου σε οικόπεδο 11.575 m² στη 2η Οργανωμένη Βιομηχανική Ζώνη Mersin Tarsus· την ίδια χρονιά αποκτήθηκε το πιστοποιητικό Solar Keymark.' },
          { title: 'Εγκαίνια του συγκροτήματος παραγωγής', desc: 'Ολοκληρώθηκαν 5.700 m² κλειστού χώρου παραγωγής και διοικητικό κτίριο 1.300 m². Με την επένδυση στον φούρνο εμαγιέ, η παραγωγή μπόιλερ πέρασε εξ ολοκλήρου εντός της εταιρείας· η αλυσίδα παραγωγής έγινε πλήρως ανεξάρτητη.' },
          { title: 'Έργα AFAD', desc: 'Ολοκληρώθηκαν με επιτυχία έργα μετατροπής της ηλεκτρικής θέρμανσης σε καταυλισμούς προσφύγων σε ηλιακή ενέργεια.' },
        ],
      },
      {
        label: 'Παγκόσμιος Μετασχηματισμός',
        range: '2018 — Σήμερα',
        milestones: [
          { title: 'Η αρχή μιας νέας εποχής', desc: 'Με την απόκτηση του συνόλου των μετοχών της εταιρείας από τον Sinan Şimşek ξεκίνησε μια πιο οραματική και παγκόσμια εποχή ανάπτυξης.' },
          { title: 'Ψηφιακός μετασχηματισμός και εξαγωγική ώθηση', desc: 'Όλες οι ροές εργασίας από την παραγωγή έως την αποστολή μεταφέρθηκαν σε σύστημα ERP· το εξαγωγικό δίκτυο επεκτάθηκε σε πολλές νέες αγορές.' },
          { title: 'Ίδρυση της SMK Aluminum', desc: 'Προφίλ αλουμινίου, σωλήνες χρωμίου και εύκαμπτοι σωλήνες και αναλώσιμα άρχισαν να προμηθεύονται εντός του ομίλου· η αλυσίδα εφοδιασμού μεταφέρθηκε εξ ολοκλήρου σε εσωτερικούς πόρους.' },
          { title: 'Επένδυση σε συγκόλληση λέιζερ', desc: 'Τέθηκε σε λειτουργία μηχανή συγκόλλησης λέιζερ που ανεβάζει την ποιότητα παραγωγής συλλεκτών.' },
          { title: 'Ίδρυση της Şimşek Renewable Energy Systems', desc: 'Οι εγχώριες πωλήσεις, οι εφαρμογές έργων, η εγκατάσταση, η εξυπηρέτηση και οι διαδικασίες μετά την πώληση άρχισαν να διαχειρίζονται από ένα κέντρο.' },
          { title: 'Η γέννηση της μάρκας Lipus', desc: 'Ιδρύθηκε μια ενεργειακή μάρκα νέας γενιάς που συνδυάζει τεχνολογίες αποθήκευσης ενέργειας, αντλίας θερμότητας, θέρμανσης πισίνας, PV και σταθμών φόρτισης.' },
        ],
      },
    ],
    today: {
      eyebrow: 'Σήμερα',
      title: 'Ένα ολοκληρωμένο οικοσύστημα ανανεώσιμης ενέργειας',
      body: 'Με τις μάρκες Şimşek Solar, SMK Aluminum, Şimşek Renewable Energy Systems και Lipus, ο Όμιλος Şimşek έχει γίνει μια ισχυρή δομή που προσφέρει ολοκληρωμένες λύσεις σε όλα τα τμήματα — οικιακά, εμπορικά και βιομηχανικά.',
      button: 'Εξερευνήστε τις εταιρείες του ομίλου',
    },
    meta: {
      title: 'Ιστορία — Από το 1992 έως Σήμερα',
      description:
        'Από ένα μικρό εργαστήριο στη Μερσίνα το 1992 σε ένα ολοκληρωμένο οικοσύστημα ανανεώσιμης ενέργειας: τα ορόσημα του Ομίλου Şimşek.',
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
  return pageMetadata({ locale, path: '/history', title: c.meta.title, description: c.meta.description });
}

export default async function HistoryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = CONTENT[locale] ?? CONTENT.tr;

  return (
    <>
      <PageBreadcrumb items={[{ name: c.crumb, path: '/history' }]} />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} />
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            {c.eras.map((era, ei) => {
              const Icon = ERA_META[ei].icon;
              const years = ERA_META[ei].years;
              return (
                <div key={ERA_META[ei].id} className={ei > 0 ? 'mt-16' : ''}>
                  {/* Dönem başlığı */}
                  <Reveal>
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-graphite-950 text-volt-400">
                        <Icon size={22} strokeWidth={1.75} />
                      </span>
                      <div>
                        <h2 className="font-display text-xl font-bold text-graphite-950 sm:text-2xl">{era.label}</h2>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-volt-700">
                          {era.range}
                        </p>
                      </div>
                    </div>
                  </Reveal>

                  {/* Kilometre taşları — sol raylı zaman çizelgesi */}
                  <div className="mt-6 border-s-2 border-mist-900/10 ps-8 sm:ms-6">
                    {era.milestones.map((m, mi) => (
                      <Reveal key={`${years[mi]}-${m.title}`} delay={Math.min(mi * 0.05, 0.2)}>
                        <div className="relative pb-8 last:pb-2">
                          <span
                            className="absolute -start-[41px] top-1.5 h-4 w-4 rounded-full border-[3px] border-white bg-volt-500 shadow-[0_0_0_2px_rgba(246,188,50,0.35)]"
                            aria-hidden
                          />
                          <div className="group rounded-2xl border border-transparent p-4 transition-all hover:border-mist-900/10 hover:bg-mist-50 sm:p-5">
                            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                              <span className="font-tabular font-display text-2xl font-bold text-graphite-950">
                                {years[mi]}
                              </span>
                              <h3 className="font-display text-base font-bold text-graphite-800">{m.title}</h3>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-mist-700">{m.desc}</p>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Bugün */}
            <Reveal delay={0.1}>
              <div className="mt-14 rounded-3xl bg-graphite-gradient p-9 text-white sm:p-11">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-volt-400">{c.today.eyebrow}</p>
                <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{c.today.title}</h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-graphite-200">{c.today.body}</p>
                <Link
                  href="/about#grup-sirketleri"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-solar-gradient px-6 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
                >
                  {c.today.button}
                  <ArrowRight size={15} className="rtl:rotate-180" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Grup Şirketleri — ayrı sayfa yerine burada (kullanıcı kararı 13.08.2026) */}
      <GroupCompanies />

    </>
  );
}
