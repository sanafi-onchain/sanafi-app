import { Link, useLocation } from "wouter";
import WalletConnectButton from "./WalletConnectButton";
import SanafiLogo from "./icons/SanafiLogo";
import { Menu, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  toggleMobileMenu: () => void;
  toggleWalletModal: () => void;
}

export default function Header({ toggleMobileMenu, toggleWalletModal }: HeaderProps) {
  const [location] = useLocation();
  const { t } = useLanguage();
  
  const navItems = [
    { path: "/learn", label: t("Sanafi AI") },
    { path: "/", label: t("Dashboard") },
    { path: "/accounts", label: t("Accounts") },
    { path: "/savings", label: t("Savings") },
    { path: "/investments", label: t("Investments") },
    { path: "/spend", label: t("Spend") }
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
          <Link href="/signin">
            <Button variant="outline" className="hidden lg:flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              {t("Sign In")}
            </Button>
          </Link>
          {/* Wallet Connect Button */}
          <WalletConnectButton onClick={toggleWalletModal} />
        </div>
      </div>
    </header>
  );
}
