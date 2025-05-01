import React from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import SanafiLogo from "@/components/icons/SanafiLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  TrendingUp,
  BookOpen,
  Users,
  CheckCircle,
  Globe,
  ChevronRight,
  Wallet,
  BarChart3,
  CreditCard,
  Gift,
  MessageSquare,
  Check,
  Clock,
  Link,
  LightbulbIcon,
  Code
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

          <div className="mt-16 feature-card p-8">
            <div className="feature-icon" style={{ backgroundColor: "#A67C00" }}>
              <span className="text-white font-bold">S</span>
            </div>
            <h3 className="text-xl font-bold mb-2">SanaSOL</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
              Pioneering liquid staking solution on Solana, powered by Sanctum.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              Generate halal yields while maintaining full liquidity and Sharia compliance.
            </p>
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-muted text-primary text-sm font-medium mt-2">
              <Check className="h-4 w-4 mr-2" /> 100% Onchain, 100% Halal, 100% Transparent
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

            {/* Comparison Rows */}
            <div className="grid grid-cols-4 border-b border-border">
              <div className="col-span-1 p-4 bg-muted font-medium">Sharia Compliance</div>
              <div className="col-span-1 p-4 bg-primary/5">
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  Full compliance with Islamic principles
                </div>
              </div>
              <div className="col-span-1 p-4">
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  Yes
                </div>
              </div>
              <div className="col-span-1 p-4">
                <div className="flex items-center text-sm">
                  <span className="text-red-500 mr-2">✕</span>
                  No
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 border-b border-border">
              <div className="col-span-1 p-4 bg-muted font-medium">Blockchain Technology</div>
              <div className="col-span-1 p-4 bg-primary/5">
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  First-mover on Solana
                </div>
              </div>
              <div className="col-span-1 p-4">
                <div className="flex items-center text-sm">
                  <span className="text-red-500 mr-2">✕</span>
                  No
                </div>
              </div>
              <div className="col-span-1 p-4">
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  Yes
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 border-b border-border">
              <div className="col-span-1 p-4 bg-muted font-medium">Transaction Speed</div>
              <div className="col-span-1 p-4 bg-primary/5">
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  65,000 TPS (Solana)
                </div>
              </div>
              <div className="col-span-1 p-4">
                <div className="flex items-center text-sm">
                  <span className="text-red-500 mr-2">✕</span>
                  Slow (days for int'l)
                </div>
              </div>
              <div className="col-span-1 p-4">
                <div className="flex items-center text-sm">
                  <span className="text-amber-500 mr-2">⚠</span>
                  Varies by platform
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-primary/5 text-center text-sm font-medium text-primary">
              Sanafi combines the best of Islamic banking principles with cutting-edge blockchain technology
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

      {/* Technology Stack Section */}
      <section className="py-20 px-6 bg-cream halal-pattern">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Technology Stack
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-foreground max-w-3xl mx-auto">
              Leveraging cutting-edge blockchain infrastructure and premium integrations for a world-class halal financial experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="dashboard-card">
              <h3 className="text-xl font-bold mb-4 text-primary flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Solana Blockchain
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="tag tag-primary flex items-center"><svg className="w-3 h-3 mr-1" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> Fast (65,000 TPS)</span>
                <span className="tag tag-primary">Low Cost (&lt; $0.01/tx)</span>
                <span className="tag tag-primary">Secure</span>
                <span className="tag tag-primary">Energy Efficient</span>
              </div>

              <h3 className="text-xl font-bold mb-4 text-primary">Smart Contracts</h3>
              <div className="space-y-3 mb-4">
                <div className="border-l-2 border-primary pl-3">
                  <p className="font-medium">Savings Programs</p>
                  <p className="text-sm text-muted-foreground">Profit-sharing pools with Sharia-compliant distribution</p>
                </div>
                <div className="border-l-2 border-primary pl-3">
                  <p className="font-medium">Investment Contracts</p>
                  <p className="text-sm text-muted-foreground">Halal asset management and tokenization</p>
                </div>
                <div className="border-l-2 border-primary pl-3">
                  <p className="font-medium">Rewards System</p>
                  <p className="text-sm text-muted-foreground">Ethical merchant rewards and loyalty programs</p>
                </div>
                <div className="border-l-2 border-primary pl-3">
                  <p className="font-medium">SanaSOL Liquid Staking</p>
                  <p className="text-sm text-muted-foreground">Sharia-compliant SOL yield generation</p>
                </div>
              </div>
            </div>

            <div>
              <div className="dashboard-card mb-8">
                <h3 className="text-xl font-bold mb-4 text-primary flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></path></svg>
                  Third-Party Integrations
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="tag bg-white border border-border text-muted-foreground">Privy.io</span>
                  <span className="tag bg-white border border-border text-muted-foreground">Stripe</span>
                  <span className="tag bg-white border border-border text-muted-foreground">Moonpay</span>
                  <span className="tag bg-white border border-border text-muted-foreground">Jupiter API</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="tag bg-white border border-border text-muted-foreground">Dinari.com</span>
                  <span className="tag bg-white border border-border text-muted-foreground">Sumsub</span>
                  <span className="tag bg-white border border-border text-muted-foreground">Zoya API</span>
                  <span className="tag bg-white border border-border text-muted-foreground">Homebase</span>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg text-center text-sm text-secondary-foreground font-medium mt-4">
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 bg-secondary rounded-full mr-2 flex items-center justify-center text-white text-xs">S</div>
                    <span>Sanctum Integration for SanaSOL</span>
                  </div>
                  <p className="text-xs mt-1">Enabling Halal liquid staking yields with full liquidity</p>
                </div>
              </div>
              
              <div className="dashboard-card">
                <h3 className="text-xl font-bold mb-4 text-primary flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></path></svg>
                  AI Components
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-lg border border-border">
                    <div className="flex items-center text-sm mb-1">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></path></svg>
                      Smart Recommendations
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-border">
                    <div className="flex items-center text-sm mb-1">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></path></svg>
                      Compliance Monitoring
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-border">
                    <div className="flex items-center text-sm mb-1">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></path></svg>
                      Multilingual Chat Interface
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-border">
                    <div className="flex items-center text-sm mb-1">
                      <svg className="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></path></svg>
                      Sharia Finance Education
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-white text-primary text-sm font-medium border border-border">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              Built with ethical principles at every layer of the stack
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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
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
                <li><a href="#" className="text-white/80 hover:text-white">Islamic Finance Guide</a></li>
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