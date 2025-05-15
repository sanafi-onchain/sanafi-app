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

interface WalletConnectModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WalletConnectModal({ open, onClose }: WalletConnectModalProps) {
  const { connectWallet, wallet } = useWallet();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Close modal if wallet gets connected
  useEffect(() => {
    if (wallet?.isConnected && open) {
      onClose();
      toast({
        title: t("Wallet Connected"),
        description: t("Your wallet has been connected successfully."),
      });
    }
  }, [wallet?.isConnected, open, onClose, toast, t]);
  
  const handleConnect = async (provider: string) => {
    try {
      await connectWallet(provider);
    } catch (error) {
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
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Sign in to access Sanafi's AI-Driven Ethical Onchain Banking.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          <Button 
            variant="outline" 
            className="w-full justify-between" 
            onClick={() => handleConnect("privy")}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 mr-3 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">P</span>
              </div>
              <span>{t("Connect with Privy")}</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-between" 
            onClick={() => handleConnect("phantom")}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 mr-3 flex-shrink-0 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">Ph</span>
              </div>
              <span>{t("Phantom Wallet")}</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-between" 
            onClick={() => handleConnect("solflare")}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 mr-3 flex-shrink-0 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">SF</span>
              </div>
              <span>{t("Solflare Wallet")}</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="pt-4 border-t text-center">
          <p className="text-sm text-muted-foreground">{t("New to Solana and crypto wallets?")}</p>
          <Button variant="link" className="text-secondary">
            {t("Learn how to set up a wallet")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
