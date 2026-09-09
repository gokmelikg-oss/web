import { referenceProjects } from '@/data/references';
import type { Locale } from '@/i18n/config';

/* UYGULAMA ALANLARI
   =================
   İncelenen yedi rakip sitenin üçünde (Gözütok "Uygulamalar", Eraslan,
   Sekizgen) ziyaretçi ÜRÜNE göre değil YAPI TİPİNE göre geziniyor: konut,
   otel, hastane, yurt, AVM. Bizde bu giriş yolu hiç yoktu — ziyaretçi
   "otelim için ne lazım" diye geldiğinde ürün listesiyle karşılaşıyordu.

   ⚠ BU SAYFALARIN GÜCÜ UYDURMA METİNDEN DEĞİL, GERÇEK VERİDEN GELİR.
   Her segmentin proje sayısı, konut sayısı, kollektör adedi ve il sayısı
   `data/tokiProjects.json` içindeki 526 TESLİM EDİLMİŞ projeden hesaplanır.
   Hiçbir rakam elle yazılmaz; veri değişirse sayfa kendiliğinden güncellenir.
   Rakiplerin hiçbirinde bu ayrıntıda gerçek referans dökümü yok.

   Segment anahtarları referans verisindeki `category` alanıyla birebir
   aynıdır; etiketleri lib/referencesUi.ts zaten dört dilde tutuyor. */

export const SEGMENT_KEYS = ['konut', 'adalet', 'savunma', 'ozel', 'kamu', 'afad', 'emniyet'] as const;
export type SegmentKey = (typeof SEGMENT_KEYS)[number];

export interface SegmentStats {
  key: SegmentKey;
  projects: number;
  homes: number;
  blocks: number;
  collectors: number;
  aperture: number;
  provinces: number;
}

/* Segment istatistikleri — gerçek proje kayıtlarından toplanır. */
export function segmentStats(key: SegmentKey): SegmentStats {
  const rows = referenceProjects.filter((p) => p.category === key);
  const provinces = new Set(rows.map((r) => r.il)).size;
  return {
    key,
    projects: rows.length,
    homes: rows.reduce((s, r) => s + (r.homes || 0), 0),
    blocks: rows.reduce((s, r) => s + (r.blocks || 0), 0),
    collectors: rows.reduce((s, r) => s + (r.collectors || 0), 0),
    aperture: Math.round(rows.reduce((s, r) => s + (r.aperture || 0), 0)),
    provinces,
  };
}

/* Proje sayısına göre sıralı, yalnızca GERÇEKTEN projesi olan segmentler.
   Boş bir segment sayfası açmak "bu işi yapmıyoruz" izlenimi verirdi. */
export function allSegments(): SegmentStats[] {
  return SEGMENT_KEYS.map(segmentStats)
    .filter((s) => s.projects > 0)
    .sort((a, b) => b.projects - a.projects);
}

/* Segment başına anlatı: ihtiyaç, çözüm ve dikkat edilen nokta.
   ⚠ Bunlar ürünün fiziğinden ve yapı tipinin bilinen gereksinimlerinden
   türer; ölçülmemiş performans veya tasarruf iddiası İÇERMEZ. */
export interface SegmentText {
  title: string;
  lead: string;
  need: string;
  solution: string;
  detail: string;
}

type SegmentCopy = Record<SegmentKey, SegmentText>;

