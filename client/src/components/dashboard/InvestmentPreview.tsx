import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";
import { useQuery } from "@tanstack/react-query";

export default function InvestmentPreview() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { wallet } = useWallet();
  const [investAmount, setInvestAmount] = useState<string>("");
  
  const { data: featuredInvestments } = useQuery({
    queryKey: ["/api/investments/featured"],
    enabled: true // Always fetch data regardless of wallet connection
  });
  
  // These would come from API in a real app
  const mockInvestments = [
    {
      id: "1",
      name: "Real Estate Sukuk",
      description: "Sharia-compliant investment in commercial real estate properties.",
      compliant: "AAOIFI-Compliant",
      expectedReturn: "5.2%",
      riskLevel: "Low-Medium"
    },
    {
      id: "2",
      name: "Ethical Tech Fund",
      description: "Diversified portfolio of ethical technology companies.",
      compliant: "Sharia-Compliant",
      expectedReturn: "7.8%",
      riskLevel: "Medium"
    },
    {
      id: "3",
      name: "Halal SME Financing",
      description: "Support small businesses with Sharia-compliant financing.",
      compliant: "Mudarabah-Based",
      expectedReturn: "6.5%",
      riskLevel: "Medium-High"
    }
  ];
  
  const handleInvestment = (id: string) => {
    // Check only for valid amount, not wallet connection
    if (!investAmount || parseFloat(investAmount) <= 0) {
      toast({
        title: t("Invalid Amount"),
        description: t("Please enter a valid investment amount"),
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: t("Investment Initiated"),
      description: t("Processing your investment request...")
    });
    
    // In a real app, this would process the investment via API
    setTimeout(() => {
      toast({
        title: t("Investment Successful"),
        description: t("Your investment has been processed successfully"),
      });
      setInvestAmount("");
    }, 1500);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{t("Featured Investment Options")}</h2>
        <Button variant="link" className="text-secondary p-0 h-auto">
          {t("View All")}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockInvestments.map((investment) => (
          <Card key={investment.id} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg">{t(investment.name)}</h3>
                <Badge variant="outline" className="bg-primary/10 text-primary border-0">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {t(investment.compliant)}
                </Badge>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">{t(investment.description)}</p>
              
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-xs text-muted-foreground">{t("Expected Return")}</span>
                  <div className="font-bold text-lg">{investment.expectedReturn}</div>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">{t("Risk Level")}</span>
                  <div className="text-sm font-medium">{t(investment.riskLevel)}</div>
                </div>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">{t("Learn More")}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>{t(investment.name)}</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">{t("About This Investment")}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{t(investment.description)}</p>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-0">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {t(investment.compliant)}
                      </Badge>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">{t("Performance")}</h3>
                      <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">{t("Performance chart placeholder")}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">{t("Invest")}</h3>
                      <div className="mb-4">
                        <label className="text-sm font-medium mb-2 block">{t("Amount (SOL)")}</label>
                        <Input 
                          type="number" 
                          min="0.01" 
                          step="0.01" 
                          placeholder="0.00" 
                          value={investAmount} 
                          onChange={(e) => setInvestAmount(e.target.value)}
                        />
                      </div>
                      
                      {investAmount && parseFloat(investAmount) > 0 && (
                        <div className="p-3 rounded-md bg-muted">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{t("Expected Annual Return")}</span>
                            <span className="font-medium text-primary">
                              {(parseFloat(investAmount) * parseFloat(investment.expectedReturn) / 100).toFixed(4)} SOL
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{t("Based on")} {investment.expectedReturn} {t("annual rate")}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      disabled={!investAmount || parseFloat(investAmount) <= 0}
                      onClick={() => handleInvestment(investment.id)}
                    >
                      {t("Invest Now")}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
