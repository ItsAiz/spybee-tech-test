import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSafe } from '../models/User.interface';

interface AuthState {
  user: UserSafe | null;
  routes: Array<{ label: string; path: string }> | null;
  isAuthenticated: boolean;
  setAuth: (user: UserSafe, routes: Array<{ label: string; path: string }>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      routes: null,
      isAuthenticated: false,
      setAuth: (user, routes) => set({ user, routes, isAuthenticated: true }),
      logout: () => set({ user: null, routes: null, isAuthenticated: false }),
    }),
    { 
      name: 'spybee-auth-storage',
    }
  )
);
