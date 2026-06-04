"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Theme = "normal" | "next" | "gemini" | "system";
export type LayoutMode = "single" | "two-col";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  layout: LayoutMode;
  setLayout: (layout: LayoutMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("normal");
  const [layout, setLayout] = useState<LayoutMode>("document");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme;
    if (stored === "normal" || stored === "next" || stored === "gemini" || stored === "system") {
      setTheme(stored);
    }
    const storedLayout = localStorage.getItem("layout") as LayoutMode;
    if (storedLayout === "document" || storedLayout === "one-col" || storedLayout === "two-col-alt") {
      setLayout(storedLayout);
    }
  }, []);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleSetLayout = (newLayout: LayoutMode) => {
    setLayout(newLayout);
    localStorage.setItem("layout", newLayout);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, layout, setLayout: handleSetLayout }}>
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}