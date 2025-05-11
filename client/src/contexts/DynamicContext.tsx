import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// This is a temporary implementation to prepare for Dynamic.xyz integration
// This will be replaced with actual Dynamic SDK integration when packages are available

interface DynamicAuthContextType {
  user: {
    id: string;
    email?: string;
    walletAddress?: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isReady: boolean;
  walletConnected: boolean;
  walletAddress: string | null;
  login: () => void;
  logout: () => void;
  error: string | null;
}

const DynamicAuthContext = createContext<DynamicAuthContextType | undefined>(undefined);

interface DynamicAuthProviderProps {
  children: ReactNode;
}

export const DynamicAuthProvider = ({ children }: DynamicAuthProviderProps) => {
  const [user, setUser] = useState<DynamicAuthContextType['user']>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if the user was previously logged in (from localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('sanafiUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          if (parsedUser.walletAddress) {
            setWalletAddress(parsedUser.walletAddress);
            setWalletConnected(true);
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

  // Login function - simulates Dynamic.xyz login until we can integrate the actual SDK
  const login = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate login with wallet
      const mockUser = {
        id: `user_${Math.random().toString(36).substring(2, 11)}`,
        email: 'user@example.com',
        walletAddress: `${generateRandomHex(8)}...${generateRandomHex(8)}`
      };

      // Store the user in localStorage for persistence
      localStorage.setItem('sanafiUser', JSON.stringify(mockUser));

      // Update state
      setUser(mockUser);
      setWalletAddress(mockUser.walletAddress);
      setWalletConnected(true);
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('sanafiUser');
    setUser(null);
    setWalletAddress(null);
    setWalletConnected(false);
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
    login,
    logout,
    error
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