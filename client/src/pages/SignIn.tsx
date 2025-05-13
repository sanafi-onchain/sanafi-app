
import { useEffect } from "react";
import { useLocation } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePrivyAuth } from "@/contexts/PrivyContext";
import { useSolanaWallet } from "@/contexts/SolanaWalletProvider";
import { ArrowRight, Mail } from "lucide-react";
import SanafiLogo from "@/components/icons/SanafiLogo";

export function SignIn() {
  const [, navigate] = useLocation();
  const { isAuthenticated, isReady, login } = usePrivyAuth();
  const { connected } = useSolanaWallet();

  // Redirect to dashboard if already authenticated via Privy or directly connected Solana wallet
  useEffect(() => {
    if ((isAuthenticated || connected) && isReady) {
      navigate("/");
    }
  }, [isAuthenticated, connected, navigate, isReady]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 islamic-pattern bg-gradient-to-b from-[#e9e1ca] to-[#f5f0e5]">
      <div className="mb-10 text-center">
        <SanafiLogo className="w-24 h-24 mx-auto mb-6" />
        <h1 className="text-5xl font-semibold text-[#1b4d3e] mb-3 font-[Poppins]">Sanafi</h1>
        <p className="text-gray-600 text-lg">Sharia-compliant financial services</p>
      </div>

      <Card className="w-full max-w-md border-[#e9e1ca] shadow-lg bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#1b4d3e] text-2xl font-medium">Welcome</CardTitle>
          <CardDescription className="text-gray-600">
            Connect to access your Sharia-compliant financial platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-6">
            <p className="mb-6 text-gray-600">
              Choose your preferred connection method
            </p>
            <div className="flex flex-col space-y-4">
              <Button
                onClick={() => login({ loginMethod: 'email' })}
                className="flex items-center justify-center gap-2 bg-[#1b4d3e] hover:bg-[#1b4d3e]/90 text-[#f5f0e5] h-12 rounded-full shadow-md"
                disabled={!isReady}
              >
                <Mail className="h-5 w-5" />
                Connect with Email
              </Button>
              
              <Button
                onClick={() => login({ loginMethod: 'wallet' })}
                variant="outline"
                className="flex items-center justify-center gap-2 w-full justify-center h-12 rounded-full border-[#1b4d3e] text-[#1b4d3e] hover:bg-[#1b4d3e]/10"
                disabled={!isReady}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M19.97 6.43L12 2L4.03 6.43L9.1 9.24C9.83 8.48 10.89 8 12 8C13.11 8 14.17 8.48 14.9 9.24L19.97 6.43Z" fill="currentColor"/>
                  <path d="M12 11C10.9 11 10 11.9 10 13C10 14.1 10.9 15 12 15C13.1 15 14 14.1 14 13C14 11.9 13.1 11 12 11Z" fill="currentColor"/>
                  <path d="M21 9.5V15.5C21 16.2 20.64 16.85 20.15 17.15L13 21.65L5.5 17.3V22H3.5V7L2 8V16.5L4 17.5V10.7L11 14.5L18 10.7V16L21 13.5V7.5L13.5 12L11.7 11L19.5 6.5L21 7.5C21.6 7.8 22 8.4 22 9.1V9.5H21Z" fill="currentColor"/>
                </svg>
                Connect Wallet
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center pt-0">
          <p className="text-xs text-gray-500">
            By connecting, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>

      <div className="mt-10 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Learn more about our Sharia-compliant services
        </p>
        <Button
          variant="link"
          className="text-[#1b4d3e] font-medium"
          onClick={() => navigate("/learn")}
        >
          Explore Islamic finance <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-6 max-w-xl">
        <div className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-center w-24 h-12">
          <div className="text-xs text-gray-500 opacity-70">Powered by</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-center w-24 h-12">
          <div className="text-xs text-gray-500 opacity-70">Solana</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-center w-24 h-12">
          <div className="text-xs text-gray-500 opacity-70">Privy</div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
