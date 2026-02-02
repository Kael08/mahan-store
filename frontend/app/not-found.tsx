import Link from 'next/link';
import { routes } from '@/src/lib/routes';

export default function NotFound() {
  return (
    <main>
      <div className="min-h-[90vh] max-w-5xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Страница не найдена
        </h2>
        <p className="text-gray-500 mb-8">
          К сожалению, запрашиваемая страница не существует.
        </p>
        <Link
          href={routes.home}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
}
