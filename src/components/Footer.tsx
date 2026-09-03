import type { SVGProps } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SOCIAL } from '@/lib/seo';
import { certificates } from '@/data/certificates';
import type { Locale } from '@/i18n/config';

/* Footer sabit etiketleri — dört dilde (kolon başlıkları, link adları, yasal). */
const FOOTER_UI: Record<
  Locale,
  {
    kurumsal: string;
    urunlerHizmet: string;
    araclar: string;
    tarihce: string;
    grupSirketleri: string;
    kariyer: string;
    referanslar: string;
    satisSonrasi: string;
    blog: string;
    hesaplama: string;
    ilPotansiyeli: string;
    catiUygunluk: string;
    sertifikalar: string;
    surdurulebilirlik: string;
    basin: string;
    bayi: string;
    teklifAl: string;
    kvkk: string;
    gizlilik: string;
    cerez: string;
  }
> = {
  tr: {
    kurumsal: 'Kurumsal', urunlerHizmet: 'Ürünler & Hizmet', araclar: 'Araçlar',
    tarihce: 'Tarihçe', grupSirketleri: 'Grup Şirketleri', kariyer: 'Kariyer',
    referanslar: 'Referanslar', satisSonrasi: 'Satış Sonrası Hizmet', blog: 'Blog',
    hesaplama: 'Hesaplama Aracı', ilPotansiyeli: 'İl Güneş Potansiyeli', catiUygunluk: 'Çatı Uygunluk',
    sertifikalar: 'Sertifikalar', surdurulebilirlik: 'Sürdürülebilirlik', basin: 'Basın Odası', bayi: 'Bayilik', teklifAl: 'Teklif Al',
    kvkk: 'KVKK', gizlilik: 'Gizlilik Politikası', cerez: 'Çerez Politikası',
  },
  en: {
    kurumsal: 'Company', urunlerHizmet: 'Products & Service', araclar: 'Tools',
    tarihce: 'History', grupSirketleri: 'Group Companies', kariyer: 'Careers',
    referanslar: 'References', satisSonrasi: 'After-Sales Service', blog: 'Blog',
    hesaplama: 'Calculator', ilPotansiyeli: 'Solar Potential by Province', catiUygunluk: 'Roof Suitability',
    sertifikalar: 'Certificates', surdurulebilirlik: 'Sustainability', basin: 'Press Room', bayi: 'Become a Dealer', teklifAl: 'Request a Quote',
    kvkk: 'KVKK', gizlilik: 'Privacy Policy', cerez: 'Cookie Policy',
  },
  ar: {
    kurumsal: 'الشركة', urunlerHizmet: 'المنتجات والخدمة', araclar: 'الأدوات',
    tarihce: 'التاريخ', grupSirketleri: 'شركات المجموعة', kariyer: 'الوظائف',
    referanslar: 'المراجع', satisSonrasi: 'خدمة ما بعد البيع', blog: 'المدونة',
    hesaplama: 'أداة الحساب', ilPotansiyeli: 'الإمكان الشمسي حسب المحافظة', catiUygunluk: 'ملاءمة السطح',
    sertifikalar: 'الشهادات', surdurulebilirlik: 'الاستدامة', basin: 'الغرفة الصحفية', bayi: 'كن وكيلاً', teklifAl: 'اطلب عرض سعر',
    kvkk: 'KVKK', gizlilik: 'سياسة الخصوصية', cerez: 'سياسة ملفات الارتباط',
  },
  el: {
    kurumsal: 'Εταιρεία', urunlerHizmet: 'Προϊόντα & Υπηρεσία', araclar: 'Εργαλεία',
    tarihce: 'Ιστορία', grupSirketleri: 'Εταιρείες Ομίλου', kariyer: 'Καριέρα',
    referanslar: 'Έργα Αναφοράς', satisSonrasi: 'Υποστήριξη Μετά την Πώληση', blog: 'Ιστολόγιο',
    hesaplama: 'Υπολογιστής', ilPotansiyeli: 'Ηλιακό Δυναμικό ανά Επαρχία', catiUygunluk: 'Καταλληλότητα Στέγης',
    sertifikalar: 'Πιστοποιητικά', surdurulebilirlik: 'Βιωσιμότητα', basin: 'Γραφείο Τύπου', bayi: 'Αντιπροσωπεία', teklifAl: 'Ζητήστε Προσφορά',
    kvkk: 'KVKK', gizlilik: 'Πολιτική Απορρήτου', cerez: 'Πολιτική Cookies',
  },
};

