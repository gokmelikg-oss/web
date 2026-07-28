import type { Metadata } from 'next';
import { AiChat } from '@/components/AiChat';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: '/ai',
    title: 'şimşek.ai — Akıllı Asistan',
    description:
      'Ürün kılavuzları ve teknik dökümanlardan beslenen yapay zeka asistanı: ürün önerisi, projelendirme, bayilik ve teknik sorularınızı yanıtlar.',
  });
}

export default function AiPage() {
  return <AiChat />;
}
