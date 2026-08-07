import { ListTree } from 'lucide-react';

/* Uzun içerik sayfaları için "İçindekiler" atlama linkleri. Başlıklara
   #s-{index} id'leri verilir; bu bileşen o id'lere kayan linkler üretir. */
export function Toc({ title, items }: { title: string; items: { id: string; label: string }[] }) {
  if (items.length < 3) return null;
  return (
    <nav aria-label={title} className="rounded-2xl border border-mist-900/10 bg-mist-50 p-5 sm:p-6">
      <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-mist-600">
        <ListTree size={15} className="text-volt-600" />
        {title}
      </p>
      <ol className="mt-3 space-y-1.5">
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="group flex items-baseline gap-2.5 text-sm leading-snug text-graphite-800 transition-colors hover:text-volt-700"
            >
              <span className="font-tabular font-mono text-[11px] font-bold text-mist-400 group-hover:text-volt-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
