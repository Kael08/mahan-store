'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../utils/api';
import type { LoginDto, LoginResponse } from '../types/auth.types';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data: LoginResponse = await api.post<LoginResponse>(
        '/AD/auth/login',
        { email, password } as LoginDto
      );

      // Сохраняем токены
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // Перенаправляем на dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Ошибка авторизации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="admin-card">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Arise Fashion
            </h2>
            <p className="text-gray-600">Админ-панель</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="admin-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="admin-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="admin-label">
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="admin-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="admin-button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Вход...' : 'Войти'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
