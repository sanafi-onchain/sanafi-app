import React from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import TaharaLogo from "@/components/icons/TaharaLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  TrendingUp,
  BookOpen,
  Users,
  CheckCircle,
  Globe,
} from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  
  // Helper function for navigation using wouter
  const navigate = (path: string) => {
    setLocation(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <TaharaLogo />
          <span className="ml-2 font-bold text-2xl text-primary">Tahara</span>
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
            onClick={() => navigate("/dashboard")}
          >
            {t("Sign In")}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              100% Onchain 100% Halal
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Tahara provides Sharia-compliant investment opportunities, savings, and financial services for Muslims and values-driven investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                onClick={() => navigate("/dashboard")}
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
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full z-0"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full z-0"></div>
              <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 bg-primary text-white">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-sm opacity-80">Total Balance</p>
                      <h3 className="text-2xl font-bold">2,450 USDC</h3>
                    </div>
                    <TaharaLogo small />
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm opacity-80">Investments</p>
                      <p className="font-medium">1,800 USDC</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Returns</p>
                      <p className="font-medium">+12% annual</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-medium mb-3">Featured Investment</h4>
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">Real Estate Sukuk</h5>
                      <p className="text-sm text-gray-500">AAOIFI-Compliant</p>
                      <p className="text-sm font-medium text-primary mt-1">7-9% Expected Return</p>
                    </div>
                  </div>
                  <Button className="w-full bg-primary">Invest Now</Button>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sharia-Compliant Financial Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              All of our products and services are designed to meet the highest standards of Islamic finance, ensuring that your investments align with your values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">100% Halal Investments</h3>
                <p className="text-gray-600">
                  Every investment opportunity is thoroughly screened to ensure compliance with Islamic finance principles, including the prohibition of riba (interest).
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ethical Growth</h3>
                <p className="text-gray-600">
                  Generate competitive returns through profit-sharing arrangements (Mudarabah) and equity-based investments that comply with Sharia principles.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Islamic Finance Education</h3>
                <p className="text-gray-600">
                  Access educational resources on Islamic finance concepts like Mudarabah, Sukuk, and Musharakah to make informed financial decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Tahara
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tahara combines Islamic financial principles with modern technology to provide an accessible, transparent platform for ethical investing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="mt-1 mr-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Shariah Scholar Supervision</h3>
                <p className="text-gray-600">
                  Our products and services are continuously monitored by experienced Shariah scholars to ensure strict compliance with Islamic principles.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Transparent Fee Structure</h3>
                <p className="text-gray-600">
                  No hidden fees or charges. We operate on a fair, profit-sharing model in line with Islamic finance principles.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Blockchain Technology</h3>
                <p className="text-gray-600">
                  Utilizing Solana blockchain for enhanced security, transparency, and efficient transaction processing.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Community-Focused</h3>
                <p className="text-gray-600">
                  Built for the global Muslim community and values-driven investors seeking ethical financial solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of Muslims and ethical investors who have chosen Tahara for their financial needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Ahmed K.</h4>
                    <p className="text-sm text-gray-500">Dubai, UAE</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Tahara has transformed how I invest my money. For the first time, I feel confident that my investments are truly Sharia-compliant while still giving me competitive returns."
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Fatima S.</h4>
                    <p className="text-sm text-gray-500">London, UK</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The educational resources have been invaluable. I've learned so much about Islamic finance and feel empowered to make better financial decisions."
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Mohammed R.</h4>
                    <p className="text-sm text-gray-500">Kuala Lumpur, Malaysia</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The transparency of Tahara's platform gives me peace of mind. I can see exactly where my money is invested and how it aligns with Islamic principles."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Halal Financial Journey?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join Tahara today and take the first step towards an ethical financial future that aligns with your values and faith.
          </p>
          <Button 
            className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg"
            onClick={() => navigate("/dashboard")}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <TaharaLogo />
                <span className="ml-2 font-bold text-xl">Tahara</span>
              </div>
              <p className="text-gray-400 mb-4">
                Sharia-compliant financial services for the modern Muslim.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Investments</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Savings</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Spending</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Sukuk</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Islamic Finance Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Learning Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Shariah Board</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Tahara. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}