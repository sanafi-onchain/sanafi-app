
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { usePrivyAuth } from '@/contexts/PrivyContext';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [location, navigate] = useLocation();
  const { isAuthenticated, isReady } = usePrivyAuth();

  useEffect(() => {
    // Only redirect if we're ready to determine auth state and user is not authenticated
    // and we're not already on the signin page
    if (isReady && !isAuthenticated && location !== '/signin') {
      // Use replace instead of push to avoid adding to history stack
      window.history.replaceState(null, '', '/signin');
      navigate('/signin', { replace: true });
    }
  }, [isReady, isAuthenticated, navigate, location]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
