import { Link, useLocation } from "wouter";
import WalletConnectButton from "./WalletConnectButton";
import SanafiLogo from "./icons/SanafiLogo";
import { Menu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  toggleMobileMenu: () => void;
  toggleWalletModal: () => void;
}

export default function Header({ toggleMobileMenu, toggleWalletModal }: HeaderProps) {
  const [location] = useLocation();
  const { t } = useLanguage();
  
  // Only showing Sanafi AI and Accounts pages, with Sanafi AI as root path
  const navItems = [
    { path: "/", label: t("Sanafi AI") },
    { path: "/accounts", label: t("Accounts") }
  ];

  return (
    <header className="bg-white shadow z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Mobile menu button */}
        <button 
          className="lg:hidden text-foreground" 
          onClick={toggleMobileMenu}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* Logo (mobile only) */}
        <Link href="/" className="lg:hidden flex items-center">
          <SanafiLogo small variant="inverse" />
          <span className="ml-2 font-bold text-lg text-primary">Sanafi</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`${
                location === item.path 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-muted-foreground hover:text-primary"
              } px-1 py-4 font-medium`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Wallet Connect Button */}
          <WalletConnectButton onClick={toggleWalletModal} />
        </div>
      </div>
    </header>
  );
}
