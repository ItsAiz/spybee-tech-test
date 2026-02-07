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
  if (isVerifying || !isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div className="spinner" /> 
      </div>
    );
  }
  return <>{children}</>;
};