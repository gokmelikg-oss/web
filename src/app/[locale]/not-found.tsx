import { Home, Package, Phone } from 'lucide-react';

/* Markalı 404 sayfası. [locale] segmenti içinde render olur → Header/Footer korunur.
   Middleware her rotayı locale ile öneklediğinden bulunamayan tüm URL'ler buraya düşer.
   not-found params almadığından metin TR (varsayılan dil) olarak sabittir. */
export default function NotFound() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page flex flex-col items-center py-16 text-center sm:py-24">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-volt-700">
          Sayfa bulunamadı
        </p>
        <p className="mt-6 font-display text-7xl font-bold leading-none text-graphite-950 sm:text-8xl">
          404
        </p>
        <h1 className="mt-6 max-w-lg text-balance font-display text-2xl font-bold text-graphite-950 sm:text-3xl">
          Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
        </h1>
        <p className="mt-4 max-w-md text-mist-700">
          Bağlantı hatalı olabilir. Aşağıdaki bölümlerden devam edebilir ya da bizimle iletişime
          geçebilirsiniz.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/tr"
            className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-graphite-800"
          >
            <Home size={16} />
            Ana sayfa
          </a>
          <a
            href="/tr/products"
            className="inline-flex items-center gap-2 rounded-full border border-graphite-950/15 px-6 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-mist-100"
          >
            <Package size={16} />
            Ürünler
          </a>
          <a
            href="/tr/contact"
            className="inline-flex items-center gap-2 rounded-full border border-graphite-950/15 px-6 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-mist-100"
          >
            <Phone size={16} />
            İletişim
          </a>
        </div>
      </div>
    </section>
  );
}
