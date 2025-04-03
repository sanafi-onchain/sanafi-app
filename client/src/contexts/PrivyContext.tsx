
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { createContext, useContext, ReactNode, useEffect, useState } from "react";

interface PrivyContextType {
  isReady: boolean;
  isAuthenticated: boolean;
  user: any;
  login: () => void;
  logout: () => void;
  connectWallet: () => void;
  walletAddress: string | null;
  walletBalance: string | null;
  walletConnected: boolean;
}

const PrivyContext = createContext<PrivyContextType | undefined>(undefined);

export const usePrivyAuth = () => {
  const context = useContext(PrivyContext);
  if (context === undefined) {
    throw new Error("usePrivyAuth must be used within a PrivyAuthProvider");
  }
  return context;
};

export const PrivyAuthProvider = ({ children }: { children: ReactNode }) => {
  const [appId, setAppId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        const data = await response.json();
        setAppId(data?.privy?.appId || "clte20i1200psmn0fapdi5k6w");
      } catch (err) {
        console.error("Failed to fetch config:", err);
        setAppId("clte20i1200psmn0fapdi5k6w");
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading authentication...</div>;
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ['wallet', 'email'],
        appearance: {
          theme: 'light',
          accentColor: '#2E7D32',
          logo: 'https://assets.replit.com/images/icons/icon-512x512.png',
        },
        embeddedWallets: {
          noPrompt: true,
          createOnLogin: true,
        },
        defaultChain: 'solana:mainnet',
        supportedChains: ['solana:mainnet', 'solana:devnet'],
        wallets: {
          solana: {
            enablePreferredWallet: true,
            wallets: ['phantom', 'backpack', 'solflare'],
          }
        }
      }}
    >
      <PrivyProviderInner>{children}</PrivyProviderInner>
    </PrivyProvider>
  );
};

const PrivyProviderInner = ({ children }: { children: ReactNode }) => {
  const privy = usePrivy();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);

  useEffect(() => {
    if (privy.ready && privy.user?.wallet?.address) {
      setWalletAddress(privy.user.wallet.address);
      setWalletConnected(true);
      setWalletBalance("0.00");
    } else {
      setWalletAddress(null);
      setWalletBalance(null);
      setWalletConnected(false);
    }
  }, [privy.ready, privy.user]);

  const value = {
    isReady: privy.ready,
    isAuthenticated: privy.authenticated,
    user: privy.user,
    login: privy.login,
    logout: privy.logout,
    connectWallet: privy.connectWallet,
    walletAddress,
    walletBalance,
    walletConnected,
  };

  return <PrivyContext.Provider value={value}>{children}</PrivyContext.Provider>;
};
