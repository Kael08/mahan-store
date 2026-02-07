'use client';

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/login');
  };

  return (
    <header className="admin-navbar">
      <nav className="admin-navbar-container">
        <div className="text-2xl text-white font-extralight">
          Arise Fashion Admin
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-white hover:text-gray-300 transition-colors"
          >
            Товары
          </button>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-300 transition-colors"
          >
            Выйти
          </button>
        </div>
      </nav>
    </header>
  );
}
