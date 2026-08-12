# Şimşek Solar — Proje Rehberi (CLAUDE.md)

Premium kurumsal pazarlama sitesi. **Şimşek Solar** (Mersin merkezli güneş termal
üretici, Şimşek Grup). Next.js 14 App Router + TypeScript + Tailwind.

## Yığın
- **Next.js 14 App Router**, `src/app/[locale]/...` (i18n route).
- **next-intl** — diller: `tr` (varsayılan), `en`, `ar` (RTL), `el`. Config: `src/i18n/config.ts`.
- **Tailwind CSS**; framer-motion (`Reveal`, `motion`, `CountUp`); lucide-react ikonlar.
- Fontlar: Poppins (display) + Nunito (body), `src/app/[locale]/layout.tsx`.
- Admin içeriği: **Vercel KV** (varsa) yoksa dosya fallback (`content/site.json`), `src/lib/content.ts`.

## Deploy / repo kuralları
- Origin: **`gokmelikg-oss/web`** (branch `main`). Kullanıcı push isteyince `origin main`'e push et.
- Canlı: kullanıcı `www.simseksolar.com`'a **kendisi** taşır — deployment'ı sormakla uğraşma.
- Admin şifresi `.env.local` içinde `ADMIN_PASSWORD` (gitignore). Yerelde: `simsek2026`.
  Canlıda Vercel'de `ADMIN_PASSWORD` + KV env'leri (`KV_REST_API_URL/TOKEN`) gerekir.

## ÖNEMLİ komut kuralı
- **Dev sunucusu çalışırken `npm run build` ÇALIŞTIRMA** → prod build çalışan dev'in
  `.next` önbelleğini bozar (`Cannot find module './vendor-chunks/@formatjs.js'`, 500).
  Doğrusu: önce dev'i durdur (port 3000 PID'ini kill), `npm run build`, sonra dev'i yeniden başlat.
  Gerekirse `.next`'i sil.
- Build hedefi: **~470 statik sayfa, temiz**. AdminDashboard'da bilinen tek zararsız lint uyarısı var.

## i18n deseni (ÇOK ÖNEMLİ)
İki kaynak var:
1. **Mesaj dosyaları** `src/messages/{tr,en,ar,el}.json` — ana sayfa, header, footer,
   ürünler çekirdeği, iletişim, hero vb. Dört dosya **tam parite** (322+ anahtar) olmalı.
