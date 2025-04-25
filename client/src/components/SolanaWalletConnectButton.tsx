import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useSolanaWallet } from '@/contexts/SolanaWalletProvider';
import { usePrivyAuth } from '@/contexts/PrivyContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SolanaWalletConnectButtonProps {
  variant?: 'default' | 'outline';
  className?: string;
}

/**
 * Button component for connecting a Solana wallet
 * Uses both Privy and direct wallet integration
 */
export const SolanaWalletConnectButton: FC<SolanaWalletConnectButtonProps> = ({ 
  variant = 'outline',
  className = ''
}) => {
  const { publicKey, connected, connectPhantom, connectSolflare, disconnect } = useSolanaWallet();
  const { connectWallet, isReady, isAuthenticated } = usePrivyAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Determine the button label based on connection state
  const getButtonLabel = () => {
    if (isConnecting) return 'Connecting...';
    if (connected && publicKey) return `Connected: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
    return 'Connect Solana Wallet';
  };

  const handleConnectPhantom = async () => {
    setIsConnecting(true);
    try {
      await connectPhantom();
    } catch (error) {
      console.error("Failed to connect Phantom:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnectSolflare = async () => {
    setIsConnecting(true);
    try {
      await connectSolflare();
    } catch (error) {
      console.error("Failed to connect Solflare:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handlePrivyConnect = async () => {
    setIsConnecting(true);
    try {
      await connectWallet();
    } catch (error) {
      console.error("Failed to connect via Privy:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  // If already connected, show the connected state with option to disconnect
  if (connected && publicKey) {
    return (
      <Button
        variant={variant}
        className={`flex items-center justify-center gap-2 ${className}`}
        onClick={handleDisconnect}
      >
        <Wallet className="h-4 w-4" />
        {getButtonLabel()}
      </Button>
    );
  }

  // If not connected, show dropdown with wallet options
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          className={`flex items-center justify-center gap-2 ${className}`}
          disabled={isConnecting}
        >
          <Wallet className="h-4 w-4" />
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleConnectPhantom}>
          Connect with Phantom
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleConnectSolflare}>
          Connect with Solflare
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePrivyConnect}>
          Connect with Privy
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};