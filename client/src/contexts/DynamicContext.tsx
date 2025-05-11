import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// This is a temporary implementation to prepare for Dynamic.xyz integration
// This will be replaced with actual Dynamic SDK integration when packages are available

// Wallet connection types for simulating different connection methods
export type WalletType = 'phantom' | 'solflare' | 'backpack' | 'slope' | 'ledger' | 'torus' | 'email';

interface DynamicAuthContextType {
  user: {
    id: string;
    email?: string;
    walletAddress: string;
    walletType?: WalletType;
    displayName?: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isReady: boolean;
  walletConnected: boolean;
  walletAddress: string | null;
  login: (walletType?: WalletType) => Promise<void>;
  logout: () => void;
  error: string | null;
  connectWallet: (walletType: WalletType) => Promise<void>;
  walletType: WalletType | null;
}

const DynamicAuthContext = createContext<DynamicAuthContextType | undefined>(undefined);

interface DynamicAuthProviderProps {
  children: ReactNode;
}

// Sample Solana addresses for simulation
const SAMPLE_SOLANA_ADDRESSES = [
  'HeKscByPYF9ScqJVVJqymPY4hgHiyPp1VxuiYABvEBrV',
  '5K1XNrwNhUJwKP1TzZa5bGBYS4WNmRwKWowoLZpWwjQm',
  'BK8tYaVYprVYPEqGh7Y9BkqBqQnYLKRK2G9sSggX3yru',
  'DR4Ug1TAxD5eVfEX14r6K4G8LNSL4oq2ERbXHuKMJhJM',
  '9gkLJQZeQrXVMzieEcPj95VD5tv1PWdkuiDfrLRyQAzn'
];

export const DynamicAuthProvider = ({ children }: DynamicAuthProviderProps) => {
  const [user, setUser] = useState<DynamicAuthContextType['user']>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<WalletType | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if the user was previously logged in (from localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Set a small delay to simulate network request
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const storedUser = localStorage.getItem('sanafiUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          if (parsedUser.walletAddress) {
            setWalletAddress(parsedUser.walletAddress);
            setWalletConnected(true);
            setWalletType(parsedUser.walletType || 'phantom');
          }
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
        setError('Failed to retrieve authentication status');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Connect a specific wallet type
  const connectWallet = async (type: WalletType): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate wallet connection delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate a random wallet address or use a sample one for more realism
      const walletAddress = type === 'email' 
        ? `${generateRandomHex(32)}`
        : SAMPLE_SOLANA_ADDRESSES[Math.floor(Math.random() * SAMPLE_SOLANA_ADDRESSES.length)];
      
      // Create display name based on wallet type
      const displayName = type === 'email' 
        ? 'user@example.com' 
        : `${type.charAt(0).toUpperCase() + type.slice(1)} User`;
      
      // Create the user with proper type annotations
      const newUser: {
        id: string;
        walletAddress: string;
        walletType: WalletType;
        displayName: string;
        email?: string;
      } = {
        id: `user_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`,
        walletAddress,
        walletType: type,
        displayName
      };
      
      // Add email if it's an email login
      if (type === 'email') {
        newUser.email = 'user@example.com';
      }
      
      // Store user in localStorage for persistence
      localStorage.setItem('sanafiUser', JSON.stringify(newUser));
      
      // Update state
      setUser(newUser);
      setWalletAddress(walletAddress);
      setWalletConnected(true);
      setWalletType(type);
      
      return Promise.resolve();
    } catch (err) {
      console.error(`Error connecting ${type} wallet:`, err);
      setError(`Failed to connect ${type} wallet. Please try again.`);
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function - simulates Dynamic.xyz login until we can integrate the actual SDK
  // Uses the default wallet type if none specified
  const login = async (type: WalletType = 'phantom'): Promise<void> => {
    return connectWallet(type);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('sanafiUser');
    setUser(null);
    setWalletAddress(null);
    setWalletConnected(false);
    setWalletType(null);
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

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isReady: !isLoading, // isReady is the opposite of isLoading
    walletConnected,
    walletAddress,
    walletType,
    login,
    logout,
    error,
    connectWallet
  };

  return (
    <DynamicAuthContext.Provider value={value}>
      {children}
    </DynamicAuthContext.Provider>
  );
};

export const useDynamicAuth = () => {
  const context = useContext(DynamicAuthContext);
  if (context === undefined) {
    throw new Error('useDynamicAuth must be used within a DynamicAuthProvider');
  }
  return context;
};