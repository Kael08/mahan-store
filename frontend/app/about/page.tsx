import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'О нас - Arise Fashion',
  description:
    'Узнайте больше о Arise Fashion - магазине одежды, который ценит стиль, качество и актуальность.',
};

export default async function AboutPage() {
  return (
    <main>
      <div className="about-container">
        <h1 className="about-name-font mb-8">Arise Fashion</h1>
        <div className="about-text-font">
          <p className="mb-6">
            Arise Fashion — это магазин одежды, созданный молодой командой,
            которая ценит стиль, качество и актуальность. Мы собираем вещи,
            которые легко вписываются в повседневную жизнь и помогают выглядеть
            уверенно без лишней сложности.
          </p>
          <p className="mb-6">
            Мы внимательно подходим к выбору ассортимента: обращаем внимание на
            материалы, посадку и детали. Для нас важно, чтобы каждая вещь была
            не просто модной, а удобной и практичной.
          </p>
          <p className="mb-6">
            Arise Fashion — это про развитие и движение вперёд. Мы постоянно
            обновляем коллекции, следим за тенденциями и работаем над тем, чтобы
            покупки были простыми и понятными.
          </p>
          <p className="mb-8">
            Мы только в начале пути, но уже строим бренд, которому можно
            доверять.
          </p>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Наши контакты
            </h2>
            <div className="space-y-3">
              <p>
                <b className="text-gray-700">Телефон:</b>{' '}
                <a
                  href="tel:+79371051701"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  +7 (937) 105-17-01
                </a>
                {' | '}
                <a
                  href="tel:+79221341965"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  +7 (922) 134-19-65
                </a>
              </p>
              <p>
                <b className="text-gray-700">Почта:</b>{' '}
                <a
                  href="mailto:mingiyan.1999@gmail.com"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  mingiyan.1999@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
