import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WelcomeBannerProps {
  name: string;
}

export default function WelcomeBanner({ name }: WelcomeBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const { t } = useLanguage();
  
  if (dismissed) return null;

  return (
    <Card className="p-4 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold mb-1">{t("Welcome")}, {name}!</h1>
          <p className="text-muted-foreground">{t("Did you know you can earn rewards with every spend?")}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setDismissed(true)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
