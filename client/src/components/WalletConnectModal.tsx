import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronRight } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useSolanaWallet } from "@/contexts/SolanaWalletProvider";
import { usePrivyAuth } from "@/contexts/PrivyContext";

interface WalletConnectModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WalletConnectModal({ open, onClose }: WalletConnectModalProps) {
  const { wallet } = useWallet();
  const { t } = useLanguage();
  const { toast } = useToast();
  const { connectWallet: connectPrivy } = usePrivyAuth();
  const { 
    connectPhantom, 
    connectSolflare, 
    connected, 
    publicKey 
  } = useSolanaWallet();
  
  // Close modal if wallet gets connected
  useEffect(() => {
    if ((wallet?.isConnected || (connected && publicKey)) && open) {
      onClose();
      toast({
        title: t("Wallet Connected"),
        description: t("Your wallet has been connected successfully."),
      });
    }
  }, [wallet?.isConnected, connected, publicKey, open, onClose, toast, t]);
  
  const handleConnect = async (provider: string) => {
    try {
      if (provider === "privy") {
        await connectPrivy();
      } else if (provider === "phantom") {
        await connectPhantom();
      } else if (provider === "solflare") {
        await connectSolflare();
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast({
        variant: "destructive",
        title: t("Connection Failed"),
        description: t("Failed to connect wallet. Please try again."),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect</DialogTitle>
          <DialogDescription>
            Connect your wallet to access Sanafi's Sharia-compliant financial services.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          <Button 
            variant="outline" 
            className="w-full justify-between hover:bg-[#f5f0e5] border-[#e9e1ca]" 
            onClick={() => handleConnect("privy")}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 mr-3 flex-shrink-0 bg-[#627EEA] rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-xs">P</span>
              </div>
              <span className="text-[#1b4d3e] font-medium">{t("Connect with Privy")}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-[#1b4d3e]" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-between hover:bg-[#f5f0e5] border-[#e9e1ca]" 
            onClick={() => handleConnect("phantom")}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 mr-3 flex-shrink-0 bg-[#551DF0] rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M113.574 65.006C113.574 58.7094 108.739 53.7451 102.558 53.7451C99.6348 53.7451 96.9275 54.8402 94.9473 56.6854C87.0668 52.0154 77.4932 49.1824 66.9248 48.8363L72.4937 27.9502L87.6645 30.7832C87.7793 34.9977 91.1025 38.3174 95.2559 38.3174C99.4795 38.3174 102.899 34.8828 102.899 30.667C102.899 26.4512 99.4795 23.0166 95.2559 23.0166C92.2764 23.0166 89.6955 24.8057 88.5713 27.4596L71.9512 24.3643C71.1436 24.1914 70.3359 24.7073 70.1641 25.5112L63.9453 48.8363C53.1025 49.1263 43.4141 52.0154 35.5334 56.7416C33.5535 54.8402 30.7891 53.7451 27.9131 53.7451C21.7324 53.7451 16.8975 58.7094 16.8975 65.006C16.8975 69.8005 19.5479 73.9028 23.3467 75.6357C23.1748 76.7308 23.0029 77.8259 23.0029 78.9772C23.0029 95.1263 40.4346 108.25 61.8535 108.25C83.2725 108.25 100.704 95.1263 100.704 78.9772C100.704 77.8259 100.532 76.7869 100.36 75.6357C104.101 73.9028 106.752 69.8005 106.752 65.006H113.574ZM41.3193 73.066C41.3193 68.8503 44.7393 65.4158 48.9629 65.4158C53.1299 65.4158 56.5498 68.8503 56.5498 73.066C56.5498 77.2818 53.1299 80.7163 48.9629 80.7163C44.7393 80.7724 41.3193 77.2818 41.3193 73.066ZM78.0357 92.9121C72.7783 98.1592 62.0254 98.332 61.7969 98.332C61.5117 98.332 50.7588 98.1592 45.5576 92.9121C44.8643 92.2241 44.8643 91.0729 45.5576 90.3849C46.251 89.6968 47.3184 89.6968 48.0117 90.3849C51.3916 93.8194 58.9307 94.9705 61.7969 94.9705C64.6631 94.9705 72.2588 93.8194 75.5822 90.3849C76.2754 89.6968 77.3428 89.6968 78.0357 90.3849C78.6719 91.0729 78.6719 92.2241 78.0357 92.9121ZM74.7598 80.7724C70.5361 80.7724 67.1162 77.3379 67.1162 73.1221C67.1162 68.9063 70.5361 65.4718 74.7598 65.4718C78.9834 65.4718 82.4033 68.9063 82.4033 73.1221C82.4033 77.2818 78.9834 80.7724 74.7598 80.7724Z" fill="white"/>
                </svg>
              </div>
              <span className="text-[#1b4d3e] font-medium">{t("Phantom Wallet")}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-[#1b4d3e]" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-between hover:bg-[#f5f0e5] border-[#e9e1ca]" 
            onClick={() => handleConnect("solflare")}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 mr-3 flex-shrink-0 bg-[#FC822B] rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 0C24.8375 0 32 7.1625 32 16C32 24.8375 24.8375 32 16 32C7.1625 32 0 24.8375 0 16C0 7.1625 7.1625 0 16 0Z" fill="#FC822B"/>
                  <path d="M17.4 7.70001L21.55 7.80001L12.3625 17L10.45 15.075L17.4 7.70001Z" fill="white"/>
                  <path d="M25.8 12.2375L14.9875 23.05L10.2 18.25L12.1125 16.35L14.9875 19.225L23.8875 10.325L25.8 12.2375Z" fill="white"/>
                  <path d="M7.8501 15.075L9.7626 13.1625L11.6751 15.075L9.7626 16.9875L7.8501 15.075Z" fill="white"/>
                  <path d="M5.1625 12.975L7.075 11.0625L8.9875 12.975L7.075 14.8875L5.1625 12.975Z" fill="white"/>
                </svg>
              </div>
              <span className="text-[#1b4d3e] font-medium">{t("Solflare Wallet")}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-[#1b4d3e]" />
          </Button>
        </div>
        
        <div className="pt-4 border-t border-[#e9e1ca] text-center">
          <p className="text-sm text-[#1b4d3e]/80">{t("New to Solana and crypto wallets?")}</p>
          <a 
            href="https://solana.com/developers/guides/getstarted/setup-wallet" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="link" className="text-[#1b4d3e] font-medium hover:text-[#1b4d3e]/80">
              {t("Learn how to set up a wallet")}
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
