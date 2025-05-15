import { FC, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, ArrowRight } from 'lucide-react';

interface SolanaWalletConnectButtonProps {
  variant?: 'default' | 'outline';
  className?: string;
}

/**
 * Button component for connecting a Solana wallet
 * Uses direct Solana wallet connections (Phantom, Solflare)
 * Styled according to Sanafi brand guidelines
 */
export const SolanaWalletConnectButton: FC<SolanaWalletConnectButtonProps> = ({ 
  variant = 'outline',
  className = ''
}) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Check for existing wallet connections on mount
  useEffect(() => {
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

  // Connect to any available wallet
  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      // Try Phantom first
      // @ts-ignore - window.solana is injected by Phantom
      if (window.solana?.isPhantom) {
        const response = await window.solana.connect();
        setPublicKey(response.publicKey.toString());
        setConnected(true);
        console.log('Connected to Phantom wallet:', response.publicKey.toString());
        return;
      }
      
      // Try Solflare next
      // @ts-ignore - window.solflare is injected by Solflare
      if (window.solflare?.isSolflare) {
        const response = await window.solflare.connect();
        setPublicKey(response.publicKey.toString());
        setConnected(true);
        console.log('Connected to Solflare wallet:', response.publicKey.toString());
        return;
      }
      
      // No wallet available
      alert('Please install Phantom or Solflare wallet to continue');
      window.open('https://phantom.app/', '_blank');
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const handleDisconnect = async () => {
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
    if (connected && publicKey) {
      return `Connected: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
    }
    return 'Connect Wallet';
  };

  // If already connected, show the connected state with option to disconnect
  if (connected && publicKey) {
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

  // If not connected, show connect button
  return (
    <Button 
      variant={variant} 
      className={getButtonStyles()}
      disabled={isConnecting}
      onClick={handleConnectWallet}
    >
      <Wallet className="h-5 w-5" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      <ArrowRight className="h-4 w-4 ml-1" />
    </Button>
  );
};