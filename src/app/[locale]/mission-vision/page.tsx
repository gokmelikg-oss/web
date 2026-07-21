import { Target, Eye, Leaf, ShieldCheck, Lightbulb, HandHeart } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';

const values = [
  { icon: Leaf, title: 'Sürdürülebilirlik', desc: 'Ürettiğimiz her sistemle karbon ayak izini azaltır, doğadan aldığımız gücü doğaya saygıyla işleriz.' },
  { icon: ShieldCheck, title: 'Güvenilirlik', desc: 'On yıllar sürecek dayanıklılıkta ürünler tasarlar, verdiğimiz her sözün arkasında dururuz.' },
  { icon: Lightbulb, title: 'Yenilikçilik', desc: 'Ar-Ge ekibimizle kaplama teknolojisinden akıllı izlemeye her bileşeni sürekli geliştiririz.' },
  { icon: HandHeart, title: 'İnsan odaklılık', desc: 'Çalışanlarımızın, bayilerimizin ve müşterilerimizin memnuniyetini büyümenin önüne koyarız.' },
];

export default function MissionVisionPage() {
  return (
    <>
      <PageHero
        eyebrow="Kurumsal"
        title="Misyon & Vizyon"
        subtitle="35 yıldır değişmeyen amacımız ve bizi geleceğe taşıyan bakışımız."
      />
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-3xl bg-graphite-gradient p-9 text-white sm:p-11">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-volt-500 text-graphite-950">
                  <Target size={26} strokeWidth={1.75} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold sm:text-3xl">Misyonumuz</h2>
                <p className="mt-4 font-display text-lg font-semibold leading-relaxed text-volt-400">
                  &ldquo;Enerjiyi sadece bir ihtiyaç değil, yaşamı sürdüren görünmez bir güç olarak
                  görüyoruz.&rdquo;
                </p>
                <p className="mt-4 leading-relaxed text-graphite-200">
                  Yenilenebilir enerjiyi herkes için erişilebilir, güvenilir ve dayanıklı hâle getiren
                  çözümler geliştiriyoruz. Her proje; bir haneye konfor, bir işletmeye istikrar ve
                  çocukların geleceğine fırsat sunmak demek. Üretimden kuruluma, mühendislikten satış
                  sonrasına tüm değer zincirini kendi çatımız altında, uluslararası kalite
                  standartlarıyla yönetiyoruz.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-3xl border border-graphite-700/10 bg-mist-50 p-9 sm:p-11">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-volt-100 text-volt-700">
                  <Eye size={26} strokeWidth={1.75} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold text-graphite-950 sm:text-3xl">Vizyonumuz</h2>
                <p className="mt-4 font-display text-lg font-semibold leading-relaxed text-volt-700">
                  &ldquo;Geleceğin daha temiz, daha özgür ve daha nefes alınabilir bir dünya olduğuna
                  inanıyoruz.&rdquo;
                </p>
                <p className="mt-4 leading-relaxed text-mist-700">
                  Evlerin, şehirlerin ve hayatların enerjisini doğanın gücüyle birleştirerek
                  Türkiye&apos;nin enerji dönüşümüne katkı sağlamak; geliştirdiğimiz teknolojilerle düşük
                  karbonlu bir gelecek inşa etmek ve akıllı enerji sistemlerinde bölgesinin standartlarını
                  belirleyen marka olmak.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="mx-auto mt-16 max-w-2xl text-center">
              <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                Değerlerimiz
                <span className="h-px w-8 bg-volt-500" aria-hidden />
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-graphite-950">
                Bizi biz yapan ilkeler
              </h2>
            </div>
          </Reveal>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="flex h-full gap-5 rounded-2xl border border-graphite-700/10 bg-white p-7 transition-colors hover:border-volt-500/40">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                    <v.icon size={22} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-graphite-950">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-700">{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
