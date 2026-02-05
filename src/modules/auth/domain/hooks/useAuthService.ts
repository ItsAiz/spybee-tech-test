import { LOGIN_USER, REGISTER_USER } from '@/modules/auth/data/services/Mutations';
import { useMutation } from '@apollo/client';

export const useAuthService = () => {
  const [loginMutation] = useMutation(LOGIN_USER);
  const [registerMutation] = useMutation(REGISTER_USER);

  const login = async (email: string, password: string) => {
    const { data } = await loginMutation({ variables: { email, password } });
    return data?.login || null;
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await registerMutation({ variables: { name, email, password } });
    return data?.register || null;
  };

  return { login, register };
};
