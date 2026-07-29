import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  // api/admin/metadata rotaları locale önekinden muaf
  matcher: ['/((?!api|admin|_next|_vercel|icon|apple-icon|opengraph-image|.*\\..*).*)'],
};