const TR: SegmentCopy = {
  konut: {
    title: 'Toplu Konut',
    lead: 'Yüzlerce bağımsız bölümün sıcak su ihtiyacını tek merkezden karşılayan sistemler.',
    need: 'Toplu konutta sıcak su talebi sabah ve akşam iki keskin tepe yapar. Her daireye ayrı sistem kurmak hem maliyetli hem de çatıda yer sorunudur.',
    solution: 'Blok başına merkezi sistem kurulur: çatıda gruplanmış kollektörler, kazan dairesinde akümülasyon boyleri ve otomatik kontrol panosu. Blok tipi başına bir kez hesaplanır, blok adediyle çarpılır.',
    detail: 'Şartname m² değerleri daire sayısına göre belirlenir; sehpa seçimi çatı tipine (teras, eğimli, trapez) göre değişir.',
  },
  adalet: {
    title: 'Adalet ve Kamu Yapıları',
    lead: 'Kesintisiz sıcak su gerektiren, yoğun ve sürekli kullanımlı kamu tesisleri.',
    need: 'Ceza infaz kurumları ve kamu yapılarında kullanım gün boyuna yayılır ve kesinti kabul edilmez. Sistem, bakım için erişilebilir ve dayanıklı olmalıdır.',
    solution: 'Yüksek kapasiteli merkezi sistem, akümülasyon boyleri ve yedekli otomasyon. Bileşenler parça bazında servis edilebilir; tek bir arıza tüm sistemi durdurmaz.',
    detail: 'Kamu ihalelerinde teknik şartnameye uygunluk ve belgelendirme (CE, TSE) belirleyicidir.',
  },
  savunma: {
    title: 'Savunma Tesisleri',
    lead: 'Yüksek kapasiteli, dayanıklı ve düşük bakım gerektiren sıcak su sistemleri.',
    need: 'Askerî tesislerde eşzamanlı kullanım çok yüksektir; sistem kısa sürede büyük hacimde sıcak su verebilmelidir.',
    solution: 'Geniş kollektör alanı ve büyük hacimli akümülasyon tankı ile tepe talebi karşılanır. Galvaniz sehpa ve PN40 armatürler ağır kullanım için tercih edilir.',
    detail: 'Tesis genelinde birden çok bina varsa her bina kendi içinde bağımsız sistem olarak hesaplanır.',
  },
  ozel: {
    title: 'Otel ve Özel Projeler',
    lead: 'Konfor ve işletme maliyeti aynı anda önemli olduğunda kurulan sistemler.',
    need: 'Otelde sıcak su bir konfor sözüdür: doluluk oranı değişse de sıcaklık ve debi sabit kalmalıdır. Aynı zamanda enerji, işletmenin en büyük gider kalemlerinden biridir.',
    solution: 'Güneş sistemi mevcut kazanla seri çalışır: güneş suyu ön ısıtır, kazan yalnızca farkı tamamlar. Yakıt tüketimi düşerken konfor değişmez.',
    detail: 'Otel ve özel konutlarda poz numarası zorunluluğu olmadığı için Orion 200 ve 300 serileri de kullanılabilir.',
  },
  kamu: {
    title: 'Kamu Tesisleri',
    lead: 'Okul, yurt, hastane ve idari binalar için merkezi sıcak su çözümleri.',
    need: 'Kamu tesislerinde kullanım yoğunluğu gün ve mevsim içinde değişir; sistem hem tepe talebi karşılamalı hem boşta verimli kalmalıdır.',
    solution: 'Bina tipine göre boyutlandırılmış merkezi sistem ve otomatik kontrol. Yaz aylarında güneş tek başına yeterken kışın destek kaynağıyla birlikte çalışır.',
    detail: 'Yurt ve hastane gibi 7/24 kullanımlı yapılarda akümülasyon hacmi daha yüksek seçilir.',
  },
  afad: {
    title: 'Afet Konutları',
    lead: 'Hızlı kurulum ve düşük işletme maliyeti gerektiren afet sonrası yapılar.',
    need: 'Afet konutlarında sistem hızlı kurulmalı, altyapıya az bağımlı olmalı ve uzun süre bakım gerektirmeden çalışmalıdır.',
    solution: 'Standartlaştırılmış blok çözümleri ile kurulum süresi kısalır. Güneş kaynaklı olduğu için yakıt lojistiğine bağımlılık azalır.',
    detail: 'Bölgenin ışınım değeri ve donma riski, kollektör seçimi ile solar sıvı karışımını belirler.',
  },
  emniyet: {
    title: 'Emniyet Tesisleri',
    lead: 'Sürekli kullanımlı hizmet binaları ve lojmanlar için sıcak su sistemleri.',
    need: 'Vardiyalı çalışma nedeniyle sıcak su talebi gün boyuna yayılır; sistemin sürekli hazır olması beklenir.',
    solution: 'Merkezi sistem ve akümülasyon boyleri ile talep dengelenir; otomasyon destek kaynağını yalnızca gerektiğinde devreye alır.',
    detail: 'Hizmet binası ve lojman ayrı kullanım profilleri taşıdığı için genelde ayrı hesaplanır.',
  },
};

