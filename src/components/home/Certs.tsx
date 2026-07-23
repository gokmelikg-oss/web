import { useTranslations } from 'next-intl';
import { ShieldCheck, Award, FileCheck2, BadgeCheck, Globe2, Factory, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const icons = [ShieldCheck, Award, FileCheck2, BadgeCheck, Globe2, Factory];

/* items iki biçimi de destekler: düz string (en/ar) veya {label, file} (tr).
   file varsa kart, PDF'i yeni sekmede açan bir bağlantıya dönüşür. */
type RawCert = string | { label: string; scope?: string; file?: string };
interface Cert {
  label: string;
  scope?: string;
  file?: string;
}

function normalize(raw: RawCert): Cert {
  return typeof raw === 'string' ? { label: raw } : raw;
}

export function Certs() {
  const t = useTranslations('certs');
  const items = (t.raw('items') as RawCert[]).map(normalize);
  const viewLabel = t.has('viewLabel') ? t('viewLabel') : 'PDF';

  return (
    <section className="relative overflow-hidden bg-graphite-950 py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-25" aria-hidden />
      <div className="pointer-events-none absolute -start-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-volt-500/10 blur-3xl" aria-hidden />

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-400">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                {t('eyebrow')}
              </p>
              <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {t('title')}
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-graphite-300">{t('subtitle')}</p>

              <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-sm">
                <span className="font-tabular font-display text-4xl font-bold text-volt-400">{items.length}</span>
                <span className="max-w-[10rem] font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.16em] text-graphite-300">
                  Ulusal ve uluslararası belge
                </span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3">
            {items.map((item, i) => {
              const Icon = icons[i % icons.length];
              const inner = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-volt-500/15 text-volt-400 transition-colors group-hover:bg-volt-500 group-hover:text-graphite-950">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-snug text-white">{item.label}</span>
                    {item.scope && (
                      <span className="mt-0.5 block font-mono text-[9.5px] uppercase tracking-[0.12em] text-graphite-400">
                        {item.scope}
                      </span>
                    )}
                  </span>
                  {item.file && (
                    <ArrowUpRight
                      size={16}
                      className="mt-0.5 shrink-0 text-graphite-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-volt-400"
                    />
                  )}
                </>
              );

              const cardClass =
                'group flex h-full items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-volt-500/50 hover:bg-white/[0.08]';

              return (
                <Reveal key={item.label} delay={i * 0.04}>
                  {item.file ? (
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={viewLabel}
                      className={cardClass}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cardClass}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
