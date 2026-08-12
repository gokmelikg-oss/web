import type { Locale } from '@/i18n/config';
import type { ProvinceData } from '@/data/provinces';

/* Güneş potansiyeli liste + il detay sayfalarının arayüz metinleri ve dinamik
   şablonları, dört dilde. İl/bölge adları özel isim olarak korunur; sayısal
   değerler `f` (locale'e göre biçimleyici) ile araya eklenir. */
export interface ProvincesUi {
  intlLocale: string;
  list: {
    crumb: string;
    hero: { eyebrow: string; title: string; subtitle: string };
    info: { title: string; body1: string; body2: string }[]; // 2 blok
    allTitle: string;
    allSubtitle: string;
    meta: { title: string; description: string };
  };
  tier: (r: number) => string;
  systemRec: (r: number) => string;
  statLabels: { unit: string; label: string }[]; // 4
  gepaNote: string;
  detail: {
    metaTitle: (name: string) => string;
    metaDesc: (name: string, rad: string, sun: string) => string;
    heroEyebrow: (region: string) => string;
    heroTitle: (name: string) => string;
    heroSubtitle: (name: string, rad: string, sun: string, tierWord: string) => string;
    sectionTitle: (name: string) => string;
    body1: (name: string, region: string, rad: string, sun: string, tierWord: string) => string;
    body2: (name: string) => string;
    recommendedTitle: string;
    quoteButton: (name: string) => string;
    surveyButton: string;
    faqTitle: (name: string) => string;
    sameRegionTitle: (region: string) => string;
    allProvincesLink: string;
  };
  faq: (data: ProvinceData, f: (n: number) => string) => { q: string; a: string }[];
  explorer: ExplorerLabels;
}

/* İl gezgini (client) etiketleri — {name} yer tutucusu client'ta değiştirilir. */
export interface ExplorerLabels {
  intlLocale: string;
  selectLabel: string;
  regionLabel: string;
  rec: [string, string, string, string]; // çok yüksek, yüksek, iyi, uygun
  title: string; // "{name} ..."
  statLabels: { unit: string; label: string }[];
  gepaNote: string;
  quoteButton: string; // "{name} ..."
  surveyButton: string;
}

