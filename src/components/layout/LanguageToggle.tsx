"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
      className={cn(
        "text-[11px] font-medium tracking-[0.25em] text-ink/70 transition-colors duration-300 hover:text-gold-deep",
        className,
      )}
    >
      {language === "en" ? "AR" : "EN"}
    </button>
  );
}
