'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { geoMercator, geoPath, type GeoProjection } from 'd3-geo';
import { feature } from 'topojson-client';
import type { FeatureCollection } from 'geojson';
import { specialLocations, projectProvinces, type ProvinceAggregate } from '@/data/locations';

/*
 * Tek birleşik harita: Mersin'deki üretim üssünden hem Türkiye illerine
 * (altın yaylar) hem de ihracat noktalarına (yeşil yaylar) uzanan kurulum
 * ağı. Türkiye ve dünya ayrı sekmeler yerine tek görünümde toplandı —
 * bölge, her iki hedef kümesini de kapsayacak şekilde çerçevelenir.
 */

const MERSIN: [number, number] = [34.773, 36.9152]; // [lng, lat]

const ORIGIN_COLOR = '#0d1329'; // graphite-950
const PROVINCE_COLOR = '#f6bc32'; // volt-500
const EXPORT_COLOR = '#10b981'; // emerald-500
const DOT_COLOR = 'rgba(111,122,153,0.20)';
const OUTLINE_COLOR = 'rgba(154,163,178,0.45)';
const TOP_PROVINCES = 30;
const ARC_DURATION = 2800;

/* Türkiye + ihracat noktalarını birlikte kapsayan çerçeve. */
const REGION = {
  type: 'Feature' as const,
  properties: {},
  geometry: {
    type: 'Polygon' as const,
    coordinates: [
      [
        [22, -1],
        [52, -1],
        [52, 45],
        [22, 45],
        [22, -1],
      ],
    ],
  },
};

interface ArcTarget {
  coords: [number, number];
  weight: number;
  kind: 'province' | 'export';
}

interface MapState {
  projection: GeoProjection;
  dots: [number, number][];
  outline: object | null;
  arcs: ArcTarget[];
  maxWeight: number;
  progress: number;
  pulse: number;
}

