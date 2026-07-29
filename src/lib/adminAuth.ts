import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'ss-admin';

/* Basit oturum: doğru şifre girildiğinde imzalı bir token cookie'ye yazılır.
   Şifre ADMIN_PASSWORD ortam değişkeninden okunur. */
export function expectedToken(): string {
  const pw = process.env.ADMIN_PASSWORD ?? '';
  // Basit türev (kaba doğrulama için yeterli). Gerçek gizlilik cookie httpOnly + HTTPS ile sağlanır.
  let h = 0;
  const salt = `simsek-solar::${pw}`;
  for (let i = 0; i < salt.length; i++) h = (h * 31 + salt.charCodeAt(i)) | 0;
  return `t${Math.abs(h)}`;
}

export async function isAuthed(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false;
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === expectedToken();
}
