import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDynamicAuth } from "@/contexts/DynamicContext";
import SanafiLogo from "@/components/icons/SanafiLogo";
import { Spinner } from "@/components/ui/spinner";
import { useLanguage } from "@/contexts/LanguageContext";

export function SignIn() {
  const [, navigate] = useLocation();
  const { isAuthenticated, isLoading, login } = useDynamicAuth();
  const { t } = useLanguage();

  // If already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-[85vh] items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="mx-auto w-full max-w-md border-0 shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-4">
            <SanafiLogo size={80} variant="default" />
          </div>
          <CardTitle className="text-2xl font-bold">{t("Welcome to Sanafi")}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("AI-Driven Ethical Onchain Banking")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Spinner className="h-8 w-8 text-primary" />
              </div>
            ) : (
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
                onClick={login}
              >
                {t("Sign in with Wallet")}
              </Button>
            )}
            
            <div className="text-center text-sm text-muted-foreground">
              {t("By connecting your wallet, you agree to our")}
              <br />
              <a href="#" className="underline hover:text-primary">
                {t("Terms of Service")}
              </a>{" "}
              {t("and")}{" "}
              <a href="#" className="underline hover:text-primary">
                {t("Privacy Policy")}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}