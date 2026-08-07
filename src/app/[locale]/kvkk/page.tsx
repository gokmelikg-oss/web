import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { LegalDoc, LegalSection } from '@/components/LegalDoc';
import { Toc } from '@/components/Toc';
import { pageMetadata } from '@/lib/seo';
import { getLegalUi } from '@/lib/legalUi';
import type { Locale } from '@/i18n/config';

const UPDATED = '29.07.2026';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = getLegalUi(locale).kvkk;
  return pageMetadata({ locale, path: '/kvkk', title: doc.meta.title, description: doc.meta.description });
}

export default async function KvkkPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const ui = getLegalUi(locale);
  const doc = ui.kvkk;
  return (
    <>
      <PageHero eyebrow={ui.eyebrow} title={doc.title} subtitle={doc.subtitle} />
      <LegalDoc updated={UPDATED} updatedLabel={ui.updatedLabel}>
        <Toc title={ui.contents} items={doc.sections.map((s, i) => ({ id: `s-${i}`, label: s.title }))} />
        {doc.sections.map((s, i) => (
          <LegalSection key={s.title} id={`s-${i}`} title={s.title}>
            {s.paras.map((p, i) => (
              <p key={i}>
                {p.label && <strong>{p.label}</strong>}
                {p.label ? ' ' : ''}
                {p.text}
              </p>
            ))}
          </LegalSection>
        ))}
      </LegalDoc>
    </>
  );
}
