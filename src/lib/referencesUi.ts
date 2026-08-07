import type { Locale } from '@/i18n/config';
import type { ReferenceListLabels } from '@/components/ReferenceList';

/* Referanslar (projeler) sayfası + ReferenceList bileşeninin tüm arayüz metinleri,
   dört dilde. Sayısal değerler sayfada araya eklenir; buradaki şablonlar sayı alır. */
export interface ReferencesUi {
  intlLocale: string;
  meta: { title: string; description: string };
  crumb: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: (provinces: number, projects: string, collectors: string, homes: string) => string;
  };
  scaleLabels: [string, string, string, string, string, string]; // proje, il, konut, blok, kollektör, ışınım alanı
  impact: {
    eyebrow: string;
    title: string;
    body: (aperture: string) => string;
    methodTitle: string;
    methodLine1: string;
    methodLine2: (aperture: string, yieldPerM2: number) => string;
    methodLine3: (co2: string) => string;
    card1: string; // yıllık temiz ısı
    card2: string; // önlenen CO₂
    tonUnit: string;
    card3: string; // ağaç eşdeğeri
    millionUnit: string;
    card4: string; // hane eşdeğeri
    thousandUnit: string;
  };
  listSection: { eyebrow: string; title: string; subtitle: string };
  listLabels: ReferenceListLabels;
}

