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
 * Styled according to Sanafi brand guidelines
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

  // Custom button styling for Sanafi brand
  const baseButtonClass = `flex items-center justify-center gap-2 font-medium transition-all ${className}`;
  
  const getButtonStyles = () => {
    if (variant === 'default') {
      return `${baseButtonClass} bg-[#1b4d3e] hover:bg-[#1b4d3e]/90 text-[#e9e1ca] shadow-md`;
    }
    return `${baseButtonClass} border-2 border-[#1b4d3e] text-[#1b4d3e] hover:bg-[#1b4d3e]/10 shadow-sm`;
  };

  // If already connected, show the connected state with option to disconnect
  if (connected && publicKey) {
    return (
      <Button
        variant={variant}
        className={getButtonStyles()}
        onClick={handleDisconnect}
      >
        <Wallet className="h-5 w-5" />
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
          className={getButtonStyles()}
          disabled={isConnecting}
        >
          <Wallet className="h-5 w-5" />
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-white border border-[#e9e1ca] shadow-md rounded-lg p-1"
      >
        <DropdownMenuItem 
          onClick={handleConnectPhantom}
          className="cursor-pointer hover:bg-[#f5f0e5] focus:bg-[#f5f0e5] rounded-md px-4 py-2 text-[#1b4d3e]"
        >
          Connect with Phantom
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleConnectSolflare}
          className="cursor-pointer hover:bg-[#f5f0e5] focus:bg-[#f5f0e5] rounded-md px-4 py-2 text-[#1b4d3e]"
        >
          Connect with Solflare
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handlePrivyConnect}
          className="cursor-pointer hover:bg-[#f5f0e5] focus:bg-[#f5f0e5] rounded-md px-4 py-2 text-[#1b4d3e]"
        >
          Connect with Privy
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};