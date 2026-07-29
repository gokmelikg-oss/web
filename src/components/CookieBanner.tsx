'use client';

import { useEffect, useState } from 'react';
import { Cookie, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const STORAGE_KEY = 'ss-cookie-consent';
export const CONSENT_EVENT = 'ss-cookie-consent-changed';

/* KVKK/çerez onay banner'ı. Onay verilene kadar analitik/pazarlama çerezleri
   yüklenmez (Analytics bileşeni bu değeri dinler). */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* localStorage engelliyse banner gösterme */
    }
  }, []);

  function decide(choice: 'accepted' | 'rejected') {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
      window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
    } catch {
      /* yok say */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-5">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-white/10 bg-graphite-950/95 p-5 text-white shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-500 text-graphite-950">
          <Cookie size={22} strokeWidth={1.9} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-relaxed text-graphite-200">
            Deneyiminizi iyileştirmek ve site kullanımını anonim olarak ölçmek için çerezler
            kullanıyoruz. Ayrıntılar için{' '}
            <Link href="/cerez-politikasi" className="font-semibold text-volt-400 underline underline-offset-2">
              Çerez Politikası
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <button
            type="button"
            onClick={() => decide('rejected')}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <X size={14} />
            Reddet
          </button>
          <button
            type="button"
            onClick={() => decide('accepted')}
            className="rounded-full bg-solar-gradient px-6 py-2.5 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
