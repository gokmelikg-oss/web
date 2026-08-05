import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Faq } from '@/components/home/Faq';
import { PageBreadcrumb, FaqJsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { faqItems } from '@/data/faq';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: '/sss',
    title: 'Sık Sorulan Sorular — Güneş Enerjisi ve Sıcak Su',
    description:
      'Güneş enerjisiyle sıcak su, kollektör, boyler, kışın çalışma, donma, tasarruf, bakım, TOKİ ve kamu projeleri hakkında sık sorulan sorular ve yanıtları.',
  });
}

export default function SssPage() {
  return (
    <>
      <PageBreadcrumb items={[{ name: 'Sık Sorulan Sorular', path: '/sss' }]} />
      <PageHero
        eyebrow="Sık Sorulan Sorular"
        title="Güneş enerjili sıcak su hakkında merak edilenler"
        subtitle="Sistem çalışması, kışın verim, donma, boyler kapasitesi, tasarruf, bakım, TOKİ ve kamu projeleri hakkında en çok sorulan sorular."
      />
      <Faq showHeader={false} />
      <FaqJsonLd items={faqItems} />
    </>
  );
}
