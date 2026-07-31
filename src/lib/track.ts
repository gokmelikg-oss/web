/* Form dönüşüm takibi — başarılı gönderimde GA4 ve Meta Pixel olayı gönderir.
   Analitik yüklü değilse (çerez onayı yoksa) sessizce yok sayılır. */
type Gtag = (command: string, event: string, params?: Record<string, unknown>) => void;
type Fbq = (command: string, event: string, params?: Record<string, unknown>) => void;

export function trackLead(source: 'contact' | 'dealer') {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { gtag?: Gtag; fbq?: Fbq };
  try {
    w.gtag?.('event', 'generate_lead', { form: source });
    w.fbq?.('track', 'Lead', { content_name: source });
  } catch {
    /* yok say */
  }
}
