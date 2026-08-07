import { ShieldCheck } from 'lucide-react';
import type { Locale } from '@/i18n/config';

/* Kompakt güven/sertifika şeridi — uluslararası standart rozetleri tek satırda.
   Sunucu bileşeni, dört dilde. Marka adları (Solar Keymark/CE/TSE/ISO) evrensel. */

const LABELS: Record<Locale, { intro: string; domestic: string }> = {
  tr: { intro: 'Uluslararası standartlarda sertifikalı üretim', domestic: 'Yerli Malı' },
  en: { intro: 'Production certified to international standards', domestic: 'Domestic Goods' },
  ar: { intro: 'إنتاج معتمد وفق المعايير الدولية', domestic: 'منتج محلي' },
  el: { intro: 'Παραγωγή πιστοποιημένη κατά διεθνή πρότυπα', domestic: 'Εγχώριο Προϊόν' },
};

export function TrustStrip({ locale, className = 'bg-white' }: { locale: Locale; className?: string }) {
  const l = LABELS[locale] ?? LABELS.tr;
  const badges = ['Solar Keymark', 'CE', 'TSE', 'ISO 9001', 'ISO 14001', l.domestic];

  return (
    <section className={`border-y border-mist-900/8 py-8 ${className}`}>
      <div className="container-page">
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:justify-between">
          <p className="flex items-center gap-2.5 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-mist-600 lg:text-start">
            <ShieldCheck size={16} className="shrink-0 text-volt-600" />
            {l.intro}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2.5">
            {badges.map((b) => (
              <li
                key={b}
                className="rounded-full border border-mist-900/12 bg-mist-50 px-4 py-1.5 font-mono text-[11px] font-bold tracking-tight text-graphite-800"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
