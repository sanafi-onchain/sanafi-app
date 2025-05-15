import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  Lightbulb, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  PlayCircle,
  Check 
} from "lucide-react";

export default function EducationalSection() {
  const { t } = useLanguage();

  return (
    <div className="mt-8">
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>{t("Islamic Finance Basics")}</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="font-bold text-lg mb-3">{t("Understanding Mudarabah")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("Mudarabah is a profit-sharing partnership where one party provides capital (Rab al-Mal) and the other provides expertise (Mudarib). Profits are shared according to a pre-agreed ratio, while losses are borne by the capital provider only.")}
              </p>
              
              <div className="bg-muted p-4 rounded-lg mb-4">
                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 text-accent mt-1 mr-3" />
                  <div>
                    <p className="font-medium mb-1">{t("Key Distinction from Conventional Finance")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("Unlike interest-based investments, Mudarabah distributes actual profits, not predetermined returns, making it Sharia-compliant.")}
                    </p>
                  </div>
                </div>
              </div>
              
              <Button variant="link" className="p-0 h-auto text-primary font-medium flex items-center">
                {t("Read Full Article")}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="bg-muted rounded-lg p-5">
              <h3 className="font-medium mb-3">{t("Related Learning Resources")}</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/learn" className="flex items-start hover:text-primary">
                    <PlayCircle className="h-4 w-4 mt-1 mr-2 text-primary" />
                    <span className="text-sm">{t("Introduction to Sukuk - 3 min video")}</span>
                  </a>
                </li>
                <li>
                  <a href="/learn" className="flex items-start hover:text-primary">
                    <FileText className="h-4 w-4 mt-1 mr-2 text-primary" />
                    <span className="text-sm">{t("Halal vs Haram Investments Guide")}</span>
                  </a>
                </li>
                <li>
                  <a href="/learn" className="flex items-start hover:text-primary">
                    <HelpCircle className="h-4 w-4 mt-1 mr-2 text-primary" />
                    <span className="text-sm">{t("Islamic Finance FAQ")}</span>
                  </a>
                </li>
                <li>
                  <a href="/learn" className="flex items-start hover:text-primary">
                    <BookOpen className="h-4 w-4 mt-1 mr-2 text-primary" />
                    <span className="text-sm">{t("Blockchain and Sharia Compliance")}</span>
                  </a>
                </li>
              </ul>
              
              <div className="mt-4 pt-4 border-t">
                <Button variant="link" className="p-0 h-auto text-primary font-medium flex items-center">
                  {t("Explore Learning Center")}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
