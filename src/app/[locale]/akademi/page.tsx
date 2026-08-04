import type { Metadata } from 'next';
import {
  Ruler,
  ArrowUpRight,
  Sun,
  Wrench,
  ClipboardList,
  LineChart,
  Droplets,
  ShieldCheck,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { PageBreadcrumb } from '@/components/JsonLd';
import { PremiumIndex, type PremiumIndexItem } from '@/components/PremiumIndex';
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
    path: '/akademi',
    title: 'Şimşek Akademi — Eğitim, Mühendislik ve Teknik Kaynaklar',
    description:
      'Güneş enerjisi eğitimleri, projelendirme ve mühendislik hizmetleri, teknik dökümanlar ve hesaplama araçları tek çatı altında: Şimşek Akademi.',
  });
}

/* Akademi'nin kapsadığı alanlar — premium interaktif index (ürünlerle aynı imza). */
const academyAreas: PremiumIndexItem[] = [
  {
    id: 'egitimler',
    title: 'Eğitimler',
    desc: 'Bayiler, tesisatçılar ve mühendisler için güneş enerjisi, montaj ve projelendirme eğitimleri. Teoriyle uygulamayı birleştiren, sahada işe yarayan içerikler.',
    href: '/akademi#egitimler',
    accent: '#f6bc32',
    iconKey: 'egitim',
    meta: '4 program · Uygulamalı',
    tags: ['Temel eğitim', 'Montaj', 'Projelendirme', 'Bakım'],
  },
  {
    id: 'muhendislik',
    title: 'Mühendislik Hizmeti',
    desc: 'Kapasite hesabı, statik proje, saha etüdü ve sistem şeması ile fikirden devreye almaya uçtan uca mühendislik desteği.',
    href: '/akademi#muhendislik',
    accent: '#22c9e6',
    iconKey: 'muhendislik',
    meta: 'Fikirden devreye alma',
    tags: ['Kapasite hesabı', 'Statik proje', 'Saha etüdü', 'Merkezi sistem'],
  },
  {
    id: 'dokumanlar',
    title: 'Teknik Dökümanlar',
    desc: 'Teknik föyler, ölçü çizimleri, kurulum kılavuzları ve sertifikalar tek arşivde; projelendirme ve montaj için gereken tüm belgeler.',
    href: '/resources',
    accent: '#22c98b',
    iconKey: 'dokuman',
    meta: 'Föy · Çizim · Sertifika',
    tags: ['Teknik föyler', 'Kurulum kılavuzları', 'Sertifikalar'],
  },
  {
    id: 'hesaplama',
    title: 'Hesaplama Araçları',
    desc: 'Sistem boyutlandırma ve kapasite hesap aracıyla hane veya tesis ihtiyacına göre doğru çözümü hızlıca belirleyin.',
    href: '/calculator',
    accent: '#8b9be0',
    iconKey: 'hesaplama',
    meta: 'Boyutlandırma aracı',
    tags: ['Kapasite', 'Boyutlandırma'],
  },
  {
    id: 'potansiyel',
    title: 'İllere Göre Güneş Potansiyeli',
    desc: 'İlinizi seçin; yıllık güneş ışınımı, güneşlenme süresi ve tahmini üretimi görün. 81 il için GEPA verilerine dayalı potansiyel rehberi.',
    href: '/gunes-potansiyeli',
    accent: '#f6bc32',
    iconKey: 'kolektor',
    meta: '81 il · GEPA verileri',
    tags: ['Güneş ışınımı', 'İl bazlı', 'Tahmini üretim'],
  },
];

