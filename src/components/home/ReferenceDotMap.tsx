'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { geoNaturalEarth1, geoMercator, geoPath, type GeoProjection } from 'd3-geo';
import { feature } from 'topojson-client';
import type { FeatureCollection } from 'geojson';
import { specialLocations, projectProvinces, type ProvinceAggregate } from '@/data/locations';

/*
 * Noktalı Türkiye/Dünya haritası: Mersin'den referans noktalarına animasyonlu
 * yaylar. Görsel dil simsekweb2'nin "kitaplık" haritasından alındı, ama
 * hedefler web'in gerçek il/ihracat verisinden (data/locations.ts) besleniyor —
 * simsekweb2'deki elle yazılmış il/ülke listeleri yerine.
 */

type ViewMode = 'turkey' | 'world';

const MERSIN: [number, number] = [34.773, 36.9152]; // [lng, lat]

const ORIGIN_COLOR = '#0d1329'; // graphite-950
const TARGET_COLOR: Record<ViewMode, string> = {
  turkey: '#f6bc32', // volt-500
  world: '#10b981', // emerald-500
};
const DOT_COLOR = 'rgba(111,122,153,0.22)'; // mist-500 @ low alpha
const OUTLINE_COLOR = 'rgba(154,163,178,0.38)';
const TOP_PROVINCES = 81; // tüm iller
const ARC_DURATION = 2600;

