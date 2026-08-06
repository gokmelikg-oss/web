import type { Locale } from '@/i18n/config';

/* Blog sayfalarının arayüz metinleri (başlık, etiketler) ve tarih biçimi — dört dilde. */
export interface BlogUi {
  crumb: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  readMore: string;
  minRead: string; // "dk" / "min read"
  otherPosts: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  intlLocale: string;
  metaTitle: string;
  metaDescription: string;
}

export const BLOG_UI: Record<Locale, BlogUi> = {
  tr: {
    crumb: 'Blog',
    heroEyebrow: 'Blog & Bilgi Merkezi',
    heroTitle: 'Güneş enerjisinde bilgi ve rehberler',
    heroSubtitle:
      'Termal sistemlerin çalışma prensibinden boyler seçimine, merkezi sistemlerden bakıma kadar merak edilenleri uzman gözüyle anlatıyoruz.',
    readMore: 'Devamını oku',
    minRead: 'dk',
    otherPosts: 'Diğer yazılar',
    ctaTitle: 'Projeniz için çözüm mü arıyorsunuz?',
    ctaBody: 'Mühendislik ekibimiz doğru sistemi birlikte belirleyelim.',
    ctaButton: 'İletişime geç',
    intlLocale: 'tr-TR',
    metaTitle: 'Blog & Bilgi Merkezi — Güneş Enerjisi Rehberleri',
    metaDescription:
      'Güneş enerjisi, termal sistemler, boyler seçimi, merkezi sistemler ve bakım hakkında uzman rehberler. Şimşek Solar bilgi merkezi.',
  },
  en: {
    crumb: 'Blog',
    heroEyebrow: 'Blog & Knowledge Center',
    heroTitle: 'Knowledge and guides in solar energy',
    heroSubtitle:
      'From the working principle of thermal systems to boiler selection, from central systems to maintenance, we explain the essentials through an expert lens.',
    readMore: 'Read more',
    minRead: 'min read',
    otherPosts: 'Other posts',
    ctaTitle: 'Looking for a solution for your project?',
    ctaBody: 'Let our engineering team determine the right system together with you.',
    ctaButton: 'Get in touch',
    intlLocale: 'en-US',
    metaTitle: 'Blog & Knowledge Center — Solar Energy Guides',
    metaDescription:
      'Expert guides on solar energy, thermal systems, boiler selection, central systems and maintenance. The Şimşek Solar knowledge center.',
  },
  ar: {
    crumb: 'المدونة',
    heroEyebrow: 'المدونة ومركز المعرفة',
    heroTitle: 'معرفة وأدلة في الطاقة الشمسية',
    heroSubtitle:
      'من مبدأ عمل الأنظمة الحرارية إلى اختيار الخزان، ومن الأنظمة المركزية إلى الصيانة، نشرح الأساسيات بعين الخبير.',
    readMore: 'اقرأ المزيد',
    minRead: 'دقيقة',
    otherPosts: 'مقالات أخرى',
    ctaTitle: 'هل تبحثون عن حل لمشروعكم؟',
    ctaBody: 'دعوا فريقنا الهندسي يحدّد النظام المناسب معكم.',
    ctaButton: 'تواصلوا معنا',
    intlLocale: 'ar-EG',
    metaTitle: 'المدونة ومركز المعرفة — أدلة الطاقة الشمسية',
    metaDescription:
      'أدلة متخصصة حول الطاقة الشمسية والأنظمة الحرارية واختيار الخزان والأنظمة المركزية والصيانة. مركز المعرفة في شمشك سولار.',
  },
  el: {
    crumb: 'Ιστολόγιο',
    heroEyebrow: 'Ιστολόγιο & Κέντρο Γνώσης',
    heroTitle: 'Γνώση και οδηγοί στην ηλιακή ενέργεια',
    heroSubtitle:
      'Από την αρχή λειτουργίας των θερμικών συστημάτων έως την επιλογή μπόιλερ, από τα κεντρικά συστήματα έως τη συντήρηση, εξηγούμε τα βασικά με το μάτι του ειδικού.',
    readMore: 'Διαβάστε περισσότερα',
    minRead: 'λεπτά',
    otherPosts: 'Άλλα άρθρα',
    ctaTitle: 'Ψάχνετε λύση για το έργο σας;',
    ctaBody: 'Ας καθορίσει η ομάδα μηχανικής μας το σωστό σύστημα μαζί σας.',
    ctaButton: 'Επικοινωνήστε',
    intlLocale: 'el-GR',
    metaTitle: 'Ιστολόγιο & Κέντρο Γνώσης — Οδηγοί Ηλιακής Ενέργειας',
    metaDescription:
      'Οδηγοί ειδικών για την ηλιακή ενέργεια, τα θερμικά συστήματα, την επιλογή μπόιλερ, τα κεντρικά συστήματα και τη συντήρηση. Το κέντρο γνώσης της Şimşek Solar.',
  },
};

export function getBlogUi(locale: string): BlogUi {
  return BLOG_UI[locale as Locale] ?? BLOG_UI.tr;
}
