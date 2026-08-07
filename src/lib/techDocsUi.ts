import type { Locale } from '@/i18n/config';

/* Detaylı teknik döküman (datasheet) tarayıcısının ek arayüz metinleri, dört
   dilde. Ürün adları/spec etiketleri products namespace'inden gelir. */
export interface TechDocsUi {
  intlLocale: string;
  browseEyebrow: string;
  browseTitle: string;
  browseSubtitle: string;
  selectPrompt: string;
  dataTab: string;
  curveTab: string;
  dimTab: string;
  docsTab: string;
  curveTitle: string;
  curveX: string;
  curveY: string;
  curveNote: string;
  dimNote: string;
  download: string;
  quote: string;
  detail: string;
  docTypes: { datasheet: string; drawing: string; manual: string };
}

const DATA: Record<Locale, TechDocsUi> = {
  tr: {
    intlLocale: 'tr-TR',
    browseEyebrow: 'Teknik Veri Sayfaları',
    browseTitle: 'Ürünü seçin, tüm teknik detayları görün',
    browseSubtitle: 'Her ürün için teknik özellikler, verim eğrisi, boyutlar ve indirilebilir belgeler tek ekranda.',
    selectPrompt: 'Detayları görmek için bir ürün seçin',
    dataTab: 'Teknik Veriler',
    curveTab: 'Verim Eğrisi',
    dimTab: 'Boyutlar',
    docsTab: 'Belgeler',
    curveTitle: 'Kolektör verim eğrisi',
    curveX: 'ΔT/G  (K·m²/W)',
    curveY: 'Verim η',
    curveNote: 'EN 12975 ısıl performans modeline göre yaklaşık eğri: η = η₀ − a₁·(ΔT/G) − a₂·G·(ΔT/G)². Kesin değerler için Solar Keymark test raporuna bakınız.',
    dimNote: 'Ölçüler yaklaşıktır; kesin montaj boyutları için teknik çizime (PDF) bakınız.',
    download: 'İndir',
    quote: 'Bu ürün için teklif alın',
    detail: 'Ürün sayfası',
    docTypes: { datasheet: 'Teknik Föy', drawing: 'Teknik Çizim', manual: 'Kurulum Kılavuzu' },
  },
  en: {
    intlLocale: 'en-US',
    browseEyebrow: 'Technical Data Sheets',
    browseTitle: 'Select a product, see every technical detail',
    browseSubtitle: 'Technical specifications, efficiency curve, dimensions and downloadable documents for each product on one screen.',
    selectPrompt: 'Select a product to see its details',
    dataTab: 'Technical Data',
    curveTab: 'Efficiency Curve',
    dimTab: 'Dimensions',
    docsTab: 'Documents',
    curveTitle: 'Collector efficiency curve',
    curveX: 'ΔT/G  (K·m²/W)',
    curveY: 'Efficiency η',
    curveNote: 'Approximate curve per the EN 12975 thermal performance model: η = η₀ − a₁·(ΔT/G) − a₂·G·(ΔT/G)². For exact values, see the Solar Keymark test report.',
    dimNote: 'Dimensions are approximate; for exact mounting dimensions, see the technical drawing (PDF).',
    download: 'Download',
    quote: 'Get a quote for this product',
    detail: 'Product page',
    docTypes: { datasheet: 'Data Sheet', drawing: 'Technical Drawing', manual: 'Installation Guide' },
  },
  ar: {
    intlLocale: 'ar-EG-u-nu-latn',
    browseEyebrow: 'صفحات البيانات الفنية',
    browseTitle: 'اختاروا منتجاً وشاهدوا كل تفصيل فني',
    browseSubtitle: 'المواصفات الفنية ومنحنى الكفاءة والأبعاد والمستندات القابلة للتنزيل لكل منتج على شاشة واحدة.',
    selectPrompt: 'اختاروا منتجاً لعرض تفاصيله',
    dataTab: 'البيانات الفنية',
    curveTab: 'منحنى الكفاءة',
    dimTab: 'الأبعاد',
    docsTab: 'المستندات',
    curveTitle: 'منحنى كفاءة المجمّع',
    curveX: 'ΔT/G  (K·m²/W)',
    curveY: 'الكفاءة η',
    curveNote: 'منحنى تقريبي وفق نموذج الأداء الحراري EN 12975: η = η₀ − a₁·(ΔT/G) − a₂·G·(ΔT/G)². للقيم الدقيقة راجعوا تقرير اختبار Solar Keymark.',
    dimNote: 'الأبعاد تقريبية؛ للأبعاد الدقيقة للتركيب راجعوا الرسم الفني (PDF).',
    download: 'تنزيل',
    quote: 'اطلبوا عرضاً لهذا المنتج',
    detail: 'صفحة المنتج',
    docTypes: { datasheet: 'نشرة فنية', drawing: 'رسم فني', manual: 'دليل التركيب' },
  },
  el: {
    intlLocale: 'el-GR',
    browseEyebrow: 'Τεχνικά Φύλλα Δεδομένων',
    browseTitle: 'Επιλέξτε προϊόν, δείτε κάθε τεχνική λεπτομέρεια',
    browseSubtitle: 'Τεχνικές προδιαγραφές, καμπύλη απόδοσης, διαστάσεις και έγγραφα προς λήψη για κάθε προϊόν σε μία οθόνη.',
    selectPrompt: 'Επιλέξτε ένα προϊόν για να δείτε τις λεπτομέρειές του',
    dataTab: 'Τεχνικά Δεδομένα',
    curveTab: 'Καμπύλη Απόδοσης',
    dimTab: 'Διαστάσεις',
    docsTab: 'Έγγραφα',
    curveTitle: 'Καμπύλη απόδοσης συλλέκτη',
    curveX: 'ΔT/G  (K·m²/W)',
    curveY: 'Απόδοση η',
    curveNote: 'Κατά προσέγγιση καμπύλη σύμφωνα με το μοντέλο θερμικής απόδοσης EN 12975: η = η₀ − a₁·(ΔT/G) − a₂·G·(ΔT/G)². Για ακριβείς τιμές, δείτε την αναφορά δοκιμής Solar Keymark.',
    dimNote: 'Οι διαστάσεις είναι κατά προσέγγιση· για ακριβείς διαστάσεις τοποθέτησης, δείτε το τεχνικό σχέδιο (PDF).',
    download: 'Λήψη',
    quote: 'Ζητήστε προσφορά για αυτό το προϊόν',
    detail: 'Σελίδα προϊόντος',
    docTypes: { datasheet: 'Φύλλο Δεδομένων', drawing: 'Τεχνικό Σχέδιο', manual: 'Οδηγός Εγκατάστασης' },
  },
};

export function getTechDocsUi(locale: string): TechDocsUi {
  return DATA[locale as Locale] ?? DATA.tr;
}
