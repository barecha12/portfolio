import type { CSSProperties, ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export default function AnimatedSection({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  id,
  style
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  const offset = {
    up: { y: 22 },
    down: { y: -22 },
    left: { x: 22 },
    right: { x: -22 }
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      style={style}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, ...offset[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.45,
        delay: delay / 1000,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
    >
      {children}
    </motion.div>
  );
}
