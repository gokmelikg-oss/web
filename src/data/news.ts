/* Blog / Bilgi Merkezi içerikleri. Evergreen, doğru ve SEO odaklı eğitici yazılar.
   Ortak alanlar (slug, tarih, kapak, anahtar kelime) bir kez tanımlanır; çevrilebilir
   alanlar (başlık, özet, kategori, gövde) her dil için ayrı tutulur. Slug'lar tüm
   dillerde aynıdır (URL kararlılığı + admin tohumlama için). Eksik dil tr'ye düşer. */

import type { Locale } from '@/i18n/config';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readMin: number;
  cover?: string;
  keywords: string[];
  body: { heading: string; paragraphs: string[] }[];
}

type ArticleText = Pick<Article, 'title' | 'excerpt' | 'category' | 'body'>;

/* Dile bağımsız ortak alanlar — sıralama blog listelemesini belirler. */
const META: { slug: string; date: string; readMin: number; cover?: string; keywords: string[] }[] = [
  {
    slug: 'gunes-kollektoru-turleri-duz-yuzeyli-vakum-tuplu',
    date: '2026-07-28',
    readMin: 5,
    cover: '/products/orion-400.jpg',
    keywords: ['güneş kollektörü türleri', 'düz yüzeyli kollektör', 'vakum tüplü kollektör', 'flat plate kollektör', 'kollektör karşılaştırma'],
  },
  {
    slug: 'gunes-kollektoru-verimini-etkileyen-faktorler',
    date: '2026-07-22',
    readMin: 5,
    cover: '/products/orion-600.jpg',
    keywords: ['güneş kollektörü verimi', 'kollektör eğimi ve yönü', 'selektif absorber', 'sistem verimi', 'güneş ışınımı'],
  },
  {
    slug: 'gunes-enerjisiyle-sicak-su-nasil-uretilir',
    date: '2026-07-15',
    readMin: 4,
    cover: '/products/orion-500.jpg',
    keywords: ['güneş enerjisi ile sıcak su', 'güneş termal', 'güneş kollektörü', 'nasıl çalışır'],
  },
  {
    slug: 'toplu-konut-merkezi-gunes-enerjisi-sistemleri',
    date: '2026-06-28',
    readMin: 5,
    cover: '/products/merkezi-sistem-saha.jpg',
    keywords: ['TOKİ güneş enerjisi', 'merkezi güneş enerjisi sistemi', 'toplu konut sıcak su', 'kamu projeleri'],
  },
  {
    slug: 'dogru-boyler-kapasitesi-nasil-secilir',
    date: '2026-06-10',
    readMin: 3,
    cover: '/products/aquarious-740.jpg',
    keywords: ['boyler kapasitesi', 'emayeli boyler', 'sıcak su boyleri', 'boyler seçimi'],
  },
  {
    slug: 'solar-keymark-nedir-neden-onemli',
    date: '2026-05-22',
    readMin: 3,
    cover: '/products/orion-400.jpg',
    keywords: ['Solar Keymark', 'güneş kollektörü sertifikası', 'kalite belgesi', 'CE TSE'],
  },
  {
    slug: 'gunes-enerjisi-sisteminin-bakimi-6-ipucu',
    date: '2026-05-05',
    readMin: 4,
    cover: '/products/fabrika-1.jpg',
    keywords: ['güneş enerjisi bakım', 'kollektör temizliği', 'solar sıvı', 'sistem verimi'],
  },
];

