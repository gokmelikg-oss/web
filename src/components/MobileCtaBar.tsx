import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ORG, WHATSAPP_NUMBER } from '@/lib/seo';

/* Mobil/tablet için alt sabit CTA çubuğu (lg altı). Ara · WhatsApp · Teklif Al.
   Masaüstünde header CTA + yüzen WhatsApp butonu bunun yerini alır. */
export function MobileCtaBar() {
  const tel = `tel:${ORG.phone.replace(/\s/g, '')}`;

  return (
    <>
      {/* içerik çubuğun altında kalmasın diye boşluk */}
      <div className="h-[64px] lg:hidden" aria-hidden />

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-mist-900/10 bg-white/95 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="grid grid-cols-[1fr_1fr_1.5fr] items-stretch gap-2 px-3 py-2.5">
          <a
            href={tel}
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-graphite-800 transition-colors active:bg-mist-100"
            aria-label="Telefonla ara"
          >
            <Phone size={19} strokeWidth={1.9} />
            <span className="text-[11px] font-semibold">Ara</span>
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[#128C4B] transition-colors active:bg-mist-100"
            aria-label="WhatsApp'tan yazın"
          >
            <MessageCircle size={19} strokeWidth={1.9} />
            <span className="text-[11px] font-semibold">WhatsApp</span>
          </a>

          <Link
            href="/teklif-al"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-graphite-950 px-4 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
          >
            Teklif Al
            <ArrowRight size={15} className="rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </>
  );
}
