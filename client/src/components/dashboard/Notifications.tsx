import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, PiggyBank, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@/contexts/WalletContext";

export default function Notifications() {
  const { t } = useLanguage();
  const { wallet } = useWallet();
  
  const { data: notifications } = useQuery({
    queryKey: ["/api/notifications"],
    enabled: !!wallet?.address
  });
  
  // These would come from API in a real app
  const mockNotifications = [
    {
      id: "1",
      title: "New sukuk asset listed!",
      description: "A new Sharia-compliant sukuk has been added to the investment marketplace.",
      icon: <BellRing className="h-4 w-4 text-accent" />,
      isNew: true,
      actionLabel: "View Details",
      actionUrl: "/investments"
    },
    {
      id: "2",
      title: "Savings profit distributed",
      description: "Your quarterly profit-sharing distribution has been processed.",
      icon: <PiggyBank className="h-4 w-4 text-secondary" />,
      isNew: true,
      actionLabel: "View Details",
      actionUrl: "/savings"
    },
    {
      id: "3",
      title: "New educational content",
      description: "Learn about Mudarabah contracts in our latest article.",
      icon: <GraduationCap className="h-4 w-4 text-primary" />,
      isNew: true,
      actionLabel: "Read Now",
      actionUrl: "/learn"
    }
  ];

  return (
    <Card>
      <CardHeader className="border-b px-6 py-4 flex justify-between items-center flex-row">
        <CardTitle>{t("Notifications")}</CardTitle>
        <Badge>{mockNotifications.filter(n => n.isNew).length} {t("New")}</Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {mockNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 ${notification.isNew ? "bg-primary/10" : ""}`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-3">
                  {notification.icon}
                </div>
                <div>
                  <p className="font-medium">{t(notification.title)}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t(notification.description)}</p>
                  <div className="mt-2">
                    <Button variant="link" className="p-0 h-auto text-primary font-medium">{t(notification.actionLabel)}</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="px-6 py-4 border-t">
          <Button variant="link" className="p-0 h-auto text-primary font-medium">
            {t("View All Notifications")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
