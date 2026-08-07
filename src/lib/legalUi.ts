import type { Locale } from '@/i18n/config';
import { ORG, SITE_NAME } from '@/lib/seo';

/* Yasal metin sayfaları (Gizlilik, Çerez, KVKK) — dört dilde. Kurumsal künye
   (ORG) değerleri şablonlara gömülüdür. KVKK Türk mevzuatına özgüdür; TR dışı
   diller bilgilendirme amaçlı çeviridir. */

export interface LegalPara {
  label?: string; // kalın ön ek
  text: string;
}
export interface LegalSectionData {
  title: string;
  paras: LegalPara[];
}
export interface LegalDocText {
  title: string;
  subtitle: string;
  sections: LegalSectionData[];
  meta: { title: string; description: string };
}
export interface LegalUi {
  eyebrow: string;
  updatedLabel: string;
  contents: string;
  privacy: LegalDocText;
  cookies: LegalDocText;
  kvkk: LegalDocText;
}

const A = `${ORG.street}, ${ORG.district}, ${ORG.city}`;

const DATA: Record<Locale, LegalUi> = {
  tr: {
    eyebrow: 'Yasal',
    updatedLabel: 'Son güncelleme',
    contents: 'İçindekiler',
    privacy: {
      title: 'Gizlilik Politikası',
      subtitle:
        'Kişisel verilerinizin gizliliğine ve güvenliğine verdiğimiz önemi ve uyguladığımız ilkeleri açıklar.',
      meta: {
        title: 'Gizlilik Politikası',
        description:
          'Kişisel verilerinizin gizliliği ve güvenliği için uyguladığımız ilkeler ve web sitesi gizlilik politikamız.',
      },
      sections: [
        { title: 'Genel', paras: [{ text: `${ORG.legalName} (${SITE_NAME}) olarak, web sitemizi ziyaret eden kullanıcıların gizliliğine saygı duyuyor ve kişisel verilerinizin güvenliğini önemsiyoruz. Bu politika, hangi verileri hangi amaçla topladığımızı ve nasıl koruduğumuzu açıklar.` }] },
        { title: 'Toplanan Bilgiler', paras: [{ text: 'İletişim ve bayilik formlarımız aracılığıyla ilettiğiniz ad-soyad, firma, telefon, e-posta ve mesaj bilgilerini; ayrıca site kullanımını iyileştirmek amacıyla çerezler yoluyla anonim kullanım verilerini toplarız.' }] },
        { title: 'Bilgilerin Kullanımı', paras: [{ text: 'Toplanan bilgiler yalnızca talebinize yanıt vermek, teklif ve destek süreçlerini yürütmek, hizmet kalitemizi geliştirmek ve yasal yükümlülüklerimizi yerine getirmek için kullanılır. Bilgileriniz pazarlama amacıyla üçüncü taraflara satılmaz.' }] },
        { title: 'Veri Güvenliği', paras: [{ text: 'Kişisel verilerinizi yetkisiz erişime, kayba ve kötüye kullanıma karşı korumak için makul teknik ve idari tedbirleri uygularız. Verileriniz, güvenli barındırma altyapısında saklanır.' }] },
        { title: 'Üçüncü Taraf Hizmetler', paras: [{ text: 'Site; barındırma, e-posta iletimi ve ziyaretçi analizi (örneğin Google Analytics) gibi üçüncü taraf hizmetlerinden yararlanabilir. Bu hizmetler kendi gizlilik politikalarına tabidir.' }] },
        { title: 'Haklarınız ve İletişim', paras: [{ text: `Kişisel verilerinize ilişkin taleplerinizde ve gizlilikle ilgili tüm sorularınızda ${ORG.email} adresi üzerinden bize ulaşabilirsiniz. Ayrıntılı bilgi için KVKK Aydınlatma Metni'ni inceleyebilirsiniz.` }] },
      ],
    },
    cookies: {
      title: 'Çerez Politikası',
      subtitle: 'Web sitemizde kullanılan çerezler, kullanım amaçları ve tercihlerinizi nasıl yönetebileceğiniz.',
      meta: {
        title: 'Çerez Politikası',
        description:
          'Web sitemizde kullanılan çerezler, türleri, amaçları ve çerez tercihlerinizi nasıl yönetebileceğinize dair bilgiler.',
      },
      sections: [
        { title: 'Çerez Nedir?', paras: [{ text: `Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza kaydedilen küçük metin dosyalarıdır. Sitenin düzgün çalışmasını sağlar ve kullanım deneyimini iyileştirmek için kullanılır. ${ORG.legalName} (${SITE_NAME}) olarak çerezleri aşağıdaki amaçlarla kullanıyoruz.` }] },
        { title: 'Kullandığımız Çerez Türleri', paras: [
          { label: 'Zorunlu çerezler:', text: 'Sitenin temel işlevleri, dil tercihi ve güvenlik için gereklidir; bunlar olmadan site düzgün çalışmaz.' },
          { label: 'Performans/analiz çerezleri:', text: 'Ziyaretçilerin siteyi nasıl kullandığını anonim olarak ölçmek için (örneğin Google Analytics) kullanılır; içeriği ve deneyimi geliştirmemize yardımcı olur.' },
          { label: 'Pazarlama çerezleri:', text: 'Reklam ve yeniden pazarlama araçları (örneğin Meta Pixel) tarafından, ilgi alanlarınıza uygun içerik sunmak için kullanılabilir.' },
        ] },
        { title: 'Çerez Tercihlerinizin Yönetimi', paras: [{ text: 'Tarayıcınızın ayarları üzerinden çerezleri dilediğiniz zaman silebilir veya engelleyebilirsiniz. Ancak zorunlu çerezleri devre dışı bırakmanız durumunda sitenin bazı bölümleri düzgün çalışmayabilir.' }] },
        { title: 'İletişim', paras: [{ text: `Çerez politikamıza ilişkin sorularınız için ${ORG.email} adresinden bize ulaşabilirsiniz. Kişisel verilerinizin işlenmesi hakkında ayrıntılı bilgi için KVKK Aydınlatma Metni ve Gizlilik Politikamızı inceleyebilirsiniz.` }] },
      ],
    },
    kvkk: {
      title: 'KVKK Aydınlatma Metni',
      subtitle: '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesine ilişkin bilgilendirme.',
      meta: {
        title: 'KVKK Aydınlatma Metni',
        description:
          '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesine ilişkin aydınlatma metni.',
      },
      sections: [
        { title: '1. Veri Sorumlusu', paras: [
          { text: `İşbu aydınlatma metni, veri sorumlusu sıfatıyla ${ORG.legalName} (${SITE_NAME}) tarafından, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca hazırlanmıştır.` },
          { text: `Adres: ${A}. E-posta: ${ORG.email}. Telefon: ${ORG.phone}.` },
        ] },
        { title: '2. İşlenen Kişisel Veriler', paras: [{ text: 'Sitemizdeki iletişim ve bayilik başvuru formları aracılığıyla; ad-soyad, firma bilgisi, telefon, e-posta adresi, şehir/ülke ve ilettiğiniz mesaj içeriği gibi kimlik ve iletişim verileriniz işlenmektedir.' }] },
        { title: '3. Kişisel Verilerin İşlenme Amaçları', paras: [{ text: 'Kişisel verileriniz; talep ve başvurularınızın değerlendirilmesi, teklif ve teknik destek süreçlerinin yürütülmesi, bayilik başvurularının incelenmesi, sizinle iletişim kurulması ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenir.' }] },
        { title: '4. Hukuki Sebep ve Toplama Yöntemi', paras: [{ text: 'Verileriniz, web sitesi üzerindeki formlar aracılığıyla elektronik ortamda; KVKK m.5/2 kapsamında bir sözleşmenin kurulması/ifası, meşru menfaat ve açık rızanız hukuki sebeplerine dayanılarak toplanır ve işlenir.' }] },
        { title: '5. Kişisel Verilerin Aktarılması', paras: [{ text: 'Kişisel verileriniz, yalnızca yukarıdaki amaçlarla sınırlı olmak üzere; grup şirketlerimize, yetkili bayilerimize, hizmet aldığımız tedarikçilere (barındırma, e-posta iletim vb.) ve yasal olarak yetkili kamu kurumlarına aktarılabilir.' }] },
        { title: '6. Saklama Süresi', paras: [{ text: 'Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen zamanaşımı süreleri boyunca saklanır; süre sonunda silinir, yok edilir veya anonim hâle getirilir.' }] },
        { title: '7. İlgili Kişinin Hakları (KVKK m.11)', paras: [
          { text: 'Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını öğrenme, eksik/yanlış işlenmişse düzeltilmesini, KVKK’ya aykırı işlenmişse silinmesini/yok edilmesini isteme ve zarara uğramanız hâlinde tazminat talep etme haklarına sahipsiniz.' },
          { text: `Bu haklarınızı kullanmak için taleplerinizi ${ORG.email} adresine iletebilirsiniz.` },
        ] },
      ],
    },
  },
  en: {
    eyebrow: 'Legal',
    updatedLabel: 'Last updated',
    contents: 'Contents',
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Explains the importance we place on the privacy and security of your personal data and the principles we apply.',
      meta: {
        title: 'Privacy Policy',
        description: 'The principles we apply for the privacy and security of your personal data and our website privacy policy.',
      },
      sections: [
        { title: 'General', paras: [{ text: `As ${ORG.legalName} (${SITE_NAME}), we respect the privacy of users who visit our website and care about the security of your personal data. This policy explains what data we collect, for what purpose, and how we protect it.` }] },
        { title: 'Information Collected', paras: [{ text: 'We collect the name, company, phone, email and message information you submit through our contact and dealership forms; and anonymous usage data through cookies to improve site usage.' }] },
        { title: 'Use of Information', paras: [{ text: 'The information collected is used only to respond to your request, carry out quote and support processes, improve our service quality and fulfill our legal obligations. Your information is not sold to third parties for marketing purposes.' }] },
        { title: 'Data Security', paras: [{ text: 'We apply reasonable technical and administrative measures to protect your personal data against unauthorized access, loss and misuse. Your data is stored on secure hosting infrastructure.' }] },
        { title: 'Third-Party Services', paras: [{ text: 'The site may use third-party services such as hosting, email delivery and visitor analytics (e.g. Google Analytics). These services are subject to their own privacy policies.' }] },
        { title: 'Your Rights and Contact', paras: [{ text: `For requests regarding your personal data and any privacy-related questions, you can reach us at ${ORG.email}. For detailed information, please review the KVKK Disclosure Statement.` }] },
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      subtitle: 'The cookies used on our website, their purposes and how you can manage your preferences.',
      meta: {
        title: 'Cookie Policy',
        description: 'Information about the cookies used on our website, their types, purposes and how you can manage your cookie preferences.',
      },
      sections: [
        { title: 'What Is a Cookie?', paras: [{ text: `Cookies are small text files saved to your browser by the websites you visit. They ensure the site works properly and are used to improve the user experience. As ${ORG.legalName} (${SITE_NAME}), we use cookies for the following purposes.` }] },
        { title: 'Types of Cookies We Use', paras: [
          { label: 'Essential cookies:', text: 'Required for the site’s core functions, language preference and security; the site does not work properly without them.' },
          { label: 'Performance/analytics cookies:', text: 'Used to measure anonymously how visitors use the site (e.g. Google Analytics); they help us improve content and experience.' },
          { label: 'Marketing cookies:', text: 'May be used by advertising and remarketing tools (e.g. Meta Pixel) to deliver content relevant to your interests.' },
        ] },
        { title: 'Managing Your Cookie Preferences', paras: [{ text: 'You can delete or block cookies at any time through your browser settings. However, if you disable essential cookies, some parts of the site may not work properly.' }] },
        { title: 'Contact', paras: [{ text: `For questions about our cookie policy, you can reach us at ${ORG.email}. For detailed information about the processing of your personal data, please review the KVKK Disclosure Statement and our Privacy Policy.` }] },
      ],
    },
    kvkk: {
      title: 'KVKK Disclosure Statement',
      subtitle: 'Information regarding the processing of your personal data under Turkish Law No. 6698 on the Protection of Personal Data.',
      meta: {
        title: 'KVKK Disclosure Statement',
        description: 'Disclosure statement regarding the processing of your personal data under Turkish Law No. 6698 on the Protection of Personal Data.',
      },
      sections: [
        { title: '1. Data Controller', paras: [
          { text: `This disclosure statement has been prepared by ${ORG.legalName} (${SITE_NAME}), in its capacity as data controller, pursuant to Turkish Law No. 6698 on the Protection of Personal Data (“KVKK”).` },
          { text: `Address: ${A}. Email: ${ORG.email}. Phone: ${ORG.phone}.` },
        ] },
        { title: '2. Personal Data Processed', paras: [{ text: 'Through the contact and dealership application forms on our site, your identity and contact data such as name, company information, phone, email address, city/country and the content of your message are processed.' }] },
        { title: '3. Purposes of Processing Personal Data', paras: [{ text: 'Your personal data is processed for the purposes of evaluating your requests and applications, carrying out quote and technical support processes, reviewing dealership applications, communicating with you and fulfilling legal obligations.' }] },
        { title: '4. Legal Basis and Method of Collection', paras: [{ text: 'Your data is collected and processed electronically through the forms on the website, based on the legal grounds of the establishment/performance of a contract, legitimate interest and your explicit consent under KVKK Art. 5/2.' }] },
        { title: '5. Transfer of Personal Data', paras: [{ text: 'Your personal data may be transferred, limited to the purposes above, to our group companies, authorized dealers, the suppliers we receive services from (hosting, email delivery, etc.) and legally authorized public institutions.' }] },
        { title: '6. Retention Period', paras: [{ text: 'Your personal data is retained for the period required by the processing purpose and the statutes of limitation stipulated in the relevant legislation; at the end of the period, it is deleted, destroyed or anonymized.' }] },
        { title: '7. Rights of the Data Subject (KVKK Art. 11)', paras: [
          { text: 'You have the right to learn whether your personal data is processed, to request information if it has been, to learn the purpose of processing, to request correction if incompletely/incorrectly processed, to request deletion/destruction if processed contrary to the KVKK, and to claim compensation if you suffer damages.' },
          { text: `To exercise these rights, you can send your requests to ${ORG.email}.` },
        ] },
      ],
    },
  },
  ar: {
    eyebrow: 'قانوني',
    updatedLabel: 'آخر تحديث',
    contents: 'المحتويات',
    privacy: {
      title: 'سياسة الخصوصية',
      subtitle: 'توضّح الأهمية التي نوليها لخصوصية بياناتكم الشخصية وأمنها والمبادئ التي نطبّقها.',
      meta: {
        title: 'سياسة الخصوصية',
        description: 'المبادئ التي نطبّقها لخصوصية بياناتكم الشخصية وأمنها وسياسة خصوصية موقعنا.',
      },
      sections: [
        { title: 'عام', paras: [{ text: `نحن في ${ORG.legalName} (${SITE_NAME}) نحترم خصوصية مستخدمي موقعنا ونهتم بأمن بياناتكم الشخصية. توضّح هذه السياسة البيانات التي نجمعها ولأي غرض وكيف نحميها.` }] },
        { title: 'المعلومات المجموعة', paras: [{ text: 'نجمع الاسم والشركة والهاتف والبريد الإلكتروني ومحتوى الرسالة التي ترسلونها عبر نماذج الاتصال والوكالة؛ إضافة إلى بيانات استخدام مجهولة عبر ملفات تعريف الارتباط لتحسين استخدام الموقع.' }] },
        { title: 'استخدام المعلومات', paras: [{ text: 'تُستخدَم المعلومات المجموعة فقط للرد على طلبكم وإدارة عمليات العروض والدعم وتحسين جودة خدمتنا والوفاء بالتزاماتنا القانونية. لا تُباع معلوماتكم لأطراف ثالثة لأغراض التسويق.' }] },
        { title: 'أمن البيانات', paras: [{ text: 'نطبّق تدابير تقنية وإدارية معقولة لحماية بياناتكم الشخصية من الوصول غير المصرّح والفقد وسوء الاستخدام. تُخزَّن بياناتكم على بنية استضافة آمنة.' }] },
        { title: 'خدمات الأطراف الثالثة', paras: [{ text: 'قد يستفيد الموقع من خدمات أطراف ثالثة مثل الاستضافة وإرسال البريد وتحليل الزوار (مثل Google Analytics). تخضع هذه الخدمات لسياسات خصوصيتها الخاصة.' }] },
        { title: 'حقوقكم والتواصل', paras: [{ text: `لطلباتكم المتعلقة ببياناتكم الشخصية وجميع أسئلة الخصوصية يمكنكم التواصل معنا عبر ${ORG.email}. للمزيد يمكنكم مراجعة نص إفصاح KVKK.` }] },
      ],
    },
    cookies: {
      title: 'سياسة ملفات تعريف الارتباط',
      subtitle: 'ملفات تعريف الارتباط المستخدمة في موقعنا وأغراض استخدامها وكيفية إدارة تفضيلاتكم.',
      meta: {
        title: 'سياسة ملفات تعريف الارتباط',
        description: 'معلومات حول ملفات تعريف الارتباط المستخدمة في موقعنا وأنواعها وأغراضها وكيفية إدارة تفضيلاتكم.',
      },
      sections: [
        { title: 'ما هو ملف تعريف الارتباط؟', paras: [{ text: `ملفات تعريف الارتباط ملفات نصية صغيرة تحفظها المواقع التي تزورونها في متصفحكم. تضمن عمل الموقع بشكل سليم وتُستخدَم لتحسين تجربة الاستخدام. نحن في ${ORG.legalName} (${SITE_NAME}) نستخدمها للأغراض التالية.` }] },
        { title: 'أنواع ملفات تعريف الارتباط التي نستخدمها', paras: [
          { label: 'ملفات ضرورية:', text: 'لازمة للوظائف الأساسية للموقع وتفضيل اللغة والأمان؛ ولا يعمل الموقع بشكل سليم دونها.' },
          { label: 'ملفات الأداء/التحليل:', text: 'تُستخدَم لقياس كيفية استخدام الزوار للموقع بشكل مجهول (مثل Google Analytics)؛ وتساعدنا على تحسين المحتوى والتجربة.' },
          { label: 'ملفات التسويق:', text: 'قد تُستخدَم من أدوات الإعلان وإعادة التسويق (مثل Meta Pixel) لتقديم محتوى يناسب اهتماماتكم.' },
        ] },
        { title: 'إدارة تفضيلات ملفات تعريف الارتباط', paras: [{ text: 'يمكنكم حذف ملفات تعريف الارتباط أو حظرها في أي وقت عبر إعدادات متصفحكم. لكن عند تعطيل الملفات الضرورية قد لا تعمل بعض أجزاء الموقع بشكل سليم.' }] },
        { title: 'التواصل', paras: [{ text: `لأسئلتكم حول سياسة ملفات تعريف الارتباط يمكنكم التواصل معنا عبر ${ORG.email}. لمعلومات مفصّلة حول معالجة بياناتكم الشخصية راجعوا نص إفصاح KVKK وسياسة الخصوصية.` }] },
      ],
    },
    kvkk: {
      title: 'نص إفصاح KVKK',
      subtitle: 'معلومات حول معالجة بياناتكم الشخصية بموجب القانون التركي رقم 6698 لحماية البيانات الشخصية.',
      meta: {
        title: 'نص إفصاح KVKK',
        description: 'نص إفصاح حول معالجة بياناتكم الشخصية بموجب القانون التركي رقم 6698 لحماية البيانات الشخصية.',
      },
      sections: [
        { title: '1. المتحكم بالبيانات', paras: [
          { text: `أُعِدّ نص الإفصاح هذا من قِبل ${ORG.legalName} (${SITE_NAME}) بصفتها المتحكم بالبيانات، وفقاً للقانون التركي رقم 6698 لحماية البيانات الشخصية ("KVKK").` },
          { text: `العنوان: ${A}. البريد: ${ORG.email}. الهاتف: ${ORG.phone}.` },
        ] },
        { title: '2. البيانات الشخصية المعالَجة', paras: [{ text: 'عبر نماذج الاتصال وطلب الوكالة في موقعنا، تُعالَج بيانات هويتكم واتصالكم مثل الاسم ومعلومات الشركة والهاتف والبريد الإلكتروني والمدينة/الدولة ومحتوى رسالتكم.' }] },
        { title: '3. أغراض معالجة البيانات الشخصية', paras: [{ text: 'تُعالَج بياناتكم الشخصية لأغراض تقييم طلباتكم، وإدارة عمليات العروض والدعم الفني، ومراجعة طلبات الوكالة، والتواصل معكم، والوفاء بالالتزامات القانونية.' }] },
        { title: '4. الأساس القانوني وطريقة الجمع', paras: [{ text: 'تُجمَع بياناتكم وتُعالَج إلكترونياً عبر النماذج في الموقع، استناداً إلى الأسس القانونية لإنشاء/تنفيذ عقد والمصلحة المشروعة وموافقتكم الصريحة بموجب المادة 5/2 من KVKK.' }] },
        { title: '5. نقل البيانات الشخصية', paras: [{ text: 'قد تُنقَل بياناتكم الشخصية، بحدود الأغراض أعلاه فقط، إلى شركات مجموعتنا ووكلائنا المعتمدين والموردين الذين نتلقى منهم خدمات (استضافة، إرسال بريد، إلخ) والمؤسسات العامة المخوّلة قانوناً.' }] },
        { title: '6. مدة الحفظ', paras: [{ text: 'تُحفَظ بياناتكم الشخصية طوال المدة التي يتطلبها غرض المعالجة ومدد التقادم المنصوص عليها في التشريعات ذات الصلة؛ وتُحذَف أو تُتلَف أو تُجهَّل عند انتهاء المدة.' }] },
        { title: '7. حقوق صاحب البيانات (المادة 11 من KVKK)', paras: [
          { text: 'لكم الحق في معرفة ما إذا كانت بياناتكم تُعالَج، وطلب معلومات إن كانت كذلك، ومعرفة غرض المعالجة، وطلب التصحيح إن عولجت ناقصة/خاطئة، وطلب الحذف/الإتلاف إن عولجت خلافاً لـ KVKK، والمطالبة بالتعويض إن لحقكم ضرر.' },
          { text: `لممارسة هذه الحقوق يمكنكم إرسال طلباتكم إلى ${ORG.email}.` },
        ] },
      ],
    },
  },
  el: {
    eyebrow: 'Νομικά',
    updatedLabel: 'Τελευταία ενημέρωση',
    contents: 'Περιεχόμενα',
    privacy: {
      title: 'Πολιτική Απορρήτου',
      subtitle: 'Εξηγεί τη σημασία που δίνουμε στο απόρρητο και την ασφάλεια των προσωπικών σας δεδομένων και τις αρχές που εφαρμόζουμε.',
      meta: {
        title: 'Πολιτική Απορρήτου',
        description: 'Οι αρχές που εφαρμόζουμε για το απόρρητο και την ασφάλεια των προσωπικών σας δεδομένων και η πολιτική απορρήτου του ιστότοπού μας.',
      },
      sections: [
        { title: 'Γενικά', paras: [{ text: `Ως ${ORG.legalName} (${SITE_NAME}), σεβόμαστε το απόρρητο των χρηστών που επισκέπτονται τον ιστότοπό μας και νοιαζόμαστε για την ασφάλεια των προσωπικών σας δεδομένων. Αυτή η πολιτική εξηγεί ποια δεδομένα συλλέγουμε, για ποιον σκοπό και πώς τα προστατεύουμε.` }] },
        { title: 'Πληροφορίες που Συλλέγονται', paras: [{ text: 'Συλλέγουμε το όνομα, την εταιρεία, το τηλέφωνο, το email και το μήνυμα που υποβάλλετε μέσω των φορμών επικοινωνίας και αντιπροσωπείας· καθώς και ανώνυμα δεδομένα χρήσης μέσω cookies για τη βελτίωση της χρήσης του ιστότοπου.' }] },
        { title: 'Χρήση των Πληροφοριών', paras: [{ text: 'Οι πληροφορίες που συλλέγονται χρησιμοποιούνται μόνο για να απαντήσουμε στο αίτημά σας, να διεκπεραιώσουμε τις διαδικασίες προσφορών και υποστήριξης, να βελτιώσουμε την ποιότητα των υπηρεσιών μας και να εκπληρώσουμε τις νομικές μας υποχρεώσεις. Οι πληροφορίες σας δεν πωλούνται σε τρίτους για σκοπούς μάρκετινγκ.' }] },
        { title: 'Ασφάλεια Δεδομένων', paras: [{ text: 'Εφαρμόζουμε εύλογα τεχνικά και οργανωτικά μέτρα για την προστασία των προσωπικών σας δεδομένων από μη εξουσιοδοτημένη πρόσβαση, απώλεια και κακή χρήση. Τα δεδομένα σας αποθηκεύονται σε ασφαλή υποδομή φιλοξενίας.' }] },
        { title: 'Υπηρεσίες Τρίτων', paras: [{ text: 'Ο ιστότοπος μπορεί να χρησιμοποιεί υπηρεσίες τρίτων όπως φιλοξενία, αποστολή email και ανάλυση επισκεπτών (π.χ. Google Analytics). Αυτές οι υπηρεσίες υπόκεινται στις δικές τους πολιτικές απορρήτου.' }] },
        { title: 'Τα Δικαιώματά σας και Επικοινωνία', paras: [{ text: `Για αιτήματα σχετικά με τα προσωπικά σας δεδομένα και οποιαδήποτε ερώτηση απορρήτου, μπορείτε να επικοινωνήσετε μαζί μας στο ${ORG.email}. Για λεπτομέρειες, δείτε τη Δήλωση Γνωστοποίησης KVKK.` }] },
      ],
    },
    cookies: {
      title: 'Πολιτική Cookies',
      subtitle: 'Τα cookies που χρησιμοποιούνται στον ιστότοπό μας, οι σκοποί τους και πώς μπορείτε να διαχειριστείτε τις προτιμήσεις σας.',
      meta: {
        title: 'Πολιτική Cookies',
        description: 'Πληροφορίες για τα cookies που χρησιμοποιούνται στον ιστότοπό μας, τους τύπους, τους σκοπούς τους και πώς να διαχειριστείτε τις προτιμήσεις σας.',
      },
      sections: [
        { title: 'Τι Είναι ένα Cookie;', paras: [{ text: `Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στον browser σας από τους ιστότοπους που επισκέπτεστε. Διασφαλίζουν τη σωστή λειτουργία του ιστότοπου και χρησιμοποιούνται για τη βελτίωση της εμπειρίας χρήσης. Ως ${ORG.legalName} (${SITE_NAME}), χρησιμοποιούμε cookies για τους ακόλουθους σκοπούς.` }] },
        { title: 'Τύποι Cookies που Χρησιμοποιούμε', paras: [
          { label: 'Απαραίτητα cookies:', text: 'Απαιτούνται για τις βασικές λειτουργίες του ιστότοπου, την προτίμηση γλώσσας και την ασφάλεια· χωρίς αυτά ο ιστότοπος δεν λειτουργεί σωστά.' },
          { label: 'Cookies απόδοσης/ανάλυσης:', text: 'Χρησιμοποιούνται για την ανώνυμη μέτρηση του πώς οι επισκέπτες χρησιμοποιούν τον ιστότοπο (π.χ. Google Analytics)· μας βοηθούν να βελτιώσουμε το περιεχόμενο και την εμπειρία.' },
          { label: 'Cookies μάρκετινγκ:', text: 'Μπορεί να χρησιμοποιηθούν από εργαλεία διαφήμισης και επαναληπτικού μάρκετινγκ (π.χ. Meta Pixel) για την προβολή περιεχομένου σχετικού με τα ενδιαφέροντά σας.' },
        ] },
        { title: 'Διαχείριση των Προτιμήσεων Cookies', paras: [{ text: 'Μπορείτε να διαγράψετε ή να αποκλείσετε τα cookies ανά πάσα στιγμή μέσω των ρυθμίσεων του browser σας. Ωστόσο, αν απενεργοποιήσετε τα απαραίτητα cookies, ορισμένα μέρη του ιστότοπου μπορεί να μη λειτουργούν σωστά.' }] },
        { title: 'Επικοινωνία', paras: [{ text: `Για ερωτήσεις σχετικά με την πολιτική cookies, μπορείτε να επικοινωνήσετε μαζί μας στο ${ORG.email}. Για λεπτομέρειες σχετικά με την επεξεργασία των προσωπικών σας δεδομένων, δείτε τη Δήλωση Γνωστοποίησης KVKK και την Πολιτική Απορρήτου μας.` }] },
      ],
    },
    kvkk: {
      title: 'Δήλωση Γνωστοποίησης KVKK',
      subtitle: 'Πληροφορίες σχετικά με την επεξεργασία των προσωπικών σας δεδομένων βάσει του τουρκικού Νόμου αριθ. 6698 για την Προστασία Προσωπικών Δεδομένων.',
      meta: {
        title: 'Δήλωση Γνωστοποίησης KVKK',
        description: 'Δήλωση γνωστοποίησης σχετικά με την επεξεργασία των προσωπικών σας δεδομένων βάσει του τουρκικού Νόμου αριθ. 6698 για την Προστασία Προσωπικών Δεδομένων.',
      },
      sections: [
        { title: '1. Υπεύθυνος Επεξεργασίας', paras: [
          { text: `Η παρούσα δήλωση γνωστοποίησης έχει συνταχθεί από την ${ORG.legalName} (${SITE_NAME}), υπό την ιδιότητά της ως υπεύθυνου επεξεργασίας, σύμφωνα με τον τουρκικό Νόμο αριθ. 6698 για την Προστασία Προσωπικών Δεδομένων (“KVKK”).` },
          { text: `Διεύθυνση: ${A}. Email: ${ORG.email}. Τηλέφωνο: ${ORG.phone}.` },
        ] },
        { title: '2. Προσωπικά Δεδομένα που Επεξεργάζονται', paras: [{ text: 'Μέσω των φορμών επικοινωνίας και αίτησης αντιπροσωπείας στον ιστότοπό μας, επεξεργάζονται δεδομένα ταυτότητας και επικοινωνίας όπως όνομα, στοιχεία εταιρείας, τηλέφωνο, διεύθυνση email, πόλη/χώρα και το περιεχόμενο του μηνύματός σας.' }] },
        { title: '3. Σκοποί Επεξεργασίας Προσωπικών Δεδομένων', paras: [{ text: 'Τα προσωπικά σας δεδομένα επεξεργάζονται για την αξιολόγηση των αιτημάτων σας, τη διεκπεραίωση των διαδικασιών προσφορών και τεχνικής υποστήριξης, την εξέταση αιτήσεων αντιπροσωπείας, την επικοινωνία μαζί σας και την εκπλήρωση νομικών υποχρεώσεων.' }] },
        { title: '4. Νομική Βάση και Μέθοδος Συλλογής', paras: [{ text: 'Τα δεδομένα σας συλλέγονται και επεξεργάζονται ηλεκτρονικά μέσω των φορμών του ιστότοπου, βάσει των νομικών βάσεων της σύναψης/εκτέλεσης σύμβασης, του έννομου συμφέροντος και της ρητής συγκατάθεσής σας σύμφωνα με το άρθρο 5/2 του KVKK.' }] },
        { title: '5. Μεταφορά Προσωπικών Δεδομένων', paras: [{ text: 'Τα προσωπικά σας δεδομένα μπορεί να μεταφερθούν, περιορισμένα στους παραπάνω σκοπούς, στις εταιρείες του ομίλου μας, στους εξουσιοδοτημένους αντιπροσώπους, στους προμηθευτές από τους οποίους λαμβάνουμε υπηρεσίες (φιλοξενία, αποστολή email κ.λπ.) και στους νομίμως εξουσιοδοτημένους δημόσιους φορείς.' }] },
        { title: '6. Περίοδος Διατήρησης', paras: [{ text: 'Τα προσωπικά σας δεδομένα διατηρούνται για την περίοδο που απαιτεί ο σκοπός επεξεργασίας και τις προθεσμίες παραγραφής που προβλέπονται στη σχετική νομοθεσία· στο τέλος της περιόδου διαγράφονται, καταστρέφονται ή ανωνυμοποιούνται.' }] },
        { title: '7. Δικαιώματα του Υποκειμένου (KVKK άρθρο 11)', paras: [
          { text: 'Έχετε το δικαίωμα να μάθετε αν τα προσωπικά σας δεδομένα επεξεργάζονται, να ζητήσετε πληροφορίες αν επεξεργάζονται, να μάθετε τον σκοπό της επεξεργασίας, να ζητήσετε διόρθωση αν επεξεργάστηκαν ελλιπώς/λανθασμένα, να ζητήσετε διαγραφή/καταστροφή αν επεξεργάστηκαν αντίθετα προς τον KVKK, και να διεκδικήσετε αποζημίωση αν υποστείτε ζημία.' },
          { text: `Για να ασκήσετε αυτά τα δικαιώματα, μπορείτε να στείλετε τα αιτήματά σας στο ${ORG.email}.` },
        ] },
      ],
    },
  },
};

export function getLegalUi(locale: string): LegalUi {
  return DATA[locale as Locale] ?? DATA.tr;
}
