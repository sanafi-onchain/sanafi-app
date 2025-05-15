import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import WalletConnectModal from "./WalletConnectModal";
import { useWallet } from "@/contexts/WalletContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const { wallet } = useWallet();
  const { language, t } = useLanguage();
  
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
            <div className="lg:hidden bg-white shadow-lg absolute inset-0 z-20">
              <div className="flex justify-end p-4">
                <button onClick={toggleMobileMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="px-4 py-2">
                <ul className="space-y-3">
                  <li><a href="/learn" className="block py-3 px-4 text-primary font-medium bg-muted rounded-lg">{t("Sanafi AI")}</a></li>
                  <li><a href="/" className="block py-3 px-4 text-foreground hover:bg-muted rounded-lg">{t("Dashboard")}</a></li>
                  <li><a href="/accounts" className="block py-3 px-4 text-foreground hover:bg-muted rounded-lg">{t("Accounts")}</a></li>
                  <li><a href="/savings" className="block py-3 px-4 text-foreground hover:bg-muted rounded-lg">{t("Savings")}</a></li>
                  <li><a href="/investments" className="block py-3 px-4 text-foreground hover:bg-muted rounded-lg">{t("Investments")}</a></li>
                  <li><a href="/spend" className="block py-3 px-4 text-foreground hover:bg-muted rounded-lg">{t("Spend")}</a></li>
                  <li><a href="/settings" className="block py-3 px-4 text-foreground hover:bg-muted rounded-lg">{t("Settings")}</a></li>
                </ul>
              </nav>
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
