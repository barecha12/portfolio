import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function PremiumEnhancements() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 450);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-to-top"
            onClick={scrollToTop}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.8 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.8 }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
