import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { ProvinceExplorer } from '@/components/ProvinceExplorer';
import { PageBreadcrumb } from '@/components/JsonLd';
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
    path: '/gunes-potansiyeli',
    title: 'İllere Göre Güneş Enerjisi Potansiyeli — Türkiye Haritası',
    description:
      'İlinizi seçin; yıllık güneş ışınımı, güneşlenme süresi ve güneş enerjisiyle sıcak su sisteminizin tahmini üretimini görün. Türkiye’nin 81 ili için GEPA verilerine dayalı güneş potansiyeli rehberi.',
  });
}

export default function SolarPotentialPage() {
  return (
    <>
      <PageBreadcrumb items={[{ name: 'Güneş Potansiyeli', path: '/gunes-potansiyeli' }]} />
      <PageHero
        eyebrow="İllere Göre Güneş Potansiyeli"
        title="Bulunduğunuz ilde güneş ne kadar güçlü?"
        subtitle="İlinizi seçin; yıllık güneş ışınımı, güneşlenme süresi ve güneş enerjili sıcak su sisteminizin tahmini üretimini anında görün. Türkiye’nin 81 ili için GEPA verilerine dayalı potansiyel rehberi."
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <ProvinceExplorer />
          </Reveal>
        </div>
      </section>

      {/* Bilgilendirme */}
      <section className="section-pad bg-mist-50">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-bold text-graphite-950">
                Güneş potansiyeli sistemi nasıl etkiler?
              </h2>
              <p className="mt-4 leading-relaxed text-mist-700">
                Bir bölgenin yıllık güneş ışınımı ne kadar yüksekse, güneş kollektörleri o kadar çok ısı
                üretir. Türkiye, güneş kuşağında yer alan ve yıllık ortalama güneşlenme süresi yüksek bir
                ülkedir; bu da güneş enerjili sıcak su sistemlerini hemen her ilde ekonomik kılar.
              </p>
              <p className="mt-4 leading-relaxed text-mist-700">
                Güney illerinde açık devre paket sistemler yüksek verim sağlarken, kışın sıcaklığın düştüğü
                bölgelerde antifrizli kapalı devre sistemler ve destek ısıtma entegrasyonu ile dört mevsim
                kesintisiz sıcak su elde edilir.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div>
              <h2 className="font-display text-2xl font-bold text-graphite-950">
                Doğru sistemi birlikte belirleyelim
              </h2>
              <p className="mt-4 leading-relaxed text-mist-700">
                Bu araç bölgesel ortalamalara dayalı bir ön fikir verir. İlinize, çatınıza ve tüketiminize
                özel doğru kapasiteyi belirlemek için mühendislik ekibimiz ücretsiz saha keşfi ve
                projelendirme yapar.
              </p>
              <p className="mt-4 leading-relaxed text-mist-700">
                Konut, toplu konut, kamu ve endüstriyel projelerde 35 yıllık üretim ve saha tecrübemizle
                yanınızdayız.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
