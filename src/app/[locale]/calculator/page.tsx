import type { Metadata } from 'next';
import { Calculator } from 'lucide-react';
import { PageBreadcrumb } from '@/components/JsonLd';
import { SolarCalculator } from '@/components/SolarCalculator';
import { pageMetadata } from '@/lib/seo';
import { getCalculatorUi } from '@/lib/calculatorUi';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ui = getCalculatorUi(locale);
  return pageMetadata({ locale, path: '/calculator', title: ui.hero.title, description: ui.hero.subtitle });
}

export default async function CalculatorPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const ui = getCalculatorUi(locale);

  return (
    <div className="-mt-20 bg-mist-50">
      <PageBreadcrumb items={[{ name: ui.crumb, path: '/calculator' }]} />

      {/* Koyu başlık bandı — şeffaf header'ın arkasına uzanır */}
      <div className="relative overflow-hidden bg-graphite-950 pb-14 pt-28 text-white sm:pb-16 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-30" aria-hidden />
        <div className="pointer-events-none absolute -start-24 -top-24 h-72 w-72 rounded-full bg-volt-500/15 blur-3xl" aria-hidden />
        <div className="container-page relative flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-volt-500 text-graphite-950">
            <Calculator size={22} strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite-300">{ui.hero.eyebrow}</p>
            <h1 className="mt-2 text-balance font-display type-h2-sm font-bold tracking-tight">{ui.hero.title}</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-graphite-300">{ui.hero.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Araç — banda binen içerik */}
      <div className="container-page relative z-10 -mt-8 pb-20">
        <SolarCalculator labels={ui} />
      </div>
    </div>
  );
}
