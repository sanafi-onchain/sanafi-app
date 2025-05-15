import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, PieChart, Search } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";

export default function QuickActions() {
  const { wallet } = useWallet();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [_, setLocation] = useLocation();
  
  const handleDepositFunds = () => {
    if (!wallet?.isConnected) {
      toast({
        title: "Not Signed In",
        description: "Please sign in first",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: t("Deposit Initiated"),
      description: t("Preparing deposit process...")
    });
    
    // In a real app, this would navigate to a deposit page or open a modal
    setLocation("/accounts");
  };
  
  const handleViewPortfolio = () => {
    setLocation("/investments");
  };
  
  const handleExploreInvestments = () => {
    setLocation("/investments");
  };

  return (
    <Card>
      <CardHeader className="border-b px-6 py-4">
        <CardTitle>{t("Quick Actions")}</CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-3">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-[#e9e1ca]" 
          onClick={handleDepositFunds}
        >
          <Plus className="h-4 w-4 mr-2" />
          <span className="text-[#e9e1ca]">{t("Deposit Funds")}</span>
        </Button>
        
        <Button 
          className="w-full bg-[#e9e1ca] hover:bg-[#e9e1ca]/90 text-[#1b4d3e]" 
          onClick={handleViewPortfolio}
        >
          <PieChart className="h-4 w-4 mr-2" />
          <span className="text-[#1b4d3e]">{t("View Portfolio")}</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full border-[#1b4d3e] text-[#1b4d3e] hover:bg-[#1b4d3e]/10" 
          onClick={handleExploreInvestments}
        >
          <Search className="h-4 w-4 mr-2" />
          <span className="text-[#1b4d3e]">{t("Explore Investments")}</span>
        </Button>
      </CardContent>
    </Card>
  );
}
