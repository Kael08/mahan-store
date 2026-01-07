import Link from 'next/link';
import { routes } from '@/src/lib/routes';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <header>
          <nav>
            <Link href={routes.home}>Arise Fashion</Link> |
            <Link href={routes.about}>О нас</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
