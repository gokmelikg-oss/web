import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/PageHero';
import { LegalDoc, LegalSection } from '@/components/LegalDoc';
import { pageMetadata, ORG, SITE_NAME } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

const UPDATED = '29.07.2026';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: '/cerez-politikasi',
    title: 'Çerez Politikası',
    description:
      'Web sitemizde kullanılan çerezler, türleri, amaçları ve çerez tercihlerinizi nasıl yönetebileceğinize dair bilgiler.',
  });
}

export default async function CerezPage() {
  await getTranslations();
  return (
    <>
      <PageHero
        eyebrow="Yasal"
        title="Çerez Politikası"
        subtitle="Web sitemizde kullanılan çerezler, kullanım amaçları ve tercihlerinizi nasıl yönetebileceğiniz."
      />
      <LegalDoc updated={UPDATED}>
        <LegalSection title="Çerez Nedir?">
          <p>
            Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza kaydedilen küçük metin
            dosyalarıdır. Sitenin düzgün çalışmasını sağlar ve kullanım deneyimini iyileştirmek için
            kullanılır. {ORG.legalName} ({SITE_NAME}) olarak çerezleri aşağıdaki amaçlarla kullanıyoruz.
          </p>
        </LegalSection>

        <LegalSection title="Kullandığımız Çerez Türleri">
          <p>
            <strong>Zorunlu çerezler:</strong> Sitenin temel işlevleri, dil tercihi ve güvenlik için
            gereklidir; bunlar olmadan site düzgün çalışmaz.
          </p>
          <p>
            <strong>Performans/analiz çerezleri:</strong> Ziyaretçilerin siteyi nasıl kullandığını anonim
            olarak ölçmek için (örneğin Google Analytics) kullanılır; içeriği ve deneyimi geliştirmemize
            yardımcı olur.
          </p>
          <p>
            <strong>Pazarlama çerezleri:</strong> Reklam ve yeniden pazarlama araçları (örneğin Meta
            Pixel) tarafından, ilgi alanlarınıza uygun içerik sunmak için kullanılabilir.
          </p>
        </LegalSection>

        <LegalSection title="Çerez Tercihlerinizin Yönetimi">
          <p>
            Tarayıcınızın ayarları üzerinden çerezleri dilediğiniz zaman silebilir veya engelleyebilirsiniz.
            Ancak zorunlu çerezleri devre dışı bırakmanız durumunda sitenin bazı bölümleri düzgün
            çalışmayabilir.
          </p>
        </LegalSection>

        <LegalSection title="İletişim">
          <p>
            Çerez politikamıza ilişkin sorularınız için {ORG.email} adresinden bize ulaşabilirsiniz. Kişisel
            verilerinizin işlenmesi hakkında ayrıntılı bilgi için KVKK Aydınlatma Metni ve Gizlilik
            Politikamızı inceleyebilirsiniz.
          </p>
        </LegalSection>
      </LegalDoc>
    </>
  );
}
