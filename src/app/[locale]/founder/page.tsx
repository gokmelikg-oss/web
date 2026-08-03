import type { Metadata } from 'next';
import { Quote, PenLine } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
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
    path: '/founder',
    title: 'Kurucumuzdan — Şimşek Grup Yolculuğu',
    description:
      "Şimşek Grup Kurucu & Başkanı Sinan Şimşek'ten: 1992'de Mersin'deki küçük bir atölyede başlayan yolculuğun hikâyesi.",
  });
}

/* Kurucunun mektubu — groupsimsek.com.tr'deki orijinal metin. */
const paragraphs = [
  'Her şey basit ama güçlü bir hedefle başladı: Doğru işi, en iyi şekilde yapmak.',
  "İlk günlerden itibaren odağımız kalite, güven ve sürdürülebilir üretim oldu. Kısa süre içinde yalnızca üretim yapan bir şirket olmaktan çıkıp, teknolojiyi anlayan, geliştiren ve sahada değer yaratan bir yapıya dönüştük. Solar termal sistemler ile attığımız ilk adım, markamızın Türkiye'de ve uluslararası pazarlarda nasıl bir yolculuğa çıkacağının da güçlü bir işaretiydi.",
  'Yıllar ilerledikçe sadece üretim kapasitemiz değil, etki alanımız da büyüdü. Türkiye genelinde kurduğumuz bayi ağımız, ardından gelişen ihracat faaliyetlerimiz, üretim süreçlerimizde gerçekleştirdiğimiz otomasyon yatırımları ve bugün gurur duyduğumuz modern üretim altyapımız bu yolculuğun kilometre taşları oldu. Attığımız her adım, bir öncekini daha ileri taşıyan uzun vadeli bir vizyonun parçasıydı.',
  'Büyümek beraberinde daha büyük sorumluluklar da getirir. Ülkemizin önemli projelerinde yer almak, ihtiyaç anlarında katkı sağlayabilmek ve toplumsal fayda üretmek bizim için her zaman ticari başarının ötesinde bir anlam taşıdı. Yaptığımız işin yalnızca bir sektör faaliyeti değil, aynı zamanda bir değer üretme süreci olduğuna inanıyoruz.',
  '2018 sonrasında ise daha güçlü, daha odaklı ve daha küresel bir dönüşüm sürecine girdik. Dijitalleşme yatırımlarımız, üretim teknolojilerimiz ve organizasyonel gelişimimiz ile şirketimizi uluslararası rekabete hazırladık. Bugün birçok ülkeye ulaşan ihracat ağımız, bu vizyonun doğru temeller üzerine kurulduğunu açıkça gösteriyor. Aynı zamanda grup şirketlerimizle üretimden sahaya kadar uzanan güçlü bir ekosistem oluşturduk.',
  '2026 yılı ise bizim için yeni bir dönemin başlangıcı. Grubumuzun geleceğini temsil eden yeni markamız ile enerji depolama, ısı pompası ve yenilenebilir enerji teknolojilerinde yeni bir sayfa açıyoruz. Artık hedefimiz yalnızca büyümek değil; sektörün gelişimine yön veren, standartları yükselten ve geleceğin enerji çözümlerine katkı sağlayan bir yapı olmak.',
  "Bugün geriye dönüp baktığımızda, 1992'de küçük bir atölyede başlayan yolculuğun aslında büyük bir vizyonun ilk adımı olduğunu çok daha net görüyoruz. Her yatırım, her karar ve her dönüm noktası bize aynı gerçeği hatırlatıyor:",
];

export default function FounderPage() {
  return (
    <>
      <PageBreadcrumb items={[{ name: 'Kurucumuzdan', path: '/founder' }]} />
      <PageHero
        eyebrow="Kurucumuzdan"
        title="Şimşek Grup Yolculuğu"
        subtitle="Kurucumuz ve Yönetim Kurulu Başkanımız Sinan Şimşek'ten, 1992'de küçük bir atölyede başlayan hikâyemiz."
      />
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            {/* Açılış alıntısı */}
            <Reveal>
              <figure className="relative rounded-3xl bg-graphite-gradient p-9 text-white sm:p-12">
                <Quote size={40} className="absolute -top-5 start-8 rounded-2xl bg-volt-500 p-2 text-graphite-950" aria-hidden />
                <blockquote className="mt-2 font-display text-xl font-semibold leading-relaxed sm:text-2xl">
                  &ldquo;Bizim için her şey 1992&apos;de Mersin&apos;deki küçük bir atölyede başladı. O atölyede
                  sadece birkaç makine yoktu; bugün Şimşek Grup&apos;un temellerini oluşturan cesaret,
                  emek ve büyük bir vizyon vardı.&rdquo;
                </blockquote>
              </figure>
            </Reveal>

            {/* Mektup gövdesi */}
            <div className="mt-12 space-y-7">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={Math.min(i * 0.04, 0.2)}>
                  <p className="text-pretty leading-[1.85] text-mist-800 first-letter:font-semibold">{p}</p>
                </Reveal>
              ))}
            </div>

            {/* Kapanış vurgusu */}
            <Reveal delay={0.1}>
              <div className="mt-12 border-s-2 border-volt-500 ps-6">
                <p className="font-display text-xl font-bold leading-relaxed text-graphite-950 sm:text-2xl">
                  Doğru iş, emek ve vizyon bir araya geldiğinde ortaya yalnızca başarı değil,
                  kalıcı bir değer çıkar.
                </p>
                <p className="mt-5 text-mist-700">Bu yolculuk devam ediyor.</p>
                <p className="mt-1 text-mist-700">Ve daha yazılacak çok hikâyemiz var.</p>
              </div>
            </Reveal>

            {/* İmza */}
            <Reveal delay={0.15}>
              <div className="mt-14 flex items-center gap-4 border-t border-mist-900/10 pt-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-volt-100 text-volt-700">
                  <PenLine size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-graphite-950">Sinan Şimşek</p>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-600">
                    Şimşek Grup Kurucu &amp; Başkanı
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
