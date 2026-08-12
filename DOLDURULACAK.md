# Doldurulacak Bilgiler

Bu dosya **sizin için** hazırlandı. Kod bilmenize gerek yok — aşağıdaki
boşlukları doldurun, gerisini ben koda çeviririm.

**Nasıl kullanılır:** Bu dosyayı açın, bildiğiniz yerleri doldurun,
bilmediğiniz yerleri **boş bırakın**. Boş bıraktığınız hiçbir şey sitede
"boş kutu" olarak görünmez — o satır hiç basılmaz.

Hepsini birden doldurmak zorunda değilsiniz. Tek bölüm doldurup bana
verseniz de o bölüm hemen yayına girer.

---

## 1. Şirket rakamları

Sitede "40+ ülkeye ihracat" gibi ifadeler geçiyor ama doğrulanmadı.
**Kanıtlayamayacağınız rakamı yazmayın** — boş bırakmak, yanlış yazmaktan iyidir.

| Soru | Cevabınız |
|---|---|
| Kaç ülkeye ihracat yapıyorsunuz? | |
| Yıllık üretim kapasiteniz nedir? (ör. 200.000 kollektör/yıl) | |
| Kapalı üretim alanınız kaç m²? | |
| Kaç çalışanınız var? | |
| Bugüne kadar kaç proje tamamlandı? | |

> Not: Kuruluş yılı **1992** olarak kesinleşti, onu sormuyorum.

---

## 2. Sertifikalar

`/sertifikalar` sayfası hazır ama **boş** — çünkü belge numarası uydurulamaz.
Elinizdeki her belge için aşağıdaki tabloyu **kopyalayıp** doldurun.

### Belge 1

| Alan | Cevabınız |
|---|---|
| Belge adı | *(ör. Solar Keymark)* |
| Veren kurum | *(ör. DIN CERTCO)* |
| Belge numarası | |
| Veriliş tarihi | |
| Geçerlilik bitişi | *(süresizse boş bırakın)* |
| Hangi ürünleri kapsıyor? | |
| Bu belge ne anlama geliyor? *(2-3 cümle, müşteriye anlatır gibi)* | |
| PDF dosyası var mı? | *(varsa bana gönderin)* |

### Belge 2
*(Yukarıdaki tabloyu kopyalayıp devam edin — CE, TSE, ISO, TÜV vb.)*

> **Neden "ne anlama geliyor" soruyorum?** PDF'in içindeki yazıyı Google
> okuyamaz. Belgeyi sayfada Türkçe anlatırsak hem müşteri anlar hem arama
> motorunda çıkar. Sadece PDF koymak yeterli değil.

---

## 3. Üretim / Fabrika sayfası

`/uretim` sayfası hazır ama **boş** — çünkü tesiste hangi işlemlerin
gerçekten yapıldığını sadece siz bilirsiniz. Olmayan bir işlemi yazmak
yanlış beyan olur.

**Aşağıdaki listede tesisinizde YAPILAN işlemleri işaretleyin:**

- [ ] Alüminyum profil üretimi
- [ ] Absorber (emici plaka) üretimi
- [ ] Cam işleme / kesme
- [ ] Ultrasonik kaynak
- [ ] Lazer kaynak
- [ ] Selektif kaplama
- [ ] Silikon uygulama
- [ ] İzolasyon
- [ ] Montaj
- [ ] Sızdırmazlık testi
- [ ] Basınç testi
- [ ] Performans testi
- [ ] Paketleme
- [ ] Sevkiyat
- [ ] Diğer: ______________________

**Her işaretlediğiniz adım için 1-2 cümle açıklama yazın:**

| Adım | Açıklama (1-2 cümle) |
|---|---|
| | |
| | |

**Fotoğraflar:** Her adım için tesisinizden gerçek fotoğraf gönderin.
Stok fotoğraf kullanmayacağız — bu sayfanın tek amacı "gerçekten üretiyoruz"
demek; stok fotoğraf tam tersini yapar.

---

## 4. Proje başarı hikâyeleri

Elimizde 526 projenin sayısal kaydı var (il, konut, kollektör sayısı).
Ama bu bir "başarı hikâyesi" değil. **En güçlü 5-10 projeyi** seçin ve
her biri için şunları yazın:

### Proje 1

| Alan | Cevabınız |
|---|---|
| Proje adı | |
| Nerede? | *(şehir, ülke)* |
| Hangi yıl? | |
| Ne tür bir yapı? | *(otel, yurt, toplu konut, hastane…)* |
| Kaç kollektör kullanıldı? | |
| Toplam ışınım alanı (m²) | |
| Depolama kapasitesi (litre) | |
| Hangi ürünlerimiz kullanıldı? | |
| **Sorun neydi?** *(müşterinin ihtiyacı / zorluk)* | |
| **Nasıl çözdük?** | |
| **Sonuç ne oldu?** | |
| Saha fotoğrafı var mı? | |

### Proje 2
*(Tabloyu kopyalayıp devam edin)*

> **Neden az ama dolu?** 10 tane gerçek anlatımlı proje, 526 tane boş
> kayıttan hem satışta hem aramada daha güçlüdür.

---

## 5. Ürün stok kodları

Ürünlerinizin resmî stok kodu (SKU) veya barkod numarası (GTIN) var mı?

| Ürün | Stok kodu | Barkod (GTIN) |
|---|---|---|
| Orion 300 | | |
| Orion 500 | | |
| Aquarius 500 | | |
| Aquarius 600 | | |
| Helios 200L | | |
| Helios 300L | | |

> Yoksa boş bırakın — şu an ürün adından türetilen bir kod kullanılıyor,
> çalışıyor. Barkod yoksa **uydurmuyoruz**; sahte barkod Google'da ürün
> verisini tamamen geçersiz kılar.

---

## 6. Teknik ayarlar (bilgi işlem tarafı)

Bunlar veri değil, hesap/anahtar meselesi. Sizin açmanız gerekiyor:

| Ne | Neden gerekli | Durum |
|---|---|---|
| **Resend hesabı** (`RESEND_API_KEY`) | Teklif ve iletişim formları e-posta göndersin diye. **Şu an formlar çalışmıyor** — "yapılandırılmadı" hatası veriyor | ❌ yok |
| **Google Analytics** (`NEXT_PUBLIC_GA_ID`) | Hangi sayfadan kaç teklif geliyor görebilmek için. Ölçüm kodu hazır, sadece hesap kimliği lazım | ❌ yok |
| **Google Search Console** | Google'da hangi aramalarda çıktığınızı görmek için | ❌ yok |
| **Vercel → Deployment Protection** | Canlı sitenin Google'a açık olması için kapalı olmalı (önizleme sürümlerinde açık kalması doğru) | kontrol edin |

---

## Öncelik sırası (benim önerim)

1. **Bölüm 6** — formlar çalışmıyor, en acil bu. Müşteri teklif isteyemiyor.
2. **Bölüm 2** — sertifikalar; ihracatta en çok sorulan şey.
3. **Bölüm 1** — şirket rakamları; birkaç dakikalık iş, büyük etki.
4. **Bölüm 3** — üretim sayfası; fotoğraf toplamak zaman alır, erken başlayın.
5. **Bölüm 4** — proje hikâyeleri; en çok emek isteyen ama en değerli olan.
6. **Bölüm 5** — stok kodları; acil değil.
