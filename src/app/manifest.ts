import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Güneş Enerjisi Sistemleri`,
    short_name: SITE_NAME,
    description:
      '1992’den beri güneş termal kollektörler, emayeli boylerler ve paket sistemler. Mersin’den 40+ ülkeye.',
    start_url: '/tr',
    display: 'standalone',
    background_color: '#0d1329',
    theme_color: '#0d1329',
    lang: 'tr',
    dir: 'ltr',
    categories: ['business', 'utilities'],
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
