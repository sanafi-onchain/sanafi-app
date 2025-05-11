import { Link, useLocation } from "wouter";
import SanafiLogo from "./icons/SanafiLogo";
import { cn } from "@/lib/utils";
import {
  Wallet,
  BookOpen
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ChatHistoryList from "./ChatHistoryList";

export default function Sidebar() {
  const [location] = useLocation();
  const { t } = useLanguage();
  
  // Only showing Sanafi AI and Accounts pages, with Sanafi AI first
  const navItems = [
    { path: "/", label: t("Sanafi AI"), icon: <BookOpen className="h-5 w-5 mr-3" /> },
    { path: "/accounts", label: t("Accounts"), icon: <Wallet className="h-5 w-5 mr-3" /> }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-primary text-primary-foreground">
      {/* Logo */}
      <div className="p-4">
        <Link href="/" className="flex items-center space-x-3 py-3">
          <SanafiLogo variant="default" />
          <span className="font-bold text-xl">Sanafi</span>
        </Link>
        <div className="mt-2 text-sm font-medium text-center text-white opacity-80">
          Your Sharia-compliant financial companion
        </div>
      </div>
      
      {/* Navigation */}
      <nav>
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className={cn(
                "flex items-center px-4 py-3 rounded-lg",
                location === item.path 
                  ? "bg-white bg-opacity-10" 
                  : "hover:bg-white hover:bg-opacity-10"
              )}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Chat History Section */}
      <div className="mt-4 flex-1 overflow-hidden border-t border-white border-opacity-20">
        <ChatHistoryList />
      </div>
      
      {/* Footer area */}
      <div className="p-2 border-t border-white border-opacity-20">
        <div className="px-2 py-2 text-sm opacity-70 text-center">
          Sanafi © {new Date().getFullYear()}
        </div>
      </div>
    </aside>
  );
}
