import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Sun, Clock, Zap, Leaf, ArrowUpRight, Wrench, MapPin } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { PageBreadcrumb, FaqJsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { PROVINCES, getProvinceData, type ProvinceData } from '@/data/provinces';
import type { Locale } from '@/i18n/config';

export function generateStaticParams() {
  return PROVINCES.map((p) => ({ il: p.slug }));
}

const nf = new Intl.NumberFormat('tr-TR');

function tier(radiation: number): string {
  if (radiation >= 1380) return 'çok yüksek';
  if (radiation >= 1280) return 'yüksek';
  if (radiation >= 1150) return 'iyi';
  return 'uygun';
}

function systemRec(radiation: number): string {
  if (radiation >= 1280)
    return 'Açık devre paket sistemler yılın büyük bölümünde yüksek verimle çalışır. Toplu konut ve tesisler için merkezi sistemler ekonomik bir çözümdür.';
  return 'Kışın sıcaklığın düştüğü dönemler için antifrizli kapalı devre sistemler önerilir; destek ısıtma entegrasyonuyla dört mevsim kesintisiz sıcak su sağlanır.';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; il: string }>;
}): Promise<Metadata> {
  const { locale, il } = await params;
  const data = getProvinceData(il);
  if (!data) return {};
  return pageMetadata({
    locale,
    path: `/gunes-potansiyeli/${il}`,
    title: `${data.name} Güneş Enerjisi Potansiyeli — Işınım ve Sıcak Su`,
    description: `${data.name} yıllık ${nf.format(data.radiation)} kWh/m² güneş ışınımı ve ${nf.format(
      data.sunshine
    )} saat güneşlenme süresine sahiptir. ${data.name}’de güneş enerjisiyle sıcak su sistemlerinin potansiyeli, tahmini üretim ve öneriler.`,
  });
}

function faqFor(data: ProvinceData) {
  return [
    {
      q: `${data.name}’de güneş enerjisiyle sıcak su üretmek verimli mi?`,
      a: `${data.name}, ${data.region.name} bölgesinde yıllık ortalama ${nf.format(
        data.radiation
      )} kWh/m² güneş ışınımı alır. Bu, güneş enerjili sıcak su sistemleri için ${tier(
        data.radiation
      )} bir potansiyel anlamına gelir; sistem yatırımı kendini kısa sürede amorti eder.`,
    },
    {
      q: `${data.name} için hangi güneş enerjisi sistemi uygundur?`,
      a: systemRec(data.radiation),
    },
    {
      q: `${data.name}’de bir hane güneşten yılda ne kadar enerji üretir?`,
      a: `Yaklaşık 2,5 m² ışınım alanlı bir paket sistem, ${data.name}’de yılda tahmini ${nf.format(
        data.homeAnnual
      )} kWh temiz ısı üretir ve doğal gaza kıyasla yaklaşık ${nf.format(
        data.homeCo2
      )} kg CO₂ salımını önler.`,
    },
  ];
}

