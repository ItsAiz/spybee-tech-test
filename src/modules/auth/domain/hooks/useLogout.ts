import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/data/store/useAuthStore';

export const useLogout = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.logout);

  const logout = async (isRegister?: boolean) => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Error during logout request', error);
    } finally {
      clearAuth();
      router.push(isRegister ? '/register' : '/');
    }
  };

  return { logout };
};
