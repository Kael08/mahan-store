const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function refreshTokens(): Promise<boolean> {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return false;
    }

    const response = await fetch(`${API_BASE_URL}/AD/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return true;
  } catch {
    return false;
  }
}

export const api = {
  baseUrl: API_BASE_URL,

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Токен истек - пытаемся обновить
          const refreshed = await refreshTokens();

          if (refreshed) {
            // Повторяем запрос с новым токеном
            const newToken = localStorage.getItem('accessToken');
            if (newToken) {
              headers['Authorization'] = `Bearer ${newToken}`;
              const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...options,
                headers,
              });

              if (!retryResponse.ok) {
                if (retryResponse.status === 401) {
                  // Даже после обновления не работает - редирект на логин
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                  }
                  throw new Error('Не авторизован');
                }
                throw new Error(`Ошибка ${retryResponse.status}`);
              }

              return retryResponse.json();
            }
          } else {
            // Не удалось обновить - редирект на логин
            if (typeof window !== 'undefined') {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              window.location.href = '/login';
            }
            throw new Error('Не авторизован');
          }
        }

        let errorMessage = 'Ошибка запроса';
        try {
          const error = await response.json();
          errorMessage = error.message || error.error || errorMessage;
        } catch {
          errorMessage = `Ошибка ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error: any) {
      if (
        error.name === 'TypeError' ||
        error.message.includes('Failed to fetch')
      ) {
        throw new Error(
          `Не удалось подключиться к серверу. Проверьте, что бэкенд запущен на ${API_BASE_URL}`
        );
      }
      throw error;
    }
  },

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  },

  post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const makeRequest = async (
      token: string | null,
      formDataToSend: FormData
    ): Promise<T> => {
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formDataToSend,
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Токен истек - пытаемся обновить
          const refreshed = await refreshTokens();

          if (refreshed) {
            // Повторяем запрос с новым токеном
            // ВАЖНО: FormData можно использовать только один раз
            // Если это повторный запрос, нужно передать новый FormData
            const newToken = localStorage.getItem('accessToken');
            if (newToken) {
              // Пробуем использовать тот же FormData (обычно работает)
              // Если не работает, нужно будет пересоздать FormData на клиенте
              return makeRequest(newToken, formDataToSend);
            }
          }

          // Не удалось обновить - редирект на логин
          if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
          }
          throw new Error('Не авторизован');
        }

        const error = await response
          .json()
          .catch(() => ({ message: 'Ошибка запроса' }));
        throw new Error(error.message || 'Ошибка запроса');
      }

      return response.json();
    };

    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;

    return makeRequest(token, formData);
  },

  patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  },
};
