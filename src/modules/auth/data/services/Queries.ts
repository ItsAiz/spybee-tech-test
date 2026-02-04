
import { AuthResponse } from '@/modules/auth/data/models/Auth.interace';
import { useAuthService } from '@/modules/auth/domain/hooks/useAuthService';

export const useAuth = () => {
  const { login, register } = useAuthService();

  const handleAuth = async (action: 'login' | 'register', email?: string, password?: string, name?: string,) => {
    let response: AuthResponse | null;

    if (action === 'login' && email && password) {
      response = await login(email, password);
    } else if (action === 'register' && name && email && password) {
      response = await register(name, email, password);
    } else {
      return { success: false, message: 'Invalid parameters' };
    }
    const { success, data, message } = response ?? {};
    if (success && data) {
      if (data.token) {
        localStorage.setItem('email', email || '');
        localStorage.setItem('token', data.token);
      }
    }

    return { success, message };
  };

  const handleLogin = async (email: string, password: string) => {
    return handleAuth('login', email, password);
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    return handleAuth('register', email, password, name);
  };

  return { handleLogin, handleRegister };
};
