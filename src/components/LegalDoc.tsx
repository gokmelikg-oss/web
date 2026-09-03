import type { ReactNode } from 'react';

/* Yasal metin sayfaları için ortak, okunur tipografi düzeni. */
export function LegalDoc({
  updated,
  updatedLabel = 'Son güncelleme',
  children,
}: {
  updated: string;
  updatedLabel?: string;
  children: ReactNode;
}) {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist-500">
            {updatedLabel}: {updated}
          </p>
          <div className="legal-prose mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function LegalSection({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-10 scroll-mt-28 first:mt-0">
      <h2 className="font-display type-h3 font-bold text-graphite-950">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-mist-700">{children}</div>
    </section>
  );
}
