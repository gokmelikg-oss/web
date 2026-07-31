/* Canlı renk mesh arka planı — Hero'nun arkasında sürekli morph olan, marka
   tonlarında (altın, aqua, mavi, amber) yumuşak ışık lekeleri. Saf CSS; her leke
   bağımsız yörüngede hareket eder. Üzerine dark veil eklenerek yazı okunurluğu
   korunur. */
const blobs = [
  { color: 'rgba(246,188,50,0.55)', size: '46%', top: '8%', left: '10%', anim: 'mesh-a', dur: '19s' },
  { color: 'rgba(2,183,212,0.45)', size: '42%', top: '4%', left: '58%', anim: 'mesh-b', dur: '23s' },
  { color: 'rgba(45,168,255,0.42)', size: '50%', top: '48%', left: '52%', anim: 'mesh-c', dur: '27s' },
  { color: 'rgba(248,202,92,0.40)', size: '44%', top: '46%', left: '6%', anim: 'mesh-d', dur: '21s' },
  { color: 'rgba(16,185,129,0.30)', size: '38%', top: '28%', left: '32%', anim: 'mesh-b', dur: '25s' },
] as const;

export function MeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
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
            animation: `${b.anim} ${b.dur} ease-in-out infinite alternate`,
          }}
        />
      ))}
      {/* Yazı kontrastı için koyu perde + kenar karartma */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 45%, rgba(13,19,41,0.45) 0%, rgba(13,19,41,0.72) 55%, rgba(13,19,41,0.9) 100%)',
        }}
      />
    </div>
  );
}
