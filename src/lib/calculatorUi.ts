import type { Locale } from '@/i18n/config';

/* Güneş termal hesap aracının arayüz metinleri, dört dilde. Sayısal değerler
   client'ta locale biçimleyiciyle araya eklenir. */
export interface CalculatorUi {
  intlLocale: string;
  currency: string; // para birimi kısaltması gösterimi
  hero: { eyebrow: string; title: string; subtitle: string };
  crumb: string;
  inputsTitle: string;
  peopleLabel: string;
  peopleUnit: string; // "kişi"
  provinceLabel: string;
  usageLabel: string;
  usage: { low: string; normal: string; high: string };
  usageHint: { low: string; normal: string; high: string };
  energyPriceLabel: string;
  energyPriceHint: string;
  resultTitle: string;
  recommendedSystem: string;
  collectorsWord: string; // "kollektör"
  boilerWord: string; // "emayeli boyler"
  centralSystem: string;
  centralNote: string;
  packagePrefix: string; // "Önerilen paket:"
  metrics: {
    coverage: string;
    production: string;
    saving: string;
    co2: string;
  };
  units: { kwhYear: string; kgYear: string; year: string; liter: string };
  treeEqLabel: string; // "{n} ağaç eşdeğeri"
  paybackLabel: string;
  paybackNote: string;
  disclaimer: string;
  ctaQuote: string;
  ctaProducts: string;
  demandNote: string; // günlük sıcak su + yıllık talep özeti
}