const DATA: Record<Locale, ProvincesUi> = {
  tr: {
    intlLocale: 'tr-TR',
    list: {
      crumb: 'Güneş Potansiyeli',
      hero: {
        eyebrow: 'İllere Göre Güneş Potansiyeli',
        title: 'Bulunduğunuz ilde güneş ne kadar güçlü?',
        subtitle:
          'İlinizi seçin; yıllık güneş ışınımı, güneşlenme süresi ve güneş enerjili sıcak su sisteminizin tahmini üretimini anında görün. Türkiye’nin 81 ili için GEPA verilerine dayalı potansiyel rehberi.',
      },
      info: [
        {
          title: 'Güneş potansiyeli sistemi nasıl etkiler?',
          body1:
            'Bir bölgenin yıllık güneş ışınımı ne kadar yüksekse, güneş kollektörleri o kadar çok ısı üretir. Türkiye, güneş kuşağında yer alan ve yıllık ortalama güneşlenme süresi yüksek bir ülkedir; bu da güneş enerjili sıcak su sistemlerini hemen her ilde ekonomik kılar.',
          body2:
            'Güney illerinde açık devre paket sistemler yüksek verim sağlarken, kışın sıcaklığın düştüğü bölgelerde antifrizli kapalı devre sistemler ve destek ısıtma entegrasyonu ile dört mevsim kesintisiz sıcak su elde edilir.',
        },
        {
          title: 'Doğru sistemi birlikte belirleyelim',
          body1:
            'Bu araç bölgesel ortalamalara dayalı bir ön fikir verir. İlinize, çatınıza ve tüketiminize özel doğru kapasiteyi belirlemek için mühendislik ekibimiz ücretsiz saha keşfi ve projelendirme yapar.',
          body2:
            'Konut, toplu konut, kamu ve endüstriyel projelerde 30 yılı aşkın üretim ve saha tecrübemizle yanınızdayız.',
        },
      ],
      allTitle: 'İl il güneş potansiyeli',
      allSubtitle:
        'İlinizin detaylı güneş enerjisi potansiyelini, tahmini üretimini ve öneriler ile sık sorulan soruları görmek için seçin.',
      meta: {
        title: 'İllere Göre Güneş Enerjisi Potansiyeli — Türkiye Haritası',
        description:
          'İlinizi seçin; yıllık güneş ışınımı, güneşlenme süresi ve güneş enerjisiyle sıcak su sisteminizin tahmini üretimini görün. Türkiye’nin 81 ili için GEPA verilerine dayalı güneş potansiyeli rehberi.',
      },
    },
    tier: (r) => (r >= 1380 ? 'çok yüksek' : r >= 1280 ? 'yüksek' : r >= 1150 ? 'iyi' : 'uygun'),
    systemRec: (r) =>
      r >= 1280
        ? 'Açık devre paket sistemler yılın büyük bölümünde yüksek verimle çalışır. Toplu konut ve tesisler için merkezi sistemler ekonomik bir çözümdür.'
        : 'Kışın sıcaklığın düştüğü dönemler için antifrizli kapalı devre sistemler önerilir; destek ısıtma entegrasyonuyla dört mevsim kesintisiz sıcak su sağlanır.',
    statLabels: [
      { unit: 'kWh/m²·yıl', label: 'Yıllık güneş ışınımı' },
      { unit: 'saat/yıl', label: 'Güneşlenme süresi' },
      { unit: 'kWh/yıl', label: 'Tek hane tahmini üretim' },
      { unit: 'kg/yıl', label: 'Önlenen CO₂ (tek hane)' },
    ],
    gepaNote:
      'Değerler GEPA bölgesel ortalamalarına dayalı yaklaşık verilerdir. Tek hane hesabı ~2,5 m² ışınım alanlı paket sistem ve %50 sistem verimi varsayımıyla yapılmıştır.',
    detail: {
      metaTitle: (name) => `${name} Güneş Enerjisi Potansiyeli — Işınım ve Sıcak Su`,
      metaDesc: (name, rad, sun) =>
        `${name} yıllık ${rad} kWh/m² güneş ışınımı ve ${sun} saat güneşlenme süresine sahiptir. ${name}’de güneş enerjisiyle sıcak su sistemlerinin potansiyeli, tahmini üretim ve öneriler.`,
      heroEyebrow: (region) => `Güneş Potansiyeli · ${region}`,
      heroTitle: (name) => `${name}’de güneş enerjisi potansiyeli`,
      heroSubtitle: (name, rad, sun, tierWord) =>
        `${name}, yıllık ${rad} kWh/m² güneş ışınımı ve ${sun} saat güneşlenme süresiyle güneş enerjili sıcak su için ${tierWord} bir potansiyele sahiptir.`,
      sectionTitle: (name) => `${name}’de güneş enerjisi`,
      body1: (name, region, rad, sun, tierWord) =>
        `${name}, ${region} bölgesinde yer alır ve yıllık ortalama ${rad} kWh/m² güneş ışınımı alır. ${sun} saatlik güneşlenme süresiyle, güneş enerjili sıcak su sistemleri ${tierWord} verimle çalışır ve enerji faturasını önemli ölçüde azaltır.`,
      body2: (name) =>
        `Konut, toplu konut, kamu ve endüstriyel projelerde 30 yılı aşkın üretim ve saha tecrübemizle ${name} ve çevresinde güneş enerjisi çözümleri sunuyoruz.`,
      recommendedTitle: 'Önerilen sistem',
      quoteButton: (name) => `${name} için teklif alın`,
      surveyButton: 'Keşif talebi',
      faqTitle: (name) => `${name} · sık sorulan sorular`,
      sameRegionTitle: (region) => `${region} bölgesindeki diğer iller`,
      allProvincesLink: 'Tüm iller →',
    },
    faq: (data, f) => [
      {
        q: `${data.name}’de güneş enerjisiyle sıcak su üretmek verimli mi?`,
        a: `${data.name}, ${data.region.name} bölgesinde yıllık ortalama ${f(data.radiation)} kWh/m² güneş ışınımı alır. Bu, güneş enerjili sıcak su sistemleri için ${DATA.tr.tier(data.radiation)} bir potansiyel anlamına gelir; sistem yatırımı kendini kısa sürede amorti eder.`,
      },
      { q: `${data.name} için hangi güneş enerjisi sistemi uygundur?`, a: DATA.tr.systemRec(data.radiation) },
      {
        q: `${data.name}’de bir hane güneşten yılda ne kadar enerji üretir?`,
        a: `Yaklaşık 2,5 m² ışınım alanlı bir paket sistem, ${data.name}’de yılda tahmini ${f(data.homeAnnual)} kWh temiz ısı üretir ve doğal gaza kıyasla yaklaşık ${f(data.homeCo2)} kg CO₂ salımını önler.`,
      },
    ],
    explorer: {
      intlLocale: 'tr-TR',
      selectLabel: 'İlinizi seçin',
      regionLabel: 'Bölge',
      rec: [
        'Çok yüksek güneş potansiyeli. Paket ve merkezi sistemler yıl boyu yüksek verimle çalışır; yatırım geri dönüşü hızlıdır.',
        'Yüksek güneş potansiyeli. Güneş enerjili sıcak su sistemleri verimli çalışır; hem konut hem toplu projeler için uygundur.',
        'İyi güneş potansiyeli. Doğru boyutlandırma ve destek ısıtma entegrasyonuyla dört mevsim verimli sıcak su sağlanır.',
        'Uygun potansiyel. Kapalı devre (antifrizli) sistemler ve destek ısıtma ile kesintisiz sıcak su elde edilir.',
      ],
      title: '{name}’de güneş enerjisi potansiyeli',
      statLabels: [
        { unit: 'kWh/m²·yıl', label: 'Yıllık güneş ışınımı' },
        { unit: 'saat/yıl', label: 'Güneşlenme süresi' },
        { unit: 'kWh/yıl', label: 'Tek hane tahmini üretim' },
        { unit: 'kg/yıl', label: 'Önlenen CO₂ (tek hane)' },
      ],
      gepaNote:
        'Değerler GEPA bölgesel ortalamalarına dayalı yaklaşık verilerdir. Tek hane hesabı; ~2,5 m² ışınım alanlı paket sistem ve %50 sistem verimi varsayımıyla hesaplanmıştır. Kesin değer için ücretsiz saha keşfi öneririz.',
      quoteButton: '{name} için teklif alın',
      surveyButton: 'Keşif talebi',
    },
  },
  en: {
    intlLocale: 'en-US',
    list: {
      crumb: 'Solar Potential',
      hero: {
        eyebrow: 'Solar Potential by Province',
        title: 'How strong is the sun in your province?',
        subtitle:
          'Select your province and instantly see the annual solar irradiance, sunshine duration and the estimated output of your solar hot water system. A potential guide based on GEPA data for Türkiye’s 81 provinces.',
      },
      info: [
        {
          title: 'How does solar potential affect the system?',
          body1:
            'The higher a region’s annual solar irradiance, the more heat solar collectors produce. Türkiye lies in the sun belt and has a high annual average sunshine duration; this makes solar hot water systems economical in almost every province.',
          body2:
            'While open-loop package systems deliver high efficiency in the southern provinces, in regions where the temperature drops in winter, closed-loop systems with antifreeze and backup-heating integration provide uninterrupted hot water in all four seasons.',
        },
        {
          title: 'Let’s determine the right system together',
          body1:
            'This tool gives a preliminary idea based on regional averages. To determine the right capacity specific to your province, roof and consumption, our engineering team performs a free site survey and design.',
          body2:
            'We stand by you with over 30 years of manufacturing and field experience in residential, mass-housing, public and industrial projects.',
        },
      ],
      allTitle: 'Solar potential province by province',
      allSubtitle:
        'Select your province to see its detailed solar energy potential, estimated output, recommendations and frequently asked questions.',
      meta: {
        title: 'Solar Energy Potential by Province — Türkiye Map',
        description:
          'Select your province and see the annual solar irradiance, sunshine duration and the estimated output of your solar hot water system. A solar potential guide based on GEPA data for Türkiye’s 81 provinces.',
      },
    },
    tier: (r) => (r >= 1380 ? 'very high' : r >= 1280 ? 'high' : r >= 1150 ? 'good' : 'suitable'),
    systemRec: (r) =>
      r >= 1280
        ? 'Open-loop package systems run at high efficiency for most of the year. For mass housing and facilities, central systems are an economical solution.'
        : 'For periods when the temperature drops in winter, closed-loop systems with antifreeze are recommended; with backup-heating integration, uninterrupted hot water is provided in all four seasons.',
    statLabels: [
      { unit: 'kWh/m²·year', label: 'Annual solar irradiance' },
      { unit: 'hours/year', label: 'Sunshine duration' },
      { unit: 'kWh/year', label: 'Single-home estimated output' },
      { unit: 'kg/year', label: 'CO₂ avoided (single home)' },
    ],
    gepaNote:
      'The values are approximate data based on GEPA regional averages. The single-home calculation assumes a package system with ~2.5 m² of aperture area and 50% system efficiency.',
    detail: {
      metaTitle: (name) => `${name} Solar Energy Potential — Irradiance and Hot Water`,
      metaDesc: (name, rad, sun) =>
        `${name} has an annual solar irradiance of ${rad} kWh/m² and ${sun} hours of sunshine. The potential of solar hot water systems in ${name}, estimated output and recommendations.`,
      heroEyebrow: (region) => `Solar Potential · ${region}`,
      heroTitle: (name) => `Solar energy potential in ${name}`,
      heroSubtitle: (name, rad, sun, tierWord) =>
        `${name} has a ${tierWord} potential for solar hot water, with an annual solar irradiance of ${rad} kWh/m² and ${sun} hours of sunshine.`,
      sectionTitle: (name) => `Solar energy in ${name}`,
      body1: (name, region, rad, sun, tierWord) =>
        `${name} is located in the ${region} region and receives an annual average of ${rad} kWh/m² of solar irradiance. With ${sun} hours of sunshine, solar hot water systems run at ${tierWord} efficiency and significantly reduce the energy bill.`,
      body2: (name) =>
        `With over 30 years of manufacturing and field experience in residential, mass-housing, public and industrial projects, we provide solar energy solutions in ${name} and its surroundings.`,
      recommendedTitle: 'Recommended system',
      quoteButton: (name) => `Get a quote for ${name}`,
      surveyButton: 'Request a survey',
      faqTitle: (name) => `${name} · frequently asked questions`,
      sameRegionTitle: (region) => `Other provinces in the ${region} region`,
      allProvincesLink: 'All provinces →',
    },
    faq: (data, f) => [
      {
        q: `Is producing hot water with solar energy efficient in ${data.name}?`,
        a: `${data.name} receives an annual average of ${f(data.radiation)} kWh/m² of solar irradiance in the ${data.region.name} region. This means a ${DATA.en.tier(data.radiation)} potential for solar hot water systems; the system investment pays for itself in a short time.`,
      },
      { q: `Which solar energy system is suitable for ${data.name}?`, a: DATA.en.systemRec(data.radiation) },
      {
        q: `How much energy does a home in ${data.name} produce from the sun per year?`,
        a: `A package system with about 2.5 m² of aperture area produces an estimated ${f(data.homeAnnual)} kWh of clean heat per year in ${data.name} and avoids about ${f(data.homeCo2)} kg of CO₂ emissions compared with natural gas.`,
      },
    ],
    explorer: {
      intlLocale: 'en-US',
      selectLabel: 'Select your province',
      regionLabel: 'Region',
      rec: [
        'Very high solar potential. Package and central systems run at high efficiency all year; the return on investment is fast.',
        'High solar potential. Solar hot water systems run efficiently; suitable for both residential and large projects.',
        'Good solar potential. With correct sizing and backup-heating integration, efficient hot water is provided in all four seasons.',
        'Suitable potential. With closed-loop (antifreeze) systems and backup heating, uninterrupted hot water is obtained.',
      ],
      title: 'Solar energy potential in {name}',
      statLabels: [
        { unit: 'kWh/m²·year', label: 'Annual solar irradiance' },
        { unit: 'hours/year', label: 'Sunshine duration' },
        { unit: 'kWh/year', label: 'Single-home estimated output' },
        { unit: 'kg/year', label: 'CO₂ avoided (single home)' },
      ],
      gepaNote:
        'The values are approximate data based on GEPA regional averages. The single-home calculation assumes a package system with ~2.5 m² of aperture area and 50% system efficiency. For an exact value, we recommend a free site survey.',
      quoteButton: 'Get a quote for {name}',
      surveyButton: 'Request a survey',
    },
  },
  ar: {
    intlLocale: 'ar-EG-u-nu-latn',
    list: {
      crumb: 'الإمكان الشمسي',
      hero: {
        eyebrow: 'الإمكان الشمسي حسب المحافظة',
        title: 'ما مدى قوة الشمس في محافظتكم؟',
        subtitle:
          'اختاروا محافظتكم وشاهدوا فوراً الإشعاع الشمسي السنوي وساعات السطوع والإنتاج التقديري لنظام الماء الساخن الشمسي لديكم. دليل إمكان يستند إلى بيانات GEPA لـ 81 محافظة في تركيا.',
      },
      info: [
        {
          title: 'كيف يؤثّر الإمكان الشمسي في النظام؟',
          body1:
            'كلما ارتفع الإشعاع الشمسي السنوي لمنطقة، زادت الحرارة التي تنتجها المجمعات الشمسية. تقع تركيا في الحزام الشمسي ولديها متوسط ساعات سطوع سنوي مرتفع؛ وهذا يجعل أنظمة الماء الساخن الشمسية اقتصادية في كل محافظة تقريباً.',
          body2:
            'بينما توفّر الأنظمة الجاهزة مفتوحة الدائرة كفاءة عالية في المحافظات الجنوبية، ففي المناطق التي تنخفض فيها الحرارة شتاءً توفّر الأنظمة المغلقة الدائرة بمانع تجمّد وتكامل التدفئة الاحتياطية ماءً ساخناً دون انقطاع في الفصول الأربعة.',
        },
        {
          title: 'لنحدّد النظام المناسب معاً',
          body1:
            'تعطي هذه الأداة فكرة أولية تستند إلى المتوسطات الإقليمية. لتحديد السعة المناسبة الخاصة بمحافظتكم وسطحكم واستهلاككم، يُجري فريقنا الهندسي مسحاً ميدانياً وتصميماً مجاناً.',
          body2:
            'نقف إلى جانبكم بخبرة تتجاوز 30 عاماً في التصنيع والميدان في المشاريع السكنية والإسكان الجماعي والعامة والصناعية.',
        },
      ],
      allTitle: 'الإمكان الشمسي محافظةً محافظة',
      allSubtitle:
        'اختاروا محافظتكم لرؤية إمكانها الشمسي المفصّل وإنتاجها التقديري والتوصيات والأسئلة الشائعة.',
      meta: {
        title: 'الإمكان الشمسي حسب المحافظة — خريطة تركيا',
        description:
          'اختاروا محافظتكم وشاهدوا الإشعاع الشمسي السنوي وساعات السطوع والإنتاج التقديري لنظام الماء الساخن الشمسي. دليل إمكان شمسي يستند إلى بيانات GEPA لـ 81 محافظة في تركيا.',
      },
    },
    tier: (r) => (r >= 1380 ? 'عالٍ جداً' : r >= 1280 ? 'عالٍ' : r >= 1150 ? 'جيد' : 'مناسب'),
    systemRec: (r) =>
      r >= 1280
        ? 'تعمل الأنظمة الجاهزة مفتوحة الدائرة بكفاءة عالية في معظم أيام السنة. وللإسكان الجماعي والمنشآت، تُعد الأنظمة المركزية حلاً اقتصادياً.'
        : 'للفترات التي تنخفض فيها الحرارة شتاءً يُوصى بالأنظمة المغلقة الدائرة بمانع تجمّد؛ ومع تكامل التدفئة الاحتياطية يُوفَّر ماء ساخن دون انقطاع في الفصول الأربعة.',
    statLabels: [
      { unit: 'kWh/m²·سنة', label: 'الإشعاع الشمسي السنوي' },
      { unit: 'ساعة/سنة', label: 'ساعات السطوع' },
      { unit: 'kWh/سنة', label: 'الإنتاج التقديري لمنزل واحد' },
      { unit: 'kg/سنة', label: 'CO₂ متجنَّب (منزل واحد)' },
    ],
    gepaNote:
      'القيم بيانات تقريبية تستند إلى متوسطات GEPA الإقليمية. حساب المنزل الواحد يفترض نظاماً جاهزاً بمساحة إشعاع نحو 2.5 م² وكفاءة نظام 50%.',
    detail: {
      metaTitle: (name) => `الإمكان الشمسي في ${name} — الإشعاع والماء الساخن`,
      metaDesc: (name, rad, sun) =>
        `تتمتع ${name} بإشعاع شمسي سنوي قدره ${rad} kWh/m² و${sun} ساعة سطوع. إمكان أنظمة الماء الساخن الشمسية في ${name}، والإنتاج التقديري والتوصيات.`,
      heroEyebrow: (region) => `الإمكان الشمسي · ${region}`,
      heroTitle: (name) => `الإمكان الشمسي في ${name}`,
      heroSubtitle: (name, rad, sun, tierWord) =>
        `تتمتع ${name} بإمكان ${tierWord} للماء الساخن الشمسي، بإشعاع شمسي سنوي قدره ${rad} kWh/m² و${sun} ساعة سطوع.`,
      sectionTitle: (name) => `الطاقة الشمسية في ${name}`,
      body1: (name, region, rad, sun, tierWord) =>
        `تقع ${name} في منطقة ${region} وتتلقى متوسطاً سنوياً قدره ${rad} kWh/m² من الإشعاع الشمسي. وبـ${sun} ساعة سطوع، تعمل أنظمة الماء الساخن الشمسية بكفاءة ${tierWord} وتخفّض فاتورة الطاقة بشكل كبير.`,
      body2: (name) =>
        `بخبرة تتجاوز 30 عاماً في التصنيع والميدان في المشاريع السكنية والإسكان الجماعي والعامة والصناعية، نقدّم حلول الطاقة الشمسية في ${name} وما حولها.`,
      recommendedTitle: 'النظام الموصى به',
      quoteButton: (name) => `اطلبوا عرضاً لـ ${name}`,
      surveyButton: 'طلب مسح',
      faqTitle: (name) => `${name} · الأسئلة الشائعة`,
      sameRegionTitle: (region) => `محافظات أخرى في منطقة ${region}`,
      allProvincesLink: 'كل المحافظات →',
    },
    faq: (data, f) => [
      {
        q: `هل إنتاج الماء الساخن بالطاقة الشمسية فعّال في ${data.name}؟`,
        a: `تتلقى ${data.name} متوسطاً سنوياً قدره ${f(data.radiation)} kWh/m² من الإشعاع الشمسي في منطقة ${data.region.name}. وهذا يعني إمكاناً ${DATA.ar.tier(data.radiation)} لأنظمة الماء الساخن الشمسية؛ ويسترد استثمار النظام تكلفته في وقت قصير.`,
      },
      { q: `أي نظام طاقة شمسية يناسب ${data.name}؟`, a: DATA.ar.systemRec(data.radiation) },
      {
        q: `كم طاقة ينتجها منزل في ${data.name} من الشمس سنوياً؟`,
        a: `ينتج نظام جاهز بمساحة إشعاع نحو 2.5 م² نحو ${f(data.homeAnnual)} kWh من الحرارة النظيفة سنوياً في ${data.name} ويتجنّب نحو ${f(data.homeCo2)} kg من انبعاثات CO₂ مقارنة بالغاز الطبيعي.`,
      },
    ],
    explorer: {
      intlLocale: 'ar-EG-u-nu-latn',
      selectLabel: 'اختاروا محافظتكم',
      regionLabel: 'المنطقة',
      rec: [
        'إمكان شمسي عالٍ جداً. تعمل الأنظمة الجاهزة والمركزية بكفاءة عالية طوال العام؛ وعائد الاستثمار سريع.',
        'إمكان شمسي عالٍ. تعمل أنظمة الماء الساخن الشمسية بكفاءة؛ وهي مناسبة للمساكن والمشاريع الكبيرة على حد سواء.',
        'إمكان شمسي جيد. بالتحجيم الصحيح وتكامل التدفئة الاحتياطية يُوفَّر ماء ساخن فعّال في الفصول الأربعة.',
        'إمكان مناسب. بالأنظمة المغلقة الدائرة (بمانع تجمّد) والتدفئة الاحتياطية يُحصَل على ماء ساخن دون انقطاع.',
      ],
      title: 'الإمكان الشمسي في {name}',
      statLabels: [
        { unit: 'kWh/m²·سنة', label: 'الإشعاع الشمسي السنوي' },
        { unit: 'ساعة/سنة', label: 'ساعات السطوع' },
        { unit: 'kWh/سنة', label: 'الإنتاج التقديري لمنزل واحد' },
        { unit: 'kg/سنة', label: 'CO₂ متجنَّب (منزل واحد)' },
      ],
      gepaNote:
        'القيم بيانات تقريبية تستند إلى متوسطات GEPA الإقليمية. حساب المنزل الواحد يفترض نظاماً جاهزاً بمساحة إشعاع نحو 2.5 م² وكفاءة نظام 50%. للحصول على قيمة دقيقة نوصي بمسح ميداني مجاني.',
      quoteButton: 'اطلبوا عرضاً لـ {name}',
      surveyButton: 'طلب مسح',
    },
  },
  el: {
    intlLocale: 'el-GR',
    list: {
      crumb: 'Ηλιακό Δυναμικό',
      hero: {
        eyebrow: 'Ηλιακό Δυναμικό ανά Επαρχία',
        title: 'Πόσο δυνατός είναι ο ήλιος στην επαρχία σας;',
        subtitle:
          'Επιλέξτε την επαρχία σας και δείτε αμέσως την ετήσια ηλιακή ακτινοβολία, τη διάρκεια ηλιοφάνειας και την εκτιμώμενη παραγωγή του ηλιακού συστήματος ζεστού νερού σας. Ένας οδηγός δυναμικού βασισμένος σε δεδομένα GEPA για τις 81 επαρχίες της Τουρκίας.',
      },
      info: [
        {
          title: 'Πώς επηρεάζει το ηλιακό δυναμικό το σύστημα;',
          body1:
            'Όσο υψηλότερη είναι η ετήσια ηλιακή ακτινοβολία μιας περιοχής, τόσο περισσότερη θερμότητα παράγουν οι ηλιακοί συλλέκτες. Η Τουρκία βρίσκεται στη ζώνη του ήλιου και έχει υψηλή ετήσια μέση διάρκεια ηλιοφάνειας· αυτό καθιστά τα ηλιακά συστήματα ζεστού νερού οικονομικά σχεδόν σε κάθε επαρχία.',
          body2:
            'Ενώ τα ολοκληρωμένα συστήματα ανοιχτού κυκλώματος προσφέρουν υψηλή απόδοση στις νότιες επαρχίες, σε περιοχές όπου η θερμοκρασία πέφτει τον χειμώνα, τα συστήματα κλειστού κυκλώματος με αντιψυκτικό και η ενσωμάτωση εφεδρικής θέρμανσης προσφέρουν αδιάλειπτο ζεστό νερό και στις τέσσερις εποχές.',
        },
        {
          title: 'Ας καθορίσουμε το σωστό σύστημα μαζί',
          body1:
            'Αυτό το εργαλείο δίνει μια προκαταρκτική ιδέα βάσει περιφερειακών μέσων όρων. Για τον καθορισμό της σωστής χωρητικότητας ειδικά για την επαρχία, τη στέγη και την κατανάλωσή σας, η ομάδα μηχανικής μας πραγματοποιεί δωρεάν επιτόπια μελέτη και σχεδιασμό.',
          body2:
            'Στεκόμαστε στο πλευρό σας με πάνω από 30 χρόνια εμπειρίας στην παραγωγή και το πεδίο σε οικιακά, μαζικής κατοικίας, δημόσια και βιομηχανικά έργα.',
        },
      ],
      allTitle: 'Ηλιακό δυναμικό επαρχία προς επαρχία',
      allSubtitle:
        'Επιλέξτε την επαρχία σας για να δείτε το λεπτομερές ηλιακό δυναμικό της, την εκτιμώμενη παραγωγή, τις συστάσεις και τις συχνές ερωτήσεις.',
      meta: {
        title: 'Ηλιακό Ενεργειακό Δυναμικό ανά Επαρχία — Χάρτης Τουρκίας',
        description:
          'Επιλέξτε την επαρχία σας και δείτε την ετήσια ηλιακή ακτινοβολία, τη διάρκεια ηλιοφάνειας και την εκτιμώμενη παραγωγή του ηλιακού συστήματος ζεστού νερού σας. Οδηγός ηλιακού δυναμικού βάσει δεδομένων GEPA για τις 81 επαρχίες της Τουρκίας.',
      },
    },
    tier: (r) => (r >= 1380 ? 'πολύ υψηλό' : r >= 1280 ? 'υψηλό' : r >= 1150 ? 'καλό' : 'κατάλληλο'),
    systemRec: (r) =>
      r >= 1280
        ? 'Τα ολοκληρωμένα συστήματα ανοιχτού κυκλώματος λειτουργούν με υψηλή απόδοση το μεγαλύτερο μέρος του έτους. Για μαζικές κατοικίες και εγκαταστάσεις, τα κεντρικά συστήματα αποτελούν οικονομική λύση.'
        : 'Για τις περιόδους που η θερμοκρασία πέφτει τον χειμώνα, συνιστώνται συστήματα κλειστού κυκλώματος με αντιψυκτικό· με ενσωμάτωση εφεδρικής θέρμανσης παρέχεται αδιάλειπτο ζεστό νερό και στις τέσσερις εποχές.',
    statLabels: [
      { unit: 'kWh/m²·έτος', label: 'Ετήσια ηλιακή ακτινοβολία' },
      { unit: 'ώρες/έτος', label: 'Διάρκεια ηλιοφάνειας' },
      { unit: 'kWh/έτος', label: 'Εκτιμώμενη παραγωγή ενός σπιτιού' },
      { unit: 'kg/έτος', label: 'CO₂ που αποφεύγεται (ένα σπίτι)' },
    ],
    gepaNote:
      'Οι τιμές είναι κατά προσέγγιση δεδομένα βάσει περιφερειακών μέσων όρων GEPA. Ο υπολογισμός ενός σπιτιού υποθέτει ολοκληρωμένο σύστημα με ~2,5 m² επιφάνειας απορρόφησης και 50% απόδοση συστήματος.',
    detail: {
      metaTitle: (name) => `Ηλιακό Ενεργειακό Δυναμικό ${name} — Ακτινοβολία και Ζεστό Νερό`,
      metaDesc: (name, rad, sun) =>
        `Η ${name} έχει ετήσια ηλιακή ακτινοβολία ${rad} kWh/m² και ${sun} ώρες ηλιοφάνειας. Το δυναμικό των ηλιακών συστημάτων ζεστού νερού στην ${name}, εκτιμώμενη παραγωγή και συστάσεις.`,
      heroEyebrow: (region) => `Ηλιακό Δυναμικό · ${region}`,
      heroTitle: (name) => `Ηλιακό ενεργειακό δυναμικό στην ${name}`,
      heroSubtitle: (name, rad, sun, tierWord) =>
        `Η ${name} έχει ${tierWord} δυναμικό για ηλιακό ζεστό νερό, με ετήσια ηλιακή ακτινοβολία ${rad} kWh/m² και ${sun} ώρες ηλιοφάνειας.`,
      sectionTitle: (name) => `Ηλιακή ενέργεια στην ${name}`,
      body1: (name, region, rad, sun, tierWord) =>
        `Η ${name} βρίσκεται στην περιοχή ${region} και δέχεται ετήσιο μέσο όρο ${rad} kWh/m² ηλιακής ακτινοβολίας. Με ${sun} ώρες ηλιοφάνειας, τα ηλιακά συστήματα ζεστού νερού λειτουργούν με ${tierWord} απόδοση και μειώνουν σημαντικά τον λογαριασμό ενέργειας.`,
      body2: (name) =>
        `Με πάνω από 30 χρόνια εμπειρίας στην παραγωγή και το πεδίο σε οικιακά, μαζικής κατοικίας, δημόσια και βιομηχανικά έργα, προσφέρουμε λύσεις ηλιακής ενέργειας στην ${name} και τη γύρω περιοχή.`,
      recommendedTitle: 'Προτεινόμενο σύστημα',
      quoteButton: (name) => `Ζητήστε προσφορά για ${name}`,
      surveyButton: 'Αίτημα μελέτης',
      faqTitle: (name) => `${name} · συχνές ερωτήσεις`,
      sameRegionTitle: (region) => `Άλλες επαρχίες στην περιοχή ${region}`,
      allProvincesLink: 'Όλες οι επαρχίες →',
    },
    faq: (data, f) => [
      {
        q: `Είναι αποδοτική η παραγωγή ζεστού νερού με ηλιακή ενέργεια στην ${data.name};`,
        a: `Η ${data.name} δέχεται ετήσιο μέσο όρο ${f(data.radiation)} kWh/m² ηλιακής ακτινοβολίας στην περιοχή ${data.region.name}. Αυτό σημαίνει ${DATA.el.tier(data.radiation)} δυναμικό για ηλιακά συστήματα ζεστού νερού· η επένδυση στο σύστημα αποσβένεται σε σύντομο χρόνο.`,
      },
      { q: `Ποιο ηλιακό σύστημα είναι κατάλληλο για την ${data.name};`, a: DATA.el.systemRec(data.radiation) },
      {
        q: `Πόση ενέργεια παράγει ένα σπίτι στην ${data.name} από τον ήλιο ετησίως;`,
        a: `Ένα ολοκληρωμένο σύστημα με περίπου 2,5 m² επιφάνειας απορρόφησης παράγει εκτιμώμενα ${f(data.homeAnnual)} kWh καθαρής θερμότητας ετησίως στην ${data.name} και αποφεύγει περίπου ${f(data.homeCo2)} kg εκπομπών CO₂ σε σύγκριση με το φυσικό αέριο.`,
      },
    ],
    explorer: {
      intlLocale: 'el-GR',
      selectLabel: 'Επιλέξτε την επαρχία σας',
      regionLabel: 'Περιοχή',
      rec: [
        'Πολύ υψηλό ηλιακό δυναμικό. Τα ολοκληρωμένα και κεντρικά συστήματα λειτουργούν με υψηλή απόδοση όλο τον χρόνο· η απόσβεση της επένδυσης είναι γρήγορη.',
        'Υψηλό ηλιακό δυναμικό. Τα ηλιακά συστήματα ζεστού νερού λειτουργούν αποδοτικά· κατάλληλα τόσο για κατοικίες όσο και για μεγάλα έργα.',
        'Καλό ηλιακό δυναμικό. Με σωστή διαστασιολόγηση και ενσωμάτωση εφεδρικής θέρμανσης παρέχεται αποδοτικό ζεστό νερό και στις τέσσερις εποχές.',
        'Κατάλληλο δυναμικό. Με συστήματα κλειστού κυκλώματος (με αντιψυκτικό) και εφεδρική θέρμανση επιτυγχάνεται αδιάλειπτο ζεστό νερό.',
      ],
      title: 'Ηλιακό ενεργειακό δυναμικό στην {name}',
      statLabels: [
        { unit: 'kWh/m²·έτος', label: 'Ετήσια ηλιακή ακτινοβολία' },
        { unit: 'ώρες/έτος', label: 'Διάρκεια ηλιοφάνειας' },
        { unit: 'kWh/έτος', label: 'Εκτιμώμενη παραγωγή ενός σπιτιού' },
        { unit: 'kg/έτος', label: 'CO₂ που αποφεύγεται (ένα σπίτι)' },
      ],
      gepaNote:
        'Οι τιμές είναι κατά προσέγγιση δεδομένα βάσει περιφερειακών μέσων όρων GEPA. Ο υπολογισμός ενός σπιτιού υποθέτει ολοκληρωμένο σύστημα με ~2,5 m² επιφάνειας απορρόφησης και 50% απόδοση. Για ακριβή τιμή, συνιστούμε δωρεάν επιτόπια μελέτη.',
      quoteButton: 'Ζητήστε προσφορά για {name}',
      surveyButton: 'Αίτημα μελέτης',
    },
  },
};

export function getProvincesUi(locale: string): ProvincesUi {
  return DATA[locale as Locale] ?? DATA.tr;
}
