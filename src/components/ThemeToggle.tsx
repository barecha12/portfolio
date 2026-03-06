import { useTheme } from '../hooks/useTheme';
import { Moon, Sun, Turtle, Rabbit } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, motionPreference, toggleTheme, toggleMotionPreference } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pref-toggles">
      <motion.button
        className="theme-toggle-btn"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        onClick={toggleTheme}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.07 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -90 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, rotate: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
      >
        <motion.div
          animate={shouldReduceMotion ? undefined : { rotate: theme === 'light' ? 180 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
        >
          {theme === 'light' ? (
            <Sun size={20} className="theme-icon sun" />
          ) : (
            <Moon size={20} className="theme-icon moon" />
          )}
        </motion.div>
      </motion.button>

      <motion.button
        className="motion-toggle-btn"
        aria-label={motionPreference === 'reduce' ? 'Enable full motion' : 'Reduce motion'}
        title={motionPreference === 'reduce' ? 'Enable full motion' : 'Reduce motion'}
        onClick={toggleMotionPreference}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.07 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -90 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, rotate: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.3, delay: shouldReduceMotion ? 0 : 0.04 }}
      >
        {motionPreference === 'reduce' ? (
          <Turtle size={18} className="theme-icon moon" />
        ) : (
          <Rabbit size={18} className="theme-icon sun" />
        )}
      </motion.button>
    </div>
  );
}
