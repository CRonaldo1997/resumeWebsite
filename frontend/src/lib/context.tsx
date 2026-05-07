"use client";

import { createContext, useContext, useState, ReactNode } from "react";
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
  const t = content[lang];
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