const EN: SegmentCopy = {
  konut: {
    title: 'Mass Housing',
    lead: 'Systems that meet the hot water demand of hundreds of dwellings from a single central plant.',
    need: 'In mass housing, hot water demand peaks sharply twice a day. Installing a separate system per flat is both costly and a roof-space problem.',
    solution: 'A central system is built per block: grouped collectors on the roof, an accumulation tank in the plant room and an automatic control panel. It is calculated once per block type and multiplied by the number of blocks.',
    detail: 'Specification areas are set by the number of dwellings; the mounting frame depends on the roof type (terrace, pitched, trapezoidal).',
  },
  adalet: {
    title: 'Justice and Public Buildings',
    lead: 'Public facilities in continuous, intensive use where hot water cannot be interrupted.',
    need: 'In correctional and public buildings use is spread across the whole day and interruption is unacceptable. The system must be durable and accessible for maintenance.',
    solution: 'High-capacity central system, accumulation tanks and redundant automation. Components are serviceable individually; one fault does not stop the whole system.',
    detail: 'In public tenders, conformity with the technical specification and certification (CE, TSE) is decisive.',
  },
  savunma: {
    title: 'Defence Facilities',
    lead: 'High-capacity, durable hot water systems with low maintenance needs.',
    need: 'In military facilities simultaneous use is very high; the system must deliver large volumes of hot water in a short time.',
    solution: 'Peak demand is met with a large collector field and high-volume accumulation. Galvanised frames and PN40 fittings are preferred for heavy duty.',
    detail: 'Where a site has several buildings, each is calculated as an independent system.',
  },
  ozel: {
    title: 'Hotels and Private Projects',
    lead: 'Systems built where comfort and operating cost matter at the same time.',
    need: 'In a hotel, hot water is a promise of comfort: temperature and flow must stay constant whatever the occupancy. At the same time energy is one of the largest operating costs.',
    solution: 'The solar system works in series with the existing boiler: solar pre-heats the water and the boiler only makes up the difference. Fuel consumption falls while comfort stays the same.',
    detail: 'Because hotels and private homes require no tender item number, the Orion 200 and 300 series can also be used.',
  },
  kamu: {
    title: 'Public Facilities',
    lead: 'Central hot water solutions for schools, dormitories, hospitals and administrative buildings.',
    need: 'Use varies through the day and the season; the system must both meet peaks and stay efficient when idle.',
    solution: 'A central system sized to the building type, with automatic control. In summer solar alone suffices; in winter it works alongside a back-up source.',
    detail: 'In buildings in use around the clock, such as dormitories and hospitals, accumulation volume is chosen higher.',
  },
  afad: {
    title: 'Disaster Housing',
    lead: 'Buildings after a disaster, requiring fast installation and low running costs.',
    need: 'In disaster housing the system must install quickly, depend little on infrastructure and run for long periods without maintenance.',
    solution: 'Standardised block solutions shorten installation time. Being solar-powered reduces dependence on fuel logistics.',
    detail: 'Local irradiance and frost risk determine the collector choice and the solar fluid mixture.',
  },
  emniyet: {
    title: 'Public Safety Facilities',
    lead: 'Hot water systems for continuously used service buildings and staff housing.',
    need: 'Shift working spreads hot water demand across the day; the system is expected to be ready at all times.',
    solution: 'A central system with accumulation tanks balances demand; automation brings in the back-up source only when needed.',
    detail: 'Service buildings and staff housing have different use profiles and are usually calculated separately.',
  },
};

