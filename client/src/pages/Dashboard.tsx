import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import StatsOverview from "@/components/dashboard/StatsOverview";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import Notifications from "@/components/dashboard/Notifications";
import InvestmentPreview from "@/components/dashboard/InvestmentPreview";
import EducationalSection from "@/components/dashboard/EducationalSection";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { wallet } = useWallet();
  const { toast } = useToast();
  
  // Check if wallet is connected to display appropriate content
  const { data: userData, isLoading } = useQuery({
    queryKey: ["/api/user/profile"],
    enabled: !!wallet?.address
  });

  // Show a welcome toast when first loading the dashboard
  useEffect(() => {
    if (wallet?.isConnected) {
      toast({
        title: "Welcome back!",
        description: "Your dashboard is ready."
      });
    }
  }, [wallet?.isConnected, toast]);

  return (
    <div className="space-y-6">
      {wallet?.isConnected && <WelcomeBanner name={userData?.name || "Guest"} />}
      
      <StatsOverview 
        isLoading={isLoading}
        walletConnected={!!wallet?.isConnected}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity walletConnected={!!wallet?.isConnected} />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <Notifications />
        </div>
      </div>
      
      <InvestmentPreview />
      
      <EducationalSection />
    </div>
  );
}