2. **Sayfaya özgü içerik → `src/lib/*Ui.ts` içinde `Record<Locale, ...>` haritaları.**
   Örnekler: `blogUi`, `referencesUi`, `provincesUi`, `roofCheckUi`, `calculatorUi`,
   `techDocsUi`, `legalUi`. Sayfalar `getXUi(locale)` çağırır. Client bileşenler `labels` prop alır
   (client'a fonksiyon geçme; `{name}` yer tutucu + `.replace()` kullan).
- Sabit veri (FAQ, blog yazıları) `src/data/*` içinde dil-anahtarlı: `faqByLocale`/`getFaqItems`,
  `articlesByLocale`/`getArticles`.
- Yeni metin eklerken **dört locale'e birden ekle** (TS `Record<Locale>` hepsini ister).
  Kullanıcı "Türkçe-öncelikli" derse: en/ar/el'e geçici Türkçe koy, sonra toplu çevir.

## ⚠ Şirket künyesi TEK KAYNAKTAN gelir

`src/lib/companyFacts.ts` → `FOUNDED_YEAR` ve `experienceLabel()`.
Kuruluş yılı önceden üç yerde ayrı yazılıydı ve tutmuyordu (seo.ts 1992, hero
metni "35 yılı aşkın" = 1991, dışarıdan gelen SEO raporu 1994). Artık
`seo.ts → ORG.foundingDate` ve hero metinleri buradan türer.

> **AÇIK SORU:** Kuruluş yılı 1992 mi 1994 mü? `FOUNDED_YEAR` şu an 1992.
> Doğrusu neyse tek satır değiştirilir; site, llms.txt ve JSON-LD hizalanır.

`COMPANY_FACTS` içindeki `exportCountries`, `annualCapacity`, `facilityAreaM2`,
`employees`, `completedProjects` **bilinçli olarak undefined**. Doldurulmayan
alan arayüzde hiç basılmaz — "0 ülke" gibi kutu oluşmaz. Kanıtlanamayan rakam
yazılmaz.

## Veri girilince açılan sayfalar

`/sertifikalar` (`data/certificates.ts`) ve `/uretim` (`data/production.ts`)
veri dosyaları **boşken**:
- sayfa `ContentPending` boş durumunu gösterir,
- `generateMetadata` **noindex** döner,
- `sitemap.ts` bu yolları **hiç eklemez**.

Veri girilir girilmez üçü de kendiliğinden düzelir. Gerekçe: boş sayfanın
indekslenmesi "ince içerik" sinyalidir.

`data/caseStudies.ts` de aynı mantıkla hazır bekliyor (henüz sayfası yok).

## Sayfa/rota haritası (`src/app/[locale]/`)
- `page.tsx` ana sayfa (Hero, ürünler index, SystemWizard, anatomy, üretim, HomeContact).
- `products/` (ProductsShowcase + ProductCompare + HowItWorks + TrustStrip + CapacityGuide).
- `resources/` = **Dökümanlar** (TechnicalLibrary: ürün seçici + sekmeler + verim eğrisi).
- `akademi/` = Hesaplama araçları + Eğitimler + Blog (sadece bu üçü).
- `calculator/` (SolarCalculator — gerçek boyutlandırma/tasarruf).
- `gunes-potansiyeli/` liste + `[il]` detay + RoofCheck (#cati çapası).
- `projects/` = Referanslar (ReferenceList: arama + il + ikon kategori filtresi + CTA).
- `blog/` + `[slug]`, `sss/`, `contact/`, `about/`, `history/`, `founder/`,
  `grup-sirketleri/`, `kalite-politikasi/`, yasal: `kvkk/ gizlilik/ cerez-politikasi/`.
- **`teklif-al/`** = Teklif Al (RFQ). B2B'de asıl dönüşüm sayfasıdır; header CTA
  buraya gider (eskiden `/contact`'a gidiyordu). Form ülke + adet + proje tipi
  taşır ve **dosya eki** kabul eder → `api/teklif` (multipart, Resend attachment).
- **`ihracat/`** · **`oem/`** · **`bayi/`** = yetenek sayfaları, ortak
  `CapabilityPage` bileşeniyle kurulur. `/dealers` artık `/bayi`'ye 308.
- **`sertifikalar/`** · **`uretim/`** = veri dosyası dolunca açılır (yukarı bkz.).
- 404 `not-found.tsx`, `error.tsx`, `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, `manifest.ts`.

## Admin (`src/app/admin/`)
- `/admin` (force-dynamic), login `/admin/login`. `AdminDashboard.tsx`: koyu etiketli sidebar +
  Genel Bakış (hero + istatistik kartları + son güncellenenler + hızlı işlemler) + editör bölümleri
  (metinler/ürünler/blog/referans/döküman/görsel). API: `src/app/api/admin/*`.
- Admin **yalnızca Türkçe** (bilinçli).

### Kullanıcı girişi ve yetkilendirme (Webmin deseninden uyarlandı)
Giriş artık tek şifre değil, **kullanıcı adı + şifre**. Webmin'in `acl` modülündeki
Webmin Users / Module ACL / Login Sessions / Actions Log yapısı uyarlandı.

| Katman | Dosya |
|---|---|
| Roller ve bölüm ACL'i (client-safe, node importu yok) | `src/lib/adminAcl.ts` |
| Kullanıcı deposu, scrypt şifre özeti | `src/lib/adminUsers.ts` |
| İmzalı oturum cookie'si (HMAC-SHA256) | `src/lib/adminAuth.ts` |
| Oturum kayıtları + hatalı giriş kilidi | `src/lib/adminSessions.ts` |
| İşlem kaydı (yazma) / tip+etiket (client) | `src/lib/adminLog.ts` · `adminLogShared.ts` |
| KV-veya-dosya JSON deposu | `src/lib/adminStore.ts` |

- **Roller:** `owner` (her şey + kullanıcı yönetimi) · `editor` (yetkili içerik bölümleri,
  kaydedebilir) · `viewer` (salt okunur). Yönetici bölümleri (Kullanıcılar/Oturumlar/
  İşlem Kaydı/Sistem Bilgisi) **yalnızca owner'a** açılır, ACL ile devredilemez.
- **İlk kurulum:** kullanıcı kaydı yoksa `ADMIN_PASSWORD` ile `admin` hesabı otomatik açılır
  (`ensureBootstrapUser`). Mevcut kurulumlar şifre değiştirmeden çalışmaya devam eder.
- **Oturum sunucuda da tutulur** → bir oturum uzaktan kapatılabilir; şifre değişince veya
  hesap kapanınca kullanıcının tüm oturumları düşer.
- **Kilit:** 5 hatalı denemeden sonra kullanıcı+IP 15 dakika bloklanır. Oturumlar panelindeki
  "Hatalı Giriş Denemeleri" tablosundan elle kaldırılabilir.
- **Kullanıcı bazlı IP kısıtlaması** (`allowedIps`): boş = her yerden. Nokta ile biten değer
  ön ektir (`192.168.1.` → tüm ofis ağı). Şifre doğru olsa bile geçilmez.
- **İçerik yedeği:** `/api/admin/backup` GET indirir, POST geri yükler (yalnızca owner).
  Yedek **site içeriğidir**; kullanıcı hesapları ve şifre özetleri yedeğe girmez.
- `ADMIN_SECRET` tanımlıysa oturum imzası ondan türer; yoksa `ADMIN_PASSWORD`'dan türer
  (şifre değişince tüm oturumlar düşer). Sistem Bilgisi paneli bunu uyarı olarak gösterir.
- **Veriler `content/users.json` · `sessions.json` · `log.json`** (KV varsa `site:*`
  anahtarları). Üçü de gitignore'da — şifre özeti içerir.

> ⚠ `adminStore.ts` `fs` kullanır. Client bileşenleri **asla** ondan türeyen bir modülü
> import etmemeli; etiket/tip gerekiyorsa `adminAcl.ts` veya `adminLogShared.ts` kullan.
> (`AdminSystemPanels.tsx` bir kez `adminLog.ts`'ten import edip `Can't resolve 'fs'`
> hatasına düşürdü.)

### İçerik düzenleme davranışları

| Konu | Nasıl çalışır |
|---|---|
| **Çok dilli metin** | `texts` = tr (eski alan), `textsByLocale[locale]` = diğer diller. Sayfalar `textsFor(content, locale)` çağırır. Bir dilde alan boşsa o dilin kendi mesaj dosyası kullanılır. Panelde dil sekmeleri vardır. |
| **Taslak / yayın** | `AdminProduct.published` · `AdminPost.published`. **Tanımsız = yayında** (eski kayıtlar bozulmaz). `isPublished()` tek kaynaktır; site listeleri ve `/blog/[slug]` bunu uygular — taslak yazının kendi sayfası 404 döner. |
| **Eşzamanlı kaydetme** | İstemci `baseUpdatedAt` gönderir; sunucudaki `updatedAt` farklıysa **409** döner ve panel "yenile / yine de kaydet" sorar. Alan gönderilmezse kontrol yapılmaz (bilinçli "üzerine yaz"). |
| **Sürüm geçmişi** | Her kaydetmede bir öncekinin fotoğrafı `content/versions.json` (veya `site:content:versions`) içine düşer, **son 10** tutulur. Satırdaki özet o sürümün ARDINDAN yapılan değişikliği anlatır. |
| **İşlem kaydı detayı** | `contentDiff.ts` → `describeContentChange()` iki sürümü karşılaştırıp "ürün eklendi (1): Orion 435 · yazı düzenlendi (1): …" üretir. Saf fonksiyon. |
| **Görsel yükleme** | `POST /api/admin/upload` → `public/uploads/`. Dosya adı SEO için sadeleştirilir (`Orion 435 Güneş Kollektörü.png` → `orion-435-gunes-kollektoru-<sonek>.png`). 5 MB sınırı, yalnız JPG/PNG/WebP/AVIF/SVG. |

> ⚠ **Vercel'de yükleme çalışmaz** — sunucusuz dosya sistemi salt okunurdur. Uç bu durumu
> yakalayıp (`EROFS/EACCES/EPERM`) Türkçe açıklama döner. Kalıcı çözüm Vercel Blob'dur.
> `public/uploads/` içeriği gitignore'da; klasör `.gitkeep` ile korunur.

## Önemli veri dosyaları (`src/data/`)
- `tokiProjects.json` — 526 referans projesi (`title,il,ilce,homes,blocks,collectors,aperture,gross,category`).
  `homes=0` kurumsal projeler (Adalet/Savunma/AFAD vb.); ışınım=koll×2.33, brüt=koll×2.55.
- `products.ts` (8 ürün + specs), `faq.ts`, `news.ts` (blog), `provinces.ts` (81 il + GEPA), `references.ts`.

## Konvansiyonlar
- Rakip/ilham sitelerinden **desen** al; **içerik/logo/görsel/müşteri yorumu KOPYALAMA/UYDURMA**.
  Site "abartısız, şeffaf" ilkesinde — sahte istatistik/testimonial yok. Hesap araçları varsayımları açık yazılır.
- Dosya referansı `path:line`. Mevcut kodun stiline uy.
