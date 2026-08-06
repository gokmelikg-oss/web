export const locales = ['tr', 'en', 'ar', 'el'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'tr';

export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  ar: 'العربية',
  el: 'Ελληνικά',
};

export const rtlLocales: Locale[] = ['ar'];

export function isRtl(locale: string) {
  return rtlLocales.includes(locale as Locale);
}
