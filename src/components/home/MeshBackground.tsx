/* Canlı renk mesh arka planı — Hero'nun arkasında sürekli akan, marka tonlarında
   yumuşak ışık lekeleri + yavaşça dönen konik renk katmanı + hafif renk kayması
   (huemint tarzı). Saf CSS. Merkezde yazı kontrastı için ölçülü koyu perde. */
const blobs = [
  { color: 'rgba(246,188,50,0.75)', size: '48%', top: '2%', left: '6%', anim: 'mesh-a', dur: '13s' },
  { color: 'rgba(2,183,212,0.65)', size: '44%', top: '0%', left: '55%', anim: 'mesh-b', dur: '11s' },
  { color: 'rgba(45,168,255,0.6)', size: '52%', top: '42%', left: '48%', anim: 'mesh-c', dur: '15s' },
  { color: 'rgba(248,140,60,0.55)', size: '46%', top: '44%', left: '2%', anim: 'mesh-d', dur: '12s' },
  { color: 'rgba(124,92,255,0.45)', size: '40%', top: '20%', left: '30%', anim: 'mesh-b', dur: '17s' },
] as const;

export function MeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Yavaşça dönen konik renk katmanı */}
      <div
        className="absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(246,188,50,0.35), rgba(2,183,212,0.30), rgba(45,168,255,0.30), rgba(124,92,255,0.28), rgba(246,188,50,0.35))',
          filter: 'blur(60px)',
          animation: 'mesh-spin 40s linear infinite',
        }}
      />

      {/* Akan renk lekeleri (hue kayması ile) */}
      <div className="absolute inset-0" style={{ animation: 'mesh-hue 32s linear infinite' }}>
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
              animation: `${b.anim} ${b.dur} linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Yazı kontrastı için ölçülü koyu perde — merkez daha koyu, kenarlar açık */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(115% 80% at 50% 46%, rgba(13,19,41,0.30) 0%, rgba(13,19,41,0.55) 58%, rgba(13,19,41,0.82) 100%)',
        }}
      />
    </div>
  );
}