const tr: Record<string, ArticleText> = {
  'gunes-kollektoru-turleri-duz-yuzeyli-vakum-tuplu': {
    title: 'Güneş kollektörü türleri: düz yüzeyli ve vakum tüplü',
    excerpt:
      'Düz yüzeyli (flat plate) ve vakum tüplü güneş kollektörlerinin yapısı, avantajları ve hangi iklimde hangisinin daha uygun olduğu üzerine karşılaştırmalı bir rehber.',
    category: 'Rehber',
    body: [
      {
        heading: 'İki temel kollektör tipi',
        paragraphs: [
          'Güneş termal sistemlerde en yaygın iki kollektör tipi vardır: düz yüzeyli (flat plate) kollektörler ve vakum tüplü (evacuated tube) kollektörler. İkisi de güneş ışınımını ısıya çevirir; farkları yapılarında, verim eğrilerinde ve maliyetlerindedir.',
        ],
      },
      {
        heading: 'Düz yüzeyli (flat plate) kollektör',
        paragraphs: [
          'Düz yüzeyli kollektör; temperli camla kapatılmış, yalıtımlı bir kasa içine yerleştirilmiş koyu renkli bir absorber plaka ve bu plakaya bağlı akışkan borularından oluşur. Absorber güneşi emer, borulardaki suyu ya da solar sıvıyı ısıtır.',
          'Sağlam yapısı, yüksek dayanıklılığı ve uygun maliyetiyle Türkiye gibi güneşlenme süresi yüksek ülkelerde en çok tercih edilen tiptir. Şimşek Solar’ın Orion serisi kollektörleri düz yüzeyli teknolojiyle üretilir; boru ve absorber kombinasyonuna göre farklı serilerle sunulur.',
        ],
      },
      {
        heading: 'Vakum tüplü (evacuated tube) kollektör',
        paragraphs: [
          'Vakum tüplü kollektörlerde absorber, havası boşaltılmış (vakumlanmış) cam tüplerin içindedir. Vakum, ısı kaybını azalttığı için düşük dış sıcaklıklarda ve düşük ışınımda düz yüzeyliye göre avantaj sağlayabilir.',
          'Ancak cam tüpler dolu, kar yükü ve darbelere karşı düz yüzeyli kadar dayanıklı değildir ve maliyeti genelde daha yüksektir. Çok soğuk ve bulutlu iklimlerde öne çıkar.',
        ],
      },
      {
        heading: 'Hangisi sizin için uygun?',
        paragraphs: [
          'Türkiye’nin büyük bölümünde yüksek güneşlenme süresi nedeniyle düz yüzeyli kollektörler hem verim hem maliyet açısından en dengeli çözümdür. Çok soğuk bölgelerde antifrizli kapalı devre düz yüzeyli sistemler, destek ısıtmayla birlikte dört mevsim yüksek performans verir.',
          'İlinizin güneş potansiyelini “İllere Göre Güneş Potansiyeli” aracımızdan görebilir, doğru kollektör ve kapasiteyi mühendislik ekibimizle birlikte belirleyebilirsiniz.',
        ],
      },
    ],
  },
  'gunes-kollektoru-verimini-etkileyen-faktorler': {
    title: 'Güneş kollektörü verimini etkileyen faktörler',
    excerpt:
      'Yönlenim, eğim, ışınım, absorber yüzeyi, yalıtım, gölgelenme ve bakım gibi güneş kollektörü veriminizi belirleyen faktörler ve maksimum performans için öneriler.',
    category: 'Teknik',
    body: [
      {
        heading: 'Yönlenim ve eğim',
        paragraphs: [
          'Kollektörün en yüksek verimi, güneşi en dik açıyla gördüğü konumda elde edilir. Türkiye için kollektörler genellikle güneye bakacak şekilde ve bölgeye uygun bir eğimle (çoğunlukla 30–45°) yerleştirilir. Yanlış yönlenim ve eğim, yıllık üretimi belirgin biçimde düşürür.',
        ],
      },
      {
        heading: 'Bölgesel güneş ışınımı',
        paragraphs: [
          'Bir bölgenin yıllık toplam güneş ışınımı (kWh/m²) ve güneşlenme süresi, üretilecek ısıyı doğrudan belirler. Güney illeri daha yüksek potansiyele sahiptir; ancak doğru tasarımla hemen her ilde güneş enerjisi ekonomiktir. İlinizin değerlerini güneş potansiyeli aracımızdan görebilirsiniz.',
        ],
      },
      {
        heading: 'Absorber yüzeyi ve yalıtım',
        paragraphs: [
          'Selektif absorber kaplaması, güneşi yüksek oranda emerken ısı yayımını (kaybı) azaltır; bu da düz yüzeyli kollektörlerde verimi ciddi biçimde artırır. Kasadaki taş yünü/yalıtım malzemesi de depolanan ısının korunmasını sağlar.',
          'Boyler tarafında ise emaye kaplama ve yüksek yalıtım, ısıtılan suyun uzun süre sıcak kalmasını sağlayarak sistem verimini tamamlar.',
        ],
      },
      {
        heading: 'Gölgelenme, bakım ve sistem tasarımı',
        paragraphs: [
          'Gün içinde kollektör üzerine düşen gölge (ağaç, baca, komşu bina) üretimi düşürür; montaj öncesi saha etüdüyle gölgelenme analizi yapılır. Kollektör yüzeyindeki toz ve kir de verimi azaltır; periyodik temizlik ve bakım performansı korur.',
          'Son olarak, doğru boyutlandırma kritiktir: ihtiyaca göre az veya fazla kapasite verimi düşürür. Kapasite hesabı ve projelendirmeyi mühendislik ekibimiz üstlenir; bakım ihtiyaçlarınızda satış sonrası servisimiz yanınızdadır.',
        ],
      },
    ],
  },
  'gunes-enerjisiyle-sicak-su-nasil-uretilir': {
    title: 'Güneş enerjisiyle sıcak su nasıl üretilir?',
    excerpt:
      'Güneş termal sistemlerin çalışma prensibi: kollektör, boyler ve dolaşım hattının suyu elektrik veya gaz kullanmadan nasıl ısıttığını adım adım anlatıyoruz.',
    category: 'Rehber',
    body: [
      {
        heading: 'Temel prensip',
        paragraphs: [
          'Güneş termal sistemler, güneş ışınımını doğrudan ısıya çevirir. Çatıya yerleştirilen güneş kollektörlerinin içindeki koyu renkli absorber yüzeyi güneş enerjisini emer ve içinden geçen sıvıyı ısıtır. Bu ısı, yalıtımlı bir boylerde depolanan suya aktarılır.',
          'Fotovoltaik (PV) panellerden farklı olarak termal sistemler elektrik üretmez; enerjiyi doğrudan sıcak su olarak sunar. Bu da onları sıcak su ihtiyacında çok daha yüksek verimli kılar.',
        ],
      },
      {
        heading: 'Sistemin bileşenleri',
        paragraphs: [
          'Bir güneş enerjisi sıcak su sistemi üç ana bileşenden oluşur: güneşi toplayan kollektör, ısıyı depolayan emayeli boyler ve ikisi arasında sıvıyı dolaştıran bağlantı hattı ile emniyet ekipmanları.',
          'Kapalı devre sistemlerde kollektörde antifrizli solar sıvı dolaşır; bu sıvı boylerdeki serpantin aracılığıyla kullanım suyunu ısıtır. Böylece donma riski olan bölgelerde de dört mevsim güvenle çalışır.',
        ],
      },
      {
        heading: 'Güneşsiz günlerde ne olur?',
        paragraphs: [
          'Bulutlu günlerde veya kışın, sistem mevcut kombi/kazan ile entegre çalışır. Güneşten gelen ön ısıtma sayesinde destek ısıtıcının harcadığı enerji ciddi biçimde azalır; kesintisiz sıcak su sağlanır.',
        ],
      },
    ],
  },
  'toplu-konut-merkezi-gunes-enerjisi-sistemleri': {
    title: 'TOKİ ve toplu konutlarda merkezi güneş enerjisi sistemleri',
    excerpt:
      'Yüzlerce dairenin sıcak su ihtiyacını tek merkezden karşılayan kollektör tarlası + merkezi boyler mimarisi ve kamu projelerinde sağladığı avantajlar.',
    category: 'Teknik',
    body: [
      {
        heading: 'Merkezi sistem nedir?',
        paragraphs: [
          'Merkezi sistemlerde her daireye ayrı bir sistem kurmak yerine, blok çatısına kurulan geniş bir kollektör tarlası ve merkezi boyler grubu tüm binanın sıcak suyunu üretir. Bu yaklaşım, toplu konut, yurt, cezaevi, hastane ve askeri tesis gibi yoğun kullanımlı yapılarda hem maliyet hem de verim açısından öne çıkar.',
        ],
      },
      {
        heading: 'Neden toplu projelerde tercih edilir?',
        paragraphs: [
          'Merkezi çözüm; ortak bakım, tek noktadan izleme ve ölçek ekonomisi sağlar. Çatı alanı verimli kullanılır, dairelere müdahale gerekmez ve sistem profesyonel ekiplerce tek elden yönetilir.',
          'Şimşek Solar, Türkiye genelinde yüz binlerce kollektörle toplu konut ve kamu projelerinde merkezi sistemler kurmuştur. Projeye özel statik hesap, kapasite tasarımı ve otomasyon entegrasyonu mühendislik ekibince hazırlanır.',
        ],
      },
      {
        heading: 'Otomasyon ve izleme',
        paragraphs: [
          'Merkezi sistemler, otomasyon panoları ve kontrol üniteleriyle akıllı yönetilir. Sıcaklık, pompa durumu ve verim uzaktan izlenebilir; arızalar erken tespit edilerek kesintisiz hizmet sağlanır.',
        ],
      },
    ],
  },
  'dogru-boyler-kapasitesi-nasil-secilir': {
    title: 'Doğru boyler kapasitesi nasıl seçilir?',
    excerpt:
      'Hane büyüklüğüne göre ideal boyler hacmi, açık ve kapalı devre farkı ve emaye kaplamanın uzun ömre etkisi üzerine pratik bir seçim rehberi.',
    category: 'Rehber',
    body: [
      {
        heading: 'Hane büyüklüğüne göre hacim',
        paragraphs: [
          'Genel bir kural olarak 2–4 kişilik bir hane için yaklaşık 200 litre, daha kalabalık haneler için 300 litre ve üzeri boyler önerilir. Kullanım alışkanlığı, banyo sayısı ve iklim bölgesi bu değeri etkiler.',
        ],
      },
      {
        heading: 'Açık devre mi, kapalı devre mi?',
        paragraphs: [
          'Donma riski düşük bölgelerde açık devre sistemler ekonomik bir çözümdür. Kışın sıcaklığın sıfırın altına düştüğü bölgelerde ise antifrizli kapalı devre sistemler tercih edilmelidir; bu sayede kollektör ve tesisat donmaya karşı korunur.',
        ],
      },
      {
        heading: 'Emaye kaplamanın önemi',
        paragraphs: [
          'Boylerin iç yüzeyindeki emaye kaplama, korozyona karşı koruma sağlar ve sistemin ömrünü uzatır. Katodik koruma anotu ile birlikte, emayeli boylerler on yıllar boyunca güvenle kullanılır.',
        ],
      },
    ],
  },
  'solar-keymark-nedir-neden-onemli': {
    title: 'Solar Keymark nedir, neden önemlidir?',
    excerpt:
      'Avrupa’nın güneş termal ürünlerdeki bağımsız kalite ve performans belgesi Solar Keymark’ın kapsamı ve ürün seçiminde neden güvence olduğu.',
    category: 'Kalite',
    body: [
      {
        heading: 'Bağımsız performans güvencesi',
        paragraphs: [
          'Solar Keymark, güneş kollektörleri ve sistemleri için Avrupa çapında tanınan gönüllü bir kalite işaretidir. Ürünlerin bağımsız laboratuvarlarda test edilip ilgili standartlara uygunluğunu belgeler.',
          'Bu belge; verim, dayanıklılık ve güvenlik açısından ürünün uluslararası kabul görmüş kriterleri karşıladığını gösterir. Kamu ihaleleri ve ihracatta önemli bir referanstır.',
        ],
      },
      {
        heading: 'Şimşek Solar ve sertifikasyon',
        paragraphs: [
          'Şimşek Solar ürünleri CE, TSE ve Solar Keymark başta olmak üzere ulusal ve uluslararası belgelere sahiptir. Sertifikalar, ürün seçiminde uzun ömür ve performansın bağımsız kanıtıdır.',
        ],
      },
    ],
  },
  'gunes-enerjisi-sisteminin-bakimi-6-ipucu': {
    title: 'Güneş enerjisi sisteminin bakımı: verim için 6 ipucu',
    excerpt:
      'Sisteminizin yıllarca yüksek verimle çalışması için periyodik bakım, kollektör temizliği ve solar sıvı kontrolü gibi pratik öneriler.',
    category: 'Bakım',
    body: [
      {
        heading: 'Düzenli bakım neden gerekli?',
        paragraphs: [
          'Güneş termal sistemler düşük bakım gerektiren yapılar olsa da, periyodik kontrol verimi korur ve sistemin ömrünü uzatır. Yılda bir kez profesyonel bakım önerilir.',
        ],
      },
      {
        heading: 'Dikkat edilecek altı nokta',
        paragraphs: [
          '1) Kollektör yüzeyini tozdan ve gölgelenmeden uzak tutun. 2) Solar sıvı seviyesini ve donma koruma değerini kontrol ettirin. 3) Pompa ve otomasyonun çalışmasını izleyin. 4) Bağlantı ve fleks noktalarında kaçak olmadığından emin olun. 5) Boyler anodunu periyodik kontrol ettirin. 6) Emniyet ekipmanlarının basınç değerlerini gözden geçirin.',
          'Bu adımlar, satış sonrası servis ekibimizin periyodik bakım kapsamında uyguladığı kontrollerdir. Bakım talebinizi çevrimiçi olarak oluşturabilirsiniz.',
        ],
      },
    ],
  },
};

