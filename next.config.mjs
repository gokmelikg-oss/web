import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/**
 * İÇERİK GÜVENLİĞİ POLİTİKASI (CSP)
 * =================================
 * Önceden CSP bilinçli olarak YOKTU ("GA/Pixel/harita inline script'leri
 * kırılmasın diye"). Sonuç: sayfaya bir şekilde script sokulabilirse
 * (depolanmış XSS, üçüncü taraf betiğin ele geçirilmesi, bağımlılık zinciri)
 * tarayıcı tarafında onu durduracak hiçbir şey yoktu.
 *
 * Aşağıdaki politika, siteyi kırmadan gerçek saldırı yollarını kapatır:
 *
 *   script-src   → yalnızca kendi alan adımız + bilinen analitik sunucuları.
 *                  Saldırganın kendi sunucusundan betik YÜKLEYEMEZ.
 *   object-src   → 'none'. <object>/<embed> ile Flash/PDF taşıyıcı yükü biter.
 *   base-uri     → 'self'. <base href="//saldirgan"> ile tüm göreli
 *                  bağlantıların kaçırılması engellenir.
 *   form-action  → 'self'. Enjekte edilen bir <form> veriyi dışarı POST edemez.
 *   frame-ancestors → 'self'. Tıklama hırsızlığı (clickjacking); X-Frame-Options'ın
 *                  modern ve daha güçlü karşılığı.
 *   connect-src  → veri yalnızca kendimize ve analitik uçlarına gidebilir;
 *                  çalınan veriyi dışarı sızdırma yolu daraltılır.
 *
 * ⚠ BİLİNEN SINIR: script-src içinde 'unsafe-inline' var. Next.js App Router
 * hidrasyon için satır içi script üretir; nonce'suz kaldırılamaz. Bu yüzden
 * satır içi enjeksiyon hâlâ mümkündür — ama yükü DIŞARIDAN getirmek ve
 * çalınan veriyi DIŞARIYA göndermek engellendiği için saldırının işe yarar
 * kısmı büyük ölçüde kapanır. Sonraki adım nonce tabanlı CSP'dir
 * (middleware'de nonce üretip her script'e geçirmek gerekir).
 */
const ANALYTICS = [
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://connect.facebook.net',
];

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${ANALYTICS.join(' ')}`,
  // Tailwind ve framer-motion satır içi stil üretir; stil enjeksiyonu düşük risklidir.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  // data:/blob: → next/image ve harita katmanları; https: → CDN'deki ürün görselleri.
  "img-src 'self' data: blob: https:",
  `connect-src 'self' ${ANALYTICS.join(' ')} https://www.facebook.com`,
  "frame-src 'self' https://www.youtube-nocookie.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  'upgrade-insecure-requests',
].join('; ');

/**
 * Güvenlik başlıkları — tüm rotalara uygulanır.
 */
const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  /* Çapraz kaynak izolasyonu: başka bir sitenin bu sayfaya pencere referansı
     tutmasını ve kaynaklarımızı kendi belgesine gömmesini engeller. */
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
];

/**
 * Yönetim paneline ve API'ye özel ek başlıklar.
 * Panel sayfaları hiçbir koşulda önbelleğe alınmamalı ve indekslenmemelidir:
 * ara katman (CDN/proxy) bir yönetici yanıtını önbelleğe alıp başkasına
 * sunarsa oturum içeriği sızar.
 */
const privateHeaders = [
  { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, private' },
  { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel "Powered by" başlığını kaldır (küçük güvenlik + temizlik).
  poweredByHeader: false,
  // Prod'da kaynak haritaları üretme → build süresi + bandwidth (Fast Data Transfer) tasarrufu.
  productionBrowserSourceMaps: false,
  // HTML/JS/CSS gzip/brotli sıkıştırma → Fast Data Transfer maliyeti düşer.
  compress: true,

  images: {
    // AVIF + WebP: AVIF %20-30 daha küçük, WebP fallback. LCP + bandwidth kazancı.
    formats: ['image/avif', 'image/webp'],
    // Optimize edilmiş görseli 31 gün cache'le → Vercel "Image Optimization"
    // yeniden-üretim maliyetini ciddi düşürür (varsayılan 60 sn'dir).
    minimumCacheTTL: 2678400,
    // Gerçekte kullanılan kırılım noktalarıyla sınırla → daha az varyant = daha az optimize maliyeti.
    deviceSizes: [360, 640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Kendi ürettiğimiz ürün illüstrasyonları SVG; next/image bunları servis etsin.
    // Script çalıştırmayı engelleyen sıkı CSP ile güvenli hale getirildi.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  experimental: {
    // Bu paketlerden yalnızca kullanılan ikonlar/fonksiyonlar bundle'a girer → daha küçük JS.
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  async redirects() {
    return [
      {
        source: '/:locale(tr|en|ar|el)/automation',
        destination: '/:locale/products',
        permanent: false,
      },
      {
        // Bayilik artık kendi sayfasında — eski /dealers rotası oraya yönlendirilir.
        source: '/:locale(tr|en|ar|el)/dealers',
        destination: '/:locale/bayi',
        permanent: true,
      },
      {
        // Grup Şirketleri, Tarihçe sayfasıyla birleştirildi (13.08.2026).
        source: '/:locale(tr|en|ar|el)/grup-sirketleri',
        destination: '/:locale/history',
        permanent: true,
      },
      {
        // OEM, İhracat ve Üretim sayfaları kaldırıldı (13.08.2026).
        source: '/:locale(tr|en|ar|el)/:kaldirilan(oem|ihracat|uretim)',
        destination: '/:locale/about',
        permanent: true,
      },
      {
        // Satış sonrası hizmet iletişim sayfasına taşındı.
        source: '/:locale(tr|en|ar|el)/service',
        destination: '/:locale/contact#servis',
        permanent: true,
      },
      {
        /* Kariyer içeriği iletişim sayfasındaki İK bölümündedir. İncelenen
           ISO 500 firmalarının hepsinde "Kariyer" ayrı bir adres olduğu için
           aday doğrudan /kariyer deniyor; aynı içeriği ikinci kez yazmak
           yerine beklenen adres mevcut bölüme yönlendirilir.
           ⚠ Açık pozisyon listesi geldiğinde burası GERÇEK bir sayfaya
           dönmelidir; yönlendirme o zaman kaldırılır. Bu yüzden kalıcı
           (308) değil geçici (307) yönlendirmedir. */
        source: '/:locale(tr|en|ar|el)/kariyer',
        destination: '/:locale/contact#kariyer',
        permanent: false,
      },
    ];
  },

  async headers() {
    return [
      {
        // Tüm sayfalara güvenlik başlıkları.
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Yönetim paneli ve API: önbelleğe alınmaz, indekslenmez.
        source: '/admin/:path*',
        headers: privateHeaders,
      },
      {
        source: '/api/:path*',
        headers: privateHeaders,
      },
      {
        /* Panelden yüklenen dosyalar.
           Doğrudan adresine gidildiğinde belge olarak çalışmasınlar diye en
           sıkı politika uygulanır. <img src="..."> ile gömülmeyi etkilemez —
           CSP yalnızca belge olarak gezinildiğinde devreye girer. */
        source: '/uploads/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: "default-src 'none'; sandbox" },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      {
        // public/ altındaki statik marka/ürün görselleri: 1 yıl immutable cache.
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // AI botları ve robots/sitemap için makul cache.
        source: '/(llms.txt|robots.txt|sitemap.xml)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
