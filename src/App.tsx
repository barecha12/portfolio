import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import PremiumEnhancements from './components/PremiumEnhancements';
import TechStackBackground from './components/TechStackBackground';
import { SITE_META } from './config/site';

function AppShell() {
  const { motionPreference } = useTheme();

  useEffect(() => {
    document.title = SITE_META.title;
  }, []);

  return (
    <MotionConfig reducedMotion={motionPreference === 'reduce' ? 'always' : 'user'}>
      <TechStackBackground />
      <PremiumEnhancements />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="app">
        <Navbar />
        <main id="main-content" className="container page-shell" tabIndex={-1}>
          <Home />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
