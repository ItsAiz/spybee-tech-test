import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (name: string, email: string, pass: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: pass }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        router.push('/projects');
      } else {
        setError(result.message || 'Error while registering');
      }
    } catch {
      setError('Error conecting to server');
    } finally {
      setLoading(false);
    }
  };
  return { register, loading, error };
};

