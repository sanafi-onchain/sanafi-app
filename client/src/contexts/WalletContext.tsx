import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";

type WalletInfo = {
  address: string;
  isConnected: boolean;
  balance?: number;
};

type WalletContextType = {
  wallet: WalletInfo | null;
  connectWallet: (provider: string) => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);

  // Check for existing wallet connection on mount
  useEffect(() => {
    const storedWallet = localStorage.getItem("taharaWallet");
    if (storedWallet) {
      try {
        const parsed = JSON.parse(storedWallet);
        setWallet(parsed);
      } catch (error) {
        console.error("Failed to parse stored wallet:", error);
        localStorage.removeItem("taharaWallet");
      }
    }
  }, []);

  // In a real application, this would use Privy.io or Solana wallet adapters
  // For now, we're simulating the connection
  const connectWallet = async (provider: string): Promise<void> => {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a mock wallet address
    const mockAddress = `${generateRandomHex(8)}...${generateRandomHex(8)}`;
    
    // Create wallet information
    const walletInfo: WalletInfo = {
      address: mockAddress,
      isConnected: true,
      balance: 5.2, // Mock balance
    };
    
    // In a real app, we would make an API call to register the wallet
    try {
      await apiRequest("POST", "/api/wallet/connect", {
        address: mockAddress,
        provider
      });
    } catch (error) {
      console.error("Error connecting wallet with API:", error);
      // Continue anyway since we're mocking
    }
    
    // Store wallet information
    setWallet(walletInfo);
    localStorage.setItem("taharaWallet", JSON.stringify(walletInfo));
  };
  
  const disconnectWallet = (): void => {
    setWallet(null);
    localStorage.removeItem("taharaWallet");
  };

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

// Helper function to generate a random hex string
function generateRandomHex(length: number): string {
  const characters = "0123456789abcdef";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Hook to use the wallet context
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
