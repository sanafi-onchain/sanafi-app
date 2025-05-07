
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { usePrivyAuth } from '@/contexts/PrivyContext';
import { useSolanaWallet } from '@/contexts/SolanaWalletProvider';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [location, navigate] = useLocation();
  const { isAuthenticated, isReady } = usePrivyAuth();
  const { connected } = useSolanaWallet();
  
  // Either Privy or direct Solana wallet connection is enough for authentication
  const isUserAuthenticated = isAuthenticated || connected;

  // Only redirect if not at signin and not authenticated
  useEffect(() => {
    if (isReady && !isUserAuthenticated && location !== '/signin') {
      navigate('/signin');
    }
  }, [isReady, isUserAuthenticated, navigate, location]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1b4d3e] mx-auto"></div>
          <p className="mt-4 text-[#1b4d3e]">Loading...</p>
        </div>
      </div>
    );
  }

  return isUserAuthenticated ? <>{children}</> : null;
}
