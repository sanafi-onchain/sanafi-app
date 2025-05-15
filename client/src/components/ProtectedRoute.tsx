
import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { usePrivyAuth } from '@/contexts/PrivyContext';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { isAuthenticated, isReady } = usePrivyAuth();
  const [redirected, setRedirected] = useState<boolean>(false);

  // Break the potential recursive cycle by using a state flag and setTimeout
  useEffect(() => {
    // Skip if we've already redirected or if not at a protected route
    if (redirected || location === '/signin' || location === '/learn') return;
    
    // Only run the redirection once we know authentication status
    if (isReady && !isAuthenticated) {
      setRedirected(true);
      
      // Use timeout to ensure this happens outside of the current render cycle
      setTimeout(() => {
        window.location.href = '/signin'; // Direct location change to avoid wouter issues
      }, 100);
    }
  }, [isReady, isAuthenticated, location, redirected]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  // Only render children if authenticated, otherwise show loading while redirect happens
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-primary">Redirecting to login...</div>
      </div>
    );
  }
}