const DATA: Record<Locale, ReferencesUi> = {
  tr: {
    intlLocale: 'tr-TR',
    meta: {
      title: 'Referanslar — Sahadaki İşlerimiz',
      description:
        'Türkiye genelinde tamamladığımız toplu konut projeleri: kollektör adedi, ışınım ve brüt alan verileriyle referans listemiz ve çevresel etkisi.',
    },
    crumb: 'Referanslar',
    hero: {
      eyebrow: 'Referanslar',
      title: 'Sahadaki işlerimiz',
      subtitle: (prov, proj, coll, homes) =>
        `Türkiye'nin ${prov} ilinde tamamladığımız ${proj} projede ${coll} kollektör kurduk; toplu konutlardan kamu tesislerine ${homes} konutun sıcak su ihtiyacını güneşten karşılıyoruz.`,
    },
    scaleLabels: ['Tamamlanan proje', 'İl', 'Konut', 'Blok', 'Kollektör', 'Işınım alanı'],
    impact: {
      eyebrow: 'Çevresel Etki',
      title: 'Kurduğumuz sistemler her yıl bir orman kadar karbon tutuyor',
      body: (ap) =>
        `Sahadaki ${ap} m² ışınım alanı, güneşi ücretsiz ve temiz ısıya çeviriyor. Aşağıdaki değerler, bu alanın yıllık üretimi ve fosil yakıt yerine ikame edilmesiyle önlenen sera gazı salımını gösterir.`,
      methodTitle: 'Hesap yöntemi',
      methodLine1: 'Işınım alanı = kollektör adedi × 2,33 m² · Brüt alan = kollektör adedi × 2,55 m²',
      methodLine2: (ap, y) => `Yıllık üretim = ${ap} m² × ${y} kWh/m²·yıl`,
      methodLine3: (co2) => `Önlenen salım = üretim × ${co2} kg CO₂/kWh (doğal gaz ikamesi)`,
      card1: 'Yıllık üretilen temiz ısı enerjisi',
      card2: 'Yılda önlenen CO₂ salımı',
      tonUnit: 'ton',
      card3: 'Ağacın yıllık karbon tutumuna eşdeğer',
      millionUnit: 'milyon',
      card4: 'Hanenin yıllık sıcak su enerjisine eşdeğer',
      thousandUnit: 'bin',
    },
    listSection: {
      eyebrow: 'Referans Listesi',
      title: 'Proje proje sahadaki işlerimiz',
      subtitle:
        'Her kayıtta kollektör adedi, toplam ışınım ve brüt alan ile karşılanan konut sayısı yer alır. İl seçerek veya arayarak listeyi daraltabilirsiniz.',
    },
    listLabels: {
      searchPlaceholder: 'Proje, il veya ilçe ara…',
      allProvinces: 'Tüm iller',
      allCategories: 'Tüm tipler',
      categoryNames: {
        konut: 'Toplu Konut',
        adalet: 'Adalet & Kamu',
        savunma: 'Savunma',
        afad: 'Afet & AFAD',
        emniyet: 'Emniyet',
        kamu: 'Kamu Tesisi',
        ozel: 'Özel & Ticari',
      },
      clear: 'Temizle',
      proje: 'Proje',
      konut: 'Konut',
      kollektor: 'Kollektör',
      isinimAlani: 'Işınım alanı',
      isinim: 'Işınım',
      brut: 'Brüt',
      collectorWord: 'kollektör',
      sortedByCollectors: 'Kollektör adedine göre büyükten küçüğe sıralı',
      noResults: 'Sonuç bulunamadı',
      noResultsHint: 'Farklı bir arama veya il deneyin.',
      homesServed: 'konutun sıcak su ihtiyacı güneş enerjisiyle karşılanıyor',
      institutionLine: 'kollektörlü güneş enerjili sıcak su sistemi',
      blockWord: 'blok',
      showMore: 'Daha fazla göster',
      selBefore: 'Bu seçki yılda yaklaşık',
      selMiddle: 'temiz ısı enerjisi üretiyor,',
      selAfter: 'salımını önlüyor.',
      tonUnit: 'ton',
    },
  },
  en: {
    intlLocale: 'en-US',
    meta: {
      title: 'References — Our Work in the Field',
      description:
        'Mass-housing projects we have completed across Türkiye: our reference list with collector count, aperture and gross area data, and its environmental impact.',
    },
    crumb: 'References',
    hero: {
      eyebrow: 'References',
      title: 'Our work in the field',
      subtitle: (prov, proj, coll, homes) =>
        `Across ${prov} provinces of Türkiye, we have installed ${coll} collectors in ${proj} projects; from mass housing to public facilities, we meet the hot water needs of ${homes} homes from the sun.`,
    },
    scaleLabels: ['Completed projects', 'Provinces', 'Homes', 'Blocks', 'Collectors', 'Aperture area'],
    impact: {
      eyebrow: 'Environmental Impact',
      title: 'The systems we install capture as much carbon as a forest every year',
      body: (ap) =>
        `The ${ap} m² of aperture area in the field turns the sun into free, clean heat. The figures below show the annual output of this area and the greenhouse-gas emissions avoided by replacing fossil fuel.`,
      methodTitle: 'Calculation method',
      methodLine1: 'Aperture area = collector count × 2.33 m² · Gross area = collector count × 2.55 m²',
      methodLine2: (ap, y) => `Annual output = ${ap} m² × ${y} kWh/m²·year`,
      methodLine3: (co2) => `Avoided emissions = output × ${co2} kg CO₂/kWh (natural gas substitution)`,
      card1: 'Clean heat energy produced annually',
      card2: 'CO₂ emissions avoided per year',
      tonUnit: 'tons',
      card3: 'Equivalent to a tree’s annual carbon capture',
      millionUnit: 'million',
      card4: 'Equivalent to a household’s annual hot water energy',
      thousandUnit: 'thousand',
    },
    listSection: {
      eyebrow: 'Reference List',
      title: 'Our work in the field, project by project',
      subtitle:
        'Each entry shows the collector count, total aperture and gross area, and the number of homes served. You can narrow the list by selecting a province or searching.',
    },
    listLabels: {
      searchPlaceholder: 'Search project, province or district…',
      allProvinces: 'All provinces',
      allCategories: 'All types',
      categoryNames: {
        konut: 'Mass Housing',
        adalet: 'Justice & Public',
        savunma: 'Defense',
        afad: 'Disaster & AFAD',
        emniyet: 'Public Safety',
        kamu: 'Public Facility',
        ozel: 'Private & Commercial',
      },
      clear: 'Clear',
      proje: 'Projects',
      konut: 'Homes',
      kollektor: 'Collectors',
      isinimAlani: 'Aperture area',
      isinim: 'Aperture',
      brut: 'Gross',
      collectorWord: 'collectors',
      sortedByCollectors: 'Sorted by collector count, highest to lowest',
      noResults: 'No results found',
      noResultsHint: 'Try a different search or province.',
      homesServed: 'homes have their hot water needs met by solar energy',
      institutionLine: 'collector solar hot water system',
      blockWord: 'blocks',
      showMore: 'Show more',
      selBefore: 'This selection produces about',
      selMiddle: 'of clean heat energy per year,',
      selAfter: 'of emissions.',
      tonUnit: 'tons',
    },
  },
  ar: {
    intlLocale: 'ar-EG-u-nu-latn',
    meta: {
      title: 'المراجع — أعمالنا في الميدان',
      description:
        'مشاريع الإسكان الجماعي التي أنجزناها في عموم تركيا: قائمة مراجعنا مع بيانات عدد المجمعات ومساحة الإشعاع والمساحة الإجمالية، وأثرها البيئي.',
    },
    crumb: 'المراجع',
    hero: {
      eyebrow: 'المراجع',
      title: 'أعمالنا في الميدان',
      subtitle: (prov, proj, coll, homes) =>
        `في ${prov} محافظة من تركيا، ركّبنا ${coll} مجمّعاً في ${proj} مشروع؛ من الإسكان الجماعي إلى المنشآت العامة، نلبّي حاجة ${homes} منزل للماء الساخن من الشمس.`,
    },
    scaleLabels: ['المشاريع المنجزة', 'المحافظات', 'المنازل', 'الكتل', 'المجمعات', 'مساحة الإشعاع'],
    impact: {
      eyebrow: 'الأثر البيئي',
      title: 'الأنظمة التي نركّبها تحتجز كل عام كربوناً بقدر غابة',
      body: (ap) =>
        `تحوّل مساحة الإشعاع البالغة ${ap} م² في الميدان الشمس إلى حرارة مجانية ونظيفة. تُظهِر القيم أدناه الإنتاج السنوي لهذه المساحة وانبعاثات غازات الدفيئة المتجنّبة عبر استبدال الوقود الأحفوري.`,
      methodTitle: 'طريقة الحساب',
      methodLine1: 'مساحة الإشعاع = عدد المجمعات × 2.33 م² · المساحة الإجمالية = عدد المجمعات × 2.55 م²',
      methodLine2: (ap, y) => `الإنتاج السنوي = ${ap} م² × ${y} kWh/m²·سنة`,
      methodLine3: (co2) => `الانبعاث المتجنَّب = الإنتاج × ${co2} kg CO₂/kWh (استبدال الغاز الطبيعي)`,
      card1: 'طاقة حرارية نظيفة تُنتَج سنوياً',
      card2: 'انبعاثات CO₂ متجنَّبة سنوياً',
      tonUnit: 'طن',
      card3: 'يعادل احتجاز شجرة للكربون سنوياً',
      millionUnit: 'مليون',
      card4: 'يعادل طاقة الماء الساخن السنوية لمنزل',
      thousandUnit: 'ألف',
    },
    listSection: {
      eyebrow: 'قائمة المراجع',
      title: 'أعمالنا في الميدان، مشروعاً مشروعاً',
      subtitle:
        'يُظهِر كل سجل عدد المجمعات وإجمالي الإشعاع والمساحة الإجمالية وعدد المنازل المخدومة. يمكنكم تضييق القائمة باختيار محافظة أو بالبحث.',
    },
    listLabels: {
      searchPlaceholder: 'ابحثوا عن مشروع أو محافظة أو منطقة…',
      allProvinces: 'كل المحافظات',
      allCategories: 'كل الأنواع',
      categoryNames: {
        konut: 'إسكان جماعي',
        adalet: 'العدل والمرافق العامة',
        savunma: 'الدفاع',
        afad: 'الكوارث (AFAD)',
        emniyet: 'الأمن العام',
        kamu: 'منشأة عامة',
        ozel: 'خاص وتجاري',
      },
      clear: 'مسح',
      proje: 'المشاريع',
      konut: 'المنازل',
      kollektor: 'المجمعات',
      isinimAlani: 'مساحة الإشعاع',
      isinim: 'الإشعاع',
      brut: 'الإجمالية',
      collectorWord: 'مجمّع',
      sortedByCollectors: 'مرتّبة حسب عدد المجمعات من الأكبر إلى الأصغر',
      noResults: 'لا توجد نتائج',
      noResultsHint: 'جرّبوا بحثاً أو محافظة مختلفة.',
      homesServed: 'منزل تُلبّى حاجتها للماء الساخن بالطاقة الشمسية',
      institutionLine: 'مجمّع في نظام ماء ساخن شمسي',
      blockWord: 'كتلة',
      showMore: 'عرض المزيد',
      selBefore: 'تنتج هذه المجموعة سنوياً نحو',
      selMiddle: 'من الطاقة الحرارية النظيفة،',
      selAfter: 'من الانبعاثات.',
      tonUnit: 'طن',
    },
  },
  el: {
    intlLocale: 'el-GR',
    meta: {
      title: 'Έργα Αναφοράς — Οι Δουλειές μας στο Πεδίο',
      description:
        'Έργα μαζικής κατοικίας που ολοκληρώσαμε σε όλη την Τουρκία: η λίστα αναφορών μας με δεδομένα αριθμού συλλεκτών, επιφάνειας και μικτής επιφάνειας, και ο περιβαλλοντικός της αντίκτυπος.',
    },
    crumb: 'Έργα Αναφοράς',
    hero: {
      eyebrow: 'Έργα Αναφοράς',
      title: 'Οι δουλειές μας στο πεδίο',
      subtitle: (prov, proj, coll, homes) =>
        `Σε ${prov} επαρχίες της Τουρκίας, εγκαταστήσαμε ${coll} συλλέκτες σε ${proj} έργα· από μαζικές κατοικίες έως δημόσιες εγκαταστάσεις, καλύπτουμε τις ανάγκες ζεστού νερού ${homes} κατοικιών από τον ήλιο.`,
    },
    scaleLabels: ['Ολοκληρωμένα έργα', 'Επαρχίες', 'Κατοικίες', 'Κτίρια', 'Συλλέκτες', 'Επιφάνεια απορρόφησης'],
    impact: {
      eyebrow: 'Περιβαλλοντικός Αντίκτυπος',
      title: 'Τα συστήματα που εγκαθιστούμε δεσμεύουν κάθε χρόνο άνθρακα όσο ένα δάσος',
      body: (ap) =>
        `Τα ${ap} m² επιφάνειας απορρόφησης στο πεδίο μετατρέπουν τον ήλιο σε δωρεάν, καθαρή θερμότητα. Οι παρακάτω τιμές δείχνουν την ετήσια παραγωγή αυτής της επιφάνειας και τις εκπομπές αερίων θερμοκηπίου που αποφεύγονται αντικαθιστώντας το ορυκτό καύσιμο.`,
      methodTitle: 'Μέθοδος υπολογισμού',
      methodLine1: 'Επιφάνεια απορρόφησης = αριθμός συλλεκτών × 2,33 m² · Μικτή επιφάνεια = αριθμός συλλεκτών × 2,55 m²',
      methodLine2: (ap, y) => `Ετήσια παραγωγή = ${ap} m² × ${y} kWh/m²·έτος`,
      methodLine3: (co2) => `Αποφευγόμενες εκπομπές = παραγωγή × ${co2} kg CO₂/kWh (υποκατάσταση φυσικού αερίου)`,
      card1: 'Καθαρή θερμική ενέργεια που παράγεται ετησίως',
      card2: 'Εκπομπές CO₂ που αποφεύγονται ετησίως',
      tonUnit: 'τόνοι',
      card3: 'Ισοδύναμο με την ετήσια δέσμευση άνθρακα ενός δέντρου',
      millionUnit: 'εκατ.',
      card4: 'Ισοδύναμο με την ετήσια ενέργεια ζεστού νερού ενός νοικοκυριού',
      thousandUnit: 'χιλ.',
    },
    listSection: {
      eyebrow: 'Λίστα Αναφορών',
      title: 'Οι δουλειές μας στο πεδίο, έργο προς έργο',
      subtitle:
        'Κάθε καταχώριση δείχνει τον αριθμό συλλεκτών, τη συνολική επιφάνεια απορρόφησης και μικτή επιφάνεια, και τον αριθμό των κατοικιών που εξυπηρετούνται. Μπορείτε να περιορίσετε τη λίστα επιλέγοντας επαρχία ή κάνοντας αναζήτηση.',
    },
    listLabels: {
      searchPlaceholder: 'Αναζήτηση έργου, επαρχίας ή περιοχής…',
      allProvinces: 'Όλες οι επαρχίες',
      allCategories: 'Όλοι οι τύποι',
      categoryNames: {
        konut: 'Μαζική Κατοικία',
        adalet: 'Δικαιοσύνη & Δημόσιο',
        savunma: 'Άμυνα',
        afad: 'Καταστροφές (AFAD)',
        emniyet: 'Δημόσια Ασφάλεια',
        kamu: 'Δημόσια Εγκατάσταση',
        ozel: 'Ιδιωτικά & Εμπορικά',
      },
      clear: 'Καθαρισμός',
      proje: 'Έργα',
      konut: 'Κατοικίες',
      kollektor: 'Συλλέκτες',
      isinimAlani: 'Επιφάνεια απορρόφησης',
      isinim: 'Απορρόφηση',
      brut: 'Μικτή',
      collectorWord: 'συλλέκτες',
      sortedByCollectors: 'Ταξινομημένα κατά αριθμό συλλεκτών, από τον μεγαλύτερο στον μικρότερο',
      noResults: 'Δεν βρέθηκαν αποτελέσματα',
      noResultsHint: 'Δοκιμάστε διαφορετική αναζήτηση ή επαρχία.',
      homesServed: 'κατοικίες καλύπτουν τις ανάγκες ζεστού νερού τους με ηλιακή ενέργεια',
      institutionLine: 'συλλέκτες σε ηλιακό σύστημα ζεστού νερού',
      blockWord: 'κτίρια',
      showMore: 'Δείτε περισσότερα',
      selBefore: 'Αυτή η επιλογή παράγει περίπου',
      selMiddle: 'καθαρής θερμικής ενέργειας ετησίως,',
      selAfter: 'εκπομπών.',
      tonUnit: 'τόνοι',
    },
  },
};

export function getReferencesUi(locale: string): ReferencesUi {
  return DATA[locale as Locale] ?? DATA.tr;
}