const DATA: Record<Locale, CalculatorUi> = {
  tr: {
    intlLocale: 'tr-TR',
    currency: 'TL',
    hero: {
      eyebrow: 'Hesaplama Aracı',
      title: 'Sistem boyutlandırma ve tasarruf hesabı',
      subtitle:
        'Hane büyüklüğünüzü ve ilinizi seçin; önerilen kollektör ve boyler kapasitesini, yıllık üretimi, önlenen CO₂’yi ve tahmini tasarrufu anında görün.',
    },
    crumb: 'Hesaplama Aracı',
    inputsTitle: 'Bilgilerinizi girin',
    peopleLabel: 'Hanedeki kişi sayısı',
    peopleUnit: 'kişi',
    provinceLabel: 'İl',
    usageLabel: 'Sıcak su kullanımı',
    usage: { low: 'Az', normal: 'Normal', high: 'Yoğun' },
    usageHint: { low: '≈40 L/kişi·gün', normal: '≈50 L/kişi·gün', high: '≈60 L/kişi·gün' },
    energyPriceLabel: 'Enerji birim fiyatı (TL/kWh)',
    energyPriceHint: 'Tasarruf tahmini için varsayım — kendi tarifenizle değiştirebilirsiniz.',
    resultTitle: 'Tahmini sonuç',
    recommendedSystem: 'Önerilen sistem',
    collectorsWord: 'kollektör',
    boilerWord: 'L emayeli boyler',
    centralSystem: 'Merkezi sistem',
    centralNote: 'Talebiniz paket sistem sınırının üzerinde; kollektör tarlası + merkezi boyler ile projelendirme öneririz.',
    packagePrefix: 'Önerilen paket:',
    metrics: {
      coverage: 'Sıcak su ihtiyacının güneşle karşılanan oranı',
      production: 'Yıllık üretilen temiz ısı',
      saving: 'Tahmini yıllık tasarruf',
      co2: 'Yılda önlenen CO₂',
    },
    units: { kwhYear: 'kWh/yıl', kgYear: 'kg/yıl', year: 'yıl', liter: 'L/gün' },
    treeEqLabel: '≈ {n} ağacın yıllık karbon tutumu',
    paybackLabel: 'Tahmini geri ödeme süresi',
    paybackNote: 'Sistem büyüklüğü ve enerji fiyatına göre değişir; kesin değer için teklif alın.',
    disclaimer:
      'Değerler GEPA bölgesel ortalamaları ve standart varsayımlara (≈50 L/kişi·gün, ΔT 30°C, %50 sistem verimi, 2,33 m²/kollektör) dayalı yaklaşık tahminlerdir. Kesin sonuç için ücretsiz saha keşfi öneririz.',
    ctaQuote: 'Bu sistem için teklif alın',
    ctaProducts: 'Ürünleri incele',
    demandNote: 'Günlük sıcak su ihtiyacı ≈ {liters} L · Yıllık enerji talebi ≈ {kwh} kWh',
  },
  en: {
    intlLocale: 'en-US',
    currency: 'TL',
    hero: {
      eyebrow: 'Calculator',
      title: 'System sizing and savings estimate',
      subtitle:
        'Select your household size and province; instantly see the recommended collector and boiler capacity, annual output, CO₂ avoided and estimated savings.',
    },
    crumb: 'Calculator',
    inputsTitle: 'Enter your details',
    peopleLabel: 'People in the household',
    peopleUnit: 'people',
    provinceLabel: 'Province',
    usageLabel: 'Hot water usage',
    usage: { low: 'Low', normal: 'Normal', high: 'High' },
    usageHint: { low: '≈40 L/person·day', normal: '≈50 L/person·day', high: '≈60 L/person·day' },
    energyPriceLabel: 'Energy unit price (TL/kWh)',
    energyPriceHint: 'An assumption for the savings estimate — you can change it to your own tariff.',
    resultTitle: 'Estimated result',
    recommendedSystem: 'Recommended system',
    collectorsWord: 'collectors',
    boilerWord: 'L enameled boiler',
    centralSystem: 'Central system',
    centralNote: 'Your demand is above the package-system limit; we recommend a collector field + central boiler design.',
    packagePrefix: 'Recommended package:',
    metrics: {
      coverage: 'Share of hot water demand met by the sun',
      production: 'Clean heat produced annually',
      saving: 'Estimated annual saving',
      co2: 'CO₂ avoided per year',
    },
    units: { kwhYear: 'kWh/year', kgYear: 'kg/year', year: 'years', liter: 'L/day' },
    treeEqLabel: '≈ annual carbon capture of {n} trees',
    paybackLabel: 'Estimated payback period',
    paybackNote: 'Varies with system size and energy price; get a quote for an exact figure.',
    disclaimer:
      'The values are approximate estimates based on GEPA regional averages and standard assumptions (≈50 L/person·day, ΔT 30°C, 50% system efficiency, 2.33 m²/collector). For an exact result, we recommend a free site survey.',
    ctaQuote: 'Get a quote for this system',
    ctaProducts: 'Explore products',
    demandNote: 'Daily hot water demand ≈ {liters} L · Annual energy demand ≈ {kwh} kWh',
  },
  ar: {
    intlLocale: 'ar-EG-u-nu-latn',
    currency: 'ل.ت',
    hero: {
      eyebrow: 'أداة الحساب',
      title: 'تحجيم النظام وتقدير التوفير',
      subtitle:
        'اختاروا حجم أسرتكم ومحافظتكم؛ وشاهدوا فوراً سعة المجمّع والخزان الموصى بها والإنتاج السنوي وCO₂ المتجنَّب والتوفير التقديري.',
    },
    crumb: 'أداة الحساب',
    inputsTitle: 'أدخلوا بياناتكم',
    peopleLabel: 'عدد أفراد الأسرة',
    peopleUnit: 'أفراد',
    provinceLabel: 'المحافظة',
    usageLabel: 'استخدام الماء الساخن',
    usage: { low: 'منخفض', normal: 'عادي', high: 'مرتفع' },
    usageHint: { low: '≈40 ل/فرد·يوم', normal: '≈50 ل/فرد·يوم', high: '≈60 ل/فرد·يوم' },
    energyPriceLabel: 'سعر وحدة الطاقة (ل.ت/kWh)',
    energyPriceHint: 'افتراض لتقدير التوفير — يمكنكم تغييره وفق تعرفتكم.',
    resultTitle: 'النتيجة التقديرية',
    recommendedSystem: 'النظام الموصى به',
    collectorsWord: 'مجمّع',
    boilerWord: 'ل خزان مطلي بالمينا',
    centralSystem: 'نظام مركزي',
    centralNote: 'طلبكم يتجاوز حدّ النظام الجاهز؛ نوصي بتصميم حقل مجمعات + خزان مركزي.',
    packagePrefix: 'الحزمة الموصى بها:',
    metrics: {
      coverage: 'نسبة تلبية حاجة الماء الساخن من الشمس',
      production: 'الحرارة النظيفة المنتَجة سنوياً',
      saving: 'التوفير السنوي التقديري',
      co2: 'CO₂ المتجنَّب سنوياً',
    },
    units: { kwhYear: 'kWh/سنة', kgYear: 'kg/سنة', year: 'سنة', liter: 'ل/يوم' },
    treeEqLabel: '≈ احتجاز الكربون السنوي لـ {n} شجرة',
    paybackLabel: 'فترة الاسترداد التقديرية',
    paybackNote: 'تختلف حسب حجم النظام وسعر الطاقة؛ اطلبوا عرضاً لقيمة دقيقة.',
    disclaimer:
      'القيم تقديرات تقريبية تستند إلى متوسطات GEPA الإقليمية وافتراضات قياسية (≈50 ل/فرد·يوم، ΔT 30°م، كفاءة نظام 50%، 2.33 م²/مجمّع). للحصول على نتيجة دقيقة نوصي بمسح ميداني مجاني.',
    ctaQuote: 'اطلبوا عرضاً لهذا النظام',
    ctaProducts: 'استعرضوا المنتجات',
    demandNote: 'حاجة الماء الساخن اليومية ≈ {liters} ل · الطلب السنوي للطاقة ≈ {kwh} kWh',
  },
  el: {
    intlLocale: 'el-GR',
    currency: 'TL',
    hero: {
      eyebrow: 'Υπολογιστής',
      title: 'Διαστασιολόγηση συστήματος και εκτίμηση εξοικονόμησης',
      subtitle:
        'Επιλέξτε το μέγεθος του νοικοκυριού και την επαρχία σας· δείτε αμέσως τη συνιστώμενη χωρητικότητα συλλέκτη και μπόιλερ, την ετήσια παραγωγή, το CO₂ που αποφεύγεται και την εκτιμώμενη εξοικονόμηση.',
    },
    crumb: 'Υπολογιστής',
    inputsTitle: 'Εισαγάγετε τα στοιχεία σας',
    peopleLabel: 'Άτομα στο νοικοκυριό',
    peopleUnit: 'άτομα',
    provinceLabel: 'Επαρχία',
    usageLabel: 'Χρήση ζεστού νερού',
    usage: { low: 'Χαμηλή', normal: 'Κανονική', high: 'Υψηλή' },
    usageHint: { low: '≈40 L/άτομο·ημέρα', normal: '≈50 L/άτομο·ημέρα', high: '≈60 L/άτομο·ημέρα' },
    energyPriceLabel: 'Τιμή μονάδας ενέργειας (TL/kWh)',
    energyPriceHint: 'Μια υπόθεση για την εκτίμηση εξοικονόμησης — μπορείτε να την αλλάξετε στο δικό σας τιμολόγιο.',
    resultTitle: 'Εκτιμώμενο αποτέλεσμα',
    recommendedSystem: 'Προτεινόμενο σύστημα',
    collectorsWord: 'συλλέκτες',
    boilerWord: 'L εμαγιέ μπόιλερ',
    centralSystem: 'Κεντρικό σύστημα',
    centralNote: 'Η ζήτησή σας υπερβαίνει το όριο ολοκληρωμένου συστήματος· συνιστούμε σχεδιασμό πεδίου συλλεκτών + κεντρικού μπόιλερ.',
    packagePrefix: 'Προτεινόμενο πακέτο:',
    metrics: {
      coverage: 'Ποσοστό της ζήτησης ζεστού νερού που καλύπτεται από τον ήλιο',
      production: 'Καθαρή θερμότητα που παράγεται ετησίως',
      saving: 'Εκτιμώμενη ετήσια εξοικονόμηση',
      co2: 'CO₂ που αποφεύγεται ετησίως',
    },
    units: { kwhYear: 'kWh/έτος', kgYear: 'kg/έτος', year: 'έτη', liter: 'L/ημέρα' },
    treeEqLabel: '≈ ετήσια δέσμευση άνθρακα {n} δέντρων',
    paybackLabel: 'Εκτιμώμενη περίοδος απόσβεσης',
    paybackNote: 'Διαφέρει ανάλογα με το μέγεθος του συστήματος και την τιμή ενέργειας· ζητήστε προσφορά για ακριβή τιμή.',
    disclaimer:
      'Οι τιμές είναι κατά προσέγγιση εκτιμήσεις βάσει περιφερειακών μέσων όρων GEPA και τυπικών υποθέσεων (≈50 L/άτομο·ημέρα, ΔT 30°C, 50% απόδοση συστήματος, 2,33 m²/συλλέκτη). Για ακριβές αποτέλεσμα συνιστούμε δωρεάν επιτόπια μελέτη.',
    ctaQuote: 'Ζητήστε προσφορά για αυτό το σύστημα',
    ctaProducts: 'Δείτε τα προϊόντα',
    demandNote: 'Ημερήσια ζήτηση ζεστού νερού ≈ {liters} L · Ετήσια ζήτηση ενέργειας ≈ {kwh} kWh',
  },
};

export function getCalculatorUi(locale: string): CalculatorUi {
  return DATA[locale as Locale] ?? DATA.tr;
}
