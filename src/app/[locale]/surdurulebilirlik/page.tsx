import type { Metadata } from 'next';
import { Sun, Recycle, Factory, ShieldCheck, Calculator, MapPin, type LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { PageBreadcrumb } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

/* SÜRDÜRÜLEBİLİRLİK
   =================
   İncelenen ISO 500 sanayi kuruluşlarının (Arçelik, Erdemir, Çimsa, Şişecam)
   hepsinde ANA MENÜ düzeyinde bir sürdürülebilirlik bölümü var. Bir güneş
   enerjisi üreticisinin bu başlıkta sayfası olmaması bariz bir eksikti.

   ⚠ DÜRÜSTLÜK SINIRI — bu sayfada şirket düzeyinde ÖLÇÜLMEMİŞ hiçbir rakam
   yoktur. Ne "yıllık X ton CO2 tasarrufu sağladık" ne de "üretimimizin %Y'si
   yenilenebilir" gibi doğrulanamayacak iddialar yazılmaz; bunlar yeşil
   aklama (greenwashing) sayılır ve AB'nin Green Claims yaklaşımıyla da
   çelişir.

   Yazılanlar üç doğrulanabilir kaynağa dayanır:
     1. Ürünün fiziği — güneş kollektörü, suyu ısıtmak için yakılan yakıtın
        veya harcanan elektriğin yerine geçer. Tasarruf hesabı ziyaretçinin
        kendi verisiyle /calculator üzerinde yapılır; sayfada sabit bir rakam
        iddia edilmez.
     2. Malzeme gerçeği — alüminyum, bakır ve cam yüksek oranda geri
        dönüştürülebilir malzemelerdir.
     3. Mevcut belgelerimiz — CE ve TSE (bkz. /kalite-politikasi).

   Kurumsal karbon ayak izi, atık ve enerji verileri ölçüldüğünde bu sayfaya
   "Raporlarımız" bölümü eklenecektir; şu an o bölüm bilinçli olarak YOKTUR
   (boş bir rapor kutusu, olmayan bir taahhüdü ima ederdi). */

const PILLAR_ICONS: LucideIcon[] = [Sun, Recycle, Factory, ShieldCheck];

interface Pillar {
  title: string;
  desc: string;
}

interface SustainabilityText {
  crumb: string;
  hero: { eyebrow: string; title: string; subtitle: string };
  intro: { title: string; body: string };
  pillars: Pillar[];
  measure: { title: string; body: string; calc: string; province: string; note: string };
  standards: { title: string; body: string; link: string };
  meta: { title: string; description: string };
}

const CONTENT: Record<Locale, SustainabilityText> = {
  tr: {
    crumb: 'Sürdürülebilirlik',
    hero: {
      eyebrow: 'Sürdürülebilirlik',
      title: 'Ürünümüz zaten sürdürülebilirlik işidir',
      subtitle:
        'Güneş enerjili su ısıtma sistemi, suyu ısıtmak için yakılan yakıtın ya da harcanan elektriğin yerine geçer. Bizim için sürdürülebilirlik bir iletişim başlığı değil, ürettiğimiz şeyin kendisidir.',
    },
    intro: {
      title: 'Neyi savunuyoruz',
      body: 'Sıcak su, bir konutun enerji tüketiminin en büyük kalemlerinden biridir. Bu ihtiyacın güneşten karşılanan her birimi, yakılmayan bir yakıt ya da üretilmeyen bir kilovatsaat demektir. Bu yüzden en anlamlı katkımız, uzun ömürlü ve verimli sistem üretmektir.',
    },
    pillars: [
      {
        title: 'Yerine geçen enerji',
        desc: 'Bir güneş kollektörü, kullanım suyunu ısıtmak için harcanan doğal gazın, LPG’nin veya elektriğin yerini alır. Tasarruf, sistemin büyüklüğüne ve bulunduğu ilin ışınım değerine göre değişir; sabit bir rakam vermek yerine kendi verinizle hesaplamanızı öneririz.',
      },
      {
        title: 'Geri dönüştürülebilir malzeme',
        desc: 'Kollektörlerimizin ana malzemeleri alüminyum, bakır ve temperli cam; boylerlerde çelik kullanılır. Bunlar sanayide yüksek oranda geri dönüştürülebilen malzemelerdir. Sistem ömrünü tamamladığında gövde ve emici yüzey hurda metal olarak değerlendirilebilir.',
      },
      {
        title: 'Uzun ömür, az atık',
        desc: 'En çevreci ürün, değiştirilmesi gerekmeyen üründür. Sistemlerimizi parça bazında servis edilebilir olacak şekilde tasarlarız: yedek parça ve satış sonrası destek sayesinde tek bir bileşenin arızası tüm sistemin atılmasını gerektirmez.',
      },
      {
        title: 'Belgeli üretim',
        desc: 'Üretimimizi CE ve TSE başta olmak üzere ulusal ve uluslararası standartlara uygun yürütürüz. Kalite politikamızın tamamını ayrı bir sayfada yayımlıyoruz.',
      },
    ],
    measure: {
      title: 'Rakamı biz değil, siz hesaplayın',
      body:
        'Sürdürülebilirlik iddiaları çoğu zaman doğrulanamayan tek bir rakama indirgeniyor. Biz bunu tercih etmiyoruz: tasarruf sizin kullanımınıza, sistem büyüklüğünüze ve bulunduğunuz ilin güneşlenme değerine bağlıdır. İkisini de kendi verinizle görebilirsiniz.',
      calc: 'Sistem hesaplama aracı',
      province: 'İl bazlı güneş potansiyeli',
      note:
        'Bu sayfada şirket düzeyinde ölçülmemiş hiçbir çevresel rakam yer almaz. Kurumsal karbon, enerji ve atık verilerimiz ölçüldüğünde burada yayımlanacaktır.',
    },
    standards: {
      title: 'Kalite ve uygunluk',
      body: 'Çevresel iddialarımızın dayanağı, ürünlerimizin bağımsız standartlara uygunluğudur. Kalite politikamızda taahhüt ettiğimiz ilkelerin tamamını okuyabilirsiniz.',
      link: 'Kalite Politikamız',
    },
    meta: {
      title: 'Sürdürülebilirlik',
      description:
        'Şimşek Solar sürdürülebilirlik yaklaşımı: güneş enerjili su ısıtmanın yerine geçtiği enerji, geri dönüştürülebilir malzemeler, uzun ömürlü ve servis edilebilir sistem tasarımı, belgeli üretim.',
    },
  },
  en: {
    crumb: 'Sustainability',
    hero: {
      eyebrow: 'Sustainability',
      title: 'Our product is the sustainability work',
      subtitle:
        'A solar water heating system replaces the fuel burned or the electricity consumed to heat water. For us sustainability is not a communications topic — it is the thing we manufacture.',
    },
    intro: {
      title: 'What we stand for',
      body: 'Hot water is one of the largest items in a home’s energy consumption. Every unit of that demand met by the sun is fuel not burned or a kilowatt-hour not generated. So our most meaningful contribution is to build long-lasting, efficient systems.',
    },
    pillars: [
      {
        title: 'Energy displaced',
        desc: 'A solar collector replaces the natural gas, LPG or electricity used to heat domestic water. Savings depend on system size and on the solar irradiance of the location, so instead of quoting a fixed figure we invite you to calculate it with your own data.',
      },
      {
        title: 'Recyclable materials',
        desc: 'Our collectors are built mainly from aluminium, copper and tempered glass; the tanks use steel. These are materials with high industrial recycling rates. At end of life the frame and absorber can be recovered as scrap metal.',
      },
      {
        title: 'Long life, less waste',
        desc: 'The greenest product is the one that does not need replacing. We design our systems to be serviceable part by part: with spare parts and after-sales support, one failed component does not mean discarding the whole system.',
      },
      {
        title: 'Certified manufacturing',
        desc: 'We manufacture in compliance with national and international standards, led by CE and TSE. Our full quality policy is published on a separate page.',
      },
    ],
    measure: {
      title: 'You calculate the number, not us',
      body:
        'Sustainability claims are too often reduced to a single unverifiable figure. We prefer not to do that: savings depend on your consumption, your system size and the solar irradiance where you live. You can see both with your own data.',
      calc: 'System calculation tool',
      province: 'Solar potential by province',
      note:
        'This page contains no company-level environmental figure that has not been measured. Our corporate carbon, energy and waste data will be published here once measured.',
    },
    standards: {
      title: 'Quality and conformity',
      body: 'Our environmental claims rest on our products’ conformity with independent standards. You can read all the principles we commit to in our quality policy.',
      link: 'Our Quality Policy',
    },
    meta: {
      title: 'Sustainability',
      description:
        'Şimşek Solar’s approach to sustainability: the energy solar water heating displaces, recyclable materials, long-life serviceable system design, and certified manufacturing.',
    },
  },
  ar: {
    crumb: 'الاستدامة',
    hero: {
      eyebrow: 'الاستدامة',
      title: 'منتجنا هو عمل الاستدامة نفسه',
      subtitle:
        'نظام تسخين المياه بالطاقة الشمسية يحلّ محلّ الوقود المحروق أو الكهرباء المستهلكة لتسخين المياه. الاستدامة بالنسبة لنا ليست عنواناً تسويقياً، بل هي ما نصنعه.',
    },
    intro: {
      title: 'ما الذي ندافع عنه',
      body: 'الماء الساخن أحد أكبر بنود استهلاك الطاقة في المنزل. كل وحدة من هذا الطلب تُلبّى من الشمس تعني وقوداً لم يُحرق أو كيلوواط ساعة لم يُنتج. لذلك فإن إسهامنا الأهم هو إنتاج أنظمة طويلة العمر وعالية الكفاءة.',
    },
    pillars: [
      {
        title: 'الطاقة المستبدَلة',
        desc: 'يحلّ اللاقط الشمسي محل الغاز الطبيعي أو الغاز المسال أو الكهرباء المستخدمة لتسخين مياه الاستعمال. يتغيّر التوفير بحسب حجم النظام وقيمة الإشعاع الشمسي في الموقع؛ لذلك ندعوكم إلى حسابه ببياناتكم بدل ذكر رقم ثابت.',
      },
      {
        title: 'مواد قابلة لإعادة التدوير',
        desc: 'تُصنع لواقطنا أساساً من الألمنيوم والنحاس والزجاج المقسّى، وتُستخدم الفولاذ في الخزانات. وهي مواد ذات معدلات إعادة تدوير صناعية مرتفعة. وعند انتهاء عمر النظام يمكن الاستفادة من الهيكل والسطح الماص كخردة معدنية.',
      },
      {
        title: 'عمر أطول، نفايات أقل',
        desc: 'أكثر المنتجات صداقة للبيئة هو المنتج الذي لا يحتاج إلى استبدال. نصمّم أنظمتنا لتكون قابلة للصيانة قطعةً قطعة: بفضل قطع الغيار وخدمات ما بعد البيع، لا يعني عطل مكوّن واحد التخلّص من النظام بأكمله.',
      },
      {
        title: 'إنتاج موثّق',
        desc: 'ننفّذ إنتاجنا وفق المعايير الوطنية والدولية، وفي مقدمتها CE وTSE. ننشر سياسة الجودة كاملةً في صفحة مستقلة.',
      },
    ],
    measure: {
      title: 'احسبوا الرقم بأنفسكم',
      body:
        'كثيراً ما تُختزل ادّعاءات الاستدامة في رقم واحد غير قابل للتحقق. نحن نفضّل غير ذلك: التوفير يعتمد على استهلاككم وحجم نظامكم وقيمة الإشعاع الشمسي في منطقتكم. يمكنكم الاطلاع على الاثنين ببياناتكم.',
      calc: 'أداة حساب النظام',
      province: 'الإمكانات الشمسية حسب المحافظة',
      note:
        'لا تتضمّن هذه الصفحة أي رقم بيئي على مستوى الشركة لم يُقَس فعلياً. ستُنشر بيانات الكربون والطاقة والنفايات المؤسسية هنا فور قياسها.',
    },
    standards: {
      title: 'الجودة والمطابقة',
      body: 'تستند ادّعاءاتنا البيئية إلى مطابقة منتجاتنا للمعايير المستقلة. يمكنكم الاطلاع على جميع المبادئ التي نلتزم بها في سياسة الجودة.',
      link: 'سياسة الجودة',
    },
    meta: {
      title: 'الاستدامة',
      description:
        'نهج شيمشك سولار في الاستدامة: الطاقة التي يستبدلها التسخين الشمسي للمياه، والمواد القابلة لإعادة التدوير، وتصميم الأنظمة الطويلة العمر القابلة للصيانة، والإنتاج الموثّق.',
    },
  },
  el: {
    crumb: 'Βιωσιμότητα',
    hero: {
      eyebrow: 'Βιωσιμότητα',
      title: 'Το προϊόν μας είναι η ίδια η βιωσιμότητα',
      subtitle:
        'Ένα ηλιακό σύστημα θέρμανσης νερού αντικαθιστά το καύσιμο που καίγεται ή το ρεύμα που καταναλώνεται για τη θέρμανση του νερού. Για εμάς η βιωσιμότητα δεν είναι θέμα επικοινωνίας — είναι αυτό που κατασκευάζουμε.',
    },
    intro: {
      title: 'Τι υποστηρίζουμε',
      body: 'Το ζεστό νερό είναι από τα μεγαλύτερα κονδύλια κατανάλωσης ενέργειας μιας κατοικίας. Κάθε μονάδα αυτής της ζήτησης που καλύπτεται από τον ήλιο σημαίνει καύσιμο που δεν κάηκε ή κιλοβατώρα που δεν παρήχθη. Γι’ αυτό η ουσιαστικότερη συνεισφορά μας είναι να κατασκευάζουμε ανθεκτικά και αποδοτικά συστήματα.',
    },
    pillars: [
      {
        title: 'Ενέργεια που αντικαθίσταται',
        desc: 'Ένας ηλιακός συλλέκτης αντικαθιστά το φυσικό αέριο, το υγραέριο ή το ρεύμα που χρησιμοποιείται για τη θέρμανση του νερού χρήσης. Η εξοικονόμηση εξαρτάται από το μέγεθος του συστήματος και την ηλιακή ακτινοβολία της περιοχής· αντί για σταθερό νούμερο, σας προσκαλούμε να το υπολογίσετε με τα δικά σας δεδομένα.',
      },
      {
        title: 'Ανακυκλώσιμα υλικά',
        desc: 'Οι συλλέκτες μας κατασκευάζονται κυρίως από αλουμίνιο, χαλκό και σκληρυμένο γυαλί· στα boiler χρησιμοποιείται χάλυβας. Πρόκειται για υλικά με υψηλά ποσοστά βιομηχανικής ανακύκλωσης. Στο τέλος ζωής, το πλαίσιο και ο απορροφητής μπορούν να ανακτηθούν ως σκραπ μετάλλου.',
      },
      {
        title: 'Μεγάλη διάρκεια, λιγότερα απόβλητα',
        desc: 'Το πιο οικολογικό προϊόν είναι εκείνο που δεν χρειάζεται αντικατάσταση. Σχεδιάζουμε τα συστήματά μας ώστε να επισκευάζονται ανά εξάρτημα: με ανταλλακτικά και υποστήριξη μετά την πώληση, η βλάβη ενός εξαρτήματος δεν σημαίνει απόρριψη όλου του συστήματος.',
      },
      {
        title: 'Πιστοποιημένη παραγωγή',
        desc: 'Παράγουμε σύμφωνα με εθνικά και διεθνή πρότυπα, με πρώτα τα CE και TSE. Η πλήρης πολιτική ποιότητάς μας δημοσιεύεται σε ξεχωριστή σελίδα.',
      },
    ],
    measure: {
      title: 'Τον αριθμό τον υπολογίζετε εσείς',
      body:
        'Οι ισχυρισμοί βιωσιμότητας συχνά συμπυκνώνονται σε έναν μη επαληθεύσιμο αριθμό. Εμείς το αποφεύγουμε: η εξοικονόμηση εξαρτάται από την κατανάλωσή σας, το μέγεθος του συστήματος και την ηλιοφάνεια της περιοχής σας. Μπορείτε να δείτε και τα δύο με τα δικά σας δεδομένα.',
      calc: 'Εργαλείο υπολογισμού συστήματος',
      province: 'Ηλιακό δυναμικό ανά νομό',
      note:
        'Η σελίδα δεν περιέχει κανένα περιβαλλοντικό μέγεθος σε επίπεδο εταιρείας που δεν έχει μετρηθεί. Τα εταιρικά δεδομένα άνθρακα, ενέργειας και αποβλήτων θα δημοσιευθούν εδώ μόλις μετρηθούν.',
    },
    standards: {
      title: 'Ποιότητα και συμμόρφωση',
      body: 'Οι περιβαλλοντικοί μας ισχυρισμοί στηρίζονται στη συμμόρφωση των προϊόντων μας με ανεξάρτητα πρότυπα. Διαβάστε όλες τις αρχές που δεσμευόμαστε να τηρούμε στην πολιτική ποιότητας.',
      link: 'Η Πολιτική Ποιότητάς μας',
    },
    meta: {
      title: 'Βιωσιμότητα',
      description:
        'Η προσέγγιση της Şimşek Solar στη βιωσιμότητα: η ενέργεια που αντικαθιστά η ηλιακή θέρμανση νερού, ανακυκλώσιμα υλικά, ανθεκτικός και επισκευάσιμος σχεδιασμός, πιστοποιημένη παραγωγή.',
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] ?? CONTENT.tr;
  return pageMetadata({
    locale,
    path: '/surdurulebilirlik',
    title: c.meta.title,
    description: c.meta.description,
  });
}

export default async function SustainabilityPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const c = CONTENT[locale] ?? CONTENT.tr;

  return (
    <>
      <PageBreadcrumb items={[{ name: c.crumb, path: '/surdurulebilirlik' }]} />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.subtitle} />

      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance font-display type-h2 font-bold tracking-tight text-graphite-950">
                {c.intro.title}
              </h2>
              <p className="mt-5 text-balance type-lead text-mist-600">{c.intro.body}</p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {c.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i] ?? Sun;
              return (
                <Reveal key={p.title} delay={0.06 * i}>
                  <div className="flex h-full flex-col rounded-2xl border border-mist-900/10 bg-mist-50 p-7 transition-colors hover:border-volt-500/40 hover:bg-white">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-volt-100 text-volt-700">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-5 font-display type-h3 font-bold text-graphite-950">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist-600">{p.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ölçüm — sabit rakam vermek yerine araca yönlendirir. */}
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance font-display type-h2 font-bold tracking-tight text-graphite-950">
                {c.measure.title}
              </h2>
              <p className="mt-5 text-balance type-lead text-mist-600">{c.measure.body}</p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/calculator"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-graphite-950 px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  <Calculator size={16} />
                  {c.measure.calc}
                </Link>
                <Link
                  href="/gunes-potansiyeli"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-graphite-950/15 px-7 text-sm font-semibold text-graphite-950 transition-colors hover:bg-white"
                >
                  <MapPin size={16} />
                  {c.measure.province}
                </Link>
              </div>
              {/* Şeffaflık notu — ölçülmemiş rakam vermediğimizi açıkça yazar. */}
              <p className="mx-auto mt-8 max-w-xl rounded-2xl border border-dashed border-mist-900/20 bg-white px-6 py-5 text-xs leading-relaxed text-mist-500">
                {c.measure.note}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-graphite-gradient p-8 text-white sm:p-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div>
                <h2 className="font-display type-h2-sm font-bold tracking-tight">{c.standards.title}</h2>
                <p className="mt-4 max-w-lg leading-relaxed text-graphite-200">{c.standards.body}</p>
              </div>
              <div className="lg:justify-self-end">
                <Link
                  href="/kalite-politikasi"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-solar-gradient px-7 text-sm font-semibold text-graphite-900 shadow-glow transition-transform hover:scale-[1.03]"
                >
                  <ShieldCheck size={16} />
                  {c.standards.link}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
