/* BAYİ AĞI
   ========
   Rakip incelemesinde (Eraslan) bulunan ve bizde olmayan özellik: ziyaretçi
   ilini seçip bölgesindeki bayiyi buluyor. `/bayi-bul` sayfası bu listeden
   beslenir.

   ⚠ VERİNİN KAYNAĞI: mevcut kurumsal sitenin bayi haritası (10.09.2026).
   CRM veritabanı 17.08.2026'daki WSL/Docker ortam kaybında elle girilmiş
   carileri kaybetmişti ve liste burada BOŞ bırakılmıştı. 10.09.2026'da
   simseksolar.com.tr/icerik/bayilerimiz sayfasındaki haritanın 81 ilinin
   her biri tek tek açılarak 13 ildeki 21 bayi kaydı geri alındı.

   ⚠ LİSTE EKSİKTİR — ve bu bilinerek böyle.
   CRM kayıtlarına göre 15 ilde 38 aktif bayi vardı. Sitedeki harita
   yalnızca 21'ini taşıyor; ANTALYA (7 bayi) ve ADANA (5 bayi) haritada hiç
   işaretli değil, Mersin'de de 9 yerine 4 bayi görünüyor. Yani kurumsal
   sitenin bayi listesi güncel değil. Eksikler ancak şirketin kendi güncel
   listesinden tamamlanabilir; buraya uydurma kayıt yazılmaz.

   ⚠ TELEFONLAR HAKKINDA
   Buradaki numaralar şirketin kendi yayımladığı bayi numaralarıdır; CRM'de
   "Netsis santrali, doğrulanacak" notuyla bekleyen numaralar DEĞİLDİR.
   Bu yüzden halka açık sayfada gösterilebilirler.
   Bazı bayilerde hem sabit hem cep numarası vardır (`phone` + `phone2`);
   `tel:` bağlantısı tek numara kabul ettiği için ayrı alanlarda tutulurlar.

   Liste değiştiğinde sayfa kendiliğinden güncellenir; kod değişikliği
   gerekmez. Yeni bayi için en az `title` ve `il` yeterlidir. */

export interface Dealer {
  /** Firma unvanı — sitede görünen ad. */
  title: string;
  /** İl adı, BÜYÜK HARF ve Türkçe (referans verisiyle aynı biçim): "MERSİN". */
  il: string;
  /** İlçe — biliniyorsa. */
  ilce?: string;
  /** ⚠ Yalnızca DOĞRULANMIŞ numara yazın. Emin değilseniz boş bırakın. */
  phone?: string;
  /** İkinci numara (ör. sabit hattın yanında cep). */
  phone2?: string;
  /** Yetkili kişi — isteğe bağlı. */
  contact?: string;
}

