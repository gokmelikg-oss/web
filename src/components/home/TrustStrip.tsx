import { Building2 } from 'lucide-react';

/* Kurumsal referans alanlarımız — gerçek proje segmentlerinden. Firma adı değil,
   kurum/segment türleri (güven şeridi). Sonsuz kayan marquee; iki kopya yan yana
   dizilir, %50 kayma ile kesintisiz döner. */
const SEGMENTS = [
  'TOKİ Toplu Konut Projeleri',
  'AFAD Deprem Konutları',
  'Milli Savunma Bakanlığı',
  'Adalet Bakanlığı',
  'Hastaneler',
  'Öğrenci Yurtları',
  'Askeri Tesisler',
  'Oteller & Turizm',
  'Kamu Kampüsleri',
  'Belediye Projeleri',
];

export function TrustStrip() {
  return (
    <section className="border-y border-mist-900/8 bg-white py-8" aria-label="Kurumsal referans alanları">
      <div className="container-page">
        <p className="text-center font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-mist-500">
          30 yılı aşkın süredir tercih edilen kurumlar ve proje türleri
        </p>
      </div>

      {/* Kenarlarda yumuşak solma maskesi */}
      <div
        className="marquee-paused group relative mt-5 overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="animate-marquee flex w-max items-center gap-3 pe-3">
          {[...SEGMENTS, ...SEGMENTS].map((label, i) => (
            <span
              key={i}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-mist-900/10 bg-mist-50 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-graphite-800"
            >
              <Building2 size={14} className="shrink-0 text-volt-600" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
