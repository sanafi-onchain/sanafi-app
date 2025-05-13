import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { createContext, useContext, ReactNode, useCallback, useEffect, useState, useMemo } from "react";

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

// Inner provider component that uses the Privy hooks
const PrivyAuthProviderInner = ({ children }: { children: ReactNode }) => {
  const privy = usePrivy();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletProvider, setWalletProvider] = useState<string | null>(null);

  // Initialize Privy state
  useEffect(() => {
    const initPrivy = async () => {
      try {
        if (!privy) return;

        // Check if user is authenticated
        const authenticated = await privy.isAuthenticated();
        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          const userData = await privy.getUser();
          setUser(userData);
          
          // Check for Solana wallets
          const wallets = await privy.getWallets();
          const solanaWallet = wallets.find(w => w.chain === 'solana');
          
          if (solanaWallet) {
            setWalletAddress(solanaWallet.address);
            setWalletConnected(true);
            setWalletProvider(solanaWallet.walletClientType || 'solana');
            setWalletBalance('0.00'); // Would fetch real balance in production
          }
        }
        
        setIsReady(true);
      } catch (error) {
        console.error('Error initializing Privy:', error);
        setIsReady(true); // Still mark as ready so UI can show error state
      }
    };
    
    initPrivy();
  }, [privy]);

  // Login function
  const login = useCallback(async (options?: any) => {
    if (!privy) return;
    try {
      await privy.login(options);
      setIsAuthenticated(true);
      const userData = await privy.getUser();
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
    }
  }, [privy]);

  // Logout function
  const logout = useCallback(async () => {
    if (!privy) return;
    try {
      await privy.logout();
      setIsAuthenticated(false);
      setUser(null);
      setWalletAddress(null);
      setWalletBalance(null);
      setWalletConnected(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [privy]);

  // Connect wallet function
  const connectWallet = useCallback(async (walletType?: string) => {
    if (!privy) return;
    try {
      // We would customize this based on wallet type in production
      await privy.connectWallet();
      
      // Refresh user data after wallet connection
      const userData = await privy.getUser();
      setUser(userData);
      
      // Check for newly connected wallet
      const wallets = await privy.getWallets();
      const solanaWallet = wallets.find(w => w.chain === 'solana');
      
      if (solanaWallet) {
        setWalletAddress(solanaWallet.address);
        setWalletConnected(true);
        setWalletProvider(solanaWallet.walletClientType || 'solana');
        setWalletBalance('0.00');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  }, [privy]);

  // Create the context value
  const value = {
    isReady,
    isAuthenticated,
    user,
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

// Hook for using the Privy context
export const usePrivyAuth = () => {
  const context = useContext(PrivyContext);
  if (context === undefined) {
    throw new Error("usePrivyAuth must be used within a PrivyAuthProvider");
  }
  return context;
};

// Provider component for Privy authentication
export const PrivyAuthProvider = ({ children }: { children: ReactNode }) => {
  const [appId, setAppId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch configuration from the server
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        if (!response.ok) {
          throw new Error(`Config API error: ${response.status}`);
        }
        const data = await response.json();
        if (data?.privy?.appId) {
          setAppId(data.privy.appId);
        } else {
          // Fallback for development
          setAppId("clte20i1200psmn0fapdi5k6w");
          console.warn("Using fallback Privy App ID for development");
        }
      } catch (err) {
        console.error("Failed to fetch config:", err);
        setError("Failed to load authentication configuration");
        // Fallback for development
        setAppId("clte20i1200psmn0fapdi5k6w");
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  // Show loading state while fetching config
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading authentication...</div>;
  }

  // Show error if config fetch failed
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
          logo: 'https://i.ibb.co/S3nLhGD/sanafi-logo.png', // Simple hosted placeholder - update with real logo
        }
      } as PrivyConfigType}
    >
      <PrivyAuthProviderInner>{children}</PrivyAuthProviderInner>
    </PrivyProvider>
  );
};