function computeDots(
  shape: object,
  projection: GeoProjection,
  w: number,
  h: number,
  gap: number
): [number, number][] {
  const off = document.createElement('canvas');
  off.width = w;
  off.height = h;
  const octx = off.getContext('2d', { willReadFrequently: true });
  if (!octx) return [];
  const path = geoPath(projection, octx);
  octx.fillStyle = '#fff';
  octx.beginPath();
  path(shape as never);
  octx.fill();
  const img = octx.getImageData(0, 0, w, h).data;

  const dots: [number, number][] = [];
  for (let y = gap / 2; y < h; y += gap) {
    for (let x = gap / 2; x < w; x += gap) {
      const alpha = img[(Math.round(y) * w + Math.round(x)) * 4 + 3];
      if (alpha > 128) dots.push([x, y]);
    }
  }
  return dots;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function buildArcs(): { targets: ArcTarget[]; maxWeight: number } {
  const provinces = (projectProvinces as ProvinceAggregate[])
    .slice()
    .sort((a, b) => b.projects - a.projects)
    .slice(0, TOP_PROVINCES)
    .map<ArcTarget>((p) => ({
      coords: [p.lng, p.lat],
      weight: p.projects,
      kind: 'province',
    }));

  const maxWeight = Math.max(...provinces.map((p) => p.weight), 1);

  const exports = specialLocations
    .filter((l) => l.type === 'export')
    .map<ArcTarget>((l) => ({
      coords: [l.lng, l.lat],
      weight: maxWeight * 0.75,
      kind: 'export',
    }));

  /* İhracat yayları önce çizilsin ki uzun yaylar arkada kalsın. */
  return { targets: [...exports, ...provinces], maxWeight };
}

function render(ctx: CanvasRenderingContext2D, state: MapState, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = DOT_COLOR;
  for (const [x, y] of state.dots) {
    ctx.beginPath();
    ctx.arc(x, y, 1.15, 0, Math.PI * 2);
    ctx.fill();
  }

  if (state.outline) {
    const path = geoPath(state.projection, ctx);
    ctx.strokeStyle = OUTLINE_COLOR;
    ctx.lineWidth = 1;
    ctx.beginPath();
    path(state.outline as never);
    ctx.stroke();
  }

  const project = (c: [number, number]) => state.projection(c) as [number, number] | null;
  const origin = project(MERSIN);
  if (!origin) return;

  const arcCount = state.arcs.length;
  state.arcs.forEach((arc, i) => {
    const to = project(arc.coords);
    if (!to) return;
    const local = Math.min(Math.max(state.progress * (arcCount * 0.5 + 1) - i * 0.5, 0), 1);
    if (local <= 0) return;

    const color = arc.kind === 'export' ? EXPORT_COLOR : PROVINCE_COLOR;
    const scale = 0.55 + 0.45 * Math.sqrt(arc.weight / state.maxWeight);

    const mx = (origin[0] + to[0]) / 2;
    const my = (origin[1] + to[1]) / 2;
    const dist = Math.hypot(to[0] - origin[0], to[1] - origin[1]);
    const cx = mx;
    const cy = my - dist * 0.3;

    if (dist > 14) {
      const grad = ctx.createLinearGradient(origin[0], origin[1], to[0], to[1]);
      grad.addColorStop(0, `${color}18`);
      grad.addColorStop(0.45, `${color}88`);
      grad.addColorStop(1, color);
      ctx.strokeStyle = grad;
      ctx.lineCap = 'round';
      ctx.lineWidth = 0.7 + 1.3 * scale;
      ctx.beginPath();
      const steps = 48;
      const lim = Math.round(steps * local);
      let tipX = origin[0];
      let tipY = origin[1];
      for (let s = 0; s <= lim; s++) {
        const t = s / steps;
        const x = (1 - t) ** 2 * origin[0] + 2 * (1 - t) * t * cx + t ** 2 * to[0];
        const y = (1 - t) ** 2 * origin[1] + 2 * (1 - t) * t * cy + t ** 2 * to[1];
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        tipX = x;
        tipY = y;
      }
      ctx.stroke();

      if (local < 1) {
        ctx.save();
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tipX, tipY, 1.5 + scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    if (local >= 1) {
      const pulseRadius = (2 + Math.sin(state.pulse * Math.PI * 2 + i) * 1) * scale;
      ctx.fillStyle = `${color}40`;
      ctx.beginPath();
      ctx.arc(to[0], to[1], pulseRadius + 3.5 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(to[0], to[1], (arc.kind === 'export' ? 3 : 2.2) * scale, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  ctx.fillStyle = `${ORIGIN_COLOR}30`;
  ctx.beginPath();
  ctx.arc(origin[0], origin[1], 9 + Math.sin(state.pulse * Math.PI * 2) * 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = ORIGIN_COLOR;
  ctx.beginPath();
  ctx.arc(origin[0], origin[1], 4, 0, Math.PI * 2);
  ctx.fill();
}

export function ReferenceDotMap() {
  const t = useTranslations('projectsMap');
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<MapState>({
    projection: geoMercator(),
    dots: [],
    outline: null,
    arcs: [],
    maxWeight: 1,
    progress: 0,
    pulse: 0,
  });
  const sizeRef = useRef({ w: 0, h: 0 });
  const tickingRef = useRef(false);
  const enteredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let land: object | null = null;
    let turkey: object | null = null;
    let raf: number | null = null;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth;
      const h = container.clientHeight;
      sizeRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    };

    const playArcs = () => {
      const { w, h } = sizeRef.current;
      const state = stateRef.current;
      if (reducedMotion) {
        state.progress = 1;
        render(ctx, state, w, h);
        return;
      }
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        state.progress = easeOutCubic(Math.min(elapsed / ARC_DURATION, 1));
        render(ctx, state, w, h);
        if (elapsed < ARC_DURATION) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const rebuild = async (animate: boolean) => {
      const { w, h } = resizeCanvas();
      if (w === 0 || h === 0) return;

      if (!land) {
        const topo = (await import('world-atlas/land-110m.json')).default;
        land = feature(
          topo as never,
          (topo as never as { objects: { land: never } }).objects.land
        ) as unknown as FeatureCollection;
      }
      if (!turkey) {
        turkey = (await import('@/data/turkey-50m.geo.json')).default as object;
      }

      const projection = geoMercator().fitExtent(
        [
          [w * 0.04, h * 0.05],
          [w * 0.96, h * 0.95],
        ],
        REGION as never
      );
      const { targets, maxWeight } = buildArcs();

      stateRef.current = {
        projection,
        dots: computeDots(land!, projection, w, h, 7),
        outline: turkey,
        arcs: targets,
        maxWeight,
        progress: 0,
        pulse: stateRef.current.pulse,
      };
      render(ctx, stateRef.current, w, h);
      if (animate) playArcs();
    };

    const tick = () => {
      if (!tickingRef.current) return;
      const { w, h } = sizeRef.current;
      const state = stateRef.current;
      state.pulse = (state.pulse + 1 / 90) % 1;
      if (state.progress >= 1) render(ctx, state, w, h);
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!enteredRef.current) {
            enteredRef.current = true;
            void rebuild(true);
          }
          if (!reducedMotion) {
            tickingRef.current = true;
            raf = requestAnimationFrame(tick);
          }
        } else {
          tickingRef.current = false;
        }
      },
      { threshold: 0.3 }
    );
    io.observe(container);

    const ro = new ResizeObserver(() => {
      if (enteredRef.current) void rebuild(false);
    });
    ro.observe(container);

    return () => {
      io.disconnect();
      ro.disconnect();
      tickingRef.current = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full min-h-[420px] w-full sm:min-h-[520px]">
      <canvas ref={canvasRef} role="img" aria-label={t('canvasLabel')} className="h-full w-full" />

      {/* Gösterge */}
      <div className="pointer-events-none absolute bottom-3 start-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-mist-600">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-mist-900/10 bg-white/90 px-3 py-1.5 backdrop-blur-sm">
          <i className="h-2 w-2 rounded-full bg-graphite-950" aria-hidden />
          {t('legend.factory')}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-mist-900/10 bg-white/90 px-3 py-1.5 backdrop-blur-sm">
          <i className="h-2 w-2 rounded-full bg-volt-500" aria-hidden />
          {t('legend.project')}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-mist-900/10 bg-white/90 px-3 py-1.5 backdrop-blur-sm">
          <i className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
          {t('legend.export')}
        </span>
      </div>
    </div>
  );
}
