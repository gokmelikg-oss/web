import type { Metadata } from 'next';
import { ShieldCheck, Target, Recycle, Users, TrendingUp, BadgeCheck } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
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
    path: '/kalite-politikasi',
    title: 'Kalite Politikamız',
    description:
      'Şimşek Solar kalite politikası: müşteri memnuniyeti, sürekli iyileştirme, standartlara uygunluk ve çevreye duyarlı üretim ilkeleri. CE, TSE ve Solar Keymark sertifikalı üretim.',
  });
}

const principles = [
  {
    icon: Target,
    title: 'Müşteri memnuniyeti',
    desc: 'Ürün ve hizmetlerimizi müşteri ihtiyaç ve beklentilerini karşılayacak, hatta aşacak şekilde tasarlar ve sunarız.',
  },
  {
    icon: BadgeCheck,
    title: 'Standartlara uygunluk',
    desc: 'Üretimimizi CE, TSE ve Solar Keymark başta olmak üzere ulusal ve uluslararası standartlara uygun yürütürüz.',
  },
  {
    icon: TrendingUp,
    title: 'Sürekli iyileştirme',
    desc: 'Süreçlerimizi düzenli olarak gözden geçirir; teknoloji, verim ve kaliteyi sürekli geliştiririz.',
  },
  {
    icon: Recycle,
    title: 'Çevreye duyarlı üretim',
    desc: 'Yenilenebilir enerji üreticisi kimliğimize uygun olarak kaynakları verimli kullanır, çevresel etkiyi en aza indiririz.',
  },
  {
    icon: Users,
    title: 'Nitelikli insan kaynağı',
    desc: 'Çalışanlarımızın gelişimine yatırım yapar, kalite bilincini kurum kültürünün parçası hâline getiririz.',
  },
  {
    icon: ShieldCheck,
    title: 'Güvenilir tedarik ve satış sonrası',
    desc: 'Hammadde tedarikinden satış sonrası hizmete kadar tüm zincirde güvenilirlik ve izlenebilirlik sağlarız.',
  },
];

export default function QualityPolicyPage() {
  return (
    <>
      <PageBreadcrumb items={[{ name: 'Kalite Politikamız', path: '/kalite-politikasi' }]} />
      <PageHero
        eyebrow="Kalite Politikamız"
        title="Kalite, üretimimizin her aşamasında"
        subtitle="1992’den bu yana; Ar-Ge’den üretime, projelendirmeden satış sonrası hizmete kadar tüm süreçlerimizi kalite ve sürekli iyileştirme ilkeleriyle yürütüyoruz."
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="leading-relaxed text-mist-700">
                Şimşek Solar olarak temel hedefimiz; güneş enerjisi sistemlerinde uzun ömürlü, yüksek verimli
                ve güvenilir ürünler sunarak müşterilerimizin güvenini kazanmaktır. Bu doğrultuda aşağıdaki
                ilkeleri taahhüt ederiz.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-mist-900/10 bg-mist-50 p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-volt-100 text-volt-700">
                    <p.icon size={24} strokeWidth={1.7} />
                  </span>
                  <h2 className="mt-5 font-display text-lg font-bold text-graphite-950">{p.title}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist-700">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-graphite-gradient p-9 text-center text-white sm:p-12">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Sertifikalarımızı inceleyin</h2>
              <p className="max-w-xl text-sm leading-relaxed text-graphite-200">
                Ürünlerimizin sahip olduğu ulusal ve uluslararası kalite belgelerine kaynaklar bölümünden
                ulaşabilirsiniz.
              </p>
              <Link
                href="/resources"
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-solar-gradient px-7 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
              >
                Belgeler & Kaynaklar
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
