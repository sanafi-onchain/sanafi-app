import { 
  DynamicContextProvider as DynamicProvider,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { createContext, useContext, ReactNode, useCallback, useEffect, useState } from "react";

// Create context for Dynamic
interface DynamicAuthContextType {
  isReady: boolean;
  isAuthenticated: boolean;
  user: any;
  login: () => void;
  logout: () => void;
  walletAddress: string | null;
  walletConnected: boolean;
}

const DynamicAuthContext = createContext<DynamicAuthContextType | undefined>(undefined);

// Inner provider component that uses the Dynamic hooks
const DynamicAuthProviderInner = ({ children }: { children: ReactNode }) => {
  const { 
    isAuthenticated, 
    primaryWallet, 
    user, 
    handleLogOut, 
    showAuthFlow, 
    sdkHasLoaded,
  } = useDynamicContext();
  
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);

  // Handle wallet connection
  const updateWalletInfo = useCallback(() => {
    if (!sdkHasLoaded || !isAuthenticated) {
      setWalletAddress(null);
      setWalletConnected(false);
      return;
    }

    // Check for wallet
    if (primaryWallet?.address) {
      setWalletAddress(primaryWallet.address);
      setWalletConnected(true);
    } else {
      setWalletAddress(null);
      setWalletConnected(false);
    }
  }, [sdkHasLoaded, isAuthenticated, primaryWallet]);

  // Update wallet info when user changes
  useEffect(() => {
    if (sdkHasLoaded) {
      updateWalletInfo();
    }
  }, [sdkHasLoaded, primaryWallet, updateWalletInfo]);

  // Login function
  const login = useCallback(() => {
    showAuthFlow();
  }, [showAuthFlow]);

  // Logout function
  const logout = useCallback(() => {
    handleLogOut();
  }, [handleLogOut]);

  // Create the context value
  const value = {
    isReady: sdkHasLoaded,
    isAuthenticated,
    user,
    login,
    logout,
    walletAddress,
    walletConnected,
  };

  return <DynamicAuthContext.Provider value={value}>{children}</DynamicAuthContext.Provider>;
};

// Hook for using the Dynamic context
export const useDynamicAuth = () => {
  const context = useContext(DynamicAuthContext);
  if (context === undefined) {
    throw new Error("useDynamicAuth must be used within a DynamicAuthProvider");
  }
  return context;
};

// Provider component for Dynamic authentication
export const DynamicAuthProvider = ({ children }: { children: ReactNode }) => {
  const environmentId = "f121dc24-0c0a-407d-b521-08824fcea909"; // Using the provided environmentId

  return (
    <DynamicProvider
      settings={{
        environmentId,
        walletConnectors: [SolanaWalletConnectors],
        appLogoUrl: "https://i.ibb.co/S3nLhGD/sanafi-logo.png",
        appName: "Sanafi",
        walletsFilter: {
          solana: (wallets) => 
            wallets.filter((wallet) => 
              ["Phantom", "Solflare"].includes(wallet.name)
            ),
        },
      }}
    >
      <DynamicAuthProviderInner>{children}</DynamicAuthProviderInner>
    </DynamicProvider>
  );
};