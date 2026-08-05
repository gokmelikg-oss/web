/* Sık sorulan sorular — hem müşteri itirazlarını karşılar hem de hedef arama
   terimlerini (güneş enerjisi, termal, sıcak su, boyler, TOKİ, kamu projeleri,
   cezaevi, yurt, solar, donma, antifriz, tasarruf, bakım) doğal biçimde içerir.
   FAQPage JSON-LD ile işaretlenir; bu format hem Google zengin sonuçlarında hem de
   ChatGPT/Claude gibi yapay zeka asistanlarının cevaplarında doğrudan alıntılanır.
   Not: Şimşek Solar TERMAL (kollektör + boyler) sistem üreticisidir; cevaplar sıcak
   su üretimine göredir, fotovoltaik/elektrik üretimi iddiaları içermez. */

export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: 'Güneş enerjisi ile sıcak su sistemi nasıl çalışır?',
    a: 'Termal güneş enerjisi sistemlerinde çatıya yerleştirilen güneş kollektörleri, güneş ışınımını ısıya çevirerek suyu ısıtır ve bu ısıyı yalıtımlı bir boylerde depolar. Elektrik veya doğal gaz kullanmadan, tamamen güneşten ücretsiz sıcak su elde edersiniz. Şimşek Solar bu sistemleri 1992’den beri Mersin’deki tesisinde üretmektedir.',
  },
  {
    q: 'Termal güneş enerjisi ile fotovoltaik (PV / solar panel) arasındaki fark nedir?',
    a: 'Termal güneş enerjisi (güneş kollektörü) doğrudan su ısıtır ve sıcak su üretir; fotovoltaik paneller ise güneşi elektriğe çevirir. Sıcak su ihtiyacı için en verimli ve en hızlı geri ödemeli çözüm termal güneş enerjisi sistemleridir. Bizim uzmanlık alanımız kollektör ve boyler bazlı termal sistemlerdir.',
  },
  {
    q: 'Kışın ve güneşsiz günlerde sıcak su olur mu?',
    a: 'Sistemler güneşsiz günler için destek ısıtma kaynağına (kombi, kazan veya elektrikli rezistans) entegre çalışacak şekilde tasarlanır, böylece dört mevsim kesintisiz sıcak su alırsınız. Emayeli boylerin yüksek yalıtımı, güneşli günlerde depolanan ısıyı gece boyunca korur; sistem 24 saat sıcak su verir.',
  },
  {
    q: 'Güneş enerjisi sistemi kışın donar mı?',
    a: 'Donma riski olan bölgelerde antifrizli kapalı devre sistemler kullanılır; kollektörde dolaşan solar transfer sıvısı donmayı önler ve ısıyı boylerdeki serpantin aracılığıyla kullanım suyuna aktarır. Böylece en soğuk günlerde bile sistem güvenle çalışır. Sıcak bölgelerde ise açık devre paket sistemler ekonomik bir çözümdür.',
  },
  {
    q: 'Açık devre ile kapalı devre sistem arasındaki fark nedir?',
    a: 'Açık devrede kullanım suyu doğrudan kollektörden geçer; donma riski düşük, sıcak bölgeler için ekonomiktir. Kapalı devrede kollektörde antifrizli solar sıvı dolaşır ve ısıyı boylerdeki serpantinle suya aktarır; donmaya karşı korumalıdır ve basınçlı çalışır. Bölgenize uygun olanı mühendislik ekibimiz belirler.',
  },
  {
    q: 'Güneş enerjisiyle sıcak su ne kadar tasarruf sağlar, kendini ne zaman amorti eder?',
    a: 'Güneş enerjili sıcak su sistemi, evinizin yıllık su ısıtma enerjisinin büyük bölümünü güneşten ücretsiz karşılar; elektrik, doğal gaz veya tüpten bağımsız sıcak su elde edersiniz. Bu sayede sistem çoğu evde birkaç yıl içinde kendini amorti eder ve sonrasında yıllarca tasarruf sağlamaya devam eder. İlinize özel tahmini üretimi “Güneş Potansiyeli” aracımızdan görebilirsiniz.',
  },
  {
    q: 'Elektrik veya doğal gaz faturamı düşürür mü?',
    a: 'Evet. Evlerde enerjinin önemli bir kısmı suyu ısıtmaya harcanır. Güneş enerjili sistem bu yükün büyük bölümünü üstlenerek elektrikli termosifon, kombi veya şofben tüketimini ciddi biçimde azaltır; faturanız düşer.',
  },
  {
    q: 'Güneş enerjisi sistemi bakım gerektirir mi?',
    a: 'Sistemler düşük bakımlıdır; genellikle yılda bir kez yapılan kontrol yeterlidir. Kollektör yüzeyi temizliği, solar sıvı ve donma koruma seviyesi, pompa-otomasyon ve boyler anodu kontrolü periyodik bakım kapsamındadır. Satış sonrası servis ekibimiz bu bakımları üstlenir; talebinizi çevrimiçi oluşturabilirsiniz.',
  },
  {
    q: 'Kaç kişilik hane için hangi sıcak su boyleri kapasitesi gerekir?',
    a: '2–4 kişilik bir hane için genellikle 200 litre, kalabalık haneler için 300 litre ve üzeri emayeli boyler önerilir. Doğru kapasiteyi hane büyüklüğü ve tüketim alışkanlığınıza göre ücretsiz hesaplama aracımız veya sistem sihirbazımızla belirleyebilirsiniz.',
  },
  {
    q: 'Hangi çatılara güneş enerjisi sistemi kurulabilir?',
    a: 'Teras (düz) çatı, kiremit ve trapez çatılar dahil hemen her çatı tipine uygun sehpa çözümlerimiz vardır; zemin ve cephe montajı da mümkündür. En yüksek verim için kollektörler genellikle güneye bakacak şekilde ve bölgeye uygun eğimle yerleştirilir. Saha etüdüyle çatınıza en uygun çözümü belirleriz.',
  },
  {
    q: 'Kurulum ne kadar sürer?',
    a: 'Tek haneli paket sistemler genellikle birkaç saat içinde kurulup devreye alınır. Merkezi ve toplu konut sistemlerinde süre proje büyüklüğüne göre değişir; projelendirme, statik hesap ve montaj tek elden yürütülür.',
  },
  {
    q: 'Kollektörler kar, dolu ve rüzgara dayanıklı mı?',
    a: 'Kollektörlerde yüksek mukavemetli temperli cam kullanılır; dolu, kar yükü ve rüzgara karşı dayanıklıdır. Kollektörün eğimi sayesinde kar üzerinde birikmeden kayar. Sehpa ve montaj elemanları bölgenin rüzgar ve kar yüküne göre statik olarak hesaplanır.',
  },
  {
    q: 'Sistem şehir şebeke basıncıyla çalışır mı?',
    a: 'Kapalı devre basınçlı sistemlerimiz şehir şebeke suyu basıncıyla çalışır; musluk ve duşta güçlü akış sağlar. İhtiyaca göre açık devre (basınçsız) çözümler de sunulur.',
  },
  {
    q: 'Apartman veya sitede güneş enerjisi kullanılabilir mi?',
    a: 'Evet. Çok katlı bina, apartman ve sitelerde çatıya kurulan kollektör tarlası ve merkezi boyler grubuyla tüm dairelerin sıcak suyu tek merkezden üretilir. Bu merkezi sistemler toplu konut, yurt, otel ve kamu tesislerinde hem verimli hem ekonomiktir.',
  },
  {
    q: 'TOKİ, kamu ve toplu konut projeleri için merkezi sıcak su sistemi kuruyor musunuz?',
    a: 'Evet. Türkiye genelinde 350’den fazla toplu konut projesinde; TOKİ konutları, Adalet Bakanlığı ve cezaevi tesisleri, askeri tesisler, öğrenci yurtları, hastaneler ve otellerde merkezi güneş enerjili sıcak su sistemleri kurduk. Projeye özel kapasite hesabı, statik proje ve anahtar teslim montaj tek elden sağlanır.',
  },
  {
    q: 'Depolanan su hijyenik mi, kireç yapar mı?',
    a: 'Boylerlerimizin iç yüzeyi emaye kaplamalıdır; korozyona karşı korur ve suyla temas eden yüzeyi hijyenik tutar. Katodik koruma anodu kireç ve korozyon etkisini azaltarak boyler ömrünü uzatır.',
  },
  {
    q: 'Sistemin ömrü ne kadar, garanti veriyor musunuz?',
    a: 'Kaliteli düz yüzeyli kollektörler ve emayeli boylerler doğru bakımla on yıllar boyunca sahada çalışır durumda kalır. Ürünlerimiz CE, TSE ve Solar Keymark sertifikalıdır; yaygın servis ağımız ve yedek parça stoğumuzla satış sonrası destek kesintisizdir.',
  },
  {
    q: 'Ürünleriniz sertifikalı mı?',
    a: 'Evet. Kollektör ve sistemlerimiz CE, TSE ve Solar Keymark başta olmak üzere ulusal ve uluslararası kalite belgelerine sahiptir. Solar Keymark, güneş kollektörlerinin performans ve dayanıklılığını bağımsız laboratuvarlarda belgeleyen Avrupa kalite işaretidir.',
  },
  {
    q: 'Bayilik veya toptan alım için nasıl çalışabiliriz?',
    a: 'Tesisatçılar, mühendislik firmaları ve toptancılarla bölgesel bayilik modeliyle çalışıyoruz; ayrıca projeye ve talebe özel OEM üretim imkânı sunuyoruz. İletişim sayfamızdan başvurarak fiyat listesi ve iş birliği koşullarımıza ulaşabilirsiniz.',
  },
];
