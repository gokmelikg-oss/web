import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { PageBreadcrumb } from '@/components/JsonLd';
import { DealerFinder, type DealerFinderLabels } from '@/components/DealerFinder';
import { pageMetadata } from '@/lib/seo';
import { dealers } from '@/data/dealers';
import type { Locale } from '@/i18n/config';

/* BAYİ BUL — /bayi-bul
   ====================
   `/bayi` (bayi OLMAK isteyen firmalar için) ile karıştırılmamalı.
   Bu sayfa MÜŞTERİ içindir: "benim ilimde kimden alırım?"

   ⚠ Bayi listesi boşken de sayfa indekslenir ve yayında kalır — çünkü
   içeriği boş DEĞİLDİR: ziyaretçi ilini seçtiğinde o ilde teslim ettiğimiz
   proje sayısını görür ve doğrudan fabrikaya yönlendirilir. Diğer boş veri
   sayfalarından (ör. /sertifikalar) farkı budur; orada veri yoksa sayfada
   gerçekten hiçbir şey kalmaz, burada akış çalışmaya devam eder. */

interface PageText {
  crumb: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  labels: DealerFinderLabels;
  meta: { title: string; description: string };
}

const UI: Record<Locale, PageText> = {
  tr: {
    crumb: 'Bayi Bul',
    eyebrow: 'Bayi Ağı',
    title: 'Bölgenizdeki satış noktasını bulun',
    subtitle:
      'İlinizi seçin: bölgenizdeki bayimizi, orada teslim ettiğimiz proje sayısını ve doğrudan fabrikadan destek seçeneğini görün.',
    labels: {
      selectLabel: 'İl seçin',
      selectPlaceholder: 'İlinizi seçin…',
      found: 'Bölgenizde {n} satış noktası',
      noDealer: '{il} için henüz bayimiz yok',
      noDealerBody:
        'Bu bölgede doğrudan fabrikadan hizmet veriyoruz — teklif, teknik destek ve sevkiyat için bize yazın. Bölgenizde bayilik almak isterseniz başvuru sayfamız açık.',
      projectsHere: '{il} ilinde bugüne kadar {n} proje teslim ettik.',
      projectsNone: '{il} ilinde henüz tamamlanmış projemiz yok; ilk işiniz olalım.',
      contactFactory: 'Fabrikadan teklif alın',
      becomeDealer: 'Bayilik başvurusu',
      emptyStateTitle:
        'Bayi listemiz güncelleniyor. Bu süreçte tüm talepler doğrudan fabrikadan karşılanmaktadır.',
      emptyStateBody: 'Listeden ilinizi seçtiğinizde bölgenizdeki durum görünecek.',
      callFactory: 'İletişime geçin',
    },
    meta: {
      title: 'Bayi Bul',
      description:
        'İlinizi seçin, bölgenizdeki Şimşek Solar satış noktasını görün. Bayimiz olmayan illerde doğrudan fabrikadan teklif ve teknik destek alabilirsiniz.',
    },
  },
  en: {
    crumb: 'Find a Dealer',
    eyebrow: 'Dealer Network',
    title: 'Find your local point of sale',
    subtitle:
      'Select your province to see our dealer in your region, how many projects we have delivered there, and the option of direct factory support.',
    labels: {
      selectLabel: 'Select a province',
      selectPlaceholder: 'Choose your province…',
      found: '{n} point(s) of sale in your region',
      noDealer: 'No dealer in {il} yet',
      noDealerBody:
        'We serve this region directly from the factory — write to us for quotations, technical support and shipping. If you would like to become our dealer in this region, our application page is open.',
      projectsHere: 'We have delivered {n} project(s) in {il} so far.',
      projectsNone: 'We have no completed project in {il} yet — let yours be the first.',
      contactFactory: 'Get a factory quote',
      becomeDealer: 'Dealer application',
      emptyStateTitle:
        'Our dealer list is being updated. In the meantime all requests are handled directly by the factory.',
      emptyStateBody: 'Select your province from the list to see the situation in your region.',
      callFactory: 'Contact us',
    },
    meta: {
      title: 'Find a Dealer',
      description:
        'Select your province to see your local Şimşek Solar point of sale. Where we have no dealer yet, you can get a quote and technical support directly from the factory.',
    },
  },
  ar: {
    crumb: 'ابحث عن وكيل',
    eyebrow: 'شبكة الوكلاء',
    title: 'اعثروا على نقطة البيع في منطقتكم',
    subtitle:
      'اختاروا محافظتكم لتروا وكيلنا في منطقتكم، وعدد المشاريع التي سلّمناها هناك، وخيار الدعم المباشر من المصنع.',
    labels: {
      selectLabel: 'اختاروا المحافظة',
      selectPlaceholder: 'اختاروا محافظتكم…',
      found: '{n} نقطة بيع في منطقتكم',
      noDealer: 'لا يوجد وكيل في {il} بعد',
      noDealerBody:
        'نخدم هذه المنطقة مباشرةً من المصنع — راسلونا لعروض الأسعار والدعم الفني والشحن. وإن رغبتم في أن تكونوا وكلاءنا في هذه المنطقة، فصفحة التقديم متاحة.',
      projectsHere: 'سلّمنا حتى الآن {n} مشروعاً في {il}.',
      projectsNone: 'لا يوجد لدينا مشروع منجز في {il} بعد — ليكن مشروعكم الأول.',
      contactFactory: 'اطلبوا عرضاً من المصنع',
      becomeDealer: 'طلب وكالة',
      emptyStateTitle: 'قائمة وكلائنا قيد التحديث. وتُلبّى جميع الطلبات حالياً مباشرةً من المصنع.',
      emptyStateBody: 'اختاروا محافظتكم من القائمة لعرض الوضع في منطقتكم.',
      callFactory: 'تواصلوا معنا',
    },
    meta: {
      title: 'ابحث عن وكيل',
      description:
        'اختاروا محافظتكم لعرض نقطة بيع شيمشك سولار القريبة منكم. وفي المحافظات التي لا وكيل لنا فيها، يمكنكم الحصول على عرض ودعم فني مباشرةً من المصنع.',
    },
  },
  el: {
    crumb: 'Βρείτε Αντιπρόσωπο',
    eyebrow: 'Δίκτυο Αντιπροσώπων',
    title: 'Βρείτε το σημείο πώλησης στην περιοχή σας',
    subtitle:
      'Επιλέξτε τον νομό σας για να δείτε τον αντιπρόσωπό μας, πόσα έργα έχουμε παραδώσει εκεί και τη δυνατότητα απευθείας υποστήριξης από το εργοστάσιο.',
    labels: {
      selectLabel: 'Επιλέξτε νομό',
      selectPlaceholder: 'Επιλέξτε τον νομό σας…',
      found: '{n} σημείο(-α) πώλησης στην περιοχή σας',
      noDealer: 'Δεν υπάρχει ακόμη αντιπρόσωπος στον νομό {il}',
      noDealerBody:
        'Εξυπηρετούμε την περιοχή απευθείας από το εργοστάσιο — γράψτε μας για προσφορές, τεχνική υποστήριξη και αποστολή. Αν θέλετε να γίνετε αντιπρόσωπός μας, η σελίδα αιτήσεων είναι ανοιχτή.',
      projectsHere: 'Έχουμε παραδώσει {n} έργο(-α) στον νομό {il} μέχρι σήμερα.',
      projectsNone: 'Δεν έχουμε ακόμη ολοκληρωμένο έργο στον νομό {il} — ας είναι το δικό σας το πρώτο.',
      contactFactory: 'Ζητήστε προσφορά',
      becomeDealer: 'Αίτηση αντιπροσωπείας',
      emptyStateTitle:
        'Η λίστα αντιπροσώπων ενημερώνεται. Στο μεταξύ όλα τα αιτήματα εξυπηρετούνται απευθείας από το εργοστάσιο.',
      emptyStateBody: 'Επιλέξτε τον νομό σας από τη λίστα για να δείτε την κατάσταση στην περιοχή σας.',
      callFactory: 'Επικοινωνήστε',
    },
    meta: {
      title: 'Βρείτε Αντιπρόσωπο',
      description:
        'Επιλέξτε τον νομό σας για να δείτε το τοπικό σημείο πώλησης Şimşek Solar. Όπου δεν υπάρχει αντιπρόσωπος, λαμβάνετε προσφορά και υποστήριξη απευθείας από το εργοστάσιο.',
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const ui = UI[locale] ?? UI.tr;
  return pageMetadata({
    locale,
    path: '/bayi-bul',
    title: ui.meta.title,
    description: ui.meta.description,
  });
}

export default async function DealerFinderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const ui = UI[locale] ?? UI.tr;
  void dealers; // liste boşken de sayfa çalışır — gerekçe dosya başında

  return (
    <>
      <PageBreadcrumb items={[{ name: ui.crumb, path: '/bayi-bul' }]} />
      <PageHero eyebrow={ui.eyebrow} title={ui.title} subtitle={ui.subtitle} />

      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <Reveal>
            <DealerFinder labels={ui.labels} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
