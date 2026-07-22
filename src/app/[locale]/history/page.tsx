import type { Metadata } from 'next';
import { Hammer, Globe2, Factory, Rocket, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: 'Tarihçe — 1992\'den Bugüne | Şimşek Solar',
  description:
    "1992'de Mersin'deki küçük bir atölyeden entegre yenilenebilir enerji ekosistemine: Şimşek Grup'un kilometre taşları.",
};

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

interface Era {
  id: string;
  label: string;
  range: string;
  icon: typeof Hammer;
  milestones: Milestone[];
}

/* groupsimsek.com.tr/tarihce içeriği, dönemlere ayrılmış akışla. */
const eras: Era[] = [
  {
    id: 'kurulus',
    label: 'Kuruluş Yılları',
    range: '1992 — 2002',
    icon: Hammer,
    milestones: [
      { year: '1992', title: 'Temellerin atılması', desc: "Mersin'de küçük bir atölyede alüminyum ve metal işleriyle kurulan hayaller, yıllar içinde güçlü hedeflere dönüşecek yolculuğuna başladı." },
      { year: '1997', title: 'Solar termal kolektör üretimi', desc: 'Geliştirilen ürünlerle markanın yenilenebilir enerji sektöründeki tanınırlığı hızla arttı.' },
      { year: '2000', title: 'Türkiye genelinde bayi ağı', desc: 'Ürün çeşitliliğinin artmasıyla bayi ağı kuruldu; Türkiye genelindeki çözüm ortaklarına ulaşan güçlü bir yapı oluşturuldu.' },
      { year: '2002', title: 'Kurumsal kimlik', desc: 'Kurumsal yapının oluşturulmasıyla marka kimliği güçlendirildi.' },
    ],
  },
  {
    id: 'uluslararasi',
    label: 'Uluslararası Açılım',
    range: '2003 — 2012',
    icon: Globe2,
    milestones: [
      { year: '2003', title: 'İlk ihracat: Bulgaristan', desc: "Solar termal kolektörlerin Bulgaristan'daki projelerde kullanılmasıyla uluslararası pazarın kapısı açıldı." },
      { year: '2008', title: 'Boyler üretimine geçiş', desc: 'Kolektör üretimine ek olarak boyler üretimi hız kazandı; makine parkuru yatırımları büyüdü.' },
      { year: '2011', title: 'Ultrasonik kaynak teknolojisi', desc: 'Ultrasonik kaynak makinasının devreye alınmasıyla ulusal ve uluslararası birçok sertifikasyon ve Ar-Ge süreci tamamlandı.' },
      { year: '2012', title: 'Van deprem konutları', desc: "Van deprem konutlarındaki büyük ölçekli uygulamalar; kalite, uzun ömür ve satış sonrası hizmet yaklaşımıyla sektör liderliğini pekiştirdi." },
    ],
  },
  {
    id: 'modern-uretim',
    label: 'Modern Üretim Dönemi',
    range: '2013 — 2017',
    icon: Factory,
    milestones: [
      { year: '2013', title: '2. OSB\'de yeni tesis inşaatı', desc: "Mersin Tarsus 2. Organize Sanayi Bölgesi'nde 11.575 m²'lik arsa üzerinde fabrika ve idari bina inşaatına başlandı; aynı yıl Solar Keymark sertifikası alındı." },
      { year: '2014', title: 'Üretim kampüsünün açılışı', desc: "5.700 m² kapalı üretim alanı ve 1.300 m² idari bina tamamlandı. Emaye fırını yatırımıyla boyler üretimi tamamen şirket bünyesine alındı; üretim zinciri tam bağımsız hâle geldi." },
      { year: '2015', title: 'AFAD projeleri', desc: 'Mülteci kamplarındaki elektrikli ısıtmanın güneş enerjisine dönüştürülmesi projeleri başarıyla tamamlandı.' },
    ],
  },
  {
    id: 'kuresel-donusum',
    label: 'Küresel Dönüşüm',
    range: '2018 — Bugün',
    icon: Rocket,
    milestones: [
      { year: '2018', title: 'Yeni dönemin başlangıcı', desc: "Sinan Şimşek'in şirket hisselerinin tamamına sahip olmasıyla daha vizyoner ve küresel bir büyüme dönemi başladı." },
      { year: '2019', title: 'Dijital dönüşüm ve ihracat atağı', desc: 'Üretimden sevkiyata tüm iş akışları ERP sistemine taşındı; ihracat ağı birçok yeni pazara genişletildi.' },
      { year: '2022', title: "SMK Alüminyum'un kuruluşu", desc: 'Alüminyum profil, krom ve fleks borular ile sarf malzemeleri grup bünyesinde tedarik edilmeye başlandı; tedarik zinciri tamamen iç kaynaklara taşındı.' },
      { year: '2023', title: 'Lazer kaynak yatırımı', desc: 'Kolektör üretim kalitesini yükselten lazer kaynak makinası devreye alındı.' },
      { year: '2024', title: "Şimşek Yenilenebilir Enerji Sistemleri'nin kurulması", desc: 'Yurt içi satış, proje uygulamaları, montaj, servis ve satış sonrası süreçler tek merkezden yönetilmeye başlandı.' },
      { year: '2025', title: 'Lipus markasının doğuşu', desc: 'Enerji depolama, ısı pompası, havuz ısıtma, PV ve şarj istasyonu teknolojilerini birleştiren yeni nesil enerji markası kuruldu.' },
    ],
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Tarihçe"
        title="Küçük bir atölyeden entegre enerji ekosistemine"
        subtitle="1992'den bugüne, her adımı bir öncekini ileri taşıyan 30 yılı aşkın bir yolculuk."
      />
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            {eras.map((era, ei) => (
              <div key={era.id} className={ei > 0 ? 'mt-16' : ''}>
                {/* Dönem başlığı */}
                <Reveal>
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-graphite-950 text-volt-400">
                      <era.icon size={22} strokeWidth={1.75} />
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-bold text-graphite-950 sm:text-2xl">{era.label}</h2>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-volt-700">
                        {era.range}
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Kilometre taşları — sol raylı zaman çizelgesi */}
                <div className="mt-6 border-s-2 border-mist-900/10 ps-8 sm:ms-6">
                  {eras[ei].milestones.map((m, mi) => (
                    <Reveal key={`${m.year}-${m.title}`} delay={Math.min(mi * 0.05, 0.2)}>
                      <div className="relative pb-8 last:pb-2">
                        <span
                          className="absolute -start-[41px] top-1.5 h-4 w-4 rounded-full border-[3px] border-white bg-volt-500 shadow-[0_0_0_2px_rgba(246,188,50,0.35)]"
                          aria-hidden
                        />
                        <div className="group rounded-2xl border border-transparent p-4 transition-all hover:border-mist-900/10 hover:bg-mist-50 sm:p-5">
                          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                            <span className="font-tabular font-display text-2xl font-bold text-graphite-950">
                              {m.year}
                            </span>
                            <h3 className="font-display text-base font-bold text-graphite-800">{m.title}</h3>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-mist-700">{m.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}

            {/* Bugün */}
            <Reveal delay={0.1}>
              <div className="mt-14 rounded-3xl bg-graphite-gradient p-9 text-white sm:p-11">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-volt-400">Bugün</p>
                <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  Entegre yenilenebilir enerji ekosistemi
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-graphite-200">
                  Şimşek Grup; Şimşek Solar, SMK Alüminyum, Şimşek Yenilenebilir Enerji Sistemleri ve Lipus markalarıyla bireysel,
                  ticari ve endüstriyel tüm segmentlere entegre çözümler sunan güçlü bir yapı hâline geldi.
                </p>
                <Link
                  href="/about#grup-sirketleri"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-solar-gradient px-6 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
                >
                  Grup şirketlerini keşfedin
                  <ArrowRight size={15} className="rtl:rotate-180" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
