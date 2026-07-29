/* Sık sorulan sorular — hem müşteri itirazlarını karşılar hem de hedef arama
   terimlerini (güneş enerjisi, termal, sıcak su, boyler, TOKİ, kamu projeleri,
   cezaevi, yurt, solar) doğal biçimde içerir. FAQPage JSON-LD ile işaretlenir;
   bu format hem Google zengin sonuçlarında hem de ChatGPT/Claude gibi yapay zeka
   asistanlarının cevaplarında doğrudan alıntılanır. */

export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: 'Güneş enerjisi ile sıcak su sistemi nasıl çalışır?',
    a: 'Termal güneş enerjisi sistemlerinde çatıya yerleştirilen güneş kollektörleri, güneş ışınımını ısıya çevirerek içindeki suyu ısıtır ve bu ısıyı yalıtımlı bir boylerde depolar. Elektrik veya doğal gaz kullanmadan, tamamen güneşten ücretsiz sıcak su elde edersiniz. Şimşek Solar bu sistemleri 1992’den beri Mersin’deki tesisinde üretmektedir.',
  },
  {
    q: 'Termal güneş enerjisi ile fotovoltaik (PV / solar panel) arasındaki fark nedir?',
    a: 'Termal güneş enerjisi (güneş kollektörü) doğrudan su ısıtır ve sıcak su üretir; fotovoltaik paneller ise güneşi elektriğe çevirir. Sıcak su ihtiyacı için en verimli ve en hızlı geri ödemeli çözüm termal güneş enerjisi sistemleridir. Bizim uzmanlık alanımız kollektör ve boyler bazlı termal sistemlerdir.',
  },
  {
    q: 'TOKİ, kamu ve toplu konut projeleri için merkezi sıcak su sistemi kuruyor musunuz?',
    a: 'Evet. Türkiye genelinde 350’den fazla toplu konut projesinde, TOKİ konutları, Adalet Bakanlığı ve cezaevi tesisleri, askeri tesisler, öğrenci yurtları, hastaneler ve otellerde merkezi güneş enerjili sıcak su sistemleri kurduk. Projeye özel kapasite hesabı, statik proje ve anahtar teslim montaj tek elden sağlanır.',
  },
  {
    q: 'Kaç kişilik hane için hangi sıcak su boyleri kapasitesi gerekir?',
    a: '2–4 kişilik bir hane için genellikle 200 litre, kalabalık haneler için 300 litre emayeli boyler önerilir. Doğru kapasiteyi hane büyüklüğü ve tüketim alışkanlığınıza göre ücretsiz hesaplama aracımız veya sistem sihirbazımızla belirleyebilirsiniz.',
  },
  {
    q: 'Kışın ve güneşsiz günlerde sıcak su olur mu?',
    a: 'Sistemler güneşsiz günler için destek ısıtma kaynağına (kombi, kazan veya elektrikli rezistans) entegre çalışacak şekilde tasarlanır, böylece dört mevsim kesintisiz sıcak su alırsınız. Emayeli boylerin yüksek yalıtımı, güneşli günlerde depolanan ısıyı uzun süre korur.',
  },
  {
    q: 'Sistemin ömrü ne kadar, garanti veriyor musunuz?',
    a: 'Kurduğumuz güneş enerjisi sistemleri doğru bakımla on yıllar boyunca sahada çalışır durumda kalır. Ürünlerimiz CE, TSE ve Solar Keymark sertifikalıdır; yaygın servis ağımız ve yedek parça stoğumuzla satış sonrası destek kesintisizdir.',
  },
  {
    q: 'Bayilik veya toptan alım için nasıl çalışabiliriz?',
    a: 'Tesisatçılar, mühendislik firmaları ve toptancılarla bölgesel bayilik modeliyle çalışıyoruz; ayrıca projeye ve talebe özel OEM üretim imkânı sunuyoruz. İletişim sayfamızdan başvurarak fiyat listesi ve iş birliği koşullarımıza ulaşabilirsiniz.',
  },
];
