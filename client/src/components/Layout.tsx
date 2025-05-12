import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import WalletConnectModal from "./WalletConnectModal";
import { useWallet } from "@/contexts/WalletContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Wallet, BookOpen } from "lucide-react";
import SanafiLogo from "./icons/SanafiLogo";
import { useLocation } from "wouter";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const { wallet } = useWallet();
  const { language, t } = useLanguage();
  const [location] = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleWalletModal = () => {
    setWalletModalOpen(!walletModalOpen);
  };

  return (
    <div className="" dir="ltr">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Desktop only */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header 
            toggleMobileMenu={toggleMobileMenu} 
            toggleWalletModal={toggleWalletModal}
          />
          
          {/* Mobile Navigation (hidden by default) */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-primary text-primary-foreground absolute inset-0 z-20 flex flex-col">
              {/* Header with logo and close button */}
              <div className="flex items-center justify-between p-4 border-b border-white border-opacity-20">
                <div className="flex items-center space-x-3">
                  <SanafiLogo variant="default" />
                  <span className="font-bold text-xl text-white">Sanafi</span>
                </div>
                <button 
                  onClick={toggleMobileMenu}
                  className="text-white bg-white bg-opacity-10 rounded-full p-1 hover:bg-opacity-20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Tagline */}
              <div className="mt-2 text-sm font-medium text-center text-white opacity-80 px-4">
                AI-Driven Ethical Onchain Banking
              </div>
              
              {/* Navigation */}
              <nav className="mt-4 px-4 py-2">
                <ul className="space-y-1">
                  <li>
                    <a 
                      href="/" 
                      className={cn(
                        "flex items-center px-4 py-3 rounded-lg",
                        location.includes("/") && !location.includes("/accounts")
                          ? "bg-white bg-opacity-10" 
                          : "hover:bg-white hover:bg-opacity-10"
                      )}
                    >
                      <BookOpen className="h-5 w-5 mr-3" />
                      <span>{t("Sanafi AI")}</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/accounts" 
                      className={cn(
                        "flex items-center px-4 py-3 rounded-lg",
                        location.includes("/accounts") 
                          ? "bg-white bg-opacity-10" 
                          : "hover:bg-white hover:bg-opacity-10"
                      )}
                    >
                      <Wallet className="h-5 w-5 mr-3" />
                      <span>{t("Accounts")}</span>
                    </a>
                  </li>
                </ul>
              </nav>
              
              {/* Footer */}
              <div className="mt-auto p-4 text-sm opacity-70 text-center border-t border-white border-opacity-20">
                Sanafi © {new Date().getFullYear()}
              </div>
            </div>
          )}
          
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-muted p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
      
      {/* Wallet Connection Modal */}
      <WalletConnectModal open={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
    </div>
  );
}
