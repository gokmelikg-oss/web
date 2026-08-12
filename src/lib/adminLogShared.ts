/* İşlem kaydının tip ve etiketleri.
   Bu dosya sunucuya özgü hiçbir modül (fs, crypto) içermez; client bileşenleri
   etiketleri buradan alır. Yazma/okuma tarafı adminLog.ts içindedir. */

export type LogAction =
  | 'login' | 'login_failed' | 'login_blocked_ip' | 'logout'
  | 'content_save' | 'content_restore'
  | 'user_create' | 'user_update' | 'user_delete'
  | 'session_end' | 'block_clear'
  | 'backup_download' | 'backup_restore';

export interface LogEntry {
  id: string;
  at: string;
  username: string;
  action: LogAction;
  detail: string;
  ip: string;
}

export const ACTION_LABELS: Record<LogAction, string> = {
  login: 'Giriş',
  login_failed: 'Başarısız giriş',
  login_blocked_ip: 'IP kısıtlaması engeli',
  logout: 'Çıkış',
  content_save: 'İçerik kaydı',
  content_restore: 'Sürüm geri alma',
  user_create: 'Kullanıcı eklendi',
  user_update: 'Kullanıcı güncellendi',
  user_delete: 'Kullanıcı silindi',
  session_end: 'Oturum sonlandırıldı',
  block_clear: 'Kilit kaldırıldı',
  backup_download: 'Yedek indirildi',
  backup_restore: 'Yedekten geri yüklendi',
};
