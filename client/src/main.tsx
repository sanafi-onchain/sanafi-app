import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { WalletProvider } from "@/contexts/WalletContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { PrivyAuthProvider } from "@/contexts/PrivyContext";
import { SolanaWalletProvider } from "@/contexts/SolanaWalletProvider";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <PrivyAuthProvider>
        <SolanaWalletProvider>
          <WalletProvider>
            <App />
            <Toaster />
          </WalletProvider>
        </SolanaWalletProvider>
      </PrivyAuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);
