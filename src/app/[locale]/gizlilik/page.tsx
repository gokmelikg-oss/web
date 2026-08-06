import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { LegalDoc, LegalSection } from '@/components/LegalDoc';
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
  const doc = getLegalUi(locale).privacy;
  return pageMetadata({ locale, path: '/gizlilik', title: doc.meta.title, description: doc.meta.description });
}

export default async function GizlilikPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const ui = getLegalUi(locale);
  const doc = ui.privacy;
  return (
    <>
      <PageHero eyebrow={ui.eyebrow} title={doc.title} subtitle={doc.subtitle} />
      <LegalDoc updated={UPDATED} updatedLabel={ui.updatedLabel}>
        {doc.sections.map((s) => (
          <LegalSection key={s.title} title={s.title}>
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
