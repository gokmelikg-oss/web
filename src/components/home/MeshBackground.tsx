/* Premium, yumuşak ve dokulu mesh arka planı — koyu lacivert zeminde soft
   şampanya/altın ve dumanlı mavi tonları. Düşük satürasyon (elit his) + ince
   film grain dokusu. Saf CSS/SVG; hareket sakin ve akışkan. */
const blobs = [
  // Sol kenar
  { color: 'rgba(228,198,138,0.55)', size: '48%', top: '2%', left: '-14%', anim: 'mesh-a', dur: '17s' },
  { color: 'rgba(236,216,178,0.42)', size: '40%', top: '46%', left: '-10%', anim: 'mesh-d', dur: '15s' },
  // Orta
  { color: 'rgba(78,102,158,0.52)', size: '52%', top: '22%', left: '30%', anim: 'mesh-b', dur: '19s' },
  // Sağ kenar
  { color: 'rgba(210,180,128,0.48)', size: '46%', top: '4%', left: '66%', anim: 'mesh-c', dur: '21s' },
  { color: 'rgba(90,116,176,0.42)', size: '40%', top: '48%', left: '72%', anim: 'mesh-a', dur: '18s' },
] as const;

/* İnce film grain — feTurbulence ile üretilen doku. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function MeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Yavaş dönen yumuşak parıltı */}
      <div
        className="absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(224,196,138,0.16), transparent 32%, rgba(74,96,150,0.16) 58%, transparent 82%, rgba(224,196,138,0.16))',
          filter: 'blur(80px)',
          animation: 'mesh-spin 46s linear infinite',
        }}
      />

      {/* Akışkan yumuşak lekeler */}
      {blobs.map((b, i) => (
        <span
          key={i}
          className="mesh-blob"
          style={{
            background: b.color,
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            filter: 'blur(64px)',
            animation: `${b.anim} ${b.dur} linear infinite`,
          }}
        />
      ))}

      {/* Yazı kontrastı için koyu perde (hafifletildi — hareket görünür olsun) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(125% 88% at 50% 46%, rgba(10,15,34,0.34) 0%, rgba(10,15,34,0.58) 60%, rgba(10,15,34,0.86) 100%)',
        }}
      />

      {/* İnce film grain dokusu */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: GRAIN, backgroundSize: '140px 140px', opacity: 0.09, mixBlendMode: 'overlay' }}
      />
    </div>
  );
}
