import { PiggyBank, TrendingUp, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatsOverviewProps {
  isLoading: boolean;
  walletConnected: boolean;
}

export default function StatsOverview({ 
  isLoading,
  walletConnected
}: StatsOverviewProps) {
  const { t } = useLanguage();
  
  if (!walletConnected) {
    return (
      <Card className="bg-primary text-white rounded-lg p-6 shadow-md mb-6">
        <div className="text-center">
          <h2 className="text-lg font-medium mb-2">Sign In</h2>
          <p className="text-white/80 mb-4">
            Sign in to view your balance and account information
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Total Balance */}
      <div className="bg-primary text-white rounded-lg p-6 shadow-md md:col-span-1">
        <h2 className="text-sm font-light uppercase mb-1">{t("Total Balance")}</h2>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-24 bg-white/20 mb-1" />
            <Skeleton className="h-4 w-16 bg-white/20" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold mb-1">150 USDC</div>
            <div className="text-sm opacity-90">$150 USD</div>
          </>
        )}
      </div>
      
      {/* Savings */}
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-sm font-light uppercase text-muted-foreground">{t("Savings")}</h2>
          <PiggyBank className="h-5 w-5 text-secondary" />
        </div>
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-20 mb-1" />
            <Skeleton className="h-4 w-32" />
          </>
        ) : (
          <>
            <div className="text-xl font-bold mb-1">60 USDC</div>
            <div className="text-xs text-muted-foreground">4% {t("annualized return")}</div>
          </>
        )}
      </Card>
      
      {/* Investments */}
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-sm font-light uppercase text-muted-foreground">{t("Investments")}</h2>
          <TrendingUp className="h-5 w-5 text-secondary" />
        </div>
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-20 mb-1" />
            <Skeleton className="h-4 w-24" />
          </>
        ) : (
          <>
            <div className="text-xl font-bold mb-1">45 USDC</div>
            <div className="text-xs text-primary">+2.3% {t("today")}</div>
          </>
        )}
      </Card>
      
      {/* Rewards */}
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-sm font-light uppercase text-muted-foreground">{t("Rewards")}</h2>
          <Award className="h-5 w-5 text-accent" />
        </div>
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-20 mb-1" />
            <Skeleton className="h-4 w-28" />
          </>
        ) : (
          <>
            <div className="text-xl font-bold mb-1">8.5 USDC</div>
            <div className="text-xs text-muted-foreground">{t("Last earned")}: {t("Today")}</div>
          </>
        )}
      </Card>
    </div>
  );
}
