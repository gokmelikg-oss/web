/* Sık sorulan sorular — hem müşteri itirazlarını karşılar hem de hedef arama
   terimlerini doğal biçimde içerir. FAQPage JSON-LD ile işaretlenir; bu format hem
   Google zengin sonuçlarında hem de yapay zeka asistanlarının cevaplarında alıntılanır.
   Not: Şimşek Solar TERMAL (kollektör + boyler) sistem üreticisidir; cevaplar sıcak
   su üretimine göredir. İçerik dört dilde sunulur (tr varsayılan; eksikte tr'ye düşer). */

import type { Locale } from '@/i18n/config';

export interface FaqItem {
  q: string;
  a: string;
}

const tr: FaqItem[] = [
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

const en: FaqItem[] = [
  {
    q: 'How does a solar hot water system work?',
    a: 'In solar thermal systems, roof-mounted collectors turn solar radiation into heat, warm the water and store that heat in an insulated boiler. You get free hot water straight from the sun, with no electricity or natural gas. Şimşek Solar has manufactured these systems at its plant in Mersin since 1992.',
  },
  {
    q: 'What is the difference between solar thermal and photovoltaic (PV / solar panels)?',
    a: 'Solar thermal (a solar collector) heats water directly and produces hot water; photovoltaic panels convert sunlight into electricity. For hot water demand, solar thermal systems are the most efficient solution with the fastest payback. Our expertise is in collector- and boiler-based thermal systems.',
  },
  {
    q: 'Is there hot water in winter and on cloudy days?',
    a: 'Systems are designed to integrate with a backup heat source (combi boiler, boiler or electric element) for sunless days, so you get uninterrupted hot water all year round. The high insulation of the enameled boiler retains the heat stored on sunny days through the night; the system delivers hot water 24 hours a day.',
  },
  {
    q: 'Does the solar system freeze in winter?',
    a: 'In areas with a freezing risk, closed-loop systems with antifreeze are used; the solar transfer fluid circulating in the collector prevents freezing and transfers heat to the domestic water via the coil in the boiler. This way the system operates safely even on the coldest days. In warm regions, open-loop package systems are an economical solution.',
  },
  {
    q: 'What is the difference between open-loop and closed-loop systems?',
    a: 'In an open loop, the domestic water passes directly through the collector; freezing risk is low and it is economical for warm regions. In a closed loop, antifreeze solar fluid circulates in the collector and transfers heat to the water through the boiler coil; it is protected against freezing and runs pressurized. Our engineering team determines the right one for your region.',
  },
  {
    q: 'How much does solar hot water save, and when does it pay for itself?',
    a: 'A solar hot water system covers most of your home’s annual water-heating energy for free from the sun; you get hot water independent of electricity, natural gas or LPG. As a result, in most homes the system pays for itself within a few years and keeps saving for years afterward. You can see the estimated output for your province with our “Solar Potential” tool.',
  },
  {
    q: 'Will it lower my electricity or natural gas bill?',
    a: 'Yes. In homes a significant share of energy goes to heating water. A solar system takes on most of this load, significantly reducing the consumption of an electric water heater, combi boiler or geyser; your bill goes down.',
  },
  {
    q: 'Does a solar system require maintenance?',
    a: 'The systems are low-maintenance; usually one check per year is enough. Cleaning the collector surface, checking the solar fluid and freeze-protection level, the pump/automation and the boiler anode are part of periodic maintenance. Our after-sales service team handles these; you can create your request online.',
  },
  {
    q: 'Which boiler capacity is needed for a household of a given size?',
    a: 'For a household of 2–4 people, a 200-liter enameled boiler is usually recommended, and 300 liters or more for larger households. You can determine the right capacity based on household size and consumption habits with our free calculation tool or system wizard.',
  },
  {
    q: 'On which roofs can a solar system be installed?',
    a: 'We have mounting-frame solutions suited to almost every roof type, including flat (terrace), tiled and trapezoidal roofs; ground and façade mounting is also possible. For the highest efficiency, collectors are usually placed facing south with a tilt suited to the region. We determine the best solution for your roof with a site survey.',
  },
  {
    q: 'How long does installation take?',
    a: 'Single-household package systems are usually installed and commissioned within a few hours. For central and mass-housing systems the time varies with project size; engineering, structural calculation and installation are all handled from a single source.',
  },
  {
    q: 'Are the collectors resistant to snow, hail and wind?',
    a: 'The collectors use high-strength tempered glass; they resist hail, snow load and wind. Thanks to the collector’s tilt, snow slides off without accumulating. Frames and mounting components are structurally calculated for the region’s wind and snow loads.',
  },
  {
    q: 'Does the system work with mains water pressure?',
    a: 'Our closed-loop pressurized systems work with city mains water pressure and provide strong flow at the tap and shower. Open-loop (unpressurized) solutions are also offered where needed.',
  },
  {
    q: 'Can solar energy be used in an apartment building or housing complex?',
    a: 'Yes. In multi-storey buildings, apartment blocks and complexes, a roof-mounted collector field and a central boiler group produce hot water for all units from a single center. These central systems are both efficient and economical in mass housing, dormitories, hotels and public facilities.',
  },
  {
    q: 'Do you install central hot water systems for public, mass-housing and social-housing projects?',
    a: 'Yes. Across Türkiye we have installed central solar hot water systems in more than 350 mass-housing projects; in social housing, Ministry of Justice and prison facilities, military facilities, student dormitories, hospitals and hotels. Project-specific capacity calculation, structural design and turnkey installation are provided from a single source.',
  },
  {
    q: 'Is the stored water hygienic; does it cause limescale?',
    a: 'The inner surface of our boilers is enamel-coated; it protects against corrosion and keeps the surface in contact with water hygienic. The cathodic-protection anode reduces the effect of limescale and corrosion, extending the boiler’s life.',
  },
  {
    q: 'How long does the system last; do you offer a warranty?',
    a: 'Quality flat-plate collectors and enameled boilers remain operational in the field for decades with proper maintenance. Our products are CE, TSE and Solar Keymark certified; with our widespread service network and spare-parts stock, after-sales support is uninterrupted.',
  },
  {
    q: 'Are your products certified?',
    a: 'Yes. Our collectors and systems hold national and international quality certificates, led by CE, TSE and Solar Keymark. Solar Keymark is the European quality mark that certifies the performance and durability of solar collectors in independent laboratories.',
  },
  {
    q: 'How can we work together as a dealer or wholesale buyer?',
    a: 'We work with installers, engineering firms and wholesalers through a regional dealership model; we also offer OEM production tailored to the project and demand. You can apply via our contact page to reach our price list and cooperation terms.',
  },
];

const ar: FaqItem[] = [
  {
    q: 'كيف يعمل نظام الماء الساخن بالطاقة الشمسية؟',
    a: 'في الأنظمة الشمسية الحرارية، تحوّل المجمعات المثبتة على السطح الإشعاع الشمسي إلى حرارة، فتسخّن الماء وتخزّن هذه الحرارة في خزان معزول. تحصلون على ماء ساخن مجاني من الشمس مباشرة، دون كهرباء أو غاز طبيعي. تصنّع شمشك سولار هذه الأنظمة في مصنعها بمرسين منذ عام 1992.',
  },
  {
    q: 'ما الفرق بين الطاقة الشمسية الحرارية والطاقة الكهروضوئية (PV / الألواح الشمسية)؟',
    a: 'الطاقة الشمسية الحرارية (المجمّع الشمسي) تسخّن الماء مباشرة وتنتج ماءً ساخناً؛ أما الألواح الكهروضوئية فتحوّل الشمس إلى كهرباء. لتلبية الحاجة إلى الماء الساخن، تُعد الأنظمة الشمسية الحرارية الحل الأكثر كفاءة والأسرع في استرداد التكلفة. تخصصنا هو الأنظمة الحرارية القائمة على المجمّع والخزان.',
  },
  {
    q: 'هل يتوفر ماء ساخن في الشتاء وفي الأيام الغائمة؟',
    a: 'صُمّمت الأنظمة لتعمل بالتكامل مع مصدر تدفئة احتياطي (سخان مركزي أو غلاية أو عنصر كهربائي) في الأيام دون شمس، فتحصلون على ماء ساخن دون انقطاع طوال العام. يحافظ العزل العالي للخزان المطلي بالمينا على الحرارة المخزّنة في الأيام المشمسة طوال الليل؛ فيوفّر النظام ماءً ساخناً على مدار 24 ساعة.',
  },
  {
    q: 'هل يتجمد النظام الشمسي في الشتاء؟',
    a: 'في المناطق المعرّضة لخطر التجمد تُستخدم أنظمة مغلقة الدائرة بمانع تجمّد؛ يمنع سائل النقل الشمسي المتداول في المجمّع التجمد وينقل الحرارة إلى ماء الاستخدام عبر الملف الحلزوني في الخزان. وهكذا يعمل النظام بأمان حتى في أبرد الأيام. أما في المناطق الدافئة فتُعد الأنظمة الجاهزة مفتوحة الدائرة حلاً اقتصادياً.',
  },
  {
    q: 'ما الفرق بين النظام مفتوح الدائرة والنظام مغلق الدائرة؟',
    a: 'في الدائرة المفتوحة يمر ماء الاستخدام مباشرة عبر المجمّع؛ خطر التجمد منخفض وهو اقتصادي للمناطق الدافئة. في الدائرة المغلقة يتداول سائل شمسي بمانع تجمّد في المجمّع وينقل الحرارة إلى الماء عبر الملف الحلزوني للخزان؛ فهو محمي من التجمد ويعمل بالضغط. يحدّد فريقنا الهندسي المناسب لمنطقتكم.',
  },
  {
    q: 'كم يوفّر الماء الساخن الشمسي، ومتى يسترد تكلفته؟',
    a: 'يغطّي نظام الماء الساخن الشمسي معظم طاقة تسخين المياه السنوية لمنزلكم مجاناً من الشمس؛ فتحصلون على ماء ساخن مستقل عن الكهرباء والغاز الطبيعي والغاز المسال. وبذلك يسترد النظام تكلفته خلال بضع سنوات في معظم المنازل ويستمر في التوفير لسنوات بعدها. يمكنكم رؤية الإنتاج التقديري الخاص بمحافظتكم عبر أداة «الإمكان الشمسي».',
  },
  {
    q: 'هل يخفّض فاتورة الكهرباء أو الغاز الطبيعي؟',
    a: 'نعم. في المنازل يُنفَق جزء كبير من الطاقة على تسخين الماء. يتحمّل النظام الشمسي معظم هذا الحمل فيقلّل بشكل كبير من استهلاك سخان الماء الكهربائي أو السخان المركزي أو سخان الغاز؛ فتنخفض فاتورتكم.',
  },
  {
    q: 'هل يحتاج النظام الشمسي إلى صيانة؟',
    a: 'الأنظمة قليلة الصيانة؛ عادةً يكفي فحص واحد سنوياً. يشمل نطاق الصيانة الدورية تنظيف سطح المجمّع، وفحص مستوى السائل الشمسي والحماية من التجمد، والمضخة/الأتمتة، وأنود الخزان. يتولى فريق خدمة ما بعد البيع لدينا هذه الأعمال؛ ويمكنكم إنشاء طلبكم عبر الإنترنت.',
  },
  {
    q: 'ما سعة الخزان اللازمة لأسرة بحجم معيّن؟',
    a: 'لأسرة من 2 إلى 4 أشخاص يُوصى عادةً بخزان مطلي بالمينا سعة 200 لتر، وسعة 300 لتر فأكثر للأسر الأكبر. يمكنكم تحديد السعة المناسبة حسب حجم الأسرة وعادات الاستهلاك عبر أداة الحساب المجانية أو معالج النظام لدينا.',
  },
  {
    q: 'على أي أسطح يمكن تركيب النظام الشمسي؟',
    a: 'لدينا حلول قواعد تناسب تقريباً كل نوع سطح، بما في ذلك الأسطح المستوية (التراس) والقرميدية وشبه المنحرفة؛ كما يمكن التركيب على الأرض والواجهة. لأعلى كفاءة توضع المجمعات عادةً باتجاه الجنوب وبميل مناسب للمنطقة. نحدّد الحل الأمثل لسطحكم عبر مسح ميداني.',
  },
  {
    q: 'كم يستغرق التركيب؟',
    a: 'تُركّب الأنظمة الجاهزة لأسرة واحدة وتُشغّل عادةً خلال بضع ساعات. في الأنظمة المركزية والإسكان الجماعي تختلف المدة حسب حجم المشروع؛ ويُدار التصميم والحساب الإنشائي والتركيب من مصدر واحد.',
  },
  {
    q: 'هل المجمعات مقاومة للثلج والبَرَد والرياح؟',
    a: 'تستخدم المجمعات زجاجاً مقسّى عالي المتانة؛ فهي مقاومة للبَرَد وأحمال الثلج والرياح. وبفضل ميل المجمّع ينزلق الثلج دون تراكم. تُحسب القواعد وعناصر التركيب إنشائياً وفق أحمال الرياح والثلج في المنطقة.',
  },
  {
    q: 'هل يعمل النظام بضغط شبكة المياه؟',
    a: 'تعمل أنظمتنا المغلقة الدائرة المضغوطة بضغط ماء الشبكة العامة وتوفّر تدفقاً قوياً في الصنبور والدش. كما تُقدَّم حلول مفتوحة الدائرة (دون ضغط) عند الحاجة.',
  },
  {
    q: 'هل يمكن استخدام الطاقة الشمسية في عمارة سكنية أو مجمّع؟',
    a: 'نعم. في المباني متعددة الطوابق والعمارات والمجمعات، يُنتَج الماء الساخن لجميع الشقق من مركز واحد عبر حقل مجمعات مثبّت على السطح ومجموعة خزانات مركزية. هذه الأنظمة المركزية فعّالة واقتصادية في الإسكان الجماعي والمساكن الطلابية والفنادق والمنشآت العامة.',
  },
  {
    q: 'هل تركّبون أنظمة ماء ساخن مركزية لمشاريع الإسكان العام والجماعي؟',
    a: 'نعم. في عموم تركيا ركّبنا أنظمة ماء ساخن شمسية مركزية في أكثر من 350 مشروع إسكان جماعي؛ في مساكن الإسكان الاجتماعي، ومنشآت وزارة العدل والسجون، والمنشآت العسكرية، والمساكن الطلابية، والمستشفيات، والفنادق. يُوفَّر حساب السعة الخاص بالمشروع والتصميم الإنشائي والتركيب الجاهز من مصدر واحد.',
  },
  {
    q: 'هل الماء المخزّن صحي؟ وهل يسبّب الترسبات الكلسية؟',
    a: 'السطح الداخلي لخزاناتنا مطلي بالمينا؛ فهو يحمي من التآكل ويبقي السطح الملامس للماء صحياً. ويقلّل أنود الحماية الكاثودية من تأثير الترسبات والتآكل فيطيل عمر الخزان.',
  },
  {
    q: 'كم عمر النظام؟ وهل تقدّمون ضماناً؟',
    a: 'تبقى المجمعات المسطّحة الجيدة والخزانات المطلية بالمينا صالحة للعمل في الميدان لعقود مع الصيانة الصحيحة. منتجاتنا حاصلة على شهادات CE وTSE وSolar Keymark؛ وبفضل شبكة خدماتنا الواسعة ومخزون قطع الغيار، فإن دعم ما بعد البيع متواصل.',
  },
  {
    q: 'هل منتجاتكم معتمدة؟',
    a: 'نعم. تحمل مجمعاتنا وأنظمتنا شهادات جودة وطنية ودولية، في مقدمتها CE وTSE وSolar Keymark. وSolar Keymark هي علامة الجودة الأوروبية التي توثّق أداء المجمعات الشمسية ومتانتها في مختبرات مستقلة.',
  },
  {
    q: 'كيف يمكننا التعاون كوكيل أو مشترٍ بالجملة؟',
    a: 'نتعاون مع فنيي التركيب وشركات الهندسة وتجار الجملة عبر نموذج وكالة إقليمي؛ كما نوفّر إمكانية إنتاج OEM حسب المشروع والطلب. يمكنكم التقديم عبر صفحة الاتصال للوصول إلى قائمة الأسعار وشروط التعاون.',
  },
];

const el: FaqItem[] = [
  {
    q: 'Πώς λειτουργεί ένα ηλιακό σύστημα ζεστού νερού;',
    a: 'Στα ηλιακά θερμικά συστήματα, οι συλλέκτες στη στέγη μετατρέπουν την ηλιακή ακτινοβολία σε θερμότητα, ζεσταίνουν το νερό και αποθηκεύουν αυτή τη θερμότητα σε ένα μονωμένο μπόιλερ. Παίρνετε δωρεάν ζεστό νερό απευθείας από τον ήλιο, χωρίς ηλεκτρικό ή φυσικό αέριο. Η Şimşek Solar κατασκευάζει αυτά τα συστήματα στις εγκαταστάσεις της στη Μερσίνα από το 1992.',
  },
  {
    q: 'Ποια είναι η διαφορά μεταξύ ηλιακού θερμικού και φωτοβολταϊκού (PV / ηλιακά πάνελ);',
    a: 'Το ηλιακό θερμικό (ένας ηλιακός συλλέκτης) ζεσταίνει απευθείας το νερό και παράγει ζεστό νερό· τα φωτοβολταϊκά πάνελ μετατρέπουν το ηλιακό φως σε ηλεκτρισμό. Για τη ζήτηση ζεστού νερού, τα ηλιακά θερμικά συστήματα είναι η πιο αποδοτική λύση με την ταχύτερη απόσβεση. Η εξειδίκευσή μας είναι στα θερμικά συστήματα με βάση τον συλλέκτη και το μπόιλερ.',
  },
  {
    q: 'Υπάρχει ζεστό νερό τον χειμώνα και τις συννεφιασμένες ημέρες;',
    a: 'Τα συστήματα σχεδιάζονται ώστε να συνεργάζονται με μια εφεδρική πηγή θερμότητας (λέβητας, μπόιλερ ή ηλεκτρική αντίσταση) για τις ημέρες χωρίς ήλιο, ώστε να έχετε αδιάλειπτο ζεστό νερό όλο τον χρόνο. Η υψηλή μόνωση του εμαγιέ μπόιλερ διατηρεί τη θερμότητα που αποθηκεύεται τις ηλιόλουστες ημέρες όλη τη νύχτα· το σύστημα παρέχει ζεστό νερό 24 ώρες την ημέρα.',
  },
  {
    q: 'Παγώνει το ηλιακό σύστημα τον χειμώνα;',
    a: 'Σε περιοχές με κίνδυνο παγετού χρησιμοποιούνται συστήματα κλειστού κυκλώματος με αντιψυκτικό· το ηλιακό υγρό μεταφοράς που κυκλοφορεί στον συλλέκτη αποτρέπει το πάγωμα και μεταφέρει τη θερμότητα στο νερό χρήσης μέσω του σερπαντινιού στο μπόιλερ. Έτσι το σύστημα λειτουργεί με ασφάλεια ακόμη και τις πιο κρύες ημέρες. Σε θερμές περιοχές, τα ολοκληρωμένα συστήματα ανοιχτού κυκλώματος αποτελούν οικονομική λύση.',
  },
  {
    q: 'Ποια είναι η διαφορά μεταξύ ανοιχτού και κλειστού κυκλώματος;',
    a: 'Στο ανοιχτό κύκλωμα, το νερό χρήσης περνά απευθείας από τον συλλέκτη· ο κίνδυνος παγετού είναι χαμηλός και είναι οικονομικό για θερμές περιοχές. Στο κλειστό κύκλωμα, αντιψυκτικό ηλιακό υγρό κυκλοφορεί στον συλλέκτη και μεταφέρει τη θερμότητα στο νερό μέσω του σερπαντινιού του μπόιλερ· προστατεύεται από τον παγετό και λειτουργεί υπό πίεση. Η ομάδα μηχανικής μας καθορίζει το κατάλληλο για την περιοχή σας.',
  },
  {
    q: 'Πόσο εξοικονομεί το ηλιακό ζεστό νερό και πότε αποσβένεται;',
    a: 'Ένα ηλιακό σύστημα ζεστού νερού καλύπτει το μεγαλύτερο μέρος της ετήσιας ενέργειας θέρμανσης νερού του σπιτιού σας δωρεάν από τον ήλιο· έχετε ζεστό νερό ανεξάρτητα από ηλεκτρικό, φυσικό αέριο ή υγραέριο. Έτσι, στα περισσότερα σπίτια το σύστημα αποσβένεται μέσα σε λίγα χρόνια και συνεχίζει να εξοικονομεί για χρόνια μετά. Μπορείτε να δείτε την εκτιμώμενη παραγωγή για την περιοχή σας με το εργαλείο μας «Ηλιακό Δυναμικό».',
  },
  {
    q: 'Θα μειώσει τον λογαριασμό ρεύματος ή φυσικού αερίου;',
    a: 'Ναι. Στα σπίτια, σημαντικό μέρος της ενέργειας δαπανάται για τη θέρμανση του νερού. Ένα ηλιακό σύστημα αναλαμβάνει το μεγαλύτερο μέρος αυτού του φορτίου, μειώνοντας σημαντικά την κατανάλωση ενός ηλεκτρικού θερμοσίφωνα, λέβητα ή ταχυθερμοσίφωνα· ο λογαριασμός σας μειώνεται.',
  },
  {
    q: 'Απαιτεί συντήρηση ένα ηλιακό σύστημα;',
    a: 'Τα συστήματα είναι χαμηλής συντήρησης· συνήθως αρκεί ένας έλεγχος τον χρόνο. Ο καθαρισμός της επιφάνειας του συλλέκτη, ο έλεγχος του ηλιακού υγρού και του επιπέδου αντιπαγετικής προστασίας, της αντλίας/αυτοματισμού και της ανόδου του μπόιλερ αποτελούν μέρος της περιοδικής συντήρησης. Η ομάδα εξυπηρέτησης μετά την πώληση αναλαμβάνει αυτές τις εργασίες· μπορείτε να δημιουργήσετε το αίτημά σας online.',
  },
  {
    q: 'Ποια χωρητικότητα μπόιλερ χρειάζεται για νοικοκυριό συγκεκριμένου μεγέθους;',
    a: 'Για νοικοκυριό 2–4 ατόμων συνιστάται συνήθως εμαγιέ μπόιλερ 200 λίτρων, και 300 λίτρων ή περισσότερο για μεγαλύτερα νοικοκυριά. Μπορείτε να καθορίσετε τη σωστή χωρητικότητα με βάση το μέγεθος του νοικοκυριού και τις συνήθειες κατανάλωσης με το δωρεάν εργαλείο υπολογισμού ή τον οδηγό συστήματος.',
  },
  {
    q: 'Σε ποιες στέγες μπορεί να εγκατασταθεί ηλιακό σύστημα;',
    a: 'Διαθέτουμε λύσεις βάσεων κατάλληλες για σχεδόν κάθε τύπο στέγης, συμπεριλαμβανομένων επίπεδων (ταράτσα), κεραμοσκεπών και τραπεζοειδών στεγών· είναι δυνατή και η τοποθέτηση σε έδαφος ή πρόσοψη. Για τη μέγιστη απόδοση, οι συλλέκτες τοποθετούνται συνήθως με νότιο προσανατολισμό και κλίση κατάλληλη για την περιοχή. Καθορίζουμε την καλύτερη λύση για τη στέγη σας με επιτόπια μελέτη.',
  },
  {
    q: 'Πόσο διαρκεί η εγκατάσταση;',
    a: 'Τα ολοκληρωμένα συστήματα ενός νοικοκυριού εγκαθίστανται και τίθενται σε λειτουργία συνήθως μέσα σε λίγες ώρες. Στα κεντρικά και τα συστήματα μαζικής κατοικίας ο χρόνος διαφέρει ανάλογα με το μέγεθος του έργου· ο σχεδιασμός, ο στατικός υπολογισμός και η εγκατάσταση διεκπεραιώνονται από μία πηγή.',
  },
  {
    q: 'Είναι οι συλλέκτες ανθεκτικοί σε χιόνι, χαλάζι και άνεμο;',
    a: 'Οι συλλέκτες χρησιμοποιούν σκληρυμένο γυαλί υψηλής αντοχής· αντέχουν σε χαλάζι, φορτίο χιονιού και άνεμο. Χάρη στην κλίση του συλλέκτη, το χιόνι γλιστρά χωρίς να συσσωρεύεται. Οι βάσεις και τα εξαρτήματα στήριξης υπολογίζονται στατικά για τα φορτία ανέμου και χιονιού της περιοχής.',
  },
  {
    q: 'Λειτουργεί το σύστημα με την πίεση του δικτύου ύδρευσης;',
    a: 'Τα πιεστικά συστήματα κλειστού κυκλώματός μας λειτουργούν με την πίεση του δικτύου ύδρευσης της πόλης και προσφέρουν ισχυρή ροή στη βρύση και το ντους. Προσφέρονται επίσης λύσεις ανοιχτού κυκλώματος (χωρίς πίεση) όπου χρειάζεται.',
  },
  {
    q: 'Μπορεί να χρησιμοποιηθεί ηλιακή ενέργεια σε πολυκατοικία ή συγκρότημα;',
    a: 'Ναι. Σε πολυώροφα κτίρια, πολυκατοικίες και συγκροτήματα, ένα πεδίο συλλεκτών στη στέγη και μια κεντρική ομάδα μπόιλερ παράγουν ζεστό νερό για όλα τα διαμερίσματα από ένα κέντρο. Αυτά τα κεντρικά συστήματα είναι αποδοτικά και οικονομικά σε μαζικές κατοικίες, εστίες, ξενοδοχεία και δημόσιες εγκαταστάσεις.',
  },
  {
    q: 'Εγκαθιστάτε κεντρικά συστήματα ζεστού νερού για δημόσια έργα και έργα μαζικής κατοικίας;',
    a: 'Ναι. Σε όλη την Τουρκία έχουμε εγκαταστήσει κεντρικά ηλιακά συστήματα ζεστού νερού σε περισσότερα από 350 έργα μαζικής κατοικίας· σε κοινωνικές κατοικίες, εγκαταστάσεις του Υπουργείου Δικαιοσύνης και φυλακές, στρατιωτικές εγκαταστάσεις, φοιτητικές εστίες, νοσοκομεία και ξενοδοχεία. Ο υπολογισμός χωρητικότητας ανά έργο, ο στατικός σχεδιασμός και η εγκατάσταση με το κλειδί στο χέρι παρέχονται από μία πηγή.',
  },
  {
    q: 'Είναι υγιεινό το αποθηκευμένο νερό; Δημιουργεί άλατα;',
    a: 'Η εσωτερική επιφάνεια των μπόιλερ μας είναι επιστρωμένη με εμαγιέ· προστατεύει από τη διάβρωση και διατηρεί υγιεινή την επιφάνεια που έρχεται σε επαφή με το νερό. Η άνοδος καθοδικής προστασίας μειώνει την επίδραση των αλάτων και της διάβρωσης, παρατείνοντας τη διάρκεια ζωής του μπόιλερ.',
  },
  {
    q: 'Πόσο διαρκεί το σύστημα; Προσφέρετε εγγύηση;',
    a: 'Οι ποιοτικοί επίπεδοι συλλέκτες και τα εμαγιέ μπόιλερ παραμένουν λειτουργικά στο πεδίο για δεκαετίες με τη σωστή συντήρηση. Τα προϊόντα μας είναι πιστοποιημένα CE, TSE και Solar Keymark· με το εκτεταμένο δίκτυο εξυπηρέτησης και το απόθεμα ανταλλακτικών μας, η υποστήριξη μετά την πώληση είναι αδιάλειπτη.',
  },
  {
    q: 'Είναι πιστοποιημένα τα προϊόντα σας;',
    a: 'Ναι. Οι συλλέκτες και τα συστήματά μας διαθέτουν εθνικά και διεθνή πιστοποιητικά ποιότητας, με πρώτα τα CE, TSE και Solar Keymark. Το Solar Keymark είναι το ευρωπαϊκό σήμα ποιότητας που πιστοποιεί την απόδοση και την αντοχή των ηλιακών συλλεκτών σε ανεξάρτητα εργαστήρια.',
  },
  {
    q: 'Πώς μπορούμε να συνεργαστούμε ως αντιπρόσωπος ή χονδρέμπορος;',
    a: 'Συνεργαζόμαστε με εγκαταστάτες, εταιρείες μηχανικής και χονδρεμπόρους μέσω ενός μοντέλου περιφερειακής αντιπροσωπείας· προσφέρουμε επίσης παραγωγή OEM προσαρμοσμένη στο έργο και τη ζήτηση. Μπορείτε να υποβάλετε αίτηση μέσω της σελίδας επικοινωνίας για να λάβετε τον τιμοκατάλογο και τους όρους συνεργασίας.',
  },
];

export const faqByLocale: Record<Locale, FaqItem[]> = { tr, en, ar, el };

/* Verilen dile göre SSS listesini döner; eksikte Türkçe'ye düşer. */
export function getFaqItems(locale: string): FaqItem[] {
  return faqByLocale[locale as Locale] ?? faqByLocale.tr;
}

/* Geriye dönük uyumluluk (Türkçe varsayılan). */
export const faqItems = tr;
