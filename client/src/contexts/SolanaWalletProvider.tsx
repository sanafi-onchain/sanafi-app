import { FC, ReactNode, createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Connection } from '@solana/web3.js';

// Define the type of data stored in context
interface SolanaWalletContextType {
  connected: boolean;
  publicKey: string | null;
  connectPhantom: () => Promise<void>;
  connectSolflare: () => Promise<void>;
  disconnect: () => void;
}

// Create context with default values
const SolanaWalletContext = createContext<SolanaWalletContextType>({
  connected: false,
  publicKey: null,
  connectPhantom: async () => {},
  connectSolflare: async () => {},
  disconnect: () => {},
});

// Hook to use the Solana wallet context
export const useSolanaWallet = () => useContext(SolanaWalletContext);

interface SolanaWalletProviderProps {
  children: ReactNode;
}

/**
 * Simplified Solana wallet provider that uses browser window.solana
 */
export const SolanaWalletProvider: FC<SolanaWalletProviderProps> = ({ children }) => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  // Check for existing wallet connections on mount
  useEffect(() => {
    // Check if window.solana (Phantom) exists
    const checkPhantomConnection = async () => {
      try {
        // @ts-ignore - window.solana is injected by Phantom
        const provider = window.solana;
        if (provider?.isPhantom) {
          // Try to reconnect if already authorized
          const response = await provider.connect({ onlyIfTrusted: true });
          setPublicKey(response.publicKey.toString());
          setConnected(true);
          console.log('Phantom wallet auto-connected:', response.publicKey.toString());
        }
      } catch (error) {
        console.log('Auto-connect error or user has not authorized yet:', error);
      }
    };

    // Check if window.solflare exists
    const checkSolflareConnection = async () => {
      try {
        // @ts-ignore - window.solflare is injected by Solflare
        const provider = window.solflare;
        if (provider?.isSolflare) {
          // Try to reconnect if already authorized
          const response = await provider.connect({ onlyIfTrusted: true });
          setPublicKey(response.publicKey.toString());
          setConnected(true);
          console.log('Solflare wallet auto-connected:', response.publicKey.toString());
        }
      } catch (error) {
        console.log('Solflare auto-connect error or user has not authorized yet:', error);
      }
    };

    checkPhantomConnection();
    checkSolflareConnection();
  }, []);

  // Connect to Phantom wallet
  const connectPhantom = async () => {
    try {
      // @ts-ignore - window.solana is injected by Phantom
      const provider = window.solana;
      if (!provider?.isPhantom) {
        window.open('https://phantom.app/', '_blank');
        return;
      }

      // Connect
      const response = await provider.connect();
      setPublicKey(response.publicKey.toString());
      setConnected(true);
      console.log('Connected to Phantom wallet:', response.publicKey.toString());
    } catch (error) {
      console.error('Error connecting to Phantom wallet:', error);
    }
  };

  // Connect to Solflare wallet
  const connectSolflare = async () => {
    try {
      // @ts-ignore - window.solflare is injected by Solflare
      const provider = window.solflare;
      if (!provider?.isSolflare) {
        window.open('https://solflare.com/', '_blank');
        return;
      }

      // Connect
      const response = await provider.connect();
      setPublicKey(response.publicKey.toString());
      setConnected(true);
      console.log('Connected to Solflare wallet:', response.publicKey.toString());
    } catch (error) {
      console.error('Error connecting to Solflare wallet:', error);
    }
  };

  // Disconnect
  const disconnect = useCallback(async () => {
    try {
      // @ts-ignore - window.solana is injected by Phantom
      if (window.solana?.isPhantom) {
        await window.solana.disconnect();
      }
      // @ts-ignore - window.solflare is injected by Solflare
      if (window.solflare?.isSolflare) {
        await window.solflare.disconnect();
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    } finally {
      setPublicKey(null);
      setConnected(false);
    }
  }, []);

  return (
    <SolanaWalletContext.Provider
      value={{
        connected,
        publicKey,
        connectPhantom,
        connectSolflare,
        disconnect,
      }}
    >
      {children}
    </SolanaWalletContext.Provider>
  );
};