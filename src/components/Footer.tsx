import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';

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
            alt={tNav('brand')}
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
            <li><Link href="/about" className="hover:text-white">{t('aboutLink')}</Link></li>
            <li><Link href="/founder" className="hover:text-white">Kurucumuzdan</Link></li>
            <li><Link href="/history" className="hover:text-white">Tarihçe</Link></li>
            <li><Link href="/group-companies" className="hover:text-white">Grup Şirketleri</Link></li>
            <li><Link href="/mission-vision" className="hover:text-white">Misyon & Vizyon</Link></li>
            <li><Link href="/human-resources" className="hover:text-white">İnsan Kaynakları</Link></li>
            <li><Link href="/#referanslar" className="hover:text-white">{tNav('projects')}</Link></li>
            <li><Link href="/resources" className="hover:text-white">{tNav('resources')}</Link></li>
            <li><Link href="/calculator" className="hover:text-white">{tCalc('eyebrow')}</Link></li>
            <li><Link href="/dealers" className="hover:text-white">{t('dealersLink')}</Link></li>
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

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-graphite-300 sm:flex-row">
          <span>© {year} {tNav('brand')}. {t('rights')}</span>
        </div>
      </div>
    </footer>
  );
}
