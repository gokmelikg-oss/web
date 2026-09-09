/* BAYİ AĞI
   ========
   Rakip incelemesinde (Eraslan) bulunan ve bizde olmayan özellik: ziyaretçi
   ilini seçip bölgesindeki bayiyi buluyor. `/bayi-bul` sayfası bu listeden
   beslenir.

   ⚠ LİSTE ŞU AN BOŞ — ve bu bilinçli.
   CRM veritabanında 38 bayi kaydı vardı; 17.08.2026'daki WSL/Docker ortam
   kaybında elle girilmiş cariler silindi ve geri yüklenmedi (CRM projesinin
   CLAUDE.md dosyasında kayıtlı). 09.09.2026 itibarıyla veritabanında
   `projectCode` taşıyan cari sayısı 0'dır. Yani bayi listesi hiçbir yerde
   erişilebilir durumda değildir; buraya uydurma kayıt yazılmaz.

   ⚠ TELEFON ALANI HAKKINDA
   CRM'e girilen telefonlar Netsis kartlarından gelmişti ve "şirket santrali,
   doğrulanacak" notuyla işaretlenmişti. Doğrulanmamış bir numarayı halka
   açık siteye basmak, müşteriyi yanlış yere yönlendirir. Bu yüzden `phone`
   alanı ZORUNLU DEĞİLDİR: yoksa ziyaretçi fabrika hattına yönlendirilir.

   Liste doldurulduğunda sayfa kendiliğinden canlanır; kod değişikliği
   gerekmez. Doldurmak için: her bayi için en az `title` ve `il` yeterlidir. */

export interface Dealer {
  /** Firma unvanı — sitede görünen ad. */
  title: string;
  /** İl adı, BÜYÜK HARF ve Türkçe (referans verisiyle aynı biçim): "MERSİN". */
  il: string;
  /** İlçe — biliniyorsa. */
  ilce?: string;
  /** ⚠ Yalnızca DOĞRULANMIŞ numara yazın. Emin değilseniz boş bırakın. */
  phone?: string;
  /** Yetkili kişi — isteğe bağlı. */
  contact?: string;
}

export const dealers: Dealer[] = [];

/** Bayimiz olan iller (büyük harf). Sayfa ve harita bundan beslenir. */
export function dealerProvinces(): string[] {
  return Array.from(new Set(dealers.map((d) => d.il))).sort((a, b) => a.localeCompare(b, 'tr'));
}

export function dealersIn(il: string): Dealer[] {
  return dealers.filter((d) => d.il === il);
}
