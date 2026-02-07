import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Проверяем токен в cookies (если используется) или просто пропускаем
  // Реальная проверка будет на клиенте через проверку localStorage
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isPublicPage = isLoginPage || request.nextUrl.pathname === '/';

  // Для всех остальных страниц проверка будет на клиенте
  // Middleware в Next.js не имеет доступа к localStorage
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
