import Link from 'next/link';
import { routes } from '@/src/lib/routes';
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <header className="navbar">
          <nav className="navbar-container" >
            <div/> {/*Пустой div, нужный для равновесия вселенной */}
            <Link href={routes.home} className="navbar-ariseFashion-font">
              Arise Fashion
            </Link> 
            <Link href={routes.about} className="navbar-aboutUs-font">
              О нас
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
