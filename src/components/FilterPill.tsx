'use client';

import { X, type LucideIcon } from 'lucide-react';

/* Site genelinde ORTAK filtre kontrolleri.
   Referanslar ve Kaynaklar sayfaları aynı bileşeni kullanır; böylece iki
   sayfanın filtre çubuğu birebir aynı görünür ve aynı davranır.

   Tasarım kararları:
   - Dokunma hedefi en az 42px (mobilde parmakla isabet).
   - Seçili durum hem renk hem HALKA ile gösterilir; yalnızca renge güvenmek
     renk körlüğünde ayırt edilemiyordu. */

export function FilterPill({
  icon: Icon, label, count, active, onClick,
}: {
  icon?: LucideIcon;
  label: string;
  /* Sayaç isteğe bağlı — verilmezse rozet basılmaz. */
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-[42px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all ${
        active
          ? 'border-volt-500 bg-volt-500 text-graphite-950 shadow-sm ring-2 ring-volt-500/25'
          : 'border-mist-900/12 bg-white text-graphite-800 hover:border-volt-500/50 hover:bg-volt-50/50'
      }`}
    >
      {Icon && <Icon size={15} className="shrink-0" />}
      {label}
      {count !== undefined && (
        <span
          className={`rounded-full px-1.5 py-0.5 font-tabular text-[10px] font-bold ${
            active ? 'bg-graphite-950/15 text-graphite-900' : 'bg-mist-100 text-mist-600'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/* Uygulanan tek bir filtre — çarpıya basınca yalnızca o kalkar. */
export function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex min-h-[32px] items-center gap-1.5 rounded-full bg-graphite-950 px-3 text-xs font-semibold text-white transition-opacity hover:opacity-80"
    >
      {label}
      <X size={13} className="shrink-0" />
    </button>
  );
}

/* Mobilde satır satır sarmak yerine yatay kayan şerit; masaüstünde sarar. */
export const filterStripClass =
  '-mx-2 flex gap-2 overflow-x-auto px-2 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden';
