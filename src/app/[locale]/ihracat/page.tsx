import type { Metadata } from 'next';
import { Ship, Globe2, Boxes, FileCheck2, Wrench, Handshake } from 'lucide-react';
import { PageBreadcrumb } from '@/components/JsonLd';
import { CapabilityPage, type CapabilityFact } from '@/components/CapabilityPage';
import { pageMetadata } from '@/lib/seo';
import { COMPANY_FACTS, experienceLabel } from '@/lib/companyFacts';
import type { Locale } from '@/i18n/config';

/* İhracat — İngilizce tarafın en önemli sayfası.
   Hedef kitle: distributor / importer / EPC / proje tedarikçisi. */

interface Text {
  crumb: string;
  eyebrow: string; title: string; subtitle: string; intro: string;
  meta: { title: string; description: string };
  items: { title: string; desc: string }[];
  factLabels: { countries: string; experience: string; capacity: string; facility: string };
  cta: { title: string; body: string; label: string };
}

const ICONS = [Globe2, Ship, Boxes, FileCheck2, Wrench, Handshake];

const CONTENT: Record<Locale, Text> = {
  tr: {
    crumb: 'İhracat',
    eyebrow: 'İhracat',
    title: 'Türkiye’den dünyaya güneş termal sistemler',
    subtitle: 'Distribütörler, ithalatçılar ve proje tedarikçileri için üretim ve sevkiyat kabiliyetlerimiz.',
    intro: 'Mersin’deki entegre tesisimizde ürettiğimiz güneş kollektörleri ve depolama tanklarını, konteyner sevkiyatıyla uluslararası pazarlara ulaştırıyoruz. Proje bazlı tedarik, teknik dokümantasyon ve satış sonrası destek süreçlerinin tamamı tek çatı altında yürütülür.',
    meta: {
      title: 'İhracat | Şimşek Solar',
      description: 'Şimşek Solar ihracat: güneş termal kollektör ve boyler üretimi, konteyner sevkiyatı, proje tedariki ve teknik destek.',
    },
    items: [
      { title: 'Uluslararası tedarik', desc: 'Distribütör, ithalatçı ve EPC firmalarıyla uzun vadeli tedarik ilişkileri kuruyoruz.' },
      { title: 'Konteyner sevkiyatı', desc: 'Ürünler konteyner yüklemesine uygun paletli ve şrink sarımlı olarak hazırlanır.' },
      { title: 'Proje bazlı tedarik', desc: 'Toplu konut, otel ve kamu projeleri için miktar ve teslim planına göre üretim yapılır.' },
      { title: 'Teknik dokümantasyon', desc: 'Datasheet, montaj kılavuzu, teknik çizim ve belge setleri talep edilen dilde hazırlanır.' },
      { title: 'Teknik destek', desc: 'Sistem boyutlandırma ve projelendirme aşamasında mühendislik desteği sağlanır.' },
      { title: 'Satış sonrası', desc: 'Yedek parça tedariki ve saha sorunlarında teknik danışmanlık sürdürülür.' },
    ],
    factLabels: { countries: 'ihracat yapılan ülke', experience: 'yıllık üretim deneyimi', capacity: 'yıllık kapasite', facility: 'kapalı üretim alanı' },
    cta: { title: 'Projeniz için teklif alın', body: 'Ürün, adet ve teslim lokasyonunu paylaşın; teknik çözüm ve fiyat teklifi hazırlayalım.', label: 'Teklif Al' },
  },
  en: {
    crumb: 'Export',
    eyebrow: 'Export',
    title: 'Solar thermal systems from Türkiye to the world',
    subtitle: 'Our manufacturing and shipment capabilities for distributors, importers and project suppliers.',
    intro: 'We manufacture solar thermal collectors and storage tanks at our integrated facility in Mersin, Türkiye, and deliver them to international markets by container shipment. Project-based supply, technical documentation and after-sales support are all handled in house.',
    meta: {
      title: 'Export | Şimşek Solar — Solar Thermal Manufacturer in Türkiye',
      description: 'Şimşek Solar export: solar thermal collector and storage tank manufacturing, container shipment, project supply and technical support.',
    },
    items: [
      { title: 'International supply', desc: 'We build long-term supply relationships with distributors, importers and EPC contractors.' },
      { title: 'Container shipment', desc: 'Products are prepared palletised and shrink-wrapped, suitable for container loading.' },
      { title: 'Project-based supply', desc: 'Production is planned to quantity and delivery schedule for housing, hotel and public projects.' },
      { title: 'Technical documentation', desc: 'Datasheets, installation manuals, technical drawings and certificate sets in the requested language.' },
      { title: 'Engineering support', desc: 'Engineering assistance during system sizing and project design stages.' },
      { title: 'After-sales', desc: 'Spare part supply and technical consultancy for field issues.' },
    ],
    factLabels: { countries: 'export countries', experience: 'years of manufacturing', capacity: 'annual capacity', facility: 'covered production area' },
    cta: { title: 'Request a quotation', body: 'Share the product, quantity and delivery location; we will prepare a technical solution and price offer.', label: 'Request a Quote' },
  },
  ar: {
    crumb: 'التصدير',
    eyebrow: 'التصدير',
    title: 'أنظمة شمسية حرارية من تركيا إلى العالم',
    subtitle: 'قدراتنا في التصنيع والشحن للموزعين والمستوردين وموردي المشاريع.',
    intro: 'نصنّع المجمعات الشمسية الحرارية وخزانات المياه في منشأتنا المتكاملة بمرسين، ونوصلها إلى الأسواق الدولية عبر الشحن بالحاويات. يتم إدارة التوريد المشروعي والتوثيق الفني والدعم بعد البيع داخلياً.',
    meta: {
      title: 'التصدير | Şimşek Solar',
      description: 'تصدير Şimşek Solar: تصنيع المجمعات الشمسية والخزانات، الشحن بالحاويات، توريد المشاريع والدعم الفني.',
    },
    items: [
      { title: 'التوريد الدولي', desc: 'نبني علاقات توريد طويلة الأمد مع الموزعين والمستوردين وشركات المقاولات.' },
      { title: 'الشحن بالحاويات', desc: 'تُجهَّز المنتجات على منصات نقل ومغلفة بالشرينك بما يناسب تحميل الحاويات.' },
      { title: 'توريد المشاريع', desc: 'يُخطَّط الإنتاج وفق الكمية وجدول التسليم لمشاريع الإسكان والفنادق والمباني العامة.' },
      { title: 'التوثيق الفني', desc: 'أوراق البيانات وأدلة التركيب والرسومات ومجموعات الشهادات باللغة المطلوبة.' },
      { title: 'الدعم الهندسي', desc: 'مساندة هندسية في مراحل تحديد أحجام الأنظمة وتصميم المشاريع.' },
      { title: 'ما بعد البيع', desc: 'توريد قطع الغيار والاستشارة الفنية لمشكلات الموقع.' },
    ],
    factLabels: { countries: 'دولة تصدير', experience: 'سنة خبرة في التصنيع', capacity: 'الطاقة السنوية', facility: 'مساحة الإنتاج المغطاة' },
    cta: { title: 'اطلب عرض سعر', body: 'شارك المنتج والكمية وموقع التسليم؛ سنعدّ حلاً فنياً وعرض سعر.', label: 'اطلب عرض سعر' },
  },
  el: {
    crumb: 'Εξαγωγές',
    eyebrow: 'Εξαγωγές',
    title: 'Ηλιακά θερμικά συστήματα από την Τουρκία στον κόσμο',
    subtitle: 'Οι δυνατότητες παραγωγής και αποστολής για διανομείς, εισαγωγείς και προμηθευτές έργων.',
    intro: 'Κατασκευάζουμε ηλιακούς θερμικούς συλλέκτες και δοχεία αποθήκευσης στη μονάδα μας στη Μερσίνη και τα παραδίδουμε σε διεθνείς αγορές με αποστολή εμπορευματοκιβωτίων. Η προμήθεια έργων, η τεχνική τεκμηρίωση και η υποστήριξη μετά την πώληση γίνονται εσωτερικά.',
    meta: {
      title: 'Εξαγωγές | Şimşek Solar',
      description: 'Εξαγωγές Şimşek Solar: κατασκευή ηλιακών συλλεκτών και δοχείων, αποστολή container, προμήθεια έργων και τεχνική υποστήριξη.',
    },
    items: [
      { title: 'Διεθνής προμήθεια', desc: 'Χτίζουμε μακροχρόνιες σχέσεις με διανομείς, εισαγωγείς και εταιρείες EPC.' },
      { title: 'Αποστολή container', desc: 'Τα προϊόντα ετοιμάζονται σε παλέτες με θερμοσυρρίκνωση, κατάλληλα για φόρτωση container.' },
      { title: 'Προμήθεια έργων', desc: 'Η παραγωγή προγραμματίζεται βάσει ποσότητας και χρονοδιαγράμματος παράδοσης.' },
      { title: 'Τεχνική τεκμηρίωση', desc: 'Φύλλα δεδομένων, οδηγίες εγκατάστασης, σχέδια και πιστοποιητικά στη ζητούμενη γλώσσα.' },
      { title: 'Τεχνική υποστήριξη', desc: 'Μηχανική υποστήριξη στη διαστασιολόγηση και τον σχεδιασμό του έργου.' },
      { title: 'Μετά την πώληση', desc: 'Προμήθεια ανταλλακτικών και τεχνική συμβουλευτική για θέματα πεδίου.' },
    ],
    factLabels: { countries: 'χώρες εξαγωγής', experience: 'χρόνια κατασκευής', capacity: 'ετήσια δυναμικότητα', facility: 'στεγασμένος χώρος παραγωγής' },
    cta: { title: 'Ζητήστε προσφορά', body: 'Μοιραστείτε προϊόν, ποσότητα και τόπο παράδοσης· θα ετοιμάσουμε τεχνική λύση και προσφορά.', label: 'Ζητήστε Προσφορά' },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale];
  return pageMetadata({ locale, path: '/ihracat', title: c.meta.title, description: c.meta.description });
}

