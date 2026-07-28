import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Şimşek Solar — Güneş Enerjisi Sistemleri';

/* Sosyal paylaşım görseli (Open Graph / Twitter) — koddan üretilir. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: 'linear-gradient(135deg, #141d3d 0%, #0d1329 60%, #0a0f22 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" fill="#f6bc32" />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI) / 4;
              return (
                <line
                  key={i}
                  x1={12 + Math.cos(a) * 8}
                  y1={12 + Math.sin(a) * 8}
                  x2={12 + Math.cos(a) * 10.5}
                  y2={12 + Math.sin(a) * 10.5}
                  stroke="#f6bc32"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>Şimşek Solar</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
            Enerjiyi doğadan alır, geleceğe taşırız.
          </div>
          <div style={{ fontSize: 28, color: '#c6cde7', maxWidth: 820 }}>
            1992’den beri güneş termal sistemler — 40+ ülkeye ihracat
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 28,
            fontSize: 22,
            color: '#f6bc32',
            fontWeight: 600,
          }}
        >
          <span>Kollektör</span>
          <span style={{ color: '#3a4d97' }}>•</span>
          <span>Boyler</span>
          <span style={{ color: '#3a4d97' }}>•</span>
          <span>Paket &amp; Merkezi Sistem</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
