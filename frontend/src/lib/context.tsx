"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { content, Lang } from "@/lib/i18n";

type AppContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  // Use the union so both zh and en are valid
  t: (typeof content)[Lang];
  isDark: boolean;
  setIsDark: (v: boolean) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");
  const [isDark, setIsDark] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("resume_lang") as Lang;
    const savedTheme = localStorage.getItem("resume_theme");
    
    if (savedLang && (savedLang === "zh" || savedLang === "en")) {
      setLang(savedLang);
    }
    if (savedTheme !== null) {
      setIsDark(savedTheme === "dark");
    }
    setIsMounted(true);
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("resume_lang", lang);
  }, [lang, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("resume_theme", isDark ? "dark" : "light");
  }, [isDark, isMounted]);

  const t = content[lang];

  // Prevent hydration mismatch by waiting for mount
  if (!isMounted) {
    return (
      <AppContext.Provider value={{ lang, setLang, t, isDark, setIsDark }}>
        <div className="dark" data-theme="dark" style={{ visibility: "hidden" }}>
          {children}
        </div>
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={{ lang, setLang, t, isDark, setIsDark }}>
      <div className={isDark ? "dark" : "light"} data-theme={isDark ? "dark" : "light"}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
