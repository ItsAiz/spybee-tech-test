import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/data/store/useAuthStore';

export const useRouteGuard = () => {
  const { routes, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isPublicRoute = pathname === '/' || pathname === '/register';
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (!isAuthenticated && !token) {
        if (!isPublicRoute) {
          router.replace('/');
        }
      }
      else if (isAuthenticated && routes && routes.length > 0) {
        const isAllowed = routes.some((r) => pathname.startsWith(r.path));
        if (!isAllowed || pathname === '/') {
          const defaultPath = routes[0]?.path || '/projects';
          router.replace(defaultPath);
        }
      }
      setIsHydrating(false);
    };

    checkAuth();
  }, [pathname, routes, isAuthenticated, router]);

  return { 
    isAuthenticated,
    isVerifying: isHydrating || (isAuthenticated && !routes) 
  };
};
