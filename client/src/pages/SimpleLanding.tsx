import React from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import SanafiLogo from "@/components/icons/SanafiLogo";
import { Button } from "@/components/ui/button";
import {
  Shield,
  TrendingUp,
  BookOpen,
  Users,
  CheckCircle,
  Wallet,
  BarChart3,
  CreditCard,
  Gift,
  MessageSquare,
  Check,
} from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  
  // Helper function for navigation using wouter
  const navigate = (path: string) => {
    setLocation(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-border py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <SanafiLogo variant="inverse" size="sm" />
          <span className="ml-2 font-bold text-2xl text-primary">Sanafi</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/learn")}
            className="hidden sm:flex"
          >
            {t("Learn")}
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/investments")}
            className="hidden sm:flex"
          >
            {t("Investments")}
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/savings")}
            className="hidden sm:flex"
          >
            {t("Savings")}
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/accounts")}
            className="hidden sm:flex"
          >
            {t("Accounts")}
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate("/signin")}
          >
            {t("Sign In")}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-cream halal-pattern py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <SanafiLogo variant="full" size="lg" className="mb-8" />
            <div className="mt-4 flex items-center justify-center gap-2 mb-8">
              <span className="text-primary font-medium">100% Onchain</span>
              <span className="inline-block w-1 h-1 rounded-full bg-primary"></span>
              <span className="text-primary font-medium">100% Halal</span>
            </div>
            <div className="max-w-2xl">
              <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Halal Onchain Banking
              </h1>
              <p className="text-lg text-foreground mb-8">
                Sanafi provides Sharia-compliant investment opportunities, savings, and financial services for Muslims and values-driven investors, powered by Solana blockchain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                  onClick={() => navigate("/signin")}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg"
                  onClick={() => navigate("/learn")}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="dashboard-card w-full max-w-md">
                <div className="bg-primary text-white p-5 rounded-t-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">Sanafi Dashboard</span>
                    <span>Welcome, Ahmed</span>
                  </div>
                  <div className="mb-6">
                    <p className="text-sm opacity-80 mb-1">Total Balance</p>
                    <h3 className="text-3xl font-bold">4,520 USDC</h3>
                    <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full mt-1 inline-block">+5.2% this month</span>
                  </div>
                </div>
                <div className="p-5 bg-white rounded-b-xl">
                  <h4 className="font-medium text-lg mb-3">Halal Investments</h4>
                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Tech Sukuk</span>
                        <span className="text-sm text-green-600">+4.8%</span>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '48%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Real Estate Fund</span>
                        <span className="text-sm text-green-600">+3.2%</span>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">SanaSOL Staking</span>
                        <span className="text-sm text-green-600">+5.1%</span>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '51%' }}></div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-primary">View Dashboard</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Product Features
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-foreground max-w-3xl mx-auto">
              All of our products and services are designed to meet the highest standards of Islamic finance, ensuring that your investments align with your values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="feature-icon">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Accounts</h3>
              <p className="text-muted-foreground mb-4">
                Interest-free wallets and debit cards, fully compliant with Islamic principles
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Savings</h3>
              <p className="text-muted-foreground mb-4">
                Ethical profit-sharing pools that distribute returns without interest (riba)
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Investments</h3>
              <p className="text-muted-foreground mb-4">
                Sharia-compliant assets including stocks, sukuk, real estate, and crypto
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Spend</h3>
              <p className="text-muted-foreground mb-4">
                Debit cards designed for ethical spending that follow Islamic guidance
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Gift className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rewards</h3>
              <p className="text-muted-foreground mb-4">
                Earn rewards when spending at verified halal merchants worldwide
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Chat</h3>
              <p className="text-muted-foreground mb-4">
                AI-powered interface with knowledge shortcuts for Sharia finance guidance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              What Our Users Say
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-foreground max-w-3xl mx-auto">
              Join thousands of Muslims and ethical investors who have chosen Sanafi for their financial needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="feature-icon">
                <Users className="h-6 w-6" />
              </div>
              <div className="mb-4">
                <h4 className="font-bold text-primary">Ahmed K.</h4>
                <p className="text-sm text-muted-foreground">Dubai, UAE</p>
              </div>
              <p className="text-muted-foreground">
                "Sanafi has transformed how I invest my money. For the first time, I feel confident that my investments are truly Sharia-compliant while still giving me competitive returns."
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users className="h-6 w-6" />
              </div>
              <div className="mb-4">
                <h4 className="font-bold text-primary">Fatima S.</h4>
                <p className="text-sm text-muted-foreground">London, UK</p>
              </div>
              <p className="text-muted-foreground">
                "The educational resources have been invaluable. I've learned so much about Islamic finance and feel empowered to make better financial decisions."
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users className="h-6 w-6" />
              </div>
              <div className="mb-4">
                <h4 className="font-bold text-primary">Mohammed R.</h4>
                <p className="text-sm text-muted-foreground">Kuala Lumpur, Malaysia</p>
              </div>
              <p className="text-muted-foreground">
                "The transparency of Sanafi's platform gives me peace of mind. I can see exactly where my money is invested and how it aligns with Islamic principles."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sanafi-gradient text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Halal Financial Journey?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join Sanafi today and take the first step towards an ethical financial future that aligns with your values and faith.
          </p>
          <Button 
            className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg"
            onClick={() => navigate("/signin")}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/95 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <SanafiLogo variant="default" size="sm" />
                <span className="ml-2 font-bold text-xl">Sanafi</span>
              </div>
              <p className="text-white/80 mb-4">
                Sharia-compliant financial services for the modern Muslim.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-white">
                  <Check className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white">
                  <Check className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white">
                  <Check className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white">Investments</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Savings</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Spending</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">SanaSOL</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white">Islamic Finance</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Learning Center</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white">Shariah Board</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">
              &copy; {new Date().getFullYear()} Sanafi. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/70 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-white/70 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-white/70 hover:text-white text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}