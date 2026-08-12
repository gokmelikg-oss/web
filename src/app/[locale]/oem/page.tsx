import type { Metadata } from 'next';
import { Palette, Tag, Package, Ruler, FileText, Container } from 'lucide-react';
import { PageBreadcrumb } from '@/components/JsonLd';
import { CapabilityPage } from '@/components/CapabilityPage';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

/* OEM / Private Label — üretici olmanın en doğrudan ticari karşılığı.
   Kendi markasıyla satmak isteyen distribütörler bu sayfayı arar. */

interface Text {
  crumb: string;
  eyebrow: string; title: string; subtitle: string; intro: string;
  meta: { title: string; description: string };
  items: { title: string; desc: string }[];
  cta: { title: string; body: string; label: string };
}

const ICONS = [Tag, Palette, Ruler, Package, FileText, Container];

const CONTENT: Record<Locale, Text> = {
  tr: {
    crumb: 'OEM & Private Label',
    eyebrow: 'OEM & Private Label',
    title: 'Kendi markanızla üretim',
    subtitle: 'Distribütörler ve marka sahipleri için özelleştirilmiş üretim seçenekleri.',
    intro: 'Üretimin tamamı kendi tesisimizde yapıldığı için ürünü markanıza göre uyarlayabiliyoruz: etiket, renk, profil, ambalaj ve teknik dokümantasyon sizin kimliğinizle hazırlanır.',
    meta: {
      title: 'OEM & Private Label | Şimşek Solar',
      description: 'Kendi markanızla güneş kollektörü ve boyler üretimi: etiket, renk, profil, ambalaj ve teknik dokümantasyon özelleştirmesi.',
    },
    items: [
      { title: 'Marka ve etiket', desc: 'Ürün etiketi, seri numarası formatı ve marka işaretlemesi sizin kimliğinizle uygulanır.' },
      { title: 'Renk ve yüzey', desc: 'Kasa rengi ve yüzey işlemi talep edilen seçeneklere göre uyarlanabilir.' },
      { title: 'Profil ve ölçü', desc: 'Kollektör kasası ve bağlantı ölçülerinde proje bazlı uyarlama değerlendirilir.' },
      { title: 'Ambalaj', desc: 'Kutu tasarımı, paletleme düzeni ve etiketleme markanıza göre hazırlanır.' },
      { title: 'Teknik doküman', desc: 'Datasheet, montaj kılavuzu ve garanti belgesi sizin markanızla ve dilinizde üretilir.' },
      { title: 'Konteyner planlama', desc: 'Sipariş miktarı konteyner doluluğuna göre optimize edilerek nakliye maliyeti düşürülür.' },
    ],
    cta: { title: 'OEM iş birliği için görüşelim', body: 'Ürün grubu, hedef pazar ve tahmini yıllık adedi paylaşın; koşulları birlikte belirleyelim.', label: 'Teklif Al' },
  },
  en: {
    crumb: 'OEM & Private Label',
    eyebrow: 'OEM & Private Label',
    title: 'Manufacturing under your own brand',
    subtitle: 'Customised production options for distributors and brand owners.',
    intro: 'Because all production takes place in our own facility, we can adapt the product to your brand: labelling, colour, profile, packaging and technical documentation are prepared with your identity.',
    meta: {
      title: 'OEM & Private Label Solar Collector Manufacturer | Şimşek Solar',
      description: 'Solar collector and storage tank manufacturing under your own brand: labelling, colour, profile, packaging and technical documentation customisation.',
    },
    items: [
      { title: 'Brand and labelling', desc: 'Product label, serial number format and brand marking applied with your identity.' },
      { title: 'Colour and finish', desc: 'Casing colour and surface treatment can be adapted to requested options.' },
      { title: 'Profile and dimensions', desc: 'Project-based adaptation of collector casing and connection dimensions can be evaluated.' },
      { title: 'Packaging', desc: 'Box design, palletising layout and labelling prepared for your brand.' },
      { title: 'Technical documents', desc: 'Datasheets, installation manuals and warranty documents produced under your brand and language.' },
      { title: 'Container planning', desc: 'Order quantity optimised to container fill rate to reduce freight cost per unit.' },
    ],
    cta: { title: 'Let’s discuss an OEM partnership', body: 'Share the product group, target market and estimated annual volume; we will define the terms together.', label: 'Request a Quote' },
  },
  ar: {
    crumb: 'OEM والعلامة الخاصة',
    eyebrow: 'OEM والعلامة الخاصة',
    title: 'تصنيع بعلامتكم التجارية',
    subtitle: 'خيارات إنتاج مخصّصة للموزعين وأصحاب العلامات التجارية.',
    intro: 'لأن الإنتاج بالكامل يتم في منشأتنا، يمكننا تكييف المنتج مع علامتكم: الملصق واللون والمقطع والتغليف والتوثيق الفني تُعدّ بهويتكم.',
    meta: {
      title: 'OEM والعلامة الخاصة | Şimşek Solar',
      description: 'تصنيع المجمعات الشمسية والخزانات بعلامتكم التجارية: الملصق واللون والمقطع والتغليف والتوثيق الفني.',
    },
    items: [
      { title: 'العلامة والملصق', desc: 'ملصق المنتج وصيغة الرقم التسلسلي ووسم العلامة تُطبَّق بهويتكم.' },
      { title: 'اللون والتشطيب', desc: 'يمكن تكييف لون الإطار ومعالجة السطح حسب الخيارات المطلوبة.' },
      { title: 'المقطع والأبعاد', desc: 'يمكن دراسة تكييف أبعاد إطار المجمع ووصلاته حسب المشروع.' },
      { title: 'التغليف', desc: 'تصميم الصندوق وترتيب المنصات والوسم تُعدّ لعلامتكم.' },
      { title: 'الوثائق الفنية', desc: 'أوراق البيانات وأدلة التركيب ووثائق الضمان تُنتَج بعلامتكم ولغتكم.' },
      { title: 'تخطيط الحاويات', desc: 'تُحسَّن كمية الطلب وفق امتلاء الحاوية لخفض تكلفة الشحن للوحدة.' },
    ],
    cta: { title: 'لنتحدث عن شراكة OEM', body: 'شارك مجموعة المنتجات والسوق المستهدف والكمية السنوية التقديرية؛ سنحدد الشروط معاً.', label: 'اطلب عرض سعر' },
  },
  el: {
    crumb: 'OEM & Private Label',
    eyebrow: 'OEM & Private Label',
    title: 'Παραγωγή με τη δική σας μάρκα',
    subtitle: 'Επιλογές προσαρμοσμένης παραγωγής για διανομείς και ιδιοκτήτες μαρκών.',
    intro: 'Επειδή όλη η παραγωγή γίνεται στη δική μας μονάδα, μπορούμε να προσαρμόσουμε το προϊόν στη μάρκα σας: σήμανση, χρώμα, προφίλ, συσκευασία και τεχνική τεκμηρίωση ετοιμάζονται με τη δική σας ταυτότητα.',
    meta: {
      title: 'OEM & Private Label | Şimşek Solar',
      description: 'Κατασκευή ηλιακών συλλεκτών και δοχείων με τη δική σας μάρκα: σήμανση, χρώμα, προφίλ, συσκευασία και τεχνική τεκμηρίωση.',
    },
    items: [
      { title: 'Μάρκα και σήμανση', desc: 'Ετικέτα προϊόντος, μορφή σειριακού αριθμού και σήμανση μάρκας με τη δική σας ταυτότητα.' },
      { title: 'Χρώμα και φινίρισμα', desc: 'Το χρώμα του πλαισίου και η επεξεργασία επιφάνειας προσαρμόζονται στις ζητούμενες επιλογές.' },
      { title: 'Προφίλ και διαστάσεις', desc: 'Αξιολογείται προσαρμογή διαστάσεων πλαισίου και συνδέσεων ανά έργο.' },
      { title: 'Συσκευασία', desc: 'Σχεδιασμός κιβωτίου, διάταξη παλετοποίησης και σήμανση για τη μάρκα σας.' },
      { title: 'Τεχνικά έγγραφα', desc: 'Φύλλα δεδομένων, οδηγίες εγκατάστασης και έγγραφα εγγύησης με τη μάρκα και γλώσσα σας.' },
      { title: 'Σχεδιασμός container', desc: 'Η ποσότητα παραγγελίας βελτιστοποιείται ως προς την πλήρωση container.' },
    ],
    cta: { title: 'Ας συζητήσουμε συνεργασία OEM', body: 'Μοιραστείτε την κατηγορία προϊόντος, την αγορά-στόχο και τον εκτιμώμενο ετήσιο όγκο.', label: 'Ζητήστε Προσφορά' },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale];
  return pageMetadata({ locale, path: '/oem', title: c.meta.title, description: c.meta.description });
}

export default async function OemPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = CONTENT[locale];
  return (
    <>
      <PageBreadcrumb items={[{ name: c.crumb, path: '/oem' }]} />
      <CapabilityPage
        eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} intro={c.intro}
        items={c.items.map((it, i) => ({ ...it, icon: ICONS[i] }))}
        ctaTitle={c.cta.title} ctaBody={c.cta.body} ctaLabel={c.cta.label} ctaHref="/teklif-al"
      />
    </>
  );
}