export const dealers: Dealer[] = [
  {
    title: "ŞİMŞEK YENİLENEBİLİR ENERJİ SİSTEMLERİ A.Ş.",
    il: "ANKARA",
    ilce: "Yenimahalle",
    phone: "+90 312 395 90 94",
  },
  {
    title: "AYTES İNŞAAT TESİSAT TUR. SAN. VE TİC. LTD. ŞTİ.",
    il: "AYDIN",
    ilce: "Didim",
    contact: "HAKAN İNCEOĞLU",
    phone: "+90 256 811 46 06",
    phone2: "+90 542 746 55 05",
  },
  {
    title: "DİNÇ TEKNİK ISITMA SOĞUTMA SİSTEMLERİ",
    il: "AYDIN",
    ilce: "Didim",
    contact: "SİNAN DİNÇSOY",
    phone: "+90 545 209 60 07",
  },
  {
    title: "ÖNOĞLU GÜNEŞ ENERJİSİ SİSTEMLERİ SU VE KAT KALORİFER TESİSATI",
    il: "BALIKESİR",
    ilce: "Ayvalık",
    contact: "SAMİ ÖNOĞLU",
    phone: "+90 532 347 71 84",
  },
  {
    title: "FEYZA GÜNEŞ ENERJİ SİSTEMLERİ",
    il: "DENİZLİ",
    ilce: "Merkezefendi",
    contact: "AHMET ÇAYBAŞ",
    phone: "+90 541 647 34 78",
  },
  {
    title: "NURSAN ISITMA VE SOĞUTMA SİSTEMLERİ",
    il: "ELAZIĞ",
    contact: "NURULLAH KÜRKÇÜ",
    phone: "+90 533 922 75 16",
  },
  {
    title: "BİLGE ISI YAPI MÜHENDİSLİK SAN. VE TİC. LTD. ŞTİ.",
    il: "MERSİN",
    ilce: "Silifke",
    contact: "BİLGE KAAN KAYA",
    phone: "+90 545 500 08 95",
  },
  {
    title: "SUTES GÜNEŞ ENERJİSİ İM. SIHHİ SU TESİSAT",
    il: "MERSİN",
    ilce: "Akdeniz",
    contact: "ERTAN ÇOKGÜN",
    phone: "+90 537 271 05 22",
  },
  {
    title: "GÜVEN SU GÜNEŞ ENERJİSİ",
    il: "MERSİN",
    ilce: "Erdemli",
    contact: "ALİ KOYU",
    phone: "+90 538 669 78 52",
  },
  {
    title: "ELSU ELEKTRİK VE SIHHİ TESİSAT GÜNEŞ ENERJİ SİSTEMİ",
    il: "MERSİN",
    ilce: "Silifke",
    contact: "Habib Taş",
    phone: "+90 531 462 04 99",
  },
  {
    title: "PUSULA TEKNİK TESİSAT",
    il: "İSTANBUL",
    ilce: "Sultanbeyli",
    contact: "NAZMİ BARAM AKÇA",
    phone: "+90 216 496 00 37",
    phone2: "+90 532 420 03 73",
  },
  {
    title: "SİMYA ENERJİ ÇÖZÜMLERİ",
    il: "İSTANBUL",
    ilce: "Maltepe",
    contact: "MUSTAFA BALKAN",
    phone: "+90 533 735 38 43",
  },
  {
    title: "GÜLEÇ METAL SANAYİ TİCARET",
    il: "İZMİR",
    ilce: "Konak",
    contact: "TUĞBERK GÜLEÇ",
    phone: "+90 232 458 73 73",
    phone2: "+90 532 488 25 70",
  },
  {
    title: "EKEN SOLAR",
    il: "KONYA",
    ilce: "Karatay",
    contact: "İBRAHİM EKEN",
    phone: "+90 532 402 53 01",
  },
  {
    title: "ÖZKANDEMİR GÜNEŞ ENERJİ SİSTEMLERİ",
    il: "MARDİN",
    ilce: "Midyat",
    contact: "ADEM KANDEMİR",
    phone: "+90 535 722 59 12",
  },
  {
    title: "ASYA MİMARLIK İNŞAAT MEKANİK SANAYİ TİCARET LTD. ŞTİ.",
    il: "MUĞLA",
    ilce: "Milas",
    contact: "METİN ASLAN",
    phone: "+90 252 358 58 79",
    phone2: "+90 533 466 22 27",
  },
  {
    title: "AKKAYA ISI PERFORJE İNŞAAT",
    il: "MUĞLA",
    ilce: "Fethiye",
    contact: "AHMET AKKAYA",
    phone: "+90 532 595 05 98",
  },
  {
    title: "GÜRBÜZ GÜNEŞ ENERJİSİ",
    il: "MUĞLA",
    ilce: "Marmaris",
    contact: "AHMET KARACA",
    phone: "+90 537 694 46 79",
  },
  {
    title: "NETSA ISITMA SOĞUTMA VE HAVUZ SİSTEMLERİ",
    il: "MUĞLA",
    ilce: "Marmaris",
    contact: "ŞİRİN KAYA",
    phone: "+90 532 335 35 67",
  },
  {
    title: "FİMAY TEKNOLOJİ",
    il: "SAMSUN",
    ilce: "Tekkeköy",
    contact: "FATİH YILDIRIM",
    phone: "+90 533 691 46 25",
  },
  {
    title: "SİNAN ISI SİSTEMLERİ",
    il: "VAN",
    ilce: "İpekyolu",
    contact: "SİNAN YÜRÜK",
    phone: "+90 543 515 95 22",
  },];

/** Bayimiz olan iller (büyük harf). Sayfa ve harita bundan beslenir. */
export function dealerProvinces(): string[] {
  return Array.from(new Set(dealers.map((d) => d.il))).sort((a, b) => a.localeCompare(b, 'tr'));
}

export function dealersIn(il: string): Dealer[] {
  return dealers.filter((d) => d.il === il);
}
