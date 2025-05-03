import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { createContext, useContext, ReactNode, useCallback, useEffect, useState } from "react";

// Create context for Privy
interface PrivyContextType {
  isReady: boolean;
  isAuthenticated: boolean;
  user: any;
  login: (options?: any) => void;
  logout: () => void;
  connectWallet: () => void;
  walletAddress: string | null;
  walletBalance: string | null;
  walletConnected: boolean;
}

const PrivyContext = createContext<PrivyContextType | undefined>(undefined);

// Inner provider component that uses the Privy hooks
const PrivyAuthProviderInner = ({ children }: { children: ReactNode }) => {
  const privy = usePrivy();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);

  // Handle wallet connection
  const updateWalletInfo = useCallback(async () => {
    if (!privy.ready || !privy.authenticated) {
      setWalletAddress(null);
      setWalletBalance(null);
      setWalletConnected(false);
      return;
    }

    // Check for wallet
    if (privy.user?.wallet?.address) {
      setWalletAddress(privy.user.wallet.address);
      setWalletConnected(true);
      setWalletBalance("0.00"); // Placeholder
    } else {
      setWalletAddress(null);
      setWalletBalance(null);
      setWalletConnected(false);
    }
  }, [privy.ready, privy.authenticated, privy.user]);

  // Update wallet info when user changes
  useEffect(() => {
    if (privy.ready) {
      updateWalletInfo();
    }
  }, [privy.ready, privy.user, updateWalletInfo]);

  // Login function
  const login = useCallback((options?: any) => {
    privy.login(options);
  }, [privy]);

  // Logout function
  const logout = useCallback(() => {
    privy.logout();
  }, [privy]);

  // Connect wallet function
  const connectWallet = useCallback(() => {
    privy.connectWallet();
  }, [privy]);

  // Create the context value
  const value = {
    isReady: privy.ready,
    isAuthenticated: privy.authenticated,
    user: privy.user,
    login,
    logout,
    connectWallet,
    walletAddress,
    walletBalance,
    walletConnected,
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
      }}
    >
      <PrivyAuthProviderInner>{children}</PrivyAuthProviderInner>
    </PrivyProvider>
  );
};