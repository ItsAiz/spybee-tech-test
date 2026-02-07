import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/data/store/useAuthStore';

export const useRouteGuard = () => {
  const { routes, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      if (pathname !== '/' && pathname !== '/register') {
        router.push('/');
      }
      return;
    }
    if (routes) {
      const isAllowed = routes.some((r) => pathname.startsWith(r.path));
      if (!isAllowed || pathname === '/') {
        const defaultPath = routes[0]?.path || '/projects';
        router.push(defaultPath);
      }
    }
  }, [pathname, routes, isAuthenticated, router]);

  return { isAuthenticated, isVerifying: isAuthenticated && !routes };
};
