import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { createContext, useContext, ReactNode, useCallback, useEffect, useState } from "react";

// Create context for Privy
interface PrivyContextType {
  isReady: boolean;
  isAuthenticated: boolean;
  user: any;
  login: (options?: any) => void;
  logout: () => void;
  connectWallet: (walletType?: string) => void;
  walletAddress: string | null;
  walletBalance: string | null;
  walletConnected: boolean;
  walletProvider: string | null;
}

const PrivyContext = createContext<PrivyContextType | undefined>(undefined);

// Direct Privy wrapper component
const PrivyAuthProviderInner = ({ children }: { children: ReactNode }) => {
  const privy = usePrivy();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletProvider, setWalletProvider] = useState<string | null>(null);

  // Update wallet info when user changes
  useEffect(() => {
    if (privy.ready && privy.authenticated && privy.user) {
      // Check for any wallet that might be connected
      if (privy.user.wallet?.address) {
        setWalletAddress(privy.user.wallet.address);
        setWalletConnected(true);
        setWalletProvider("solana");
        setWalletBalance("0.00"); // Placeholder
      } else {
        setWalletAddress(null);
        setWalletConnected(false);
        setWalletProvider(null);
        setWalletBalance(null);
      }
    } else {
      // Reset wallet if not authenticated
      setWalletAddress(null);
      setWalletConnected(false);
      setWalletProvider(null);
      setWalletBalance(null);
    }
  }, [privy.ready, privy.authenticated, privy.user]);

  // Simple wrapper functions to match our interface
  const login = useCallback((options?: any) => {
    privy.login(options);
  }, [privy]);

  const logout = useCallback(() => {
    privy.logout();
  }, [privy]);

  const connectWallet = useCallback((walletType?: string) => {
    privy.connectWallet();
  }, [privy]);

  // Create the context value
  const value: PrivyContextType = {
    isReady: privy.ready,
    isAuthenticated: privy.authenticated,
    user: privy.user,
    login,
    logout,
    connectWallet,
    walletAddress,
    walletBalance,
    walletConnected,
    walletProvider,
  };

  return <PrivyContext.Provider value={value}>{children}</PrivyContext.Provider>;
};

// Hook to use Privy
export const usePrivyAuth = () => {
  const context = useContext(PrivyContext);
  if (context === undefined) {
    throw new Error('usePrivyAuth must be used within a PrivyAuthProvider');
  }
  return context;
};

// Provider component with all the setup
export const PrivyAuthProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);
  const [appId, setAppId] = useState<string>('');
  
  // Fetch Privy configuration from the backend
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        if (!response.ok) {
          throw new Error('Failed to load configuration');
        }
        
        const data = await response.json();
        if (!data.privy?.appId) {
          throw new Error('Privy App ID not found in configuration');
        }
        
        setAppId(data.privy.appId);
      } catch (err: any) {
        console.error('Error loading Privy configuration:', err);
        setError(err.message || 'Failed to load Privy configuration');
      }
    };
    
    fetchConfig();
  }, []);
  
  // Don't render anything until we have the app ID
  if (!appId && !error) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#1b4d3e',
          logo: 'https://i.ibb.co/S3nLhGD/sanafi-logo.png',
        }
      }}
    >
      <PrivyAuthProviderInner>{children}</PrivyAuthProviderInner>
    </PrivyProvider>
  );
};