const en: Record<string, ArticleText> = {
  'gunes-kollektoru-turleri-duz-yuzeyli-vakum-tuplu': {
    title: 'Types of solar collectors: flat plate and evacuated tube',
    excerpt:
      'A comparative guide to the structure, advantages of flat-plate and evacuated-tube solar collectors, and which suits which climate.',
    category: 'Guide',
    body: [
      {
        heading: 'Two basic collector types',
        paragraphs: [
          'There are two most common collector types in solar thermal systems: flat-plate collectors and evacuated-tube collectors. Both convert solar radiation into heat; the differences lie in their structure, efficiency curves and cost.',
        ],
      },
      {
        heading: 'Flat-plate collector',
        paragraphs: [
          'A flat-plate collector consists of a dark absorber plate placed inside an insulated casing covered with tempered glass, along with the fluid tubes attached to that plate. The absorber captures the sun and heats the water or solar fluid in the tubes.',
          'With its robust build, high durability and reasonable cost, it is the most preferred type in countries with high sunshine duration such as Türkiye. Şimşek Solar’s Orion series collectors are produced with flat-plate technology and offered in different series according to the tube and absorber combination.',
        ],
      },
      {
        heading: 'Evacuated-tube collector',
        paragraphs: [
          'In evacuated-tube collectors, the absorber sits inside glass tubes from which the air has been evacuated (vacuumed). Because the vacuum reduces heat loss, it can offer an advantage over flat plates at low outdoor temperatures and low irradiance.',
          'However, glass tubes are not as resistant to hail, snow load and impact as flat plates, and their cost is generally higher. They stand out in very cold and cloudy climates.',
        ],
      },
      {
        heading: 'Which one is right for you?',
        paragraphs: [
          'Across most of Türkiye, thanks to the high sunshine duration, flat-plate collectors are the most balanced solution in terms of both efficiency and cost. In very cold regions, closed-loop flat-plate systems with antifreeze, together with backup heating, deliver high performance in all four seasons.',
          'You can view your province’s solar potential with our “Solar Potential by Province” tool and determine the right collector and capacity together with our engineering team.',
        ],
      },
    ],
  },
  'gunes-kollektoru-verimini-etkileyen-faktorler': {
    title: 'Factors that affect solar collector efficiency',
    excerpt:
      'The factors that determine your collector’s efficiency — orientation, tilt, irradiance, absorber surface, insulation, shading and maintenance — plus tips for maximum performance.',
    category: 'Technical',
    body: [
      {
        heading: 'Orientation and tilt',
        paragraphs: [
          'A collector achieves its highest efficiency where it faces the sun at the most direct angle. For Türkiye, collectors are usually placed facing south with a tilt suited to the region (mostly 30–45°). Wrong orientation and tilt noticeably reduce annual output.',
        ],
      },
      {
        heading: 'Regional solar irradiance',
        paragraphs: [
          'A region’s total annual solar irradiance (kWh/m²) and sunshine duration directly determine the heat produced. Southern provinces have higher potential; yet with the right design, solar energy is economical in almost every province. You can see your province’s values with our solar potential tool.',
        ],
      },
      {
        heading: 'Absorber surface and insulation',
        paragraphs: [
          'A selective absorber coating captures the sun at a high rate while reducing heat emission (loss); this significantly increases efficiency in flat-plate collectors. The rock wool / insulation material in the casing also helps preserve the stored heat.',
          'On the boiler side, enamel coating and high insulation keep the heated water hot for a long time, completing the system efficiency.',
        ],
      },
      {
        heading: 'Shading, maintenance and system design',
        paragraphs: [
          'Shade falling on the collector during the day (trees, chimneys, neighboring buildings) reduces output; a shading analysis is carried out with a site survey before installation. Dust and dirt on the collector surface also reduce efficiency; periodic cleaning and maintenance preserve performance.',
          'Finally, correct sizing is critical: too little or too much capacity for the need reduces efficiency. Our engineering team handles capacity calculation and design; our after-sales service is at your side for maintenance needs.',
        ],
      },
    ],
  },
  'gunes-enerjisiyle-sicak-su-nasil-uretilir': {
    title: 'How is hot water produced with solar energy?',
    excerpt:
      'The working principle of solar thermal systems: how the collector, boiler and circulation line heat water step by step, without electricity or gas.',
    category: 'Guide',
    body: [
      {
        heading: 'The basic principle',
        paragraphs: [
          'Solar thermal systems convert solar radiation directly into heat. The dark absorber surface inside the roof-mounted collectors captures solar energy and heats the fluid passing through it. This heat is transferred to the water stored in an insulated boiler.',
          'Unlike photovoltaic (PV) panels, thermal systems do not generate electricity; they deliver energy directly as hot water. This makes them far more efficient for hot water demand.',
        ],
      },
      {
        heading: 'Components of the system',
        paragraphs: [
          'A solar hot water system consists of three main components: the collector that gathers the sun, the enameled boiler that stores the heat, and the connection line with safety equipment that circulates the fluid between them.',
          'In closed-loop systems, antifreeze solar fluid circulates in the collector; this fluid heats the domestic water via the coil in the boiler. This way it operates safely in all four seasons even in areas with a freezing risk.',
        ],
      },
      {
        heading: 'What happens on sunless days?',
        paragraphs: [
          'On cloudy days or in winter, the system works integrated with the existing combi/boiler. Thanks to the pre-heating from the sun, the energy consumed by the backup heater is significantly reduced; uninterrupted hot water is ensured.',
        ],
      },
    ],
  },
  'toplu-konut-merkezi-gunes-enerjisi-sistemleri': {
    title: 'Central solar systems in social and mass housing',
    excerpt:
      'The collector field + central boiler architecture that meets the hot water needs of hundreds of apartments from a single center, and its advantages in public projects.',
    category: 'Technical',
    body: [
      {
        heading: 'What is a central system?',
        paragraphs: [
          'In central systems, instead of installing a separate system in each apartment, a large collector field and a central boiler group mounted on the block’s roof produce hot water for the entire building. This approach stands out in cost and efficiency for high-usage structures such as mass housing, dormitories, prisons, hospitals and military facilities.',
        ],
      },
      {
        heading: 'Why is it preferred in large projects?',
        paragraphs: [
          'A central solution provides shared maintenance, single-point monitoring and economies of scale. The roof area is used efficiently, no intervention in individual apartments is needed, and the system is managed from a single source by professional teams.',
          'Şimşek Solar has installed central systems in mass-housing and public projects across Türkiye with hundreds of thousands of collectors. Project-specific structural calculation, capacity design and automation integration are prepared by the engineering team.',
        ],
      },
      {
        heading: 'Automation and monitoring',
        paragraphs: [
          'Central systems are managed intelligently with automation panels and control units. Temperature, pump status and efficiency can be monitored remotely; faults are detected early to ensure uninterrupted service.',
        ],
      },
    ],
  },
  'dogru-boyler-kapasitesi-nasil-secilir': {
    title: 'How to choose the right boiler capacity',
    excerpt:
      'A practical selection guide on the ideal boiler volume by household size, the difference between open and closed loop, and the effect of enamel coating on longevity.',
    category: 'Guide',
    body: [
      {
        heading: 'Volume by household size',
        paragraphs: [
          'As a general rule, about 200 liters is recommended for a household of 2–4 people, and 300 liters or more for larger households. Usage habits, number of bathrooms and climate zone affect this value.',
        ],
      },
      {
        heading: 'Open loop or closed loop?',
        paragraphs: [
          'In regions with a low freezing risk, open-loop systems are an economical solution. In regions where the temperature drops below zero in winter, closed-loop systems with antifreeze should be preferred; this protects the collector and plumbing against freezing.',
        ],
      },
      {
        heading: 'The importance of enamel coating',
        paragraphs: [
          'The enamel coating on the boiler’s inner surface protects against corrosion and extends the system’s life. Together with the cathodic-protection anode, enameled boilers are used safely for decades.',
        ],
      },
    ],
  },
  'solar-keymark-nedir-neden-onemli': {
    title: 'What is Solar Keymark and why does it matter?',
    excerpt:
      'The scope of Solar Keymark — Europe’s independent quality and performance certificate for solar thermal products — and why it is an assurance in product selection.',
    category: 'Quality',
    body: [
      {
        heading: 'Independent performance assurance',
        paragraphs: [
          'Solar Keymark is a voluntary quality mark recognized across Europe for solar collectors and systems. It certifies that products are tested in independent laboratories and comply with the relevant standards.',
          'This certificate shows that the product meets internationally accepted criteria for efficiency, durability and safety. It is an important reference in public tenders and exports.',
        ],
      },
      {
        heading: 'Şimşek Solar and certification',
        paragraphs: [
          'Şimşek Solar products hold national and international certificates, led by CE, TSE and Solar Keymark. Certificates are independent proof of longevity and performance in product selection.',
        ],
      },
    ],
  },
  'gunes-enerjisi-sisteminin-bakimi-6-ipucu': {
    title: 'Maintaining a solar system: 6 tips for efficiency',
    excerpt:
      'Practical tips such as periodic maintenance, collector cleaning and solar fluid checks so your system runs at high efficiency for years.',
    category: 'Maintenance',
    body: [
      {
        heading: 'Why is regular maintenance necessary?',
        paragraphs: [
          'Although solar thermal systems are low-maintenance structures, periodic checks preserve efficiency and extend the system’s life. Professional maintenance once a year is recommended.',
        ],
      },
      {
        heading: 'Six points to watch',
        paragraphs: [
          '1) Keep the collector surface free of dust and shading. 2) Have the solar fluid level and freeze-protection value checked. 3) Monitor the operation of the pump and automation. 4) Make sure there are no leaks at connection and flex points. 5) Have the boiler anode checked periodically. 6) Review the pressure values of the safety equipment.',
          'These steps are the checks our after-sales service team applies within periodic maintenance. You can create your maintenance request online.',
        ],
      },
    ],
  },
};

