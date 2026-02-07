'use client';

import { AuthWrapper } from './AuthWrapper';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthWrapper>
      {children}
    </AuthWrapper>
  );
};
