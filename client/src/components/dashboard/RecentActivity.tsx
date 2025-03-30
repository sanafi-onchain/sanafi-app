import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, TrendingUp, ShoppingBag, PiggyBank, DollarSign, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";

interface RecentActivityProps {
  walletConnected: boolean;
}

export default function RecentActivity({ walletConnected }: RecentActivityProps) {
  const { t } = useLanguage();
  
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["/api/transactions/recent"],
    enabled: walletConnected
  });
  
  // These would come from API in a real app
  const mockTransactions = [
    {
      id: "1",
      type: "deposit",
      title: "Deposited SOL",
      date: "Oct 20, 2023",
      status: "Successful",
      amount: "+1 SOL",
      icon: <ArrowDown className="h-5 w-5 text-primary" />,
      iconBg: "bg-primary/10",
      explorerUrl: "https://explorer.solana.com/tx/123"
    },
    {
      id: "2",
      type: "investment",
      title: "Invested in Sukuk Fund",
      date: "Oct 18, 2023",
      status: "Successful",
      amount: "-0.5 SOL",
      icon: <TrendingUp className="h-5 w-5 text-secondary" />,
      iconBg: "bg-secondary/10",
      explorerUrl: "https://explorer.solana.com/tx/456"
    },
    {
      id: "3",
      type: "spend",
      title: "Halal Grocery Purchase",
      date: "Oct 15, 2023",
      status: "Completed",
      amount: "-0.1 SOL",
      reward: "+0.01 SOL",
      icon: <ShoppingBag className="h-5 w-5 text-yellow-600" />,
      iconBg: "bg-yellow-50",
      explorerUrl: null
    },
    {
      id: "4",
      type: "savings",
      title: "Savings Deposit",
      date: "Oct 10, 2023",
      status: "Successful",
      amount: "-1 SOL",
      icon: <PiggyBank className="h-5 w-5 text-secondary" />,
      iconBg: "bg-secondary/10",
      explorerUrl: "https://explorer.solana.com/tx/789"
    },
    {
      id: "5",
      type: "profit",
      title: "Savings Profit Distribution",
      date: "Oct 1, 2023",
      status: "Completed",
      amount: "+0.04 SOL",
      icon: <DollarSign className="h-5 w-5 text-primary" />,
      iconBg: "bg-primary/10",
      explorerUrl: "https://explorer.solana.com/tx/101112"
    }
  ];

  return (
    <Card>
      <CardHeader className="border-b px-6 py-4">
        <CardTitle>{t("Recent Activity")}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 py-0">
        <div className="p-4 max-h-96 overflow-y-auto">
          {!walletConnected && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Sign in to view your recent activity</p>
            </div>
          )}
          
          {walletConnected && isLoading && (
            <div className="space-y-4 px-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center">
                    <Skeleton className="w-10 h-10 rounded-full mr-4" />
                    <div>
                      <Skeleton className="w-40 h-5 mb-1" />
                      <Skeleton className="w-32 h-4" />
                    </div>
                  </div>
                  <div className="text-right">
                    <Skeleton className="w-16 h-5 mb-1 ml-auto" />
                    <Skeleton className="w-24 h-4 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {walletConnected && !isLoading && mockTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-3 px-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full ${tx.iconBg} flex items-center justify-center mr-4`}>
                  {tx.icon}
                </div>
                <div>
                  <div className="font-medium">{t(tx.title)}</div>
                  <div className="text-xs text-muted-foreground">{tx.date} • {t(tx.status)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-medium ${tx.amount.startsWith("+") ? "text-primary" : ""}`}>
                  {tx.amount}
                </div>
                {tx.reward && <div className="text-xs text-primary">{tx.reward} {t("reward")}</div>}
                {tx.explorerUrl && (
                  <a 
                    href={tx.explorerUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-secondary hover:underline flex items-center justify-end"
                  >
                    {t("View on Explorer")}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="px-6 py-4 border-t">
          <Button variant="link" className="text-secondary p-0 h-auto">
            {t("View All Transactions")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
