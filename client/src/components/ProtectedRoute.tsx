
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { usePrivyAuth } from '@/contexts/PrivyContext';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [, navigate] = useLocation();
  const { isAuthenticated, isReady } = usePrivyAuth();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      navigate('/signin');
    }
  }, [isReady, isAuthenticated, navigate]);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
}
