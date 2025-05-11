import { Link, useLocation } from "wouter";
import SanafiLogo from "./icons/SanafiLogo";
import { Menu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useDynamicAuth } from "@/contexts/DynamicContext";
import { useWallet } from "@/contexts/WalletContext";

interface HeaderProps {
  toggleMobileMenu: () => void;
  toggleWalletModal?: () => void; // Optional now since we're using Dynamic directly
}

export default function Header({ toggleMobileMenu }: HeaderProps) {
  const { isAuthenticated, login, logout } = useDynamicAuth();
  const { wallet } = useWallet();
  const [location] = useLocation();
  const { t } = useLanguage();
  
  // Handle login button click
  const handleLogin = () => {
    login();
  };
  
  // Handle logout button click
  const handleLogout = () => {
    logout();
  };
  
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
          {/* Wallet Connection/Disconnection */}
          {!isAuthenticated ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogin} 
              className="flex items-center gap-2"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" 
                  fill="currentColor"
                />
              </svg>
              Connect
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout} 
              className="flex items-center gap-2"
            >
              {wallet?.address ? (
                <span className="font-mono text-xs">{wallet.address.substring(0, 4)}...{wallet.address.substring(wallet.address.length - 4)}</span>
              ) : (
                <span>Wallet</span>
              )}
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="ml-1"
              >
                <path 
                  d="M9 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H9M16 17L21 12L16 7M21 12H9" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}