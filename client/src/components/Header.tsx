import { Link, useLocation } from "wouter";
import WalletConnectButton from "./WalletConnectButton";
import SanafiLogo from "./icons/SanafiLogo";
import { Menu, LogOut, Wallet } from "lucide-react";
import { usePrivyAuth } from "@/contexts/PrivyContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  toggleMobileMenu: () => void;
  toggleWalletModal: () => void;
}

export default function Header({ toggleMobileMenu, toggleWalletModal }: HeaderProps) {
  const [location] = useLocation();
  const { isAuthenticated, isReady, user, logout, connectWallet, walletConnected } = usePrivyAuth();
  
  // Only showing Sanafi AI and Accounts pages, with Sanafi AI as root path
  const navItems = [
    { path: "/", label: "Sanafi AI" },
    { path: "/accounts", label: "Accounts" },
    { path: "/wallet-demo", label: "Wallet Demo" }
  ];
  
  // Format user display name
  const getDisplayName = () => {
    if (!user) return 'User';
    
    if (user.email?.address) {
      return user.email.address.split('@')[0];
    }
    
    if (user.wallet?.address) {
      const addr = user.wallet.address;
      return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`;
    }
    
    return 'User';
  };

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
          {isAuthenticated ? (
            <>
              {/* User is authenticated with Privy */}
              <div className="flex items-center space-x-3">
                {!walletConnected && (
                  <Button 
                    onClick={() => connectWallet()}
                    variant="outline"
                    size="sm"
                    className="border-[#1b4d3e] text-[#1b4d3e] hover:bg-[#1b4d3e]/10"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-[#1b4d3e] text-[#1b4d3e] hover:bg-[#1b4d3e]/10">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-[#1b4d3e] text-white flex items-center justify-center text-xs mr-2">
                          {getDisplayName().charAt(0).toUpperCase()}
                        </div>
                        <span className="max-w-[100px] truncate">{getDisplayName()}</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    {walletConnected && (
                      <DropdownMenuItem>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Wallet Connected</span>
                          <span className="text-sm font-medium">{user?.wallet?.address?.substring(0, 6)}...{user?.wallet?.address?.substring(user.wallet.address.length - 4)}</span>
                        </div>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-500 focus:text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <Button 
                variant="outline" 
                className="border-[#1b4d3e] text-[#1b4d3e] hover:bg-[#1b4d3e]/10"
                onClick={() => window.location.href = '/signin'}
              >
                Sign In
              </Button>
          )}
        </div>
      </div>
    </header>
  );
}
