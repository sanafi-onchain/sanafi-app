import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { LinkIcon, CheckCircle, LogOut, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WalletConnectButtonProps {
  onClick: () => void;
}

export default function WalletConnectButton({ onClick }: WalletConnectButtonProps) {
  const { wallet, disconnectWallet } = useWallet();
  const { t } = useLanguage();
  
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (wallet?.isConnected && wallet.address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
            <span>{truncateAddress(wallet.address)}</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onClick}>
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>{t("Wallet Details")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={disconnectWallet} className="text-destructive focus:text-destructive">
            <LogOut className="h-4 w-4 mr-2" />
            <span>{t("Sign Out")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // No sign in button shown when not connected
  return null;
}
