import Link from 'next/link';
import { routes } from '@/src/lib/routes';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Arise Fashion - Магазин модной одежды',
  description:
    'Arise Fashion — это магазин одежды, созданный молодой командой, которая ценит стиль, качество и актуальность.',
  keywords: 'одежда, мода, fashion, магазин одежды, Arise Fashion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="body">
        <header className="navbar">
          <nav className="navbar-container">
            <div /> {/*Пустой div, нужный для равновесия вселенной */}
            <Link href={routes.home} className="navbar-ariseFashion-font">
              Arise Fashion
            </Link>
            <Link href={routes.about} className="navbar-aboutUs-font">
              О нас
            </Link>
          </nav>
        </header>
        {children}
        <footer className="footer">
          © 2026 Arise Fashion. Все права защищены.
        </footer>
      </body>
    </html>
  );
}
