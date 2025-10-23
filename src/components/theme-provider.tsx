"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }
    try {
      const storedTheme = window.localStorage.getItem(storageKey);
      if (storedTheme) {
        return storedTheme as Theme;
      }
    } catch (e) {
        console.error("Failed to access local storage for theme", e);
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (themeToApply: Theme) => {
      let resolvedTheme = themeToApply;
      if (enableSystem && themeToApply === 'system') {
        resolvedTheme = mediaQuery.matches ? 'dark' : 'light';
      }
      
      root.classList.remove("light", "dark");
      root.classList.add(resolvedTheme);
    };

    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    
    applyTheme(theme);
    
    if (enableSystem) {
      mediaQuery.addEventListener("change", handleChange);
    }
    
    return () => {
      if (enableSystem) {
        mediaQuery.removeEventListener("change", handleChange);
      }
    };
  }, [theme, enableSystem]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      try {
        window.localStorage.setItem(storageKey, newTheme);
      } catch (e) {
         console.error("Failed to set theme in local storage", e);
      }
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
