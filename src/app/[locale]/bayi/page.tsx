import type { Metadata } from 'next';
import { Handshake, GraduationCap, Headphones, Truck, BadgePercent, MapPin } from 'lucide-react';
import { PageBreadcrumb } from '@/components/JsonLd';
import { CapabilityPage } from '@/components/CapabilityPage';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

/* Bayilik — daha önce yalnızca /contact#bayilik çapası vardı; kendi URL'i yoktu.
   Ayrı sayfa hem "bayi" aramalarında hedeflenebilir hem de başvuru formuna
   doğrudan iç link kurar. */

interface Text {
  crumb: string;
  eyebrow: string; title: string; subtitle: string; intro: string;
  meta: { title: string; description: string };
  items: { title: string; desc: string }[];
  cta: { title: string; body: string; label: string };
}

const ICONS = [Handshake, BadgePercent, GraduationCap, Truck, Headphones, MapPin];

const CONTENT: Record<Locale, Text> = {
  tr: {
    crumb: 'Bayilik',
    eyebrow: 'Bayilik',
    title: 'Şimşek Solar bayisi olun',
    subtitle: 'Bölgenizde güneş enerjisi sistemleri satmak isteyen firmalar için iş ortaklığı.',
    intro: 'Üretici olarak çalıştığımız için bayilerimize doğrudan fabrika fiyatı, teknik eğitim ve saha desteği sunuyoruz. Başvurunuzu değerlendirip bölgenizdeki mevcut yapıyı birlikte planlıyoruz.',
    meta: {
      title: 'Bayilik | Şimşek Solar',
      description: 'Şimşek Solar bayilik başvurusu: fabrika fiyatı, teknik eğitim, saha desteği ve bölgesel iş ortaklığı koşulları.',
    },
    items: [
      { title: 'Doğrudan üreticiden', desc: 'Aradaki halka olmadan doğrudan fabrikadan tedarik; rekabetçi fiyat ve stok önceliği.' },
      { title: 'Bayi fiyat listesi', desc: 'Satış hacmine göre kademeli fiyatlandırma ve proje bazlı özel teklif desteği.' },
      { title: 'Teknik eğitim', desc: 'Ürün, montaj ve sistem boyutlandırma eğitimleri; teknik ekibinize saha bilgisi aktarımı.' },
      { title: 'Sevkiyat', desc: 'Paletli sevkiyat ve bölgeye göre planlanmış teslimat programı.' },
      { title: 'Satış sonrası destek', desc: 'Yedek parça tedariki ve saha sorunlarında teknik danışmanlık.' },
      { title: 'Bölgesel planlama', desc: 'Bölgedeki bayi yapısı gözetilerek sürdürülebilir bir iş birliği kurgulanır.' },
    ],
    cta: { title: 'Bayilik başvurusu yapın', body: 'Firma bilgilerinizi ve mevcut satış kanalınızı paylaşın; satış ekibimiz sizinle iletişime geçsin.', label: 'Başvuru Formu' },
  },
  en: {
    crumb: 'Become a Dealer',
    eyebrow: 'Dealership',
    title: 'Become a Şimşek Solar dealer',
    subtitle: 'Partnership for companies that want to sell solar thermal systems in their region.',
    intro: 'As a manufacturer, we offer our dealers direct factory pricing, technical training and field support. We review your application and plan together around the existing structure in your region.',
    meta: {
      title: 'Become a Dealer | Şimşek Solar',
      description: 'Şimşek Solar dealership application: factory pricing, technical training, field support and regional partnership terms.',
    },
    items: [
      { title: 'Direct from manufacturer', desc: 'Supply straight from the factory without intermediaries; competitive pricing and stock priority.' },
      { title: 'Dealer price list', desc: 'Volume-based tiered pricing and project-specific quotation support.' },
      { title: 'Technical training', desc: 'Product, installation and system sizing training for your technical team.' },
      { title: 'Shipment', desc: 'Palletised shipment and a delivery schedule planned by region.' },
      { title: 'After-sales support', desc: 'Spare part supply and technical consultancy for field issues.' },
      { title: 'Regional planning', desc: 'A sustainable partnership designed around the existing dealer structure in the region.' },
    ],
    cta: { title: 'Apply for dealership', body: 'Share your company details and current sales channel; our sales team will contact you.', label: 'Application Form' },
  },
  ar: {
    crumb: 'كن وكيلاً',
    eyebrow: 'الوكالة',
    title: 'كن وكيلاً لـ Şimşek Solar',
    subtitle: 'شراكة للشركات الراغبة في بيع الأنظمة الشمسية الحرارية في منطقتها.',
    intro: 'بصفتنا مصنّعاً، نوفّر لوكلائنا أسعار المصنع مباشرة والتدريب الفني والدعم الميداني. ندرس طلبكم ونخطط معاً وفق الهيكل القائم في منطقتكم.',
    meta: {
      title: 'كن وكيلاً | Şimşek Solar',
      description: 'طلب وكالة Şimşek Solar: أسعار المصنع، التدريب الفني، الدعم الميداني وشروط الشراكة الإقليمية.',
    },
    items: [
      { title: 'مباشرة من المصنع', desc: 'توريد مباشر دون وسطاء؛ أسعار تنافسية وأولوية في المخزون.' },
      { title: 'قائمة أسعار الوكلاء', desc: 'تسعير متدرج حسب حجم المبيعات ودعم بعروض خاصة للمشاريع.' },
      { title: 'التدريب الفني', desc: 'تدريب على المنتج والتركيب وتحديد أحجام الأنظمة لفريقكم الفني.' },
      { title: 'الشحن', desc: 'شحن على منصات وبرنامج تسليم مخطط حسب المنطقة.' },
      { title: 'الدعم بعد البيع', desc: 'توريد قطع الغيار والاستشارة الفنية لمشكلات الموقع.' },
      { title: 'التخطيط الإقليمي', desc: 'شراكة مستدامة مصممة وفق هيكل الوكلاء القائم في المنطقة.' },
    ],
    cta: { title: 'قدّم طلب وكالة', body: 'شارك بيانات شركتك وقناة البيع الحالية؛ سيتواصل معك فريق المبيعات.', label: 'نموذج الطلب' },
  },
  el: {
    crumb: 'Γίνετε Αντιπρόσωπος',
    eyebrow: 'Αντιπροσωπεία',
    title: 'Γίνετε αντιπρόσωπος της Şimşek Solar',
    subtitle: 'Συνεργασία για εταιρείες που θέλουν να πωλούν ηλιακά θερμικά συστήματα στην περιοχή τους.',
    intro: 'Ως κατασκευαστής, προσφέρουμε στους αντιπροσώπους μας απευθείας τιμές εργοστασίου, τεχνική εκπαίδευση και υποστήριξη πεδίου. Εξετάζουμε την αίτησή σας και σχεδιάζουμε μαζί με βάση την υπάρχουσα δομή στην περιοχή σας.',
    meta: {
      title: 'Γίνετε Αντιπρόσωπος | Şimşek Solar',
      description: 'Αίτηση αντιπροσωπείας Şimşek Solar: τιμές εργοστασίου, τεχνική εκπαίδευση, υποστήριξη πεδίου και όροι συνεργασίας.',
    },
    items: [
      { title: 'Απευθείας από τον κατασκευαστή', desc: 'Προμήθεια απευθείας από το εργοστάσιο· ανταγωνιστικές τιμές και προτεραιότητα αποθέματος.' },
      { title: 'Τιμοκατάλογος αντιπροσώπων', desc: 'Κλιμακωτή τιμολόγηση βάσει όγκου και υποστήριξη προσφορών ανά έργο.' },
      { title: 'Τεχνική εκπαίδευση', desc: 'Εκπαίδευση σε προϊόν, εγκατάσταση και διαστασιολόγηση για την τεχνική σας ομάδα.' },
      { title: 'Αποστολή', desc: 'Αποστολή σε παλέτες και πρόγραμμα παράδοσης ανά περιοχή.' },
      { title: 'Υποστήριξη μετά την πώληση', desc: 'Προμήθεια ανταλλακτικών και τεχνική συμβουλευτική.' },
      { title: 'Περιφερειακός σχεδιασμός', desc: 'Βιώσιμη συνεργασία με βάση την υπάρχουσα δομή αντιπροσώπων.' },
    ],
    cta: { title: 'Κάντε αίτηση αντιπροσωπείας', body: 'Μοιραστείτε τα στοιχεία της εταιρείας και το υπάρχον κανάλι πωλήσεων.', label: 'Φόρμα Αίτησης' },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale];
  return pageMetadata({ locale, path: '/bayi', title: c.meta.title, description: c.meta.description });
}

export default async function DealerPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = CONTENT[locale];
  return (
    <>
      <PageBreadcrumb items={[{ name: c.crumb, path: '/bayi' }]} />
      <CapabilityPage
        eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} intro={c.intro}
        items={c.items.map((it, i) => ({ ...it, icon: ICONS[i] }))}
        ctaTitle={c.cta.title} ctaBody={c.cta.body} ctaLabel={c.cta.label} ctaHref="/contact#bayilik"
      />
    </>
  );
}
