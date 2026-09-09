import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { LegalDoc, LegalSection } from '@/components/LegalDoc';
import { Toc } from '@/components/Toc';
import { pageMetadata } from '@/lib/seo';
import { getLegalUi } from '@/lib/legalUi';
import type { Locale } from '@/i18n/config';

/* ŞARTLAR VE KOŞULLAR
   ===================
   Sitede Gizlilik, KVKK ve Çerez metinleri vardı; kullanım şartları yoktu.
   Ziyaretçinin siteyi hangi koşullarla kullandığı, ürün görsellerinin ve
   hesaplama araçlarının bağlayıcı olmadığı, tekliflerin ne zaman bağlayıcı
   hâle geldiği ve fikrî mülkiyet burada tanımlanır.

   ⚠ Bu bir SATIŞ SÖZLEŞMESİ DEĞİLDİR. Sitede çevrimiçi satış yoktur; satış
   koşulları (fiyat, teslim, garanti, iade) teklif ve sözleşme belgesinde
   tanımlanır. Bu yüzden metinde uydurma bir garanti süresi, iade koşulu ya
   da teslim taahhüdü YER ALMAZ — yalnızca site kullanımı düzenlenir. */

const UPDATED = '09.09.2026';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const doc = getLegalUi(locale).terms;
  return pageMetadata({
    locale,
    path: '/sartlar',
    title: doc.meta.title,
    description: doc.meta.description,
  });
}

export default async function SartlarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const ui = getLegalUi(locale);
  const doc = ui.terms;
  return (
    <>
      <PageHero eyebrow={ui.eyebrow} title={doc.title} subtitle={doc.subtitle} />
      <LegalDoc updated={UPDATED} updatedLabel={ui.updatedLabel}>
        <Toc title={ui.contents} items={doc.sections.map((s, i) => ({ id: `s-${i}`, label: s.title }))} />
        {doc.sections.map((s, i) => (
          <LegalSection key={s.title} id={`s-${i}`} title={s.title}>
            {s.paras.map((p, j) => (
              <p key={j}>
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
