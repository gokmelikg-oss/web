/* Yönetim paneli yetkilendirmesi — Webmin'in "Webmin Users / Module ACL" deseninden uyarlandı.
   Bu dosya sunucuya özgü hiçbir şey içermez; client bileşenleri de import edebilir. */

export type AdminRole = 'owner' | 'editor' | 'viewer';

/* Panel bölümleri = Webmin'deki "modüller". Kullanıcıya bölüm bazında yetki verilir. */
export type AdminSection =
  | 'overview' | 'texts' | 'products' | 'posts' | 'references' | 'documents' | 'images'
  | 'users' | 'sessions' | 'log' | 'system';

export const ADMIN_SECTIONS: AdminSection[] = [
  'overview', 'texts', 'products', 'posts', 'references', 'documents', 'images',
  'users', 'sessions', 'log', 'system',
];

/* İçerik bölümleri — editör rolünün varsayılan yetkisi. */
export const CONTENT_SECTIONS: AdminSection[] = [
  'overview', 'texts', 'products', 'posts', 'references', 'documents', 'images',
];

/* Yalnızca yönetici (owner) verebileceği bölümler. */
export const ADMIN_ONLY_SECTIONS: AdminSection[] = ['users', 'sessions', 'log', 'system'];

export const ROLE_LABELS: Record<AdminRole, string> = {
  owner: 'Yönetici',
  editor: 'Editör',
  viewer: 'İzleyici',
};

export const ROLE_DESCRIPTIONS: Record<AdminRole, string> = {
  owner: 'Tüm bölümler + kullanıcı yönetimi. Yetkisi kısıtlanamaz.',
  editor: 'Yetki verilen içerik bölümlerini düzenleyip kaydedebilir.',
  viewer: 'Yetki verilen bölümleri görür, kaydedemez.',
};

export const SECTION_LABELS: Record<AdminSection, string> = {
  overview: 'Genel Bakış',
  texts: 'Sayfa Metinleri',
  products: 'Ürünler',
  posts: 'Blog',
  references: 'Referanslar',
  documents: 'Dökümanlar',
  images: 'Grup Görselleri',
  users: 'Kullanıcılar',
  sessions: 'Oturumlar',
  log: 'İşlem Kaydı',
  system: 'Sistem Bilgisi',
};

/* Rolün varsayılan bölüm listesi (yeni kullanıcı açılırken önerilir). */
export function defaultSections(role: AdminRole): AdminSection[] {
  return role === 'owner' ? [...ADMIN_SECTIONS] : [...CONTENT_SECTIONS];
}

/* Kullanıcının erişebildiği bölümler.
   Yönetici her zaman hepsini görür; diğerleri yalnızca ACL listesindekileri
   ve yönetici bölümlerine hiçbir koşulda giremez. */
export function allowedSections(role: AdminRole, acl: string[] | undefined): AdminSection[] {
  if (role === 'owner') return [...ADMIN_SECTIONS];
  const set = new Set(acl ?? CONTENT_SECTIONS);
  return CONTENT_SECTIONS.filter((s) => set.has(s));
}

export function canAccess(role: AdminRole, acl: string[] | undefined, section: AdminSection): boolean {
  return allowedSections(role, acl).includes(section);
}

/* Kaydetme yetkisi: izleyici salt okurdur. */
export function canWrite(role: AdminRole): boolean {
  return role !== 'viewer';
}
