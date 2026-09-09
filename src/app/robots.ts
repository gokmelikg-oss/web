import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/* Tarama izinleri. Arama motorları ve yapay zeka botları (GPTBot, ClaudeBot,
   PerplexityBot, Google-Extended vb.) siteyi taramaya açık. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        /* Yönetim paneli ve API taramaya kapalı.
           ⚠ Bu bir GÜVENLİK önlemi DEĞİLDİR — robots.txt herkese açıktır ve
           bağlayıcı değildir; saldırgana adres listesi bile verir. Asıl koruma
           sunucu tarafındaki oturum denetimi (getSession) ve /admin
           başlıklarındaki noindex'tir. Buradaki amaç yalnızca panelin arama
           sonuçlarında görünmesini engellemektir. */
        disallow: ['/api/', '/admin'],
      },
      // Yapay zeka tarayıcılarına açık erişim
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