/* Arapça ve Yunanca metinler İngilizceden uyarlanmıştır. */
const AR: SegmentCopy = {
  konut: {
    title: 'الإسكان الجماعي',
    lead: 'أنظمة تلبّي حاجة مئات الوحدات السكنية إلى الماء الساخن من محطة مركزية واحدة.',
    need: 'في الإسكان الجماعي يبلغ الطلب على الماء الساخن ذروتين حادتين يومياً. وتركيب نظام منفصل لكل شقة مكلف ويستهلك مساحة السطح.',
    solution: 'يُنشأ نظام مركزي لكل بلوك: لواقط مجمّعة على السطح، وخزان تجميع في غرفة المراجل، ولوحة تحكّم أوتوماتيكية. يُحسب مرة واحدة لكل نوع بلوك ثم يُضرب في عدد البلوكات.',
    detail: 'تُحدَّد المساحات وفق عدد الوحدات؛ ويعتمد اختيار الحوامل على نوع السطح (مستوٍ، مائل، تربيزي).',
  },
  adalet: {
    title: 'مباني العدالة والمرافق العامة',
    lead: 'مرافق عامة ذات استخدام مكثّف ومستمر لا يُقبل فيه انقطاع الماء الساخن.',
    need: 'في المؤسسات العقابية والمباني العامة يمتد الاستخدام طوال اليوم ولا يُقبل الانقطاع. ويجب أن يكون النظام متيناً وسهل الوصول للصيانة.',
    solution: 'نظام مركزي عالي السعة وخزانات تجميع وأتمتة احتياطية. المكوّنات قابلة للصيانة منفردة؛ ولا يوقف عطل واحد النظام بأكمله.',
    detail: 'في المناقصات العامة تكون المطابقة للمواصفات الفنية والشهادات (CE وTSE) عاملاً حاسماً.',
  },
  savunma: {
    title: 'المنشآت الدفاعية',
    lead: 'أنظمة ماء ساخن عالية السعة ومتينة وقليلة الصيانة.',
    need: 'في المنشآت العسكرية يكون الاستخدام المتزامن مرتفعاً جداً؛ ويجب أن يوفّر النظام كميات كبيرة في وقت قصير.',
    solution: 'يُلبّى الطلب الأقصى بمساحة لواقط واسعة وخزان تجميع كبير. وتُفضَّل الحوامل المجلفنة وتجهيزات PN40 للاستخدام الشاق.',
    detail: 'عند وجود عدة مبانٍ في الموقع، يُحسب كل مبنى كنظام مستقل.',
  },
  ozel: {
    title: 'الفنادق والمشاريع الخاصة',
    lead: 'أنظمة تُنشأ حين تتساوى أهمية الراحة وتكلفة التشغيل.',
    need: 'في الفندق يمثّل الماء الساخن وعداً بالراحة: يجب أن تبقى الحرارة والتدفق ثابتين مهما تغيّرت نسبة الإشغال. وفي الوقت نفسه تُعدّ الطاقة من أكبر بنود التشغيل.',
    solution: 'يعمل النظام الشمسي على التوالي مع المرجل القائم: تسخّن الشمس الماء مسبقاً ويكمل المرجل الفارق فقط. ينخفض استهلاك الوقود وتبقى الراحة كما هي.',
    detail: 'لعدم اشتراط رقم بند في الفنادق والمساكن الخاصة، يمكن استخدام سلسلتَي Orion 200 و300 أيضاً.',
  },
  kamu: {
    title: 'المرافق العامة',
    lead: 'حلول ماء ساخن مركزية للمدارس والمهاجع والمستشفيات والمباني الإدارية.',
    need: 'يتغيّر الاستخدام خلال اليوم والفصول؛ وعلى النظام تلبية الذروة والبقاء فعّالاً عند انخفاض الطلب.',
    solution: 'نظام مركزي مُحدَّد وفق نوع المبنى مع تحكّم أوتوماتيكي. تكفي الشمس وحدها صيفاً، ويعمل النظام شتاءً مع مصدر مساند.',
    detail: 'في المباني ذات الاستخدام على مدار الساعة كالمهاجع والمستشفيات يُختار حجم تجميع أكبر.',
  },
  afad: {
    title: 'مساكن ما بعد الكوارث',
    lead: 'مبانٍ تتطلّب تركيباً سريعاً وتكاليف تشغيل منخفضة.',
    need: 'يجب أن يُركَّب النظام بسرعة، وأن يعتمد قليلاً على البنية التحتية، وأن يعمل طويلاً دون صيانة.',
    solution: 'تقصّر الحلول المعيارية للبلوكات زمن التركيب. والاعتماد على الشمس يقلّل الارتباط بلوجستيات الوقود.',
    detail: 'تحدّد قيمة الإشعاع المحلي وخطر التجمّد اختيار اللاقط ونسبة سائل النقل الشمسي.',
  },
  emniyet: {
    title: 'مرافق الأمن',
    lead: 'أنظمة ماء ساخن لمباني الخدمة والمساكن ذات الاستخدام المستمر.',
    need: 'يوزّع العمل بالورديات الطلب على مدار اليوم؛ ويُتوقّع أن يكون النظام جاهزاً دائماً.',
    solution: 'يوازن النظام المركزي وخزانات التجميع الطلب؛ وتُشغّل الأتمتة المصدر المساند عند الحاجة فقط.',
    detail: 'لمباني الخدمة والمساكن أنماط استخدام مختلفة، لذا تُحسب عادةً بشكل منفصل.',
  },
};