const ar: Record<string, ArticleText> = {
  'gunes-kollektoru-turleri-duz-yuzeyli-vakum-tuplu': {
    title: 'أنواع المجمعات الشمسية: المسطّحة والأنبوبية المفرّغة',
    excerpt:
      'دليل مقارن لبنية المجمعات الشمسية المسطّحة والأنبوبية المفرّغة ومزاياها، وأيّها أنسب لكل مناخ.',
    category: 'دليل',
    body: [
      {
        heading: 'نوعان أساسيان من المجمعات',
        paragraphs: [
          'يوجد نوعان هما الأكثر شيوعاً في الأنظمة الشمسية الحرارية: المجمعات المسطّحة والمجمعات الأنبوبية المفرّغة. كلاهما يحوّل الإشعاع الشمسي إلى حرارة؛ وتكمن الفروق في البنية ومنحنيات الكفاءة والتكلفة.',
        ],
      },
      {
        heading: 'المجمّع المسطّح',
        paragraphs: [
          'يتكوّن المجمّع المسطّح من لوح ماص داكن اللون موضوع داخل صندوق معزول مغطّى بزجاج مقسّى، إضافة إلى أنابيب المائع المتصلة بهذا اللوح. يمتص اللوح الشمس ويسخّن الماء أو السائل الشمسي في الأنابيب.',
          'بفضل بنيته المتينة ومتانته العالية وتكلفته المعقولة، فهو النوع الأكثر تفضيلاً في البلدان ذات ساعات السطوع العالية مثل تركيا. تُنتَج مجمعات سلسلة Orion من شمشك سولار بتقنية اللوح المسطّح وتُقدَّم بسلاسل مختلفة حسب تركيبة الأنبوب واللوح الماص.',
        ],
      },
      {
        heading: 'المجمّع الأنبوبي المفرّغ',
        paragraphs: [
          'في المجمعات الأنبوبية المفرّغة يوجد اللوح الماص داخل أنابيب زجاجية أُفرِغ منها الهواء (مفرّغة). ولأن التفريغ يقلّل فقد الحرارة، فقد يوفّر ميزة على المسطّح عند درجات الحرارة الخارجية المنخفضة والإشعاع المنخفض.',
          'لكن الأنابيب الزجاجية ليست مقاومة للبَرَد وأحمال الثلج والصدمات بقدر المسطّح، وتكلفتها أعلى عموماً. تبرز في المناخات شديدة البرودة والغائمة.',
        ],
      },
      {
        heading: 'أيّهما يناسبكم؟',
        paragraphs: [
          'في معظم أنحاء تركيا، وبفضل ساعات السطوع العالية، تُعد المجمعات المسطّحة الحل الأكثر توازناً من حيث الكفاءة والتكلفة. في المناطق شديدة البرودة، توفّر الأنظمة المسطّحة المغلقة الدائرة بمانع تجمّد، مع التدفئة الاحتياطية، أداءً عالياً في الفصول الأربعة.',
          'يمكنكم رؤية الإمكان الشمسي لمحافظتكم عبر أداة «الإمكان الشمسي حسب المحافظة» وتحديد المجمّع والسعة المناسبين مع فريقنا الهندسي.',
        ],
      },
    ],
  },
  'gunes-kollektoru-verimini-etkileyen-faktorler': {
    title: 'العوامل المؤثرة في كفاءة المجمّع الشمسي',
    excerpt:
      'العوامل التي تحدّد كفاءة مجمّعكم — الاتجاه والميل والإشعاع وسطح اللوح الماص والعزل والتظليل والصيانة — ونصائح لأقصى أداء.',
    category: 'تقني',
    body: [
      {
        heading: 'الاتجاه والميل',
        paragraphs: [
          'يحقّق المجمّع أعلى كفاءة حيث يواجه الشمس بأكثر الزوايا استقامة. بالنسبة لتركيا توضع المجمعات عادةً باتجاه الجنوب وبميل مناسب للمنطقة (غالباً 30–45°). يؤدي الاتجاه والميل الخاطئ إلى خفض الإنتاج السنوي بشكل ملحوظ.',
        ],
      },
      {
        heading: 'الإشعاع الشمسي الإقليمي',
        paragraphs: [
          'يحدّد إجمالي الإشعاع الشمسي السنوي للمنطقة (kWh/m²) وساعات السطوع مباشرةً الحرارة المنتَجة. تتمتع المحافظات الجنوبية بإمكان أعلى؛ ومع ذلك، وبالتصميم الصحيح، تكون الطاقة الشمسية اقتصادية في كل محافظة تقريباً. يمكنكم رؤية قيم محافظتكم عبر أداة الإمكان الشمسي.',
        ],
      },
      {
        heading: 'سطح اللوح الماص والعزل',
        paragraphs: [
          'يمتص الطلاء الماص الانتقائي الشمس بنسبة عالية بينما يقلّل انبعاث الحرارة (الفقد)؛ وهذا يرفع الكفاءة بشكل كبير في المجمعات المسطّحة. كما يساعد الصوف الصخري/مادة العزل في الصندوق على الحفاظ على الحرارة المخزّنة.',
          'أما على جانب الخزان، فيحافظ الطلاء المينائي والعزل العالي على بقاء الماء المسخّن ساخناً لفترة طويلة، مكمّلين كفاءة النظام.',
        ],
      },
      {
        heading: 'التظليل والصيانة وتصميم النظام',
        paragraphs: [
          'يقلّل الظل الساقط على المجمّع خلال النهار (الأشجار والمداخن والمباني المجاورة) الإنتاج؛ ويُجرى تحليل التظليل عبر مسح ميداني قبل التركيب. كما يقلّل الغبار والأوساخ على سطح المجمّع الكفاءة؛ ويحافظ التنظيف والصيانة الدورية على الأداء.',
          'أخيراً، الحجم الصحيح أمر حاسم: السعة الأقل أو الأكثر من الحاجة تقلّل الكفاءة. يتولى فريقنا الهندسي حساب السعة والتصميم؛ وخدمة ما بعد البيع لدينا إلى جانبكم في احتياجات الصيانة.',
        ],
      },
    ],
  },
  'gunes-enerjisiyle-sicak-su-nasil-uretilir': {
    title: 'كيف يُنتَج الماء الساخن بالطاقة الشمسية؟',
    excerpt:
      'مبدأ عمل الأنظمة الشمسية الحرارية: كيف يسخّن المجمّع والخزان وخط الدوران الماء خطوة بخطوة، دون كهرباء أو غاز.',
    category: 'دليل',
    body: [
      {
        heading: 'المبدأ الأساسي',
        paragraphs: [
          'تحوّل الأنظمة الشمسية الحرارية الإشعاع الشمسي إلى حرارة مباشرة. يمتص السطح الماص الداكن داخل المجمعات المثبّتة على السطح الطاقة الشمسية ويسخّن السائل المار خلاله. تُنقَل هذه الحرارة إلى الماء المخزّن في خزان معزول.',
          'بخلاف الألواح الكهروضوئية (PV)، لا تولّد الأنظمة الحرارية كهرباء؛ بل تقدّم الطاقة مباشرةً كماء ساخن. وهذا يجعلها أعلى كفاءة بكثير لتلبية الحاجة إلى الماء الساخن.',
        ],
      },
      {
        heading: 'مكوّنات النظام',
        paragraphs: [
          'يتكوّن نظام الماء الساخن الشمسي من ثلاثة مكوّنات رئيسية: المجمّع الذي يجمع الشمس، والخزان المطلي بالمينا الذي يخزّن الحرارة، وخط التوصيل مع معدات الأمان الذي يُدوّر السائل بينهما.',
          'في الأنظمة المغلقة الدائرة يتداول سائل شمسي بمانع تجمّد في المجمّع؛ ويسخّن هذا السائل ماء الاستخدام عبر الملف الحلزوني في الخزان. وهكذا يعمل بأمان في الفصول الأربعة حتى في المناطق المعرّضة لخطر التجمد.',
        ],
      },
      {
        heading: 'ماذا يحدث في الأيام دون شمس؟',
        paragraphs: [
          'في الأيام الغائمة أو في الشتاء، يعمل النظام بالتكامل مع السخان المركزي/الغلاية الموجودة. وبفضل التسخين المسبق من الشمس، تقلّ الطاقة التي يستهلكها السخان الاحتياطي بشكل كبير؛ ويُضمَن ماء ساخن دون انقطاع.',
        ],
      },
    ],
  },
  'toplu-konut-merkezi-gunes-enerjisi-sistemleri': {
    title: 'الأنظمة الشمسية المركزية في الإسكان الاجتماعي والجماعي',
    excerpt:
      'بنية حقل المجمعات + الخزان المركزي التي تلبّي حاجة مئات الشقق للماء الساخن من مركز واحد، ومزاياها في المشاريع العامة.',
    category: 'تقني',
    body: [
      {
        heading: 'ما هو النظام المركزي؟',
        paragraphs: [
          'في الأنظمة المركزية، بدلاً من تركيب نظام منفصل في كل شقة، ينتج حقل مجمعات واسع ومجموعة خزانات مركزية مثبّتة على سطح المبنى الماء الساخن للمبنى بأكمله. تبرز هذه الطريقة من حيث التكلفة والكفاءة في المنشآت كثيفة الاستخدام مثل الإسكان الجماعي والمساكن الطلابية والسجون والمستشفيات والمنشآت العسكرية.',
        ],
      },
      {
        heading: 'لماذا يُفضّل في المشاريع الكبيرة؟',
        paragraphs: [
          'يوفّر الحل المركزي صيانة مشتركة ومراقبة من نقطة واحدة ووفورات الحجم. تُستخدم مساحة السطح بكفاءة، ولا حاجة للتدخل في الشقق، ويُدار النظام من مصدر واحد بواسطة فرق محترفة.',
          'ركّبت شمشك سولار أنظمة مركزية في مشاريع الإسكان الجماعي والمشاريع العامة في عموم تركيا بمئات الآلاف من المجمعات. يُعِدّ الفريق الهندسي الحساب الإنشائي الخاص بالمشروع وتصميم السعة وتكامل الأتمتة.',
        ],
      },
      {
        heading: 'الأتمتة والمراقبة',
        paragraphs: [
          'تُدار الأنظمة المركزية بذكاء عبر لوحات الأتمتة ووحدات التحكم. يمكن مراقبة درجة الحرارة وحالة المضخة والكفاءة عن بُعد؛ وتُكتشَف الأعطال مبكراً لضمان خدمة دون انقطاع.',
        ],
      },
    ],
  },
  'dogru-boyler-kapasitesi-nasil-secilir': {
    title: 'كيف تختارون سعة الخزان المناسبة؟',
    excerpt:
      'دليل عملي لاختيار الحجم المثالي للخزان حسب حجم الأسرة، والفرق بين الدائرة المفتوحة والمغلقة، وتأثير الطلاء المينائي على طول العمر.',
    category: 'دليل',
    body: [
      {
        heading: 'الحجم حسب حجم الأسرة',
        paragraphs: [
          'كقاعدة عامة، يُوصى بنحو 200 لتر لأسرة من 2 إلى 4 أشخاص، و300 لتر فأكثر للأسر الأكبر. تؤثّر عادات الاستخدام وعدد الحمامات والمنطقة المناخية في هذه القيمة.',
        ],
      },
      {
        heading: 'دائرة مفتوحة أم مغلقة؟',
        paragraphs: [
          'في المناطق منخفضة خطر التجمد، تُعد الأنظمة المفتوحة الدائرة حلاً اقتصادياً. أما في المناطق التي تنخفض فيها الحرارة تحت الصفر شتاءً، فينبغي تفضيل الأنظمة المغلقة الدائرة بمانع تجمّد؛ وبذلك يُحمى المجمّع والتمديدات من التجمد.',
        ],
      },
      {
        heading: 'أهمية الطلاء المينائي',
        paragraphs: [
          'يوفّر الطلاء المينائي على السطح الداخلي للخزان حماية من التآكل ويطيل عمر النظام. ومع أنود الحماية الكاثودية، تُستخدم الخزانات المطلية بالمينا بأمان لعقود.',
        ],
      },
    ],
  },
  'solar-keymark-nedir-neden-onemli': {
    title: 'ما هي Solar Keymark ولماذا تهمّ؟',
    excerpt:
      'نطاق شهادة Solar Keymark — شهادة الجودة والأداء الأوروبية المستقلة لمنتجات الطاقة الشمسية الحرارية — ولماذا تُعد ضماناً عند اختيار المنتج.',
    category: 'الجودة',
    body: [
      {
        heading: 'ضمان أداء مستقل',
        paragraphs: [
          'Solar Keymark علامة جودة طوعية معترف بها في عموم أوروبا للمجمعات والأنظمة الشمسية. تُوثّق أن المنتجات تُختبَر في مختبرات مستقلة وتتوافق مع المعايير ذات الصلة.',
          'تُظهِر هذه الشهادة أن المنتج يستوفي معايير مقبولة دولياً من حيث الكفاءة والمتانة والأمان. وهي مرجع مهم في المناقصات العامة والتصدير.',
        ],
      },
      {
        heading: 'شمشك سولار والاعتماد',
        paragraphs: [
          'تحمل منتجات شمشك سولار شهادات وطنية ودولية، في مقدمتها CE وTSE وSolar Keymark. والشهادات دليل مستقل على طول العمر والأداء عند اختيار المنتج.',
        ],
      },
    ],
  },
  'gunes-enerjisi-sisteminin-bakimi-6-ipucu': {
    title: 'صيانة النظام الشمسي: 6 نصائح للكفاءة',
    excerpt:
      'نصائح عملية مثل الصيانة الدورية وتنظيف المجمّع وفحص السائل الشمسي كي يعمل نظامكم بكفاءة عالية لسنوات.',
    category: 'الصيانة',
    body: [
      {
        heading: 'لماذا الصيانة المنتظمة ضرورية؟',
        paragraphs: [
          'مع أن الأنظمة الشمسية الحرارية منشآت قليلة الصيانة، فإن الفحص الدوري يحافظ على الكفاءة ويطيل عمر النظام. يُوصى بصيانة احترافية مرة واحدة سنوياً.',
        ],
      },
      {
        heading: 'ست نقاط للانتباه إليها',
        paragraphs: [
          '1) أبقوا سطح المجمّع بعيداً عن الغبار والتظليل. 2) افحصوا مستوى السائل الشمسي وقيمة الحماية من التجمد. 3) راقبوا عمل المضخة والأتمتة. 4) تأكّدوا من عدم وجود تسرّب عند نقاط التوصيل والوصلات المرنة. 5) افحصوا أنود الخزان دورياً. 6) راجعوا قيم ضغط معدات الأمان.',
          'هذه الخطوات هي الفحوص التي يطبّقها فريق خدمة ما بعد البيع لدينا ضمن الصيانة الدورية. يمكنكم إنشاء طلب الصيانة عبر الإنترنت.',
        ],
      },
    ],
  },
};

