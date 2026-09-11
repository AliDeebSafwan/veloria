"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { translations, type Language, type Translation } from "@/i18n/translations";

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Owns the current language and keeps `<html dir lang>` in sync with
 * it. `dir` drives text direction site-wide (RTL for Arabic); a
 * matching rule in globals.css swaps `--font-serif`/`--font-sans` to
 * the Arabic face whenever `dir="rtl"` is set, so components don't
 * need their own per-language font classes.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
