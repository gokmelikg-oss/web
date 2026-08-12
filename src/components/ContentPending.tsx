import { FileQuestion } from 'lucide-react';
import { Link } from '@/i18n/navigation';

/* Verisi henüz girilmemiş sayfalar için dürüst boş durum.
   Sayfa yayında ama içerik yoksa ziyaretçiyi çıkmaza sokmamak gerekir:
   ne olduğunu söyler ve iletişime yönlendirir.

   ⚠ Bu durumdaki sayfalar `noindex` ile işaretlenir ve sitemap'e girmez
   (bkz. ilgili sayfanın generateMetadata'sı ve sitemap.ts). Boş sayfanın
   indekslenmesi arama motorunda "ince içerik" olarak değerlendirilir. */
export function ContentPending({
  title,
  body,
  ctaLabel,
  ctaHref = '/contact',
}: {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref?: string;
}) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-mist-900/20 bg-white px-8 py-14 text-center">
      <FileQuestion size={36} className="mx-auto text-mist-300" />
      <h2 className="mt-5 font-display text-lg font-bold text-graphite-950">{title}</h2>
      <p className="mt-3 text-balance text-sm leading-relaxed text-mist-600">{body}</p>
      <Link
        href={ctaHref}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-graphite-950 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
