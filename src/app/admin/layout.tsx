import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Yönetim Paneli — Şimşek Solar',
  robots: { index: false, follow: false },
};

/* Admin, [locale] ağacının dışında bağımsız bir kök layout kullanır. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-body bg-mist-50 text-graphite-950 antialiased`}>
        {children}
      </body>
    </html>
  );
}
