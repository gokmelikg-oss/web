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
    path: '/gizlilik',
    title: 'Gizlilik Politikası',
    description:
      'Kişisel verilerinizin gizliliği ve güvenliği için uyguladığımız ilkeler ve web sitesi gizlilik politikamız.',
  });
}

export default async function GizlilikPage() {
  await getTranslations();
  return (
    <>
      <PageHero
        eyebrow="Yasal"
        title="Gizlilik Politikası"
        subtitle="Kişisel verilerinizin gizliliğine ve güvenliğine verdiğimiz önemi ve uyguladığımız ilkeleri açıklar."
      />
      <LegalDoc updated={UPDATED}>
        <LegalSection title="Genel">
          <p>
            {ORG.legalName} ({SITE_NAME}) olarak, web sitemizi ziyaret eden kullanıcıların gizliliğine
            saygı duyuyor ve kişisel verilerinizin güvenliğini önemsiyoruz. Bu politika, hangi verileri
            hangi amaçla topladığımızı ve nasıl koruduğumuzu açıklar.
          </p>
        </LegalSection>

        <LegalSection title="Toplanan Bilgiler">
          <p>
            İletişim ve bayilik formlarımız aracılığıyla ilettiğiniz ad-soyad, firma, telefon, e-posta ve
            mesaj bilgilerini; ayrıca site kullanımını iyileştirmek amacıyla çerezler yoluyla anonim
            kullanım verilerini toplarız.
          </p>
        </LegalSection>

        <LegalSection title="Bilgilerin Kullanımı">
          <p>
            Toplanan bilgiler yalnızca talebinize yanıt vermek, teklif ve destek süreçlerini yürütmek,
            hizmet kalitemizi geliştirmek ve yasal yükümlülüklerimizi yerine getirmek için kullanılır.
            Bilgileriniz pazarlama amacıyla üçüncü taraflara satılmaz.
          </p>
        </LegalSection>

        <LegalSection title="Veri Güvenliği">
          <p>
            Kişisel verilerinizi yetkisiz erişime, kayba ve kötüye kullanıma karşı korumak için makul
            teknik ve idari tedbirleri uygularız. Verileriniz, güvenli barındırma altyapısında saklanır.
          </p>
        </LegalSection>

        <LegalSection title="Üçüncü Taraf Hizmetler">
          <p>
            Site; barındırma, e-posta iletimi ve ziyaretçi analizi (örneğin Google Analytics) gibi üçüncü
            taraf hizmetlerinden yararlanabilir. Bu hizmetler kendi gizlilik politikalarına tabidir.
          </p>
        </LegalSection>

        <LegalSection title="Haklarınız ve İletişim">
          <p>
            Kişisel verilerinize ilişkin taleplerinizde ve gizlilikle ilgili tüm sorularınızda{' '}
            {ORG.email} adresi üzerinden bize ulaşabilirsiniz. Ayrıntılı bilgi için KVKK Aydınlatma
            Metni’ni inceleyebilirsiniz.
          </p>
        </LegalSection>
      </LegalDoc>
    </>
  );
}
