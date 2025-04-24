import { Link, useLocation } from "wouter";
import SanafiLogo from "./icons/SanafiLogo";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Wallet,
  PiggyBank,
  TrendingUp,
  CreditCard,
  BookOpen,
  Settings
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Sidebar() {
  const [location] = useLocation();
  const { t } = useLanguage();
  
  const navItems = [
    { path: "/dashboard", label: t("Dashboard"), icon: <LayoutDashboard className="h-5 w-5 mr-3" /> },
    { path: "/accounts", label: t("Accounts"), icon: <Wallet className="h-5 w-5 mr-3" /> },
    { path: "/savings", label: t("Savings"), icon: <PiggyBank className="h-5 w-5 mr-3" /> },
    { path: "/investments", label: t("Investments"), icon: <TrendingUp className="h-5 w-5 mr-3" /> },
    { path: "/spend", label: t("Spend"), icon: <CreditCard className="h-5 w-5 mr-3" /> },
    { path: "/learn", label: t("Learn"), icon: <BookOpen className="h-5 w-5 mr-3" /> }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-primary text-primary-foreground">
      {/* Logo */}
      <div className="p-4 mb-6">
        <Link href="/" className="flex items-center space-x-3 py-3">
          <SanafiLogo variant="default" />
          <span className="font-bold text-xl">Sanafi</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1">
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
      
      {/* User Settings */}
      <div className="p-4 border-t border-white border-opacity-20">
        <Link href="/settings" className="flex items-center px-4 py-3 hover:bg-white hover:bg-opacity-10 rounded-lg">
          <Settings className="h-5 w-5 mr-3" />
          <span>{t("Settings")}</span>
        </Link>
      </div>
    </aside>
  );
}
