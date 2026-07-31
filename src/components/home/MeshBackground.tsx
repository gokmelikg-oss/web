/* Elit renk mesh arka planı — koyu lacivert zeminde ağırlıklı ALTIN, tek soğuk
   aksan (derin mavi). Az renk, hızlı ve akışkan; gökkuşağı/hue kayması yok.
   Saf CSS. Merkezde yazı kontrastı için ölçülü koyu perde. */
const blobs = [
  { color: 'rgba(246,188,50,0.70)', size: '46%', top: '4%', left: '8%', anim: 'mesh-a', dur: '9s' },
  { color: 'rgba(248,202,92,0.55)', size: '40%', top: '38%', left: '54%', anim: 'mesh-c', dur: '11s' },
  { color: 'rgba(30,64,140,0.55)', size: '50%', top: '30%', left: '30%', anim: 'mesh-b', dur: '10s' },
  { color: 'rgba(246,188,50,0.45)', size: '38%', top: '48%', left: '14%', anim: 'mesh-d', dur: '8s' },
] as const;

export function MeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Yavaşça dönen tek-ton altın parıltı — sakin canlılık */}
      <div
        className="absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(246,188,50,0.22), transparent 30%, rgba(30,64,140,0.20) 55%, transparent 80%, rgba(246,188,50,0.22))',
          filter: 'blur(70px)',
          animation: 'mesh-spin 34s linear infinite',
        }}
      />

      {/* Akışkan lekeler */}
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

      {/* Yazı kontrastı için koyu perde */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(115% 82% at 50% 46%, rgba(10,15,34,0.42) 0%, rgba(10,15,34,0.66) 58%, rgba(10,15,34,0.88) 100%)',
        }}
      />
    </div>
  );
}