const EL: SegmentCopy = {
  konut: {
    title: 'Συγκροτήματα Κατοικιών',
    lead: 'Συστήματα που καλύπτουν τη ζήτηση ζεστού νερού εκατοντάδων διαμερισμάτων από ένα κεντρικό σημείο.',
    need: 'Στα συγκροτήματα η ζήτηση ζεστού νερού παρουσιάζει δύο έντονες αιχμές την ημέρα. Ξεχωριστό σύστημα ανά διαμέρισμα είναι δαπανηρό και δεσμεύει χώρο στη στέγη.',
    solution: 'Κατασκευάζεται κεντρικό σύστημα ανά κτίριο: ομαδοποιημένοι συλλέκτες στη στέγη, δεξαμενή αποθήκευσης στο λεβητοστάσιο και αυτόματος πίνακας ελέγχου. Υπολογίζεται μία φορά ανά τύπο κτιρίου και πολλαπλασιάζεται.',
    detail: 'Οι επιφάνειες καθορίζονται από τον αριθμό κατοικιών· η βάση στήριξης εξαρτάται από τον τύπο στέγης.',
  },
  adalet: {
    title: 'Κτίρια Δικαιοσύνης και Δημόσιου Τομέα',
    lead: 'Δημόσιες εγκαταστάσεις συνεχούς και εντατικής χρήσης όπου η διακοπή δεν γίνεται δεκτή.',
    need: 'Στα σωφρονιστικά και δημόσια κτίρια η χρήση εκτείνεται σε όλη την ημέρα. Το σύστημα πρέπει να είναι ανθεκτικό και προσβάσιμο για συντήρηση.',
    solution: 'Κεντρικό σύστημα υψηλής απόδοσης, δεξαμενές αποθήκευσης και εφεδρικός αυτοματισμός. Τα εξαρτήματα συντηρούνται μεμονωμένα.',
    detail: 'Στους δημόσιους διαγωνισμούς η συμμόρφωση με τις τεχνικές προδιαγραφές και οι πιστοποιήσεις (CE, TSE) είναι καθοριστικές.',
  },
  savunma: {
    title: 'Αμυντικές Εγκαταστάσεις',
    lead: 'Συστήματα ζεστού νερού υψηλής απόδοσης, ανθεκτικά και χαμηλής συντήρησης.',
    need: 'Στις στρατιωτικές εγκαταστάσεις η ταυτόχρονη χρήση είναι πολύ υψηλή· το σύστημα πρέπει να αποδίδει μεγάλους όγκους σε σύντομο χρόνο.',
    solution: 'Η αιχμή καλύπτεται με μεγάλη επιφάνεια συλλεκτών και μεγάλη αποθήκευση. Προτιμώνται γαλβανισμένες βάσεις και εξαρτήματα PN40.',
    detail: 'Όπου υπάρχουν πολλά κτίρια, καθένα υπολογίζεται ως ανεξάρτητο σύστημα.',
  },
  ozel: {
    title: 'Ξενοδοχεία και Ιδιωτικά Έργα',
    lead: 'Συστήματα για όταν η άνεση και το κόστος λειτουργίας μετρούν εξίσου.',
    need: 'Στο ξενοδοχείο το ζεστό νερό είναι υπόσχεση άνεσης: θερμοκρασία και παροχή πρέπει να μένουν σταθερές ανεξάρτητα από την πληρότητα.',
    solution: 'Το ηλιακό σύστημα λειτουργεί σε σειρά με τον υπάρχοντα λέβητα: ο ήλιος προθερμαίνει και ο λέβητας καλύπτει μόνο τη διαφορά.',
    detail: 'Επειδή δεν απαιτείται κωδικός διαγωνισμού, μπορούν να χρησιμοποιηθούν και οι σειρές Orion 200 και 300.',
  },
  kamu: {
    title: 'Δημόσιες Εγκαταστάσεις',
    lead: 'Κεντρικές λύσεις ζεστού νερού για σχολεία, εστίες, νοσοκομεία και διοικητικά κτίρια.',
    need: 'Η χρήση μεταβάλλεται μέσα στην ημέρα και την εποχή· το σύστημα πρέπει να καλύπτει αιχμές και να παραμένει αποδοτικό.',
    solution: 'Κεντρικό σύστημα διαστασιολογημένο στον τύπο κτιρίου με αυτόματο έλεγχο. Το καλοκαίρι αρκεί ο ήλιος, τον χειμώνα συνεργάζεται με εφεδρική πηγή.',
    detail: 'Σε κτίρια συνεχούς χρήσης επιλέγεται μεγαλύτερος όγκος αποθήκευσης.',
  },
  afad: {
    title: 'Κατοικίες Μετά από Καταστροφή',
    lead: 'Κτίρια που απαιτούν ταχεία εγκατάσταση και χαμηλό κόστος λειτουργίας.',
    need: 'Το σύστημα πρέπει να εγκαθίσταται γρήγορα, να εξαρτάται ελάχιστα από υποδομές και να λειτουργεί για μεγάλο διάστημα χωρίς συντήρηση.',
    solution: 'Οι τυποποιημένες λύσεις ανά κτίριο συντομεύουν την εγκατάσταση. Η ηλιακή τροφοδοσία μειώνει την εξάρτηση από τα καύσιμα.',
    detail: 'Η τοπική ακτινοβολία και ο κίνδυνος παγετού καθορίζουν τον συλλέκτη και το μείγμα ηλιακού υγρού.',
  },
  emniyet: {
    title: 'Εγκαταστάσεις Ασφαλείας',
    lead: 'Συστήματα ζεστού νερού για κτίρια υπηρεσίας και κατοικίες συνεχούς χρήσης.',
    need: 'Η εργασία σε βάρδιες κατανέμει τη ζήτηση σε όλη την ημέρα· το σύστημα πρέπει να είναι πάντα έτοιμο.',
    solution: 'Κεντρικό σύστημα με δεξαμενές αποθήκευσης εξισορροπεί τη ζήτηση· ο αυτοματισμός ενεργοποιεί την εφεδρική πηγή μόνο όταν χρειάζεται.',
    detail: 'Τα κτίρια υπηρεσίας και οι κατοικίες έχουν διαφορετικά προφίλ χρήσης και υπολογίζονται χωριστά.',
  },
};

const COPY: Record<Locale, SegmentCopy> = { tr: TR, en: EN, ar: AR, el: EL };

export function segmentText(locale: Locale, key: SegmentKey): SegmentText {
  return (COPY[locale] ?? TR)[key];
}
