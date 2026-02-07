import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/data/store/useAuthStore';

export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const { user, routes, token } = result.data;
        localStorage.setItem('auth_token', token);
        setAuth(user, routes);
        
        router.push('/projects');
      } else {
        setError(result.message || 'Credenciales inválidas');
      }
    } catch {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