export default async function ProvinceDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; il: string }>;
}) {
  const { il } = await params;
  const data = getProvinceData(il);
  if (!data) notFound();

  const faq = faqFor(data);
  const sameRegion = PROVINCES.filter(
    (p) => getProvinceData(p.slug)?.region.name === data.region.name && p.slug !== data.slug
  );

  const stats = [
    { icon: Sun, value: nf.format(data.radiation), unit: 'kWh/m²·yıl', label: 'Yıllık güneş ışınımı' },
    { icon: Clock, value: nf.format(data.sunshine), unit: 'saat/yıl', label: 'Güneşlenme süresi' },
    { icon: Zap, value: nf.format(data.homeAnnual), unit: 'kWh/yıl', label: 'Tek hane tahmini üretim' },
    { icon: Leaf, value: nf.format(data.homeCo2), unit: 'kg/yıl', label: 'Önlenen CO₂ (tek hane)' },
  ];

  return (
    <>
      <PageBreadcrumb
        items={[
          { name: 'Güneş Potansiyeli', path: '/gunes-potansiyeli' },
          { name: data.name, path: `/gunes-potansiyeli/${data.slug}` },
        ]}
      />
      <FaqJsonLd items={faq} />

      <PageHero
        eyebrow={`Güneş Potansiyeli · ${data.region.name}`}
        title={`${data.name}’de güneş enerjisi potansiyeli`}
        subtitle={`${data.name}, yıllık ${nf.format(data.radiation)} kWh/m² güneş ışınımı ve ${nf.format(
          data.sunshine
        )} saat güneşlenme süresiyle güneş enerjili sıcak su için ${tier(data.radiation)} bir potansiyele sahiptir.`}
      />

      {/* İstatistikler */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-mist-900/10 bg-mist-50 p-6">
                  <s.icon size={18} className="text-volt-600" strokeWidth={1.9} />
                  <p className="mt-3 font-tabular font-display text-2xl font-bold leading-none text-graphite-950 sm:text-3xl">
                    {s.value}
                    <span className="ms-1 text-xs font-semibold text-mist-500">{s.unit}</span>
                  </p>
                  <p className="mt-2 font-mono text-[9.5px] uppercase leading-snug tracking-[0.12em] text-mist-600">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-5 font-mono text-[11px] leading-relaxed text-mist-500">
            Değerler GEPA bölgesel ortalamalarına dayalı yaklaşık verilerdir. Tek hane hesabı ~2,5 m² ışınım
            alanlı paket sistem ve %50 sistem verimi varsayımıyla yapılmıştır.
          </p>

          {/* Bilgilendirme + öneri */}
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div>
                <h2 className="font-display text-2xl font-bold text-graphite-950">
                  {data.name}’de güneş enerjisi
                </h2>
                <p className="mt-4 leading-relaxed text-mist-700">
                  {data.name}, {data.region.name} bölgesinde yer alır ve yıllık ortalama {nf.format(data.radiation)}{' '}
                  kWh/m² güneş ışınımı alır. {nf.format(data.sunshine)} saatlik güneşlenme süresiyle, güneş
                  enerjili sıcak su sistemleri {tier(data.radiation)} verimle çalışır ve enerji faturasını
                  önemli ölçüde azaltır.
                </p>
                <p className="mt-4 leading-relaxed text-mist-700">
                  Konut, toplu konut, kamu ve endüstriyel projelerde 35 yıllık üretim ve saha tecrübemizle
                  {' '}{data.name} ve çevresinde güneş enerjisi çözümleri sunuyoruz.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-mist-900/10 bg-mist-50 p-7">
                <h2 className="font-display text-lg font-bold text-graphite-950">Önerilen sistem</h2>
                <p className="mt-3 leading-relaxed text-mist-700">{systemRec(data.radiation)}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                  >
                    {data.name} için teklif alın
                    <ArrowUpRight size={15} />
                  </Link>
                  <Link
                    href="/contact#servis"
                    className="inline-flex items-center gap-2 rounded-full border border-graphite-950/15 px-6 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-mist-100"
                  >
                    <Wrench size={15} />
                    Keşif talebi
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="section-pad bg-mist-50">
        <div className="container-page max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-graphite-950 sm:text-3xl">
            {data.name} · sık sorulan sorular
          </h2>
          <div className="mt-8 divide-y divide-mist-900/10 border-y border-mist-900/10">
            {faq.map((item) => (
              <div key={item.q} className="py-6">
                <h3 className="font-display text-base font-bold text-graphite-950 sm:text-lg">{item.q}</h3>
                <p className="mt-2.5 leading-relaxed text-mist-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aynı bölgedeki iller — iç bağlantı */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-volt-600" />
            <h2 className="font-display text-xl font-bold text-graphite-950">
              {data.region.name} bölgesindeki diğer iller
            </h2>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {sameRegion.map((p) => (
              <Link
                key={p.slug}
                href={`/gunes-potansiyeli/${p.slug}`}
                className="rounded-full border border-mist-900/10 bg-mist-50 px-4 py-2 text-sm font-medium text-graphite-800 transition-colors hover:border-volt-500/40 hover:text-volt-700"
              >
                {p.name}
              </Link>
            ))}
            <Link
              href="/gunes-potansiyeli"
              className="rounded-full bg-graphite-950 px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Tüm iller →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
