/* Referans listesinde GİZLENECEK projeler (tam iş adıyla).
 *
 * Buraya eklenen işler referans LİSTESİNDE görünmez; ancak sayfa üstündeki
 * toplam ölçek (proje/il/konut/blok/kollektör/ışınım) ve çevresel etki
 * hesapları TÜM projeleri saymaya devam eder — yani "projenin orada olduğunu
 * biliyoruz", sadece kartını göstermiyoruz.
 *
 * Kullanım: gizlemek istediğiniz işin adını tırnak içinde, virgülle ekleyin.
 * (İş adı, referans verisindeki "title" ile birebir aynı olmalıdır.)
 */
export const HIDDEN_REFERENCE_TITLES: string[] = [
  // 'Örnek İş Adı 1',
  // 'Örnek İş Adı 2',
];
