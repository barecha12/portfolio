// src/lib/arc-ui/theme.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Tokens } from './tokens';
import tokens from './tokens';

type ThemeName = 'light' | 'dark';

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  tokens: Tokens;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useArcTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useArcTheme must be used inside ArcThemeProvider');
  return ctx;
};

export const ArcThemeProvider: React.FC<{
  children: React.ReactNode;
  defaultTheme?: ThemeName;
}> = ({ children, defaultTheme = 'dark' }) => {
  const [theme, setTheme] = useState<ThemeName>(() => {
    try {
      return (localStorage.getItem('arc-theme') as ThemeName) || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('arc-theme', theme);
    } catch {}
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(() => ({ theme, setTheme, tokens }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
