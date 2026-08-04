import type { SVGProps } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SOCIAL } from '@/lib/seo';

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

const legalLinks = [
  { href: '/kvkk', label: 'KVKK' },
  { href: '/gizlilik', label: 'Gizlilik Politikası' },
  { href: '/cerez-politikasi', label: 'Çerez Politikası' },
];

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');
  const tCatalog = useTranslations('catalog');
  const tCalc = useTranslations('calculator');
  const families = tCatalog.raw('families') as { id: string; title: string }[];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-graphite-gradient text-graphite-100">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
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
            {t('linksTitle')}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-graphite-200">
            <li><Link href="/founder" className="hover:text-white">Kurucumuzdan</Link></li>
            <li><Link href="/about#grup-sirketleri" className="hover:text-white">Grup Şirketleri</Link></li>
            <li><Link href="/about" className="hover:text-white">{t('aboutLink')}</Link></li>
            <li><Link href="/history" className="hover:text-white">Tarihçe</Link></li>
            <li><Link href="/contact#kariyer" className="hover:text-white">Kariyer</Link></li>
            <li><Link href="/projects" className="hover:text-white">{tNav('projects')}</Link></li>
            <li><Link href="/resources" className="hover:text-white">{tNav('resources')}</Link></li>
            <li><Link href="/calculator" className="hover:text-white">{tCalc('eyebrow')}</Link></li>
            <li><Link href="/gunes-potansiyeli" className="hover:text-white">Güneş Potansiyeli</Link></li>
            <li><Link href="/service" className="hover:text-white">Satış Sonrası Hizmet</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/contact#bayilik" className="hover:text-white">{t('dealersLink')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-volt-400">
            {t('productsTitle')}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-graphite-200">
            {families.map((f) => (
              <li key={f.id}>
                <Link href={`/products#${f.id}`} className="hover:text-white">
                  {f.title}
                </Link>
              </li>
            ))}
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-graphite-200 transition-colors hover:border-volt-400 hover:text-white"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-graphite-300">
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
