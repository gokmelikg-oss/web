import { GraduationCap, TrendingUp, Users2, HeartHandshake, Mail, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';

const HR_EMAIL = 'kariyer@simsekgroup.com';

const positions = [
  'Genel Başvuru',
  'Mühendislik',
  'Satış / Pazarlama',
  'Üretim',
  'İdari İşler',
  'Finans / Muhasebe',
  'İnsan Kaynakları',
  'Staj',
];

const perks = [
  { icon: GraduationCap, title: 'Sürekli gelişim', desc: 'Teknik eğitimler, sertifika programları ve saha akademisiyle çalışanlarımızın gelişimine yatırım yaparız.' },
  { icon: TrendingUp, title: 'Kariyer yolculuğu', desc: 'Üretimden mühendisliğe, satıştan Ar-Ge\'ye grup şirketleri arasında açık kariyer fırsatları sunarız.' },
  { icon: Users2, title: 'Aile kültürü', desc: '35 yıllık köklü yapımızda uzun soluklu çalışma ilişkileri kurar, ekip ruhunu her şeyin önünde tutarız.' },
  { icon: HeartHandshake, title: 'Adil ve güvenli çalışma', desc: 'ISO 45001 iş sağlığı ve güvenliği standartlarında, adil ücret politikasıyla çalışırız.' },
];

export default function HumanResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Kurumsal"
        title="İnsan Kaynakları"
        subtitle="Güneşin enerjisini geleceğe taşıyan asıl güç: insanımız. Büyüyen ekibimizin bir parçası olun."
      />
      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <figure className="mx-auto max-w-2xl border-s-2 border-volt-500 ps-6">
              <blockquote className="font-display text-xl font-semibold leading-relaxed text-graphite-950 sm:text-2xl">
                &ldquo;Enerjiyi sadece teknik bir konu değil, geleceğe bırakacağımız en önemli
                miraslardan biri olarak görüyoruz.&rdquo;
              </blockquote>
              <figcaption className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-600">
                Şimşek Grup İnsan Kaynakları Yaklaşımı
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mx-auto mt-14 max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-graphite-950">
                Neden Şimşek&apos;te çalışmalısınız?
              </h2>
              <p className="mt-4 text-mist-700">
                Mersin&apos;deki entegre üretim kampüsümüzden ihracat ofislerimize, dört grup şirketinde
                sorumluluk sahibi, öğrenmeye açık ve birlikte başarmaya inanan ekip arkadaşları arıyoruz.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="flex h-full gap-5 rounded-2xl border border-graphite-700/10 bg-mist-50 p-7 transition-colors hover:border-volt-500/40 hover:bg-white">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                    <p.icon size={22} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-graphite-950">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-700">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mx-auto mt-14 max-w-3xl rounded-3xl bg-graphite-gradient p-9 text-center text-white sm:p-12">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Ekibimize dahil olun</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-graphite-200">
                Özgeçmişinizi, çalışmak istediğiniz alanı belirterek insan kaynakları ekibimize iletin;
                uygun pozisyon açıldığında sizinle iletişime geçelim.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {positions.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-graphite-100"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <a
                href={`mailto:${HR_EMAIL}?subject=İnsan Kaynakları — İş Başvurusu`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-solar-gradient px-7 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
              >
                <Mail size={15} />
                Özgeçmişinizi gönderin
                <ArrowUpRight size={15} />
              </a>
              <p className="mt-4 font-mono text-[11px] tracking-tight text-graphite-400">{HR_EMAIL}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
