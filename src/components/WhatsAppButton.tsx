'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/seo';

export function WhatsAppButton() {
  const t = useTranslations('contact');

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp')}
      className="group fixed bottom-6 start-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 lg:flex"
    >
      <MessageCircle size={26} fill="white" className="text-[#25D366]" />
      <span className="pointer-events-none absolute start-full ms-3 whitespace-nowrap rounded-lg bg-graphite-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {t('whatsapp')}
      </span>
    </a>
  );
}
