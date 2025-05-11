import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useDynamicAuth } from "./DynamicContext";

type WalletInfo = {
  address: string;
  isConnected: boolean;
  balance?: number;
};

type WalletContextType = {
  wallet: WalletInfo | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const { walletAddress, walletConnected, login, logout } = useDynamicAuth();

  // Update wallet information when Dynamic wallet changes
  useEffect(() => {
    if (walletConnected && walletAddress) {
      const walletInfo: WalletInfo = {
        address: walletAddress,
        isConnected: walletConnected,
        balance: 0, // This would be updated with a real balance fetch
      };
      
      setWallet(walletInfo);
      localStorage.setItem("sanafiWallet", JSON.stringify(walletInfo));
    } else {
      setWallet(null);
      localStorage.removeItem("sanafiWallet");
    }
  }, [walletConnected, walletAddress]);

  // Check for existing wallet connection on mount
  useEffect(() => {
    const storedWallet = localStorage.getItem("sanafiWallet");
    if (storedWallet && !wallet) {
      try {
        const parsed = JSON.parse(storedWallet);
        // Only set from localStorage if we don't have a Dynamic wallet
        if (!walletConnected) {
          setWallet(parsed);
        }
      } catch (error) {
        console.error("Failed to parse stored wallet:", error);
        localStorage.removeItem("sanafiWallet");
      }
    }
  }, [wallet, walletConnected]);

  // Connect wallet using Dynamic
  const connectWallet = async (): Promise<void> => {
    login();
  };
  
  // Disconnect wallet
  const disconnectWallet = (): void => {
    logout();
    setWallet(null);
    localStorage.removeItem("sanafiWallet");
  };

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

// Hook to use the wallet context
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};