export default async function ExportPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = CONTENT[locale];

  /* Rakamlar yalnızca doğrulanmışsa basılır (companyFacts.ts).
     Bilinmeyen alan undefined'dır ve kutusu hiç oluşmaz. */
  const facts: CapabilityFact[] = [
    COMPANY_FACTS.exportCountries !== undefined && { label: c.factLabels.countries, value: `${COMPANY_FACTS.exportCountries}+` },
    { label: c.factLabels.experience, value: experienceLabel() },
    COMPANY_FACTS.annualCapacity !== undefined && { label: c.factLabels.capacity, value: COMPANY_FACTS.annualCapacity },
    COMPANY_FACTS.facilityAreaM2 !== undefined && { label: c.factLabels.facility, value: `${COMPANY_FACTS.facilityAreaM2.toLocaleString('tr-TR')} m²` },
  ].filter(Boolean) as CapabilityFact[];

  return (
    <>
      <PageBreadcrumb items={[{ name: c.crumb, path: '/ihracat' }]} />
      <CapabilityPage
        eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} intro={c.intro}
        items={c.items.map((it, i) => ({ ...it, icon: ICONS[i] }))}
        facts={facts}
        ctaTitle={c.cta.title} ctaBody={c.cta.body} ctaLabel={c.cta.label} ctaHref="/teklif-al"
      />
    </>
  );
}
