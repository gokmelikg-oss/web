/* Blog / Bilgi Merkezi içerikleri. Evergreen, doğru ve SEO odaklı eğitici yazılar.
   Gerçek duyuru/haber geldiğinde bu diziye eklenebilir (ya da admin'e taşınabilir). */

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

export const articles: Article[] = [
  {
    slug: 'gunes-enerjisiyle-sicak-su-nasil-uretilir',
    title: 'Güneş enerjisiyle sıcak su nasıl üretilir?',
    excerpt:
      'Güneş termal sistemlerin çalışma prensibi: kollektör, boyler ve dolaşım hattının suyu elektrik veya gaz kullanmadan nasıl ısıttığını adım adım anlatıyoruz.',
    category: 'Rehber',
    date: '2026-07-15',
    readMin: 4,
    cover: '/products/orion-500.jpg',
    keywords: ['güneş enerjisi ile sıcak su', 'güneş termal', 'güneş kollektörü', 'nasıl çalışır'],
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
  {
    slug: 'toplu-konut-merkezi-gunes-enerjisi-sistemleri',
    title: 'TOKİ ve toplu konutlarda merkezi güneş enerjisi sistemleri',
    excerpt:
      'Yüzlerce dairenin sıcak su ihtiyacını tek merkezden karşılayan kollektör tarlası + merkezi boyler mimarisi ve kamu projelerinde sağladığı avantajlar.',
    category: 'Teknik',
    date: '2026-06-28',
    readMin: 5,
    cover: '/products/merkezi-sistem-saha.jpg',
    keywords: ['TOKİ güneş enerjisi', 'merkezi güneş enerjisi sistemi', 'toplu konut sıcak su', 'kamu projeleri'],
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
  {
    slug: 'dogru-boyler-kapasitesi-nasil-secilir',
    title: 'Doğru boyler kapasitesi nasıl seçilir?',
    excerpt:
      'Hane büyüklüğüne göre ideal boyler hacmi, açık ve kapalı devre farkı ve emaye kaplamanın uzun ömre etkisi üzerine pratik bir seçim rehberi.',
    category: 'Rehber',
    date: '2026-06-10',
    readMin: 3,
    cover: '/products/aquarious-740.jpg',
    keywords: ['boyler kapasitesi', 'emayeli boyler', 'sıcak su boyleri', 'boyler seçimi'],
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
  {
    slug: 'solar-keymark-nedir-neden-onemli',
    title: 'Solar Keymark nedir, neden önemlidir?',
    excerpt:
      'Avrupa’nın güneş termal ürünlerdeki bağımsız kalite ve performans belgesi Solar Keymark’ın kapsamı ve ürün seçiminde neden güvence olduğu.',
    category: 'Kalite',
    date: '2026-05-22',
    readMin: 3,
    cover: '/products/orion-400.jpg',
    keywords: ['Solar Keymark', 'güneş kollektörü sertifikası', 'kalite belgesi', 'CE TSE'],
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
  {
    slug: 'gunes-enerjisi-sisteminin-bakimi-6-ipucu',
    title: 'Güneş enerjisi sisteminin bakımı: verim için 6 ipucu',
    excerpt:
      'Sisteminizin yıllarca yüksek verimle çalışması için periyodik bakım, kollektör temizliği ve solar sıvı kontrolü gibi pratik öneriler.',
    category: 'Bakım',
    date: '2026-05-05',
    readMin: 4,
    cover: '/products/fabrika-1.jpg',
    keywords: ['güneş enerjisi bakım', 'kollektör temizliği', 'solar sıvı', 'sistem verimi'],
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
];

export const articleCategories = Array.from(new Set(articles.map((a) => a.category)));