const trainings = [
  { icon: Sun, title: 'Güneş Enerjisi Temel Eğitimi', desc: 'Termal güneş enerjisinin çalışma prensibi, sistem tipleri ve doğru ürün seçimi.' },
  { icon: Wrench, title: 'Montaj ve Kurulum Eğitimi', desc: 'Çatı, teras ve zemin uygulamaları; sehpa montajı, hidrolik bağlantı ve devreye alma.' },
  { icon: ClipboardList, title: 'Projelendirme Eğitimi', desc: 'Kapasite hesabı, kolektör tarlası tasarımı ve merkezi sistem projelendirme esasları.' },
  { icon: ShieldCheck, title: 'Bakım ve Servis Eğitimi', desc: 'Periyodik bakım, arıza teşhisi, verim takibi ve satış sonrası hizmet süreçleri.' },
];

const engineering = [
  { icon: LineChart, title: 'Kapasite ve verim hesabı', desc: 'Hane veya tesis tüketimine göre kolektör ve boyler kapasitesi hesaplanır.' },
  { icon: ClipboardList, title: 'Projelendirme ve statik hesap', desc: 'Çatı yapısına özel sistem şeması, statik hesap ve teknik çizimler hazırlanır.' },
  { icon: Ruler, title: 'Saha etüdü', desc: 'Konum, yönlenim ve gölgelenme analiziyle sahaya özel çözüm belirlenir.' },
  { icon: Droplets, title: 'Merkezi sistem tasarımı', desc: 'Toplu konut ve tesisler için kolektör tarlası + merkezi boyler kombinasyonu.' },
];

export default function AkademiPage() {
  return (
    <>
      <PageBreadcrumb items={[{ name: 'Şimşek Akademi', path: '/akademi' }]} />
      <PageHero
        eyebrow="Şimşek Akademi"
        title="Eğitim, mühendislik ve teknik kaynak merkezi"
        subtitle="Güneş enerjisinde bilgi birikimimizi paylaşıyoruz: eğitimler, mühendislik hizmetleri, teknik dökümanlar ve hesaplama araçları tek çatı altında."
      />

      {/* Akademi kapsamı — premium interaktif index */}
      <PremiumIndex
        eyebrow="Akademi Kapsamı"
        title="Tek çatı altında bilgi, mühendislik ve araçlar"
        items={academyAreas}
        actionLabel="Keşfet"
      />

      {/* Eğitimler */}
      <section id="egitimler" className="section-pad scroll-mt-24 bg-mist-50">
        <div className="container-page">
          <Reveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                Eğitimler
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                Sahada işe yarayan, uygulamalı eğitimler
              </h2>
              <p className="mt-4 text-mist-700">
                35 yıllık üretim ve saha tecrübemizi; bayilerimize, iş ortaklarımıza ve mühendislere
                aktarıyoruz. Eğitimler tesisimizde veya sahada, teoriyle uygulamayı birleştirerek verilir.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {trainings.map((tr, i) => (
              <Reveal key={tr.title} delay={i * 0.06}>
                <div className="flex h-full gap-4 rounded-2xl border border-mist-900/10 bg-white p-6 transition-colors hover:border-volt-500/40">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                    <tr.icon size={20} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-graphite-950">{tr.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist-700">{tr.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mühendislik hizmeti */}
      <section id="muhendislik" className="section-pad scroll-mt-24 bg-white">
        <div className="container-page">
          <Reveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                Mühendislik Hizmeti
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                Fikirden devreye almaya mühendislik desteği
              </h2>
              <p className="mt-4 text-mist-700">
                Projenizin ihtiyacına göre kapasite hesabından statik projeye, saha etüdünden merkezi sistem
                tasarımına kadar mühendislik ekibimiz yanınızda.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {engineering.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-mist-900/10 bg-mist-50 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                    <e.icon size={20} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-graphite-950">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-700">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-graphite-gradient p-9 text-center text-white sm:p-12">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">Eğitim veya mühendislik desteği alın</h3>
              <p className="max-w-xl text-sm leading-relaxed text-graphite-200">
                Eğitim talepleriniz, projelendirme ve mühendislik hizmetleri için ekibimizle iletişime geçin.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-solar-gradient px-7 py-3 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
              >
                Talep oluştur
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