/* Marka ikonları — lucide brand ikonlarını kaldırdığı için inline SVG. */
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 9h2.5l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3C16.7.2 15.8.1 14.7.1 12.3.1 10.7 1.6 10.7 4.2V6H8v3h2.7v8H14V9z" />
    </svg>
  );
}
function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.56-2.3 3.2V21h-4V9z" />
    </svg>
  );
}

const socialLinks = [
  { href: SOCIAL.instagram, icon: InstagramIcon, label: 'Instagram' },
  { href: SOCIAL.facebook, icon: FacebookIcon, label: 'Facebook' },
  { href: SOCIAL.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
];

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');
  const locale = useLocale() as Locale;
  const f = FOOTER_UI[locale] ?? FOOTER_UI.tr;
  const year = new Date().getFullYear();

  const legalLinks = [
    { href: '/kvkk', label: f.kvkk },
    { href: '/gizlilik', label: f.gizlilik },
    { href: '/cerez-politikasi', label: f.cerez },
  ];

  return (
    <footer className="bg-graphite-gradient text-graphite-100">
      <div className="container-page grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.3fr)] lg:py-20">
        <div>
          <Image
            src="/brand/simsek-solar-white.png"
            alt={`${tNav('brand')} logo`}
            width={600}
            height={180}
            className="h-12 w-auto object-contain object-left rtl:object-right"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-graphite-200">{t('tagline')}</p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-volt-400">
            {f.kurumsal}
          </h3>
          <ul className="footer-links mt-3 space-y-0.5 text-sm text-graphite-200">
            <li><Link href="/about" className="hover:text-white">{t('aboutLink')}</Link></li>
            {/* Sertifikalar yalnızca verisi girildiğinde linklenir; boş sayfaya
                yönlendirmemek için (o hâldeyken sayfa noindex). */}
            {certificates.length > 0 && (
              <li><Link href="/sertifikalar" className="hover:text-white">{f.sertifikalar}</Link></li>
            )}
            <li><Link href="/history" className="hover:text-white">{f.tarihce}</Link></li>
            {/* ISO 500 sanayi kuruluşlarının sitelerinde ana menü düzeyinde
                standart olan iki başlık. */}
            <li><Link href="/surdurulebilirlik" className="hover:text-white">{f.surdurulebilirlik}</Link></li>
            <li><Link href="/basin" className="hover:text-white">{f.basin}</Link></li>
            {/* /kariyer, next.config.mjs'te /contact#kariyer'e yönlenir —
                aranabilir bir adres olsun diye (tekrar içerik yazılmaz). */}
            <li><Link href="/kariyer" className="hover:text-white">{f.kariyer}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-volt-400">
            {f.urunlerHizmet}
          </h3>
          <ul className="footer-links mt-3 space-y-0.5 text-sm text-graphite-200">
            <li><Link href="/products" className="hover:text-white">{tNav('products')}</Link></li>
            <li><Link href="/projects" className="hover:text-white">{f.referanslar}</Link></li>
            <li><Link href="/bayi" className="hover:text-white">{f.bayi}</Link></li>
            <li><Link href="/contact#servis" className="hover:text-white">{f.satisSonrasi}</Link></li>
            <li><Link href="/blog" className="hover:text-white">{f.blog}</Link></li>
            {/* Dönüşüm bağlantısı vurgulu — footer'da da teklif yolu açık kalsın. */}
            <li>
              <Link href="/teklif-al" className="font-semibold text-volt-400 hover:text-volt-300">
                {f.teklifAl} →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-volt-400">
            {f.araclar}
          </h3>
          <ul className="footer-links mt-3 space-y-0.5 text-sm text-graphite-200">
            <li><Link href="/akademi" className="hover:text-white">{tNav('academy')}</Link></li>
            <li><Link href="/calculator" className="hover:text-white">{f.hesaplama}</Link></li>
            <li><Link href="/gunes-potansiyeli" className="hover:text-white">{f.ilPotansiyeli}</Link></li>
            <li><Link href="/gunes-potansiyeli#cati" className="hover:text-white">{f.catiUygunluk}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-volt-400">
            {t('contactTitle')}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-graphite-200">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-volt-400" />
              <span>{tContact('info.address')}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-volt-400" />
              <span dir="ltr">{tContact('info.phone')}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-volt-400" />
              <span dir="ltr">{tContact('info.email')}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Sosyal medya + yasal */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-graphite-200 transition-colors hover:border-volt-400 hover:text-white"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <nav className="footer-links flex flex-wrap items-center gap-x-5 text-xs text-graphite-300">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-graphite-300 sm:flex-row">
          <span>© {year} {tNav('brand')}. {t('rights')}</span>
        </div>
      </div>
    </footer>
  );
}
