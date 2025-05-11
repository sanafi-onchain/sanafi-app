import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDynamicAuth, WalletType } from "@/contexts/DynamicContext";
import SanafiLogo from "@/components/icons/SanafiLogo";
import { Spinner } from "@/components/ui/spinner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiPhantom, SiSolana } from "react-icons/si";
import { Mail } from "lucide-react";
import { FaWallet } from "react-icons/fa";

// Wallet options with their icons
const walletOptions: { type: WalletType; name: string; icon: React.ReactNode }[] = [
  { 
    type: "phantom",
    name: "Phantom",
    icon: <SiPhantom className="h-5 w-5" />
  },
  { 
    type: "solflare",
    name: "Solflare",
    icon: <SiSolana className="h-5 w-5" />
  },
  { 
    type: "backpack",
    name: "Backpack",
    icon: <FaWallet className="h-5 w-5" />
  },
  { 
    type: "email",
    name: "Email",
    icon: <Mail className="h-5 w-5" />
  }
];

export function SignIn() {
  const [, navigate] = useLocation();
  const { isAuthenticated, isLoading, login, connectWallet } = useDynamicAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("wallet");
  const [connectingWallet, setConnectingWallet] = useState<WalletType | null>(null);

  // If already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Handle wallet connection
  const handleWalletConnect = async (walletType: WalletType) => {
    try {
      setConnectingWallet(walletType);
      await connectWallet(walletType);
      // On success, the user will be redirected via the useEffect above
    } catch (error) {
      console.error("Wallet connection error:", error);
    } finally {
      setConnectingWallet(null);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="mx-auto w-full max-w-md border-0 shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-4">
            <SanafiLogo className="h-20 w-20" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to Sanafi</CardTitle>
          <CardDescription className="text-muted-foreground">
            AI-Driven Ethical Onchain Banking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="wallet" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>
            
            <TabsContent value="wallet" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-2">
                {walletOptions.filter(w => w.type !== "email").map((wallet) => (
                  <Button
                    key={wallet.type}
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center gap-1"
                    disabled={isLoading || connectingWallet !== null}
                    onClick={() => handleWalletConnect(wallet.type)}
                  >
                    {connectingWallet === wallet.type ? (
                      <Spinner className="h-5 w-5" />
                    ) : (
                      wallet.icon
                    )}
                    <span className="text-xs">{wallet.name}</span>
                  </Button>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="email" className="space-y-4 mt-4">
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
                disabled={isLoading || connectingWallet !== null}
                onClick={() => handleWalletConnect("email")}
              >
                {connectingWallet === "email" ? (
                  <Spinner className="mr-2 h-4 w-4" />
                ) : (
                  <Mail className="mr-2 h-4 w-4" />
                )}
                Sign in with Email
              </Button>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            By connecting your wallet, you agree to our
            <br />
            <a href="#" className="underline hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-primary">
              Privacy Policy
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}