const el: Record<string, ArticleText> = {
  'gunes-kollektoru-turleri-duz-yuzeyli-vakum-tuplu': {
    title: 'Τύποι ηλιακών συλλεκτών: επίπεδοι και σωλήνων κενού',
    excerpt:
      'Ένας συγκριτικός οδηγός για τη δομή, τα πλεονεκτήματα των επίπεδων συλλεκτών και των συλλεκτών σωλήνων κενού, και ποιος ταιριάζει σε ποιο κλίμα.',
    category: 'Οδηγός',
    body: [
      {
        heading: 'Δύο βασικοί τύποι συλλεκτών',
        paragraphs: [
          'Υπάρχουν δύο πιο συνηθισμένοι τύποι συλλεκτών στα ηλιακά θερμικά συστήματα: οι επίπεδοι συλλέκτες και οι συλλέκτες σωλήνων κενού. Και οι δύο μετατρέπουν την ηλιακή ακτινοβολία σε θερμότητα· οι διαφορές βρίσκονται στη δομή, τις καμπύλες απόδοσης και το κόστος.',
        ],
      },
      {
        heading: 'Επίπεδος συλλέκτης',
        paragraphs: [
          'Ένας επίπεδος συλλέκτης αποτελείται από μια σκούρα πλάκα απορροφητή τοποθετημένη μέσα σε ένα μονωμένο περίβλημα καλυμμένο με σκληρυμένο γυαλί, μαζί με τους σωλήνες ρευστού που συνδέονται με αυτήν την πλάκα. Ο απορροφητής συλλαμβάνει τον ήλιο και ζεσταίνει το νερό ή το ηλιακό υγρό στους σωλήνες.',
          'Με τη στιβαρή κατασκευή, την υψηλή αντοχή και το λογικό κόστος του, είναι ο πιο προτιμώμενος τύπος σε χώρες με υψηλή ηλιοφάνεια όπως η Τουρκία. Οι συλλέκτες σειράς Orion της Şimşek Solar παράγονται με τεχνολογία επίπεδου συλλέκτη και προσφέρονται σε διαφορετικές σειρές ανάλογα με τον συνδυασμό σωλήνα και απορροφητή.',
        ],
      },
      {
        heading: 'Συλλέκτης σωλήνων κενού',
        paragraphs: [
          'Στους συλλέκτες σωλήνων κενού, ο απορροφητής βρίσκεται μέσα σε γυάλινους σωλήνες από τους οποίους έχει αφαιρεθεί ο αέρας (κενό). Επειδή το κενό μειώνει τις θερμικές απώλειες, μπορεί να προσφέρει πλεονέκτημα έναντι των επίπεδων σε χαμηλές εξωτερικές θερμοκρασίες και χαμηλή ακτινοβολία.',
          'Ωστόσο, οι γυάλινοι σωλήνες δεν είναι τόσο ανθεκτικοί σε χαλάζι, φορτίο χιονιού και κρούση όσο οι επίπεδοι, και το κόστος τους είναι γενικά υψηλότερο. Ξεχωρίζουν σε πολύ κρύα και συννεφιασμένα κλίματα.',
        ],
      },
      {
        heading: 'Ποιος είναι κατάλληλος για εσάς;',
        paragraphs: [
          'Στο μεγαλύτερο μέρος της Τουρκίας, χάρη στην υψηλή ηλιοφάνεια, οι επίπεδοι συλλέκτες είναι η πιο ισορροπημένη λύση τόσο σε απόδοση όσο και σε κόστος. Σε πολύ κρύες περιοχές, τα επίπεδα συστήματα κλειστού κυκλώματος με αντιψυκτικό, μαζί με εφεδρική θέρμανση, προσφέρουν υψηλή απόδοση και στις τέσσερις εποχές.',
          'Μπορείτε να δείτε το ηλιακό δυναμικό της περιοχής σας με το εργαλείο μας «Ηλιακό Δυναμικό ανά Επαρχία» και να καθορίσετε τον σωστό συλλέκτη και τη χωρητικότητα μαζί με την ομάδα μηχανικής μας.',
        ],
      },
    ],
  },
  'gunes-kollektoru-verimini-etkileyen-faktorler': {
    title: 'Παράγοντες που επηρεάζουν την απόδοση του ηλιακού συλλέκτη',
    excerpt:
      'Οι παράγοντες που καθορίζουν την απόδοση του συλλέκτη σας — προσανατολισμός, κλίση, ακτινοβολία, επιφάνεια απορροφητή, μόνωση, σκίαση και συντήρηση — και συμβουλές για μέγιστη απόδοση.',
    category: 'Τεχνικό',
    body: [
      {
        heading: 'Προσανατολισμός και κλίση',
        paragraphs: [
          'Ένας συλλέκτης επιτυγχάνει την υψηλότερη απόδοσή του όταν βλέπει τον ήλιο στην πιο κάθετη γωνία. Για την Τουρκία, οι συλλέκτες τοποθετούνται συνήθως με νότιο προσανατολισμό και κλίση κατάλληλη για την περιοχή (κυρίως 30–45°). Λανθασμένος προσανατολισμός και κλίση μειώνουν αισθητά την ετήσια παραγωγή.',
        ],
      },
      {
        heading: 'Περιφερειακή ηλιακή ακτινοβολία',
        paragraphs: [
          'Η συνολική ετήσια ηλιακή ακτινοβολία μιας περιοχής (kWh/m²) και η διάρκεια ηλιοφάνειας καθορίζουν άμεσα τη θερμότητα που παράγεται. Οι νότιες επαρχίες έχουν υψηλότερο δυναμικό· ωστόσο, με τον σωστό σχεδιασμό, η ηλιακή ενέργεια είναι οικονομική σχεδόν σε κάθε επαρχία. Μπορείτε να δείτε τις τιμές της περιοχής σας με το εργαλείο ηλιακού δυναμικού.',
        ],
      },
      {
        heading: 'Επιφάνεια απορροφητή και μόνωση',
        paragraphs: [
          'Μια επιλεκτική επίστρωση απορροφητή συλλαμβάνει τον ήλιο σε υψηλό ποσοστό ενώ μειώνει την εκπομπή θερμότητας (απώλεια)· αυτό αυξάνει σημαντικά την απόδοση στους επίπεδους συλλέκτες. Ο πετροβάμβακας / το υλικό μόνωσης στο περίβλημα βοηθά επίσης στη διατήρηση της αποθηκευμένης θερμότητας.',
          'Στην πλευρά του μπόιλερ, η επίστρωση εμαγιέ και η υψηλή μόνωση διατηρούν το ζεστό νερό ζεστό για μεγάλο διάστημα, ολοκληρώνοντας την απόδοση του συστήματος.',
        ],
      },
      {
        heading: 'Σκίαση, συντήρηση και σχεδιασμός συστήματος',
        paragraphs: [
          'Η σκιά που πέφτει στον συλλέκτη κατά τη διάρκεια της ημέρας (δέντρα, καμινάδες, γειτονικά κτίρια) μειώνει την παραγωγή· μια ανάλυση σκίασης πραγματοποιείται με επιτόπια μελέτη πριν την εγκατάσταση. Η σκόνη και η βρωμιά στην επιφάνεια του συλλέκτη μειώνουν επίσης την απόδοση· ο περιοδικός καθαρισμός και η συντήρηση διατηρούν την απόδοση.',
          'Τέλος, η σωστή διαστασιολόγηση είναι κρίσιμη: πολύ μικρή ή πολύ μεγάλη χωρητικότητα για την ανάγκη μειώνει την απόδοση. Η ομάδα μηχανικής μας αναλαμβάνει τον υπολογισμό χωρητικότητας και τον σχεδιασμό· η υποστήριξη μετά την πώληση είναι στο πλευρό σας για τις ανάγκες συντήρησης.',
        ],
      },
    ],
  },
  'gunes-enerjisiyle-sicak-su-nasil-uretilir': {
    title: 'Πώς παράγεται ζεστό νερό με ηλιακή ενέργεια;',
    excerpt:
      'Η αρχή λειτουργίας των ηλιακών θερμικών συστημάτων: πώς ο συλλέκτης, το μπόιλερ και η γραμμή κυκλοφορίας ζεσταίνουν το νερό βήμα προς βήμα, χωρίς ηλεκτρικό ή αέριο.',
    category: 'Οδηγός',
    body: [
      {
        heading: 'Η βασική αρχή',
        paragraphs: [
          'Τα ηλιακά θερμικά συστήματα μετατρέπουν την ηλιακή ακτινοβολία απευθείας σε θερμότητα. Η σκούρα επιφάνεια απορροφητή μέσα στους συλλέκτες της στέγης συλλαμβάνει την ηλιακή ενέργεια και ζεσταίνει το ρευστό που περνά μέσα της. Αυτή η θερμότητα μεταφέρεται στο νερό που αποθηκεύεται σε ένα μονωμένο μπόιλερ.',
          'Σε αντίθεση με τα φωτοβολταϊκά (PV) πάνελ, τα θερμικά συστήματα δεν παράγουν ηλεκτρισμό· παρέχουν την ενέργεια απευθείας ως ζεστό νερό. Αυτό τα καθιστά πολύ πιο αποδοτικά για τη ζήτηση ζεστού νερού.',
        ],
      },
      {
        heading: 'Τα εξαρτήματα του συστήματος',
        paragraphs: [
          'Ένα ηλιακό σύστημα ζεστού νερού αποτελείται από τρία κύρια εξαρτήματα: τον συλλέκτη που συγκεντρώνει τον ήλιο, το εμαγιέ μπόιλερ που αποθηκεύει τη θερμότητα, και τη γραμμή σύνδεσης με τον εξοπλισμό ασφαλείας που κυκλοφορεί το ρευστό μεταξύ τους.',
          'Στα συστήματα κλειστού κυκλώματος, αντιψυκτικό ηλιακό υγρό κυκλοφορεί στον συλλέκτη· αυτό το υγρό ζεσταίνει το νερό χρήσης μέσω του σερπαντινιού στο μπόιλερ. Έτσι λειτουργεί με ασφάλεια και στις τέσσερις εποχές ακόμη και σε περιοχές με κίνδυνο παγετού.',
        ],
      },
      {
        heading: 'Τι συμβαίνει τις ημέρες χωρίς ήλιο;',
        paragraphs: [
          'Τις συννεφιασμένες ημέρες ή τον χειμώνα, το σύστημα λειτουργεί ενσωματωμένο με τον υπάρχοντα λέβητα/μπόιλερ. Χάρη στην προθέρμανση από τον ήλιο, η ενέργεια που καταναλώνει η εφεδρική θέρμανση μειώνεται σημαντικά· διασφαλίζεται αδιάλειπτο ζεστό νερό.',
        ],
      },
    ],
  },
  'toplu-konut-merkezi-gunes-enerjisi-sistemleri': {
    title: 'Κεντρικά ηλιακά συστήματα σε κοινωνικές και μαζικές κατοικίες',
    excerpt:
      'Η αρχιτεκτονική πεδίου συλλεκτών + κεντρικού μπόιλερ που καλύπτει τις ανάγκες ζεστού νερού εκατοντάδων διαμερισμάτων από ένα κέντρο, και τα πλεονεκτήματά της στα δημόσια έργα.',
    category: 'Τεχνικό',
    body: [
      {
        heading: 'Τι είναι ένα κεντρικό σύστημα;',
        paragraphs: [
          'Στα κεντρικά συστήματα, αντί να εγκαθίσταται ξεχωριστό σύστημα σε κάθε διαμέρισμα, ένα μεγάλο πεδίο συλλεκτών και μια κεντρική ομάδα μπόιλερ στη στέγη του κτιρίου παράγουν ζεστό νερό για ολόκληρο το κτίριο. Αυτή η προσέγγιση ξεχωρίζει σε κόστος και απόδοση για δομές υψηλής χρήσης όπως μαζικές κατοικίες, εστίες, φυλακές, νοσοκομεία και στρατιωτικές εγκαταστάσεις.',
        ],
      },
      {
        heading: 'Γιατί προτιμάται σε μεγάλα έργα;',
        paragraphs: [
          'Μια κεντρική λύση προσφέρει κοινή συντήρηση, παρακολούθηση από ένα σημείο και οικονομίες κλίμακας. Η επιφάνεια της στέγης χρησιμοποιείται αποδοτικά, δεν απαιτείται παρέμβαση στα διαμερίσματα, και το σύστημα διαχειρίζεται από μία πηγή από επαγγελματικές ομάδες.',
          'Η Şimşek Solar έχει εγκαταστήσει κεντρικά συστήματα σε έργα μαζικής κατοικίας και δημόσια έργα σε όλη την Τουρκία με εκατοντάδες χιλιάδες συλλέκτες. Ο στατικός υπολογισμός ανά έργο, ο σχεδιασμός χωρητικότητας και η ενσωμάτωση αυτοματισμού ετοιμάζονται από την ομάδα μηχανικής.',
        ],
      },
      {
        heading: 'Αυτοματισμός και παρακολούθηση',
        paragraphs: [
          'Τα κεντρικά συστήματα διαχειρίζονται έξυπνα με πίνακες αυτοματισμού και μονάδες ελέγχου. Η θερμοκρασία, η κατάσταση της αντλίας και η απόδοση μπορούν να παρακολουθούνται εξ αποστάσεως· οι βλάβες εντοπίζονται έγκαιρα για αδιάλειπτη εξυπηρέτηση.',
        ],
      },
    ],
  },
  'dogru-boyler-kapasitesi-nasil-secilir': {
    title: 'Πώς να επιλέξετε τη σωστή χωρητικότητα μπόιλερ',
    excerpt:
      'Ένας πρακτικός οδηγός επιλογής για τον ιδανικό όγκο μπόιλερ ανά μέγεθος νοικοκυριού, τη διαφορά ανοιχτού και κλειστού κυκλώματος, και την επίδραση της επίστρωσης εμαγιέ στη μακροζωία.',
    category: 'Οδηγός',
    body: [
      {
        heading: 'Όγκος ανά μέγεθος νοικοκυριού',
        paragraphs: [
          'Ως γενικός κανόνας, περίπου 200 λίτρα συνιστώνται για νοικοκυριό 2–4 ατόμων, και 300 λίτρα ή περισσότερα για μεγαλύτερα νοικοκυριά. Οι συνήθειες χρήσης, ο αριθμός των μπάνιων και η κλιματική ζώνη επηρεάζουν αυτήν την τιμή.',
        ],
      },
      {
        heading: 'Ανοιχτό ή κλειστό κύκλωμα;',
        paragraphs: [
          'Σε περιοχές με χαμηλό κίνδυνο παγετού, τα συστήματα ανοιχτού κυκλώματος είναι μια οικονομική λύση. Σε περιοχές όπου η θερμοκρασία πέφτει κάτω από το μηδέν τον χειμώνα, θα πρέπει να προτιμώνται συστήματα κλειστού κυκλώματος με αντιψυκτικό· έτσι ο συλλέκτης και οι σωληνώσεις προστατεύονται από τον παγετό.',
        ],
      },
      {
        heading: 'Η σημασία της επίστρωσης εμαγιέ',
        paragraphs: [
          'Η επίστρωση εμαγιέ στην εσωτερική επιφάνεια του μπόιλερ προστατεύει από τη διάβρωση και παρατείνει τη διάρκεια ζωής του συστήματος. Μαζί με την άνοδο καθοδικής προστασίας, τα εμαγιέ μπόιλερ χρησιμοποιούνται με ασφάλεια για δεκαετίες.',
        ],
      },
    ],
  },
  'solar-keymark-nedir-neden-onemli': {
    title: 'Τι είναι το Solar Keymark και γιατί έχει σημασία;',
    excerpt:
      'Το εύρος του Solar Keymark — του ανεξάρτητου ευρωπαϊκού πιστοποιητικού ποιότητας και απόδοσης για ηλιακά θερμικά προϊόντα — και γιατί αποτελεί εγγύηση στην επιλογή προϊόντος.',
    category: 'Ποιότητα',
    body: [
      {
        heading: 'Ανεξάρτητη εγγύηση απόδοσης',
        paragraphs: [
          'Το Solar Keymark είναι ένα εθελοντικό σήμα ποιότητας αναγνωρισμένο σε όλη την Ευρώπη για ηλιακούς συλλέκτες και συστήματα. Πιστοποιεί ότι τα προϊόντα δοκιμάζονται σε ανεξάρτητα εργαστήρια και συμμορφώνονται με τα σχετικά πρότυπα.',
          'Αυτό το πιστοποιητικό δείχνει ότι το προϊόν πληροί διεθνώς αποδεκτά κριτήρια απόδοσης, αντοχής και ασφάλειας. Αποτελεί σημαντική αναφορά σε δημόσιους διαγωνισμούς και εξαγωγές.',
        ],
      },
      {
        heading: 'Η Şimşek Solar και η πιστοποίηση',
        paragraphs: [
          'Τα προϊόντα της Şimşek Solar διαθέτουν εθνικά και διεθνή πιστοποιητικά, με πρώτα τα CE, TSE και Solar Keymark. Τα πιστοποιητικά αποτελούν ανεξάρτητη απόδειξη μακροζωίας και απόδοσης στην επιλογή προϊόντος.',
        ],
      },
    ],
  },
  'gunes-enerjisi-sisteminin-bakimi-6-ipucu': {
    title: 'Συντήρηση ηλιακού συστήματος: 6 συμβουλές για απόδοση',
    excerpt:
      'Πρακτικές συμβουλές όπως περιοδική συντήρηση, καθαρισμός συλλέκτη και έλεγχος ηλιακού υγρού ώστε το σύστημά σας να λειτουργεί με υψηλή απόδοση για χρόνια.',
    category: 'Συντήρηση',
    body: [
      {
        heading: 'Γιατί είναι απαραίτητη η τακτική συντήρηση;',
        paragraphs: [
          'Αν και τα ηλιακά θερμικά συστήματα είναι δομές χαμηλής συντήρησης, οι περιοδικοί έλεγχοι διατηρούν την απόδοση και παρατείνουν τη διάρκεια ζωής του συστήματος. Συνιστάται επαγγελματική συντήρηση μία φορά τον χρόνο.',
        ],
      },
      {
        heading: 'Έξι σημεία προσοχής',
        paragraphs: [
          '1) Κρατήστε την επιφάνεια του συλλέκτη μακριά από σκόνη και σκίαση. 2) Ελέγξτε τη στάθμη του ηλιακού υγρού και την τιμή αντιπαγετικής προστασίας. 3) Παρακολουθήστε τη λειτουργία της αντλίας και του αυτοματισμού. 4) Βεβαιωθείτε ότι δεν υπάρχουν διαρροές στα σημεία σύνδεσης και στους εύκαμπτους συνδέσμους. 5) Ελέγχετε περιοδικά την άνοδο του μπόιλερ. 6) Επιθεωρήστε τις τιμές πίεσης του εξοπλισμού ασφαλείας.',
          'Αυτά τα βήματα είναι οι έλεγχοι που εφαρμόζει η ομάδα εξυπηρέτησης μετά την πώληση στο πλαίσιο της περιοδικής συντήρησης. Μπορείτε να δημιουργήσετε το αίτημα συντήρησής σας online.',
        ],
      },
    ],
  },
};

const TEXT: Record<Locale, Record<string, ArticleText>> = { tr, en, ar, el };

/* META + dile özel metni birleştirerek belirli bir dilin makale dizisini üretir. */
function buildArticles(locale: Locale): Article[] {
  const text = TEXT[locale] ?? TEXT.tr;
  return META.map((m) => {
    const t = text[m.slug] ?? TEXT.tr[m.slug];
    return { ...m, ...t };
  });
}

export const articlesByLocale: Record<Locale, Article[]> = {
  tr: buildArticles('tr'),
  en: buildArticles('en'),
  ar: buildArticles('ar'),
  el: buildArticles('el'),
};

/* Verilen dile göre makale listesi; eksikte Türkçe'ye düşer. */
export function getArticles(locale: string): Article[] {
  return articlesByLocale[locale as Locale] ?? articlesByLocale.tr;
}

/* Geriye dönük uyumluluk: Türkçe dizi (sitemap, generateStaticParams, admin tohumu). */
export const articles = articlesByLocale.tr;

export const articleCategories = Array.from(new Set(articles.map((a) => a.category)));
