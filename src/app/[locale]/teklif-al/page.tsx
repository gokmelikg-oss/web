import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { PageBreadcrumb } from '@/components/JsonLd';
import { QuoteForm, type QuoteFormLabels } from '@/components/QuoteForm';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

/* Teklif Al (RFQ) — B2B üretici sitesinin asıl dönüşüm sayfası.
   "İletişim"den ayrıdır: ülke, adet ve dosya eki taşır; gelen talep
   doğrudan satış sürecine girecek biçimde yapılandırılmıştır. */

interface QuoteText {
  crumb: string;
  hero: { eyebrow: string; title: string; subtitle: string };
  meta: { title: string; description: string };
  form: QuoteFormLabels;
}

const CONTENT: Record<Locale, QuoteText> = {
  tr: {
    crumb: 'Teklif Al',
    hero: {
      eyebrow: 'Teklif Al',
      title: 'Projeniz için fiyat teklifi alın',
      subtitle:
        'Formu doldurun; satış ekibimiz proje detaylarınıza göre teknik çözüm ve fiyat teklifi hazırlasın. Projeye ait çizim, şartname veya keşif listesi varsa ekleyebilirsiniz.',
    },
    meta: {
      title: 'Teklif Al | Şimşek Solar',
      description:
        'Güneş kollektörü, boyler ve merkezi sıcak su sistemleri için fiyat teklifi alın. Proje dosyanızı ekleyerek teknik çözüm ve teklif talep edin.',
    },
    form: {
      title: 'Teklif talep formu',
      name: 'Ad Soyad', company: 'Firma', country: 'Ülke', email: 'E-posta', phone: 'Telefon',
      product: 'İlgilenilen ürün', productPlaceholder: 'Örn. Orion 435 kollektör, Aquarius 300-K boyler',
      quantity: 'Tahmini adet / kapasite', quantityPlaceholder: 'Örn. 120 kollektör veya 3.000 L',
      projectLocation: 'Proje lokasyonu', projectType: 'Proje tipi',
      projectTypeOptions: ['Konut', 'Toplu konut', 'Otel', 'Hastane', 'Yurt', 'Fabrika', 'Kamu binası', 'Bayilik / stok alımı', 'Diğer'],
      message: 'Mesajınız',
      file: 'Proje dosyası (isteğe bağlı)',
      fileHint: 'PDF, DWG, Excel, Word, görsel veya ZIP — en fazla 8 MB',
      submit: 'Teklif talebi gönder',
      success: 'Talebiniz bize ulaştı. Satış ekibimiz en kısa sürede size dönecek.',
      error: 'Gönderilemedi. Lütfen tekrar deneyin veya info@simseksolar.com.tr adresine yazın.',
      notConfigured: 'Form gönderimi henüz yapılandırılmadı. Lütfen info@simseksolar.com.tr adresine yazın.',
      fileTooBig: 'Dosya 8 MB sınırını aşıyor. Daha küçük bir dosya ekleyin veya e-posta ile gönderin.',
      fileType: 'Bu dosya türü kabul edilmiyor. PDF, DWG, DXF, Excel, Word, görsel veya ZIP ekleyebilirsiniz.',
    },
  },
  en: {
    crumb: 'Request a Quote',
    hero: {
      eyebrow: 'Request a Quote',
      title: 'Get a quotation for your project',
      subtitle:
        'Fill in the form and our sales team will prepare a technical solution and price quotation based on your project. You can attach drawings, specifications or bills of quantity.',
    },
    meta: {
      title: 'Request a Quote | Şimşek Solar',
      description:
        'Request a quotation for solar thermal collectors, storage tanks and central hot water systems. Attach your project file for a technical proposal.',
    },
    form: {
      title: 'Quotation request form',
      name: 'Full name', company: 'Company', country: 'Country', email: 'E-mail', phone: 'Phone',
      product: 'Product of interest', productPlaceholder: 'e.g. Orion 435 collector, Aquarius 300-K tank',
      quantity: 'Estimated quantity / capacity', quantityPlaceholder: 'e.g. 120 collectors or 3,000 L',
      projectLocation: 'Project location', projectType: 'Project type',
      projectTypeOptions: ['Residential', 'Housing development', 'Hotel', 'Hospital', 'Dormitory', 'Factory', 'Public building', 'Distribution / stock purchase', 'Other'],
      message: 'Your message',
      file: 'Project file (optional)',
      fileHint: 'PDF, DWG, Excel, Word, image or ZIP — max 8 MB',
      submit: 'Send quotation request',
      success: 'We have received your request. Our sales team will get back to you shortly.',
      error: 'Could not send. Please try again or write to info@simseksolar.com.tr.',
      notConfigured: 'Form delivery is not configured yet. Please write to info@simseksolar.com.tr.',
      fileTooBig: 'The file exceeds the 8 MB limit. Please attach a smaller file or send it by e-mail.',
      fileType: 'This file type is not accepted. You can attach PDF, DWG, DXF, Excel, Word, image or ZIP.',
    },
  },
  ar: {
    crumb: 'اطلب عرض سعر',
    hero: {
      eyebrow: 'اطلب عرض سعر',
      title: 'احصل على عرض سعر لمشروعك',
      subtitle:
        'املأ النموذج وسيقوم فريق المبيعات بإعداد حل فني وعرض سعر بناءً على مشروعك. يمكنك إرفاق المخططات أو المواصفات أو قوائم الكميات.',
    },
    meta: {
      title: 'اطلب عرض سعر | Şimşek Solar',
      description:
        'اطلب عرض سعر للمجمعات الشمسية الحرارية وخزانات المياه وأنظمة المياه الساخنة المركزية. أرفق ملف مشروعك للحصول على عرض فني.',
    },
    form: {
      title: 'نموذج طلب عرض السعر',
      name: 'الاسم الكامل', company: 'الشركة', country: 'الدولة', email: 'البريد الإلكتروني', phone: 'الهاتف',
      product: 'المنتج المطلوب', productPlaceholder: 'مثال: مجمع Orion 435، خزان Aquarius 300-K',
      quantity: 'الكمية / السعة التقديرية', quantityPlaceholder: 'مثال: 120 مجمعاً أو 3000 لتر',
      projectLocation: 'موقع المشروع', projectType: 'نوع المشروع',
      projectTypeOptions: ['سكني', 'مجمع سكني', 'فندق', 'مستشفى', 'سكن طلابي', 'مصنع', 'مبنى حكومي', 'توزيع / شراء مخزون', 'أخرى'],
      message: 'رسالتك',
      file: 'ملف المشروع (اختياري)',
      fileHint: 'PDF أو DWG أو Excel أو Word أو صورة أو ZIP — بحد أقصى 8 ميغابايت',
      submit: 'إرسال طلب عرض السعر',
      success: 'تم استلام طلبك. سيتواصل معك فريق المبيعات قريباً.',
      error: 'تعذر الإرسال. يرجى المحاولة مرة أخرى أو المراسلة على info@simseksolar.com.tr.',
      notConfigured: 'لم يتم إعداد إرسال النموذج بعد. يرجى المراسلة على info@simseksolar.com.tr.',
      fileTooBig: 'حجم الملف يتجاوز 8 ميغابايت. يرجى إرفاق ملف أصغر أو إرساله بالبريد الإلكتروني.',
      fileType: 'نوع الملف غير مقبول. يمكنك إرفاق PDF أو DWG أو DXF أو Excel أو Word أو صورة أو ZIP.',
    },
  },
  el: {
    crumb: 'Ζητήστε Προσφορά',
    hero: {
      eyebrow: 'Ζητήστε Προσφορά',
      title: 'Λάβετε προσφορά για το έργο σας',
      subtitle:
        'Συμπληρώστε τη φόρμα και η ομάδα πωλήσεων θα ετοιμάσει τεχνική λύση και προσφορά με βάση το έργο σας. Μπορείτε να επισυνάψετε σχέδια, προδιαγραφές ή πίνακες ποσοτήτων.',
    },
    meta: {
      title: 'Ζητήστε Προσφορά | Şimşek Solar',
      description:
        'Ζητήστε προσφορά για ηλιακούς θερμικούς συλλέκτες, δοχεία αποθήκευσης και κεντρικά συστήματα ζεστού νερού. Επισυνάψτε το αρχείο του έργου σας.',
    },
    form: {
      title: 'Φόρμα αιτήματος προσφοράς',
      name: 'Ονοματεπώνυμο', company: 'Εταιρεία', country: 'Χώρα', email: 'E-mail', phone: 'Τηλέφωνο',
      product: 'Προϊόν ενδιαφέροντος', productPlaceholder: 'π.χ. συλλέκτης Orion 435, δοχείο Aquarius 300-K',
      quantity: 'Εκτιμώμενη ποσότητα / χωρητικότητα', quantityPlaceholder: 'π.χ. 120 συλλέκτες ή 3.000 L',
      projectLocation: 'Τοποθεσία έργου', projectType: 'Τύπος έργου',
      projectTypeOptions: ['Κατοικία', 'Οικιστικό συγκρότημα', 'Ξενοδοχείο', 'Νοσοκομείο', 'Εστία', 'Εργοστάσιο', 'Δημόσιο κτίριο', 'Διανομή / αγορά αποθέματος', 'Άλλο'],
      message: 'Το μήνυμά σας',
      file: 'Αρχείο έργου (προαιρετικό)',
      fileHint: 'PDF, DWG, Excel, Word, εικόνα ή ZIP — έως 8 MB',
      submit: 'Αποστολή αιτήματος',
      success: 'Λάβαμε το αίτημά σας. Η ομάδα πωλήσεων θα επικοινωνήσει σύντομα μαζί σας.',
      error: 'Η αποστολή απέτυχε. Δοκιμάστε ξανά ή γράψτε στο info@simseksolar.com.tr.',
      notConfigured: 'Η αποστολή φόρμας δεν έχει ρυθμιστεί ακόμη. Γράψτε στο info@simseksolar.com.tr.',
      fileTooBig: 'Το αρχείο ξεπερνά το όριο των 8 MB. Επισυνάψτε μικρότερο αρχείο ή στείλτε το με e-mail.',
      fileType: 'Ο τύπος αρχείου δεν γίνεται δεκτός. Επισυνάψτε PDF, DWG, DXF, Excel, Word, εικόνα ή ZIP.',
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale];
  return pageMetadata({ locale, path: '/teklif-al', title: c.meta.title, description: c.meta.description });
}

export default async function QuotePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const c = CONTENT[locale];

  return (
    <>
      <PageBreadcrumb items={[{ name: c.crumb, path: '/teklif-al' }]} />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} />
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <QuoteForm labels={c.form} />
      </section>
    </>
  );
}
