/* ŞİRKET KÜNYESİ — TEK DOĞRULUK KAYNAĞI
   ======================================
   Kuruluş yılı ve "kaç yıllık deneyim" ifadesi sitede üç ayrı yerde geçiyordu
   (seo.ts, hero metni, llms.txt) ve birbirini tutmuyordu. Artık hepsi buradan
   türetilir; bir yeri değiştirmek yeterlidir.

   ⚠ DOLDURULACAK ALANLAR aşağıda "// SORU:" ile işaretlidir. Doğrulanamayan
   hiçbir rakam yazılmamalıdır (bkz. CLAUDE.md → "içerik/rakam UYDURMA"). */

/* SORU: Kuruluş yılı 1992 mi 1994 mü?
   Sitede 1992 yazıyor, dışarıdan gelen SEO raporu 1994 diyordu.
   Doğru değeri buraya yazın; site, llms.txt ve JSON-LD otomatik hizalanır. */
export const FOUNDED_YEAR = 1992;

/* Deneyim yılı metinden değil kuruluş yılından hesaplanır; böylece
   "35 yılı aşkın" gibi ifadeler zamanla yanlışa dönüşmez. */
export function yearsOfExperience(now: Date = new Date()): number {
  return now.getFullYear() - FOUNDED_YEAR;
}

/* Yuvarlanmış, pazarlama metninde kullanılabilir deneyim ifadesi.
   30 yıl 4 ay için "30+" der; asla yukarı yuvarlamaz. */
export function experienceLabel(now: Date = new Date()): string {
  return `${yearsOfExperience(now)}+`;
}

/* Doğrulanabilir şirket verileri — "Company Facts" bloğu ve llms.txt burayı okur.
   Bir alan bilinmiyorsa undefined bırakın; arayüz o satırı hiç basmaz.
   Kanıtlanamayan rakam yazmak, AI sistemlerinde güven kaybına yol açar. */
export interface CompanyFacts {
  foundedYear: number;
  headquarters: string;
  facility: string;
  sector: string;
  /* SORU: Kaç ülkeye ihracat yapılıyor? (llms.txt "40+ ülke" diyor — teyit edilecek) */
  exportCountries?: number;
  /* SORU: Yıllık üretim kapasitesi (ör. "250.000 kollektör/yıl") */
  annualCapacity?: string;
  /* SORU: Kapalı üretim alanı (m²) */
  facilityAreaM2?: number;
  /* SORU: Çalışan sayısı */
  employees?: number;
  /* SORU: Tamamlanan proje sayısı — referans listesinde 526 kayıt var,
     bu sayı kamuya açık olarak kullanılabilir mi? */
  completedProjects?: number;
}

export const COMPANY_FACTS: CompanyFacts = {
  foundedYear: FOUNDED_YEAR,
  headquarters: 'Mersin, Türkiye',
  facility: '2. Organize Sanayi Bölgesi, Akdeniz, Mersin',
  sector: 'Güneş termal enerji sistemleri üretimi',
  // Aşağıdakiler teyit edilene kadar bilinçli olarak boş bırakıldı.
  exportCountries: undefined,
  annualCapacity: undefined,
  facilityAreaM2: undefined,
  employees: undefined,
  completedProjects: undefined,
};
