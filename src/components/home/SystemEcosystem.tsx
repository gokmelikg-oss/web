import { Sun, Droplets, Layers, Cable, Cpu, Flame, Building2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

/* "Nasıl Çalışır" — güneş termal sistemin bileşenlerini merkezdeki yapı etrafında
   yörünge düzeninde gösteren ekosistem şeması. Masaüstünde orbital, mobilde ızgara. */
const NODES = [
  { label: 'Güneş Kollektörü', desc: 'Güneşi ısıya çevirir', Icon: Sun, accent: '#f6bc32', x: 50, y: 4 },
  { label: 'Sehpa & Montaj', desc: 'Çatıya güvenle sabitler', Icon: Layers, accent: '#4ba7ff', x: 89, y: 28 },
  { label: 'Otomasyon', desc: 'Akıllı kontrol & izleme', Icon: Cpu, accent: '#8b9be0', x: 89, y: 72 },
  { label: 'Emayeli Boyler', desc: 'Sıcak suyu depolar', Icon: Droplets, accent: '#22c9e6', x: 50, y: 96 },
  { label: 'Bağlantı & Sıvı', desc: 'Isıyı sisteme taşır', Icon: Cable, accent: '#22c98b', x: 11, y: 72 },
  { label: 'Destek Isıtma', desc: 'Güneşsiz günlerde devrede', Icon: Flame, accent: '#f97316', x: 11, y: 28 },
];

export function SystemEcosystem() {
  return (
    <section id="nasil-calisir" className="section-pad scroll-mt-20 bg-mist-50">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
              <span className="h-px w-8 bg-volt-500" aria-hidden />
              Sistem Nasıl Çalışır
              <span className="h-px w-8 bg-volt-500" aria-hidden />
            </p>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
              Güneşten musluğa, uçtan uca tek sistem
            </h2>
            <p className="mt-4 text-balance leading-relaxed text-mist-700">
              Her bileşen birbirini tamamlar: kollektör güneşi toplar, boyler ısıyı depolar, otomasyon
              yönetir; hepsi yapınıza kesintisiz sıcak su üretmek için birlikte çalışır.
            </p>
          </div>
        </Reveal>

        {/* Masaüstü — orbital şema */}
        <Reveal delay={0.05}>
          <div className="relative mx-auto mt-16 hidden aspect-square max-w-2xl lg:block">
            {/* Bağlantı çizgileri */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
              {NODES.map((n) => (
                <line
                  key={n.label}
                  x1="50"
                  y1="50"
                  x2={n.x}
                  y2={n.y}
                  stroke="#c7d0df"
                  strokeWidth="0.35"
                  strokeDasharray="1.4 1.4"
                />
              ))}
            </svg>

            {/* Merkez — yapı */}
            <div className="absolute left-1/2 top-1/2 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-volt-500/30 bg-white p-6 text-center shadow-card">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-volt-500 text-graphite-950">
                <Building2 size={26} strokeWidth={1.8} />
              </span>
              <p className="mt-3 text-sm font-bold leading-snug text-graphite-950">
                Yapınıza kesintisiz sıcak su
              </p>
            </div>

            {/* Düğümler */}
            {NODES.map((n) => (
              <div
                key={n.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <div className="group flex w-36 flex-col items-center rounded-2xl border border-mist-900/10 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-volt-500/40 hover:shadow-card">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm"
                    style={{ backgroundColor: n.accent }}
                  >
                    <n.Icon size={20} strokeWidth={1.85} />
                  </span>
                  <h3 className="mt-3 font-display text-sm font-bold leading-tight text-graphite-950">{n.label}</h3>
                  <p className="mt-1 text-[11px] leading-snug text-mist-600">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Mobil — merkez + ızgara */}
        <div className="mt-12 lg:hidden">
          <Reveal>
            <div className="mx-auto mb-5 flex max-w-xs items-center gap-3 rounded-2xl border border-volt-500/30 bg-white p-4 shadow-card">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-500 text-graphite-950">
                <Building2 size={20} strokeWidth={1.8} />
              </span>
              <p className="text-sm font-bold leading-snug text-graphite-950">Yapınıza kesintisiz sıcak su</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {NODES.map((n, i) => (
              <Reveal key={n.label} delay={i * 0.05}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-mist-900/10 bg-white p-4 text-center">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: n.accent }}
                  >
                    <n.Icon size={20} strokeWidth={1.85} />
                  </span>
                  <h3 className="mt-3 font-display text-sm font-bold leading-tight text-graphite-950">{n.label}</h3>
                  <p className="mt-1 text-[11px] leading-snug text-mist-600">{n.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
