import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';

/* İhracat / OEM / Bayilik gibi "ne yapabiliyoruz" sayfalarının ortak düzeni.
   Bu sayfalar rakam değil YETENEK anlatır; bu yüzden doğrulanamayan istatistik
   içermeden yazılabilirler. Rakam gerektiren yerler ilgili veri dosyalarından
   (companyFacts.ts) beslenir ve boşsa hiç basılmaz. */

export interface CapabilityItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface CapabilityFact {
  label: string;
  value: string;
}

export function CapabilityPage({
  eyebrow, title, subtitle, intro, items, facts, ctaTitle, ctaBody, ctaLabel, ctaHref,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  items: CapabilityItem[];
  /* Doğrulanmış rakamlar. Boş dizi verilirse blok hiç görünmez —
     "0 ülke" gibi anlamsız bir kutu basılmaz. */
  facts?: CapabilityFact[];
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <section className="container-page py-20">
        <p className="mx-auto max-w-2xl text-balance text-center text-lg leading-relaxed text-mist-700">{intro}</p>

        {facts && facts.length > 0 && (
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl border border-mist-900/10 bg-white p-5 text-center">
                <p className="font-tabular font-display text-2xl font-bold text-graphite-950">{f.value}</p>
                <p className="mt-1 text-[11px] leading-snug text-mist-500">{f.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Reveal key={it.title}>
              <article className="h-full rounded-2xl border border-mist-900/10 bg-white p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                  <it.icon size={21} />
                </span>
                <h2 className="mt-5 font-display text-base font-bold text-graphite-950">{it.title}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-mist-600">{it.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl bg-graphite-gradient p-9 text-white sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="font-display type-h2-sm font-bold">{ctaTitle}</h2>
              <p className="mt-3 leading-relaxed text-graphite-200">{ctaBody}</p>
            </div>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-volt-500 px-7 py-3.5 text-sm font-semibold text-graphite-950 transition-transform hover:scale-[1.03]"
            >
              {ctaLabel} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
