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
    path: '/kvkk',
    title: 'KVKK Aydınlatma Metni',
    description:
      '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesine ilişkin aydınlatma metni.',
  });
}

export default async function KvkkPage() {
  await getTranslations();
  return (
    <>
      <PageHero
        eyebrow="Yasal"
        title="KVKK Aydınlatma Metni"
        subtitle="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesine ilişkin bilgilendirme."
      />
      <LegalDoc updated={UPDATED}>
        <LegalSection title="1. Veri Sorumlusu">
          <p>
            İşbu aydınlatma metni, veri sorumlusu sıfatıyla {ORG.legalName} ({SITE_NAME}) tarafından, 6698
            sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca hazırlanmıştır.
          </p>
          <p>
            Adres: {ORG.street}, {ORG.district}, {ORG.city}. E-posta: {ORG.email}. Telefon: {ORG.phone}.
          </p>
        </LegalSection>

        <LegalSection title="2. İşlenen Kişisel Veriler">
          <p>
            Sitemizdeki iletişim ve bayilik başvuru formları aracılığıyla; ad-soyad, firma bilgisi,
            telefon, e-posta adresi, şehir/ülke ve ilettiğiniz mesaj içeriği gibi kimlik ve iletişim
            verileriniz işlenmektedir.
          </p>
        </LegalSection>

        <LegalSection title="3. Kişisel Verilerin İşlenme Amaçları">
          <p>
            Kişisel verileriniz; talep ve başvurularınızın değerlendirilmesi, teklif ve teknik destek
            süreçlerinin yürütülmesi, bayilik başvurularının incelenmesi, sizinle iletişim kurulması ve
            yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenir.
          </p>
        </LegalSection>

        <LegalSection title="4. Hukuki Sebep ve Toplama Yöntemi">
          <p>
            Verileriniz, web sitesi üzerindeki formlar aracılığıyla elektronik ortamda; KVKK m.5/2
            kapsamında bir sözleşmenin kurulması/ifası, meşru menfaat ve açık rızanız hukuki sebeplerine
            dayanılarak toplanır ve işlenir.
          </p>
        </LegalSection>

        <LegalSection title="5. Kişisel Verilerin Aktarılması">
          <p>
            Kişisel verileriniz, yalnızca yukarıdaki amaçlarla sınırlı olmak üzere; grup şirketlerimize,
            yetkili bayilerimize, hizmet aldığımız tedarikçilere (barındırma, e-posta iletim vb.) ve
            yasal olarak yetkili kamu kurumlarına aktarılabilir.
          </p>
        </LegalSection>

        <LegalSection title="6. Saklama Süresi">
          <p>
            Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen zamanaşımı
            süreleri boyunca saklanır; süre sonunda silinir, yok edilir veya anonim hâle getirilir.
          </p>
        </LegalSection>

        <LegalSection title="7. İlgili Kişinin Hakları (KVKK m.11)">
          <p>
            Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme,
            işlenme amacını öğrenme, eksik/yanlış işlenmişse düzeltilmesini, KVKK’ya aykırı işlenmişse
            silinmesini/yok edilmesini isteme ve zarara uğramanız hâlinde tazminat talep etme haklarına
            sahipsiniz.
          </p>
          <p>
            Bu haklarınızı kullanmak için taleplerinizi {ORG.email} adresine iletebilirsiniz.
          </p>
        </LegalSection>
      </LegalDoc>
    </>
  );
}
