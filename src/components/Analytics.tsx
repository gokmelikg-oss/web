'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { CONSENT_EVENT } from '@/components/CookieBanner';

/* Ölçüm altyapısı: Google Analytics 4 + Meta (Facebook) Pixel.
   KVKK uyumu: scriptler yalnızca kullanıcı çerezleri KABUL ETTİKTEN sonra yüklenir.
   Kimlikler ortam değişkeninden okunur; tanımlı değilse hiçbir şey yüklenmez.
   Yayına alırken .env dosyasına ekleyin:
     NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
     NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXX */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        return localStorage.getItem('ss-cookie-consent') === 'accepted';
      } catch {
        return false;
      }
    };
    setConsent(read());
    const handler = () => setConsent(read());
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  if (!consent) return null;

  return (
    <>
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {pixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
