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
import { ArrowRight, Mail, Wallet } from "lucide-react";

export function SignIn() {
  const [location, navigate] = useLocation();
  const { isAuthenticated, login } = usePrivyAuth();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Tahara</h1>
        <p className="text-muted-foreground">Sharia-compliant financial services</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Tahara</CardTitle>
          <CardDescription>
            Sign in to access your Sharia-compliant financial platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-6">
            <p className="mb-6 text-muted-foreground">
              Tahara provides ethical, Sharia-compliant financial services built on Solana.
            </p>
            <div className="flex flex-col space-y-3">
              <Button
                onClick={login}
                className="flex items-center justify-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Sign in with Email
              </Button>

              <Button
                onClick={login}
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Learn more about our Sharia-compliant services
        </p>
        <Button
          variant="link"
          className="text-primary"
          onClick={() => navigate("/learn")}
        >
          Explore Islamic finance <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

export default SignIn;