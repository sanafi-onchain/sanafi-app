
import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { usePrivyAuth } from '@/contexts/PrivyContext';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [, navigate] = useLocation();
  const { isAuthenticated, isReady } = usePrivyAuth();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (isReady && !isAuthenticated && !hasChecked) {
      setHasChecked(true);
      navigate('/signin');
    }
  }, [isReady, isAuthenticated, navigate, hasChecked]);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
}
