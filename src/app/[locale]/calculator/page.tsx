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
    <div className="-mt-20 flex min-h-screen flex-col bg-mist-50">
      {/* Koyu başlık bandı — şeffaf header'ın arkasına uzanır, nefes payı bırakır */}
      <div className="relative overflow-hidden bg-graphite-950 pb-10 pt-28 text-white sm:pb-12 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-30" aria-hidden />
        <div
          className="pointer-events-none absolute -start-24 -top-24 h-72 w-72 rounded-full bg-volt-500/15 blur-3xl"
          aria-hidden
        />
        <div className="container-page relative flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-volt-500 text-graphite-950">
            <Calculator size={22} strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-400">
              {t('eyebrow')}
            </p>
            <h1 className="mt-2 text-balance font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {t('title')}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-graphite-300">{t('subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Araç, banda binen kart içinde — sayfayla bütünleşir */}
      <div className="container-page relative z-10 -mt-6 flex-1 pb-16">
        <div className="h-full overflow-hidden rounded-3xl border border-mist-900/10 bg-white shadow-card">
          <iframe
            src={CALC_EMBED_URL}
            title={t('title')}
            className="h-[78vh] min-h-[560px] w-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
