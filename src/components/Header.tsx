'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Menu, X, Sparkles, ChevronRight, ChevronDown } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

/* Consolidated nav: one-page anchors on home + standalone pages. */
const navItems = [
  { href: '/products', key: 'products' },
  { href: '/projects', key: 'projects' },
  { href: '/resources', key: 'resources' },
  { href: '/calculator', key: 'calculator' },
  { href: '/contact', key: 'contact' },
] as const;

/* Kurumsal alt menüsü (şimdilik Türkçe; diğer diller sonra). */
const corporateItems = [
  { href: '/founder', label: 'Kurucumuzdan' },
  { href: '/group-companies', label: 'Grup Şirketleri' },
  { href: '/about', label: 'Hakkımızda' },
  { href: '/history', label: 'Tarihçe' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [corpOpen, setCorpOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCorpOpen(false);
  }, [pathname]);

  /* Over the dark cinematic hero the header is transparent with white
     assets; once scrolled it becomes a light glass bar. */
  const dark = !scrolled && !mobileOpen;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/85 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label={t('brand')}>
          <Image
            src={dark ? '/brand/simsek-solar-white.png' : '/brand/simsek-solar.png'}
            alt={t('brand')}
            width={499}
            height={129}
            priority
            className="h-9 w-auto object-contain sm:h-10"
          />
        </Link>

        <nav className="hidden min-w-0 items-center gap-6 lg:flex xl:gap-8">
          {/* Kurumsal dropdown */}
          <div className="relative" onMouseEnter={() => setCorpOpen(true)} onMouseLeave={() => setCorpOpen(false)}>
            <button
              type="button"
              onClick={() => setCorpOpen((v) => !v)}
              aria-expanded={corpOpen}
              className={`flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors ${
                dark ? 'text-white/80 hover:text-white' : 'text-graphite-900/80 hover:text-graphite-700'
              }`}
            >
              Kurumsal
              <ChevronDown size={14} className={`transition-transform ${corpOpen ? 'rotate-180' : ''}`} />
            </button>
            {corpOpen && (
              <div className="absolute start-0 top-full w-52 pt-3">
                <div className="overflow-hidden rounded-2xl border border-graphite-700/10 bg-white p-1.5 shadow-xl">
                  {corporateItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-graphite-900 transition-colors hover:bg-mist-50 hover:text-volt-700"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`whitespace-nowrap text-sm font-medium transition-colors ${
                dark ? 'text-white/80 hover:text-white' : 'text-graphite-900/80 hover:text-graphite-700'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          <Link
            href="/ai"
            aria-label="şimşek.ai"
            className={`group flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-sm font-semibold transition-colors xl:px-3.5 ${
              dark
                ? 'border-white/25 bg-white/10 text-white hover:border-volt-400'
                : 'border-graphite-700/20 bg-white text-graphite-900 hover:border-volt-500'
            }`}
          >
            <Sparkles size={14} className="shrink-0 text-volt-500" />
            <span className="hidden font-mono text-[13px] tracking-tight xl:inline">
              şimşek<span className="text-volt-500">.ai</span>
            </span>
            <ChevronRight
              size={14}
              className={`hidden shrink-0 transition-transform group-hover:translate-x-0.5 xl:inline rtl:group-hover:-translate-x-0.5 rtl:rotate-180 ${
                dark ? 'text-white/60' : 'text-graphite-400'
              }`}
            />
          </Link>
          <LanguageSwitcher dark={dark} />
          <Link
            href="/contact"
            className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.03] xl:px-5 ${
              dark
                ? 'bg-solar-gradient text-graphite-900 shadow-glow'
                : 'bg-graphite-700 text-white hover:bg-graphite-800'
            }`}
          >
            {t('getQuote')}
          </Link>
        </div>

        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
            dark ? 'text-white' : 'text-graphite-900'
          }`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-graphite-700/10 bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            <p className="px-3 pt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-mist-500">
              Kurumsal
            </p>
            {corporateItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-graphite-900 hover:bg-graphite-100"
              >
                {item.label}
              </Link>
            ))}
            <div className="my-1 h-px bg-graphite-700/10" aria-hidden />
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-graphite-900 hover:bg-graphite-100"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/ai"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-graphite-900 hover:bg-graphite-100"
            >
              <Sparkles size={16} className="text-volt-600" />
              <span className="font-mono">
                şimşek<span className="text-volt-600">.ai</span>
              </span>
            </Link>
            <div className="mt-2 flex items-center justify-between px-3">
              <LanguageSwitcher />
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-graphite-700 px-5 py-2.5 text-sm font-semibold text-white"
              >
                {t('getQuote')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
