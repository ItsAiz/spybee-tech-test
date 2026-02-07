import { useRouteGuard } from '@/shared/domain/hooks/useRouteGuard';
import { usePathname } from 'next/navigation';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { isAuthenticated, isVerifying } = useRouteGuard();
  const pathname = usePathname();

  const isPublicRoute = pathname === '/' || pathname === '/register';

  if (isPublicRoute) {
    return <>{children}</>;
  }
  if (isVerifying) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" /> 
      </div>
    );
  }
  if (!isAuthenticated) {
    return null; 
  }

  return <>{children}</>;
};