interface ArcTarget {
  name: string;
  coords: [number, number];
  weight: number;
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

function buildProjection(mode: ViewMode, w: number, h: number, shape: object): GeoProjection {
  if (mode === 'turkey') {
    return geoMercator().fitExtent(
      [
        [w * 0.08, h * 0.1],
        [w * 0.92, h * 0.9],
      ],
      shape as never
    );
  }
  return geoNaturalEarth1().fitExtent(
    [
      [8, 8],
      [w - 8, h - 8],
    ],
    shape as never
  );
}

function computeDots(shape: object, projection: GeoProjection, w: number, h: number, gap: number): [number, number][] {
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

function turkeyArcs(): { targets: ArcTarget[]; maxWeight: number } {
  const targets = (projectProvinces as ProvinceAggregate[])
    .slice()
    .sort((a, b) => b.projects - a.projects)
    .slice(0, TOP_PROVINCES)
    .map((p) => ({ name: p.il, coords: [p.lng, p.lat] as [number, number], weight: p.projects }));
  return { targets, maxWeight: Math.max(...targets.map((t) => t.weight), 1) };
}

function worldArcs(): { targets: ArcTarget[]; maxWeight: number } {
  const targets = specialLocations
    .filter((l) => l.type === 'export')
    .map((l) => ({ name: l.name, coords: [l.lng, l.lat] as [number, number], weight: 1 }));
  return { targets, maxWeight: 1 };
}

function render(ctx: CanvasRenderingContext2D, state: MapState, w: number, h: number, mode: ViewMode) {
  ctx.clearRect(0, 0, w, h);

  if (state.outline) {
    const path = geoPath(state.projection, ctx);
    ctx.strokeStyle = OUTLINE_COLOR;
    ctx.lineWidth = 1;
    ctx.beginPath();
    path(state.outline as never);
    ctx.stroke();
  }

  ctx.fillStyle = DOT_COLOR;
  for (const [x, y] of state.dots) {
    ctx.beginPath();
    ctx.arc(x, y, 1.3, 0, Math.PI * 2);
    ctx.fill();
  }

  const project = (c: [number, number]) => state.projection(c) as [number, number] | null;
  const origin = project(MERSIN);
  if (!origin) return;

  const targetColor = TARGET_COLOR[mode];
  const arcCount = state.arcs.length;
  state.arcs.forEach((arc, i) => {
    const to = project(arc.coords);
    if (!to) return;
    const local = Math.min(Math.max(state.progress * (arcCount * 0.5 + 1) - i * 0.5, 0), 1);
    if (local <= 0) return;

    const scale = 0.55 + 0.45 * Math.sqrt(arc.weight / state.maxWeight);

    const mx = (origin[0] + to[0]) / 2;
    const my = (origin[1] + to[1]) / 2;
    const dist = Math.hypot(to[0] - origin[0], to[1] - origin[1]);
    const cx = mx;
    const cy = my - dist * 0.28;

    const drawArc = dist > 36;
    if (drawArc) {
      /* Gradient stroke: fades out near the origin, saturates toward the target,
         with rounded caps and a glowing comet head while the arc is drawing. */
      const grad = ctx.createLinearGradient(origin[0], origin[1], to[0], to[1]);
      grad.addColorStop(0, `${targetColor}18`);
      grad.addColorStop(0.45, `${targetColor}88`);
      grad.addColorStop(1, targetColor);
      ctx.strokeStyle = grad;
      ctx.lineCap = 'round';
      ctx.lineWidth = 0.8 + 1.5 * scale;
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
        ctx.shadowColor = targetColor;
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tipX, tipY, 1.6 + scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    if (local >= 1) {
      const pulseRadius = (2.2 + Math.sin(state.pulse * Math.PI * 2 + i) * 1.1) * scale;
      ctx.fillStyle = `${targetColor}40`;
      ctx.beginPath();
      ctx.arc(to[0], to[1], pulseRadius + 4 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = targetColor;
      ctx.beginPath();
      ctx.arc(to[0], to[1], 2.4 * scale, 0, Math.PI * 2);
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
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const stateRef = useRef<MapState>({
    projection: geoNaturalEarth1(),
    dots: [],
    outline: null,
    arcs: [],
    maxWeight: 1,
    progress: 0,
    pulse: 0,
  });
  const [mode, setMode] = useState<ViewMode>('turkey');
  const sizeRef = useRef({ w: 0, h: 0 });
  const tickingRef = useRef(false);
  const landRef = useRef<object | null>(null);
  const turkeyRef = useRef<object | null>(null);
  const enteredRef = useRef(false);

  const rebuildRef = useRef<(nextMode: ViewMode, animate: boolean) => Promise<void>>(async () => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        render(ctx, state, w, h, modeRefCurrent());
        return;
      }
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        state.progress = easeOutCubic(Math.min(elapsed / ARC_DURATION, 1));
        render(ctx, state, w, h, modeRefCurrent());
        if (elapsed < ARC_DURATION) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    // Kapanış üzerinden en güncel mod'u okumak için (state güncellemesi asenkron).
    let currentMode: ViewMode = 'turkey';
    const modeRefCurrent = () => currentMode;

    const rebuild = async (nextMode: ViewMode, animate: boolean) => {
      currentMode = nextMode;
      const { w, h } = resizeCanvas();
      if (w === 0 || h === 0) return;

      if (nextMode === 'turkey' && !turkeyRef.current) {
        turkeyRef.current = (await import('@/data/turkey-50m.geo.json')).default as object;
      }
      if (nextMode === 'world' && !landRef.current) {
        const topo = (await import('world-atlas/land-110m.json')).default;
        landRef.current = feature(
          topo as never,
          (topo as never as { objects: { land: never } }).objects.land
        ) as unknown as FeatureCollection;
      }
      const shape = nextMode === 'turkey' ? turkeyRef.current! : landRef.current!;

      const projection = buildProjection(nextMode, w, h, shape);
      const { targets, maxWeight } = nextMode === 'turkey' ? turkeyArcs() : worldArcs();

      stateRef.current = {
        projection,
        dots: computeDots(shape, projection, w, h, nextMode === 'turkey' ? 8 : 7),
        outline: nextMode === 'turkey' ? shape : null,
        arcs: targets,
        maxWeight,
        progress: 0,
        pulse: stateRef.current.pulse,
      };
      render(ctx, stateRef.current, w, h, nextMode);
      if (animate) playArcs();
    };
    rebuildRef.current = rebuild;

    let raf: number | null = null;
    const tick = () => {
      if (!tickingRef.current) return;
      const { w, h } = sizeRef.current;
      const state = stateRef.current;
      state.pulse = (state.pulse + 1 / 90) % 1;
      if (state.progress >= 1) render(ctx, state, w, h, currentMode);
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!enteredRef.current) {
            enteredRef.current = true;
            void rebuild(currentMode, true);
          }
          if (!reducedMotion) {
            tickingRef.current = true;
            raf = requestAnimationFrame(tick);
          }
        } else {
          tickingRef.current = false;
        }
      },
      { threshold: 0.35 }
    );
    io.observe(container);

    const ro = new ResizeObserver(() => {
      if (enteredRef.current) void rebuild(currentMode, false);
    });
    ro.observe(container);

    return () => {
      io.disconnect();
      ro.disconnect();
      tickingRef.current = false;
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModeChange = (next: ViewMode) => {
    if (next === mode) return;
    setMode(next);
    void rebuildRef.current(next, true);
  };

  return (
    <div ref={containerRef} className="relative h-full min-h-[420px] w-full">
      <div
        className="absolute start-3 top-3 z-10 flex gap-1.5 rounded-full border border-mist-900/10 bg-white/90 p-1 backdrop-blur-sm"
        role="group"
        aria-label={t('toggle.label')}
      >
        <button
          type="button"
          onClick={() => handleModeChange('turkey')}
          aria-pressed={mode === 'turkey'}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            mode === 'turkey' ? 'bg-volt-500 text-graphite-950' : 'text-mist-600 hover:text-graphite-900'
          }`}
        >
          {t('toggle.turkey')}
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('world')}
          aria-pressed={mode === 'world'}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            mode === 'world' ? 'bg-volt-500 text-graphite-950' : 'text-mist-600 hover:text-graphite-900'
          }`}
        >
          {t('toggle.world')}
        </button>
      </div>
      <canvas ref={canvasRef} role="img" aria-label={t('canvasLabel')} className="h-full w-full" />
    </div>
  );
}
