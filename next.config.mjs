import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/**
 * Güvenlik başlıkları — tüm rotalara uygulanır. SEO güven sinyali + XSS/clickjacking koruması.
 * CSP burada bilinçli olarak tanımlanmadı (GA/Pixel/harita inline script'leri kırılmasın diye);
 * gerekirse rapor-only olarak ayrıca eklenebilir.
 */
const securityHeaders = [
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
