import type { ReactNode } from 'react';

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative -mt-20 overflow-hidden bg-graphite-950 pb-24 pt-40 text-white sm:pb-32 sm:pt-48">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-40 fade-mask-b" aria-hidden />
      <div className="pointer-events-none absolute -start-24 -top-24 h-72 w-72 rounded-full bg-volt-500/15 blur-3xl" aria-hidden />
      <div className="container-page relative">
        <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite-300">
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-2xl text-balance font-display type-h1 font-bold tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-xl text-balance text-mist-300">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
