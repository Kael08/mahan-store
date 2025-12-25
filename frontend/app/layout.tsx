export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ru'>
      <body>
        <header>
          <nav>
            <a href='/home'>Главная</a> | <a href='/products'>Продукты</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}