import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { LinkIcon, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WalletConnectButtonProps {
  onClick: () => void;
}

export default function WalletConnectButton({ onClick }: WalletConnectButtonProps) {
  const { wallet } = useWallet();
  const { t } = useLanguage();
  
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (wallet?.isConnected && wallet.address) {
    return (
      <Button variant="outline" onClick={onClick} className="flex items-center space-x-1">
        <CheckCircle className="h-4 w-4 mr-2 text-primary" />
        <span>{truncateAddress(wallet.address)}</span>
      </Button>
    );
  }

  return (
    <Button className="bg-primary hover:bg-primary/90" onClick={onClick}>
      <LinkIcon className="h-4 w-4 mr-2" />
      <span>{t("Connect Wallet")}</span>
    </Button>
  );
}
