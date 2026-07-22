import { getTranslations } from 'next-intl/server';
import { Calculator } from 'lucide-react';
import { CALC_EMBED_URL } from '@/data/config';

export default async function CalculatorPage() {
  const t = await getTranslations('calculator');

  if (!CALC_EMBED_URL) {
    return (
      <section className="-mt-20 bg-graphite-950 pb-24 pt-40">
        <div className="container-page">
          <div className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-dashed border-white/15 bg-white/[0.04] px-8 py-16 text-center text-white">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-volt-500 text-graphite-950">
              <Calculator size={26} strokeWidth={1.75} />
            </span>
            <h2 className="mt-5 font-display text-xl font-bold">{t('soonTitle')}</h2>
            <p className="mt-2 text-sm leading-relaxed text-graphite-300">{t('soonBody')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    /* Araç, header'ın altında kalan tüm ekranı kaplar. Üstteki koyu şerit,
       -mt-20/pt-20 ile şeffaf header'ın arkasına uzanır; böylece beyaz logo
       görünür ve araç sayfayla bütünleşir. */
    <div className="-mt-20 flex h-screen flex-col bg-white">
      <div className="bg-graphite-950 pt-20 text-white">
        <div className="container-page flex items-center gap-3 py-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-volt-500 text-graphite-950">
            <Calculator size={18} strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <h1 className="font-display text-base font-bold leading-tight">{t('title')}</h1>
            <p className="hidden truncate text-xs text-graphite-300 sm:block">{t('subtitle')}</p>
          </div>
        </div>
      </div>
      <iframe
        src={CALC_EMBED_URL}
        title={t('title')}
        className="w-full flex-1 border-0"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}
