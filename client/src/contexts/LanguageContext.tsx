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
  const [language, setLanguageState] = useState<"en" | "ar">("en");

  // Load language preference from localStorage on mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem("sanafiLanguage");
    if (storedLanguage === "en" || storedLanguage === "ar") {
      setLanguageState(storedLanguage);
      document.documentElement.setAttribute("dir", storedLanguage === "ar" ? "rtl" : "ltr");
      if (storedLanguage === "ar") {
        document.body.setAttribute("dir", "rtl");
      } else {
        document.body.removeAttribute("dir");
      }
    }
  }, []);

  // Set language and update localStorage
  const setLanguage = (lang: "en" | "ar") => {
    setLanguageState(lang);
    localStorage.setItem("sanafiLanguage", lang);
    
    // Update document direction for RTL support
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    if (lang === "ar") {
      document.body.setAttribute("dir", "rtl");
    } else {
      document.body.removeAttribute("dir");
    }
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
