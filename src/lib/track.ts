/* Dönüşüm takibi — GA4 ve Meta Pixel olayları.
   Analitik yüklü değilse (çerez onayı yoksa) sessizce yok sayılır. */
type Gtag = (command: string, event: string, params?: Record<string, unknown>) => void;
type Fbq = (command: string, event: string, params?: Record<string, unknown>) => void;

/* İzlenen olaylar. Yeni olay eklerken buraya yazın — böylece isimler dağılmaz
   ve GA4 tarafında tutarlı raporlanır. */
export type TrackedEvent =
  | 'quote_submit'         // teklif (RFQ) formu gönderildi
  | 'contact_submit'       // iletişim formu
  | 'dealer_form_submit'   // bayilik başvurusu
  | 'service_submit'       // teknik servis talebi
  | 'newsletter_submit'    // bülten aboneliği
  | 'catalog_download'     // katalog PDF indirildi
  | 'datasheet_download'   // teknik föy indirildi
  | 'certificate_download' // sertifika PDF indirildi
  | 'product_view'         // ürün detay sayfası görüntülendi
  | 'phone_click'          // telefon numarasına tıklandı
  | 'whatsapp_click'       // WhatsApp'a tıklandı
  | 'email_click'          // e-posta adresine tıklandı
  | 'calculator_used';     // hesaplama aracı çalıştırıldı

/* Meta Pixel karşılıkları — yalnızca anlamlı olanlar eşlenir. */
const PIXEL_MAP: Partial<Record<TrackedEvent, string>> = {
  quote_submit: 'Lead',
  contact_submit: 'Lead',
  dealer_form_submit: 'Lead',
  service_submit: 'Lead',
  newsletter_submit: 'Subscribe',
  catalog_download: 'ViewContent',
  product_view: 'ViewContent',
};

export function trackEvent(event: TrackedEvent, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { gtag?: Gtag; fbq?: Fbq };
  try {
    w.gtag?.('event', event, params);
    const pixel = PIXEL_MAP[event];
    if (pixel) w.fbq?.('track', pixel, { content_name: event, ...params });
  } catch {
    /* yok say */
  }
}

/* Geriye dönük uyumluluk — mevcut formlar bu adı kullanıyor. */
export function trackLead(source: 'contact' | 'dealer' | 'service' | 'newsletter') {
  const map = {
    contact: 'contact_submit',
    dealer: 'dealer_form_submit',
    service: 'service_submit',
    newsletter: 'newsletter_submit',
  } as const;
  trackEvent(map[source], { form: source });
}
