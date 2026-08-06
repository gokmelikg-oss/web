import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Faq } from '@/components/home/Faq';
import { PageBreadcrumb, FaqJsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { getFaqItems } from '@/data/faq';
import type { Locale } from '@/i18n/config';

const HERO: Record<Locale, { eyebrow: string; title: string; subtitle: string; crumb: string }> = {
  tr: {
    eyebrow: 'Sık Sorulan Sorular',
    title: 'Güneş enerjili sıcak su hakkında merak edilenler',
    subtitle:
      'Sistem çalışması, kışın verim, donma, boyler kapasitesi, tasarruf, bakım, TOKİ ve kamu projeleri hakkında en çok sorulan sorular.',
    crumb: 'Sık Sorulan Sorular',
  },
  en: {
    eyebrow: 'Frequently Asked Questions',
    title: 'What people ask about solar hot water',
    subtitle:
      'The most common questions about system operation, winter efficiency, freezing, boiler capacity, savings, maintenance and public projects.',
    crumb: 'FAQ',
  },
  ar: {
    eyebrow: 'الأسئلة الشائعة',
    title: 'ما يتساءل عنه الناس حول الماء الساخن الشمسي',
    subtitle:
      'أكثر الأسئلة شيوعاً حول تشغيل النظام والكفاءة الشتوية والتجمد وسعة الخزان والتوفير والصيانة والمشاريع العامة.',
    crumb: 'الأسئلة الشائعة',
  },
  el: {
    eyebrow: 'Συχνές Ερωτήσεις',
    title: 'Τι ρωτούν οι άνθρωποι για το ηλιακό ζεστό νερό',
    subtitle:
      'Οι πιο συχνές ερωτήσεις για τη λειτουργία του συστήματος, τη χειμερινή απόδοση, τον παγετό, τη χωρητικότητα μπόιλερ, την εξοικονόμηση, τη συντήρηση και τα δημόσια έργα.',
    crumb: 'Συχνές Ερωτήσεις',
  },
};

const META: Record<Locale, { title: string; description: string }> = {
  tr: {
    title: 'Sık Sorulan Sorular — Güneş Enerjisi ve Sıcak Su',
    description:
      'Güneş enerjisiyle sıcak su, kollektör, boyler, kışın çalışma, donma, tasarruf, bakım, TOKİ ve kamu projeleri hakkında sık sorulan sorular ve yanıtları.',
  },
  en: {
    title: 'Frequently Asked Questions — Solar Energy and Hot Water',
    description:
      'Frequently asked questions and answers about solar hot water, collectors, boilers, winter operation, freezing, savings, maintenance and public projects.',
  },
  ar: {
    title: 'الأسئلة الشائعة — الطاقة الشمسية والماء الساخن',
    description:
      'أسئلة وأجوبة شائعة حول الماء الساخن بالطاقة الشمسية، والمجمعات، والخزانات، والتشغيل الشتوي، والتجمد، والتوفير، والصيانة، والمشاريع العامة.',
  },
  el: {
    title: 'Συχνές Ερωτήσεις — Ηλιακή Ενέργεια και Ζεστό Νερό',
    description:
      'Συχνές ερωτήσεις και απαντήσεις για το ηλιακό ζεστό νερό, τους συλλέκτες, τα μπόιλερ, τη χειμερινή λειτουργία, τον παγετό, την εξοικονόμηση, τη συντήρηση και τα δημόσια έργα.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: '/sss', ...(META[locale] ?? META.tr) });
}

export default async function SssPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const hero = HERO[locale] ?? HERO.tr;
  const items = getFaqItems(locale);
  return (
    <>
      <PageBreadcrumb items={[{ name: hero.crumb, path: '/sss' }]} />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} subtitle={hero.subtitle} />
      <Faq showHeader={false} items={items} />
      <FaqJsonLd items={items} />
    </>
  );
}
