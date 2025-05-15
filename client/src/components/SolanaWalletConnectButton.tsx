import { FC, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, ArrowRight } from 'lucide-react';
import { usePrivyAuth } from '@/contexts/PrivyContext';

interface SolanaWalletConnectButtonProps {
  variant?: 'default' | 'outline';
  className?: string;
}

/**
 * Button component for connecting a Solana wallet
 * Uses Privy's wallet integration to handle connections
 * Styled according to Sanafi brand guidelines
 */
export const SolanaWalletConnectButton: FC<SolanaWalletConnectButtonProps> = ({ 
  variant = 'outline',
  className = ''
}) => {
  const { 
    walletAddress, 
    walletConnected, 
    connectWallet, 
    logout, 
    isReady, 
    isAuthenticated,
    user
  } = usePrivyAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Handle wallet connection via Privy
  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      await connectWallet();
    } catch (error) {
      console.error("Failed to connect wallet via Privy:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle wallet disconnection
  const handleDisconnect = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  // Custom button styling for Sanafi brand
  const baseButtonClass = `flex items-center justify-center gap-2 font-medium transition-all ${className}`;
  
  const getButtonStyles = () => {
    if (variant === 'default') {
      return `${baseButtonClass} bg-[#1b4d3e] hover:bg-[#1b4d3e]/90 text-[#e9e1ca] shadow-md`;
    }
    return `${baseButtonClass} border-2 border-[#1b4d3e] text-[#1b4d3e] hover:bg-[#1b4d3e]/10 shadow-sm`;
  };

  // Determine button label based on connection state
  const getButtonLabel = () => {
    if (isConnecting) return 'Connecting...';
    if (walletConnected && walletAddress) {
      const displayAddress = `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;
      return `Connected: ${displayAddress}`;
    }
    return 'Connect Wallet';
  };

  // If already connected, show the connected state with option to disconnect
  if (walletConnected && walletAddress) {
    return (
      <Button
        variant={variant}
        className={getButtonStyles()}
        onClick={handleDisconnect}
      >
        <Wallet className="h-5 w-5 mr-1" />
        {getButtonLabel()}
        <LogOut className="h-4 w-4 ml-1" />
      </Button>
    );
  }

  // If not connected, show connect button that uses Privy's wallet modal
  return (
    <Button 
      variant={variant} 
      className={getButtonStyles()}
      disabled={isConnecting || !isReady}
      onClick={handleConnectWallet}
    >
      <Wallet className="h-5 w-5" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      <ArrowRight className="h-4 w-4 ml-1" />
    </Button>
  );
};