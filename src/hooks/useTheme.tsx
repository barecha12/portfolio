import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type MotionPreference = 'reduce' | 'full';

interface ThemeContextType {
  theme: Theme;
  motionPreference: MotionPreference;
  toggleTheme: () => void;
  toggleMotionPreference: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'pref-theme';
const MOTION_STORAGE_KEY = 'pref-motion';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  const [motionPreference, setMotionPreference] = useState<MotionPreference>(() => {
    const saved = localStorage.getItem(MOTION_STORAGE_KEY) as MotionPreference | null;
    if (saved === 'reduce' || saved === 'full') return saved;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduce' : 'full';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-motion', motionPreference);
    localStorage.setItem(MOTION_STORAGE_KEY, motionPreference);
  }, [motionPreference]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleMotionPreference = () => {
    setMotionPreference((prev) => (prev === 'reduce' ? 'full' : 'reduce'));
  };

  return (
    <ThemeContext.Provider value={{ theme, motionPreference, toggleTheme, toggleMotionPreference }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
