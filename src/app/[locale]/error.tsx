'use client';

import { useEffect } from 'react';
import { RotateCcw, Home } from 'lucide-react';

/* Markalı hata sınırı. Bir sayfada beklenmeyen bir hata oluşursa kaba Next
   ekranı yerine bu görünür. reset() segmenti yeniden render etmeyi dener. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Üretimde hata izleme servisine gönderilebilir (ör. Sentry).
    console.error(error);
  }, [error]);

  return (
    <section className="section-pad bg-white">
      <div className="container-page flex flex-col items-center py-16 text-center sm:py-24">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-volt-700">
          Bir şeyler ters gitti
        </p>
        <h1 className="mt-6 max-w-lg text-balance font-display text-2xl font-bold text-graphite-950 sm:text-3xl">
          Sayfa yüklenirken beklenmeyen bir hata oluştu
        </h1>
        <p className="mt-4 max-w-md text-mist-700">
          Lütfen sayfayı yeniden deneyin. Sorun sürerse bizimle iletişime geçebilirsiniz.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-graphite-800"
          >
            <RotateCcw size={16} />
            Yeniden dene
          </button>
          <a
            href="/tr"
            className="inline-flex items-center gap-2 rounded-full border border-graphite-950/15 px-6 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-mist-100"
          >
            <Home size={16} />
            Ana sayfa
          </a>
        </div>
      </div>
    </section>
  );
}
