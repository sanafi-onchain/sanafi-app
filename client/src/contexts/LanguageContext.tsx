import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { getTranslation, type TranslationKey } from "@/lib/i18n";

type LanguageContextType = {
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Force English only
  const [language, setLanguageState] = useState<"en" | "ar">("en");

  // Set language function - kept for compatibility but only allows English
  const setLanguage = (lang: "en" | "ar") => {
    // Always use English regardless of what's requested
    setLanguageState("en");
    localStorage.setItem("sanafiLanguage", "en");
    
    // Ensure LTR direction
    document.documentElement.setAttribute("dir", "ltr");
    document.body.removeAttribute("dir");
  };

  // Translation function
  const t = (key: TranslationKey): string => {
    return getTranslation(key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
