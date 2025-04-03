import { Link, useLocation } from "wouter";
import WalletConnectButton from "./WalletConnectButton";
import LanguageSelector from "./LanguageSelector";
import TaharaLogo from "./icons/TaharaLogo";
import { Menu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePrivyAuth } from "@/contexts/PrivyContext";

interface HeaderProps {
  toggleMobileMenu: () => void;
  toggleWalletModal: () => void;
}

export default function Header({ toggleMobileMenu, toggleWalletModal }: HeaderProps) {
  const [location] = useLocation();
  const { t } = useLanguage();
  
  const navItems = [
    { path: "/dashboard", label: t("Dashboard") },
    { path: "/accounts", label: t("Accounts") },
    { path: "/savings", label: t("Savings") },
    { path: "/investments", label: t("Investments") },
    { path: "/spend", label: t("Spend") },
    { path: "/learn", label: t("Learn") }
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
          <TaharaLogo small />
          <span className="ml-2 font-bold text-lg text-primary">Tahara</span>
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
          {/* Language Toggle */}
          <LanguageSelector />
          
          {/* Wallet Connect Button */}
          <WalletConnectButton onClick={() => {
            const { login } = usePrivyAuth();
            login();
          }} />
        </div>
      </div>
    </header>
  );
}
