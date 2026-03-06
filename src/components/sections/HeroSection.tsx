import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { HERO_COPY, HERO_POINTS } from '../../content/home';
import { SITE_META } from '../../config/site';

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="hero section-anchor">
      <motion.div
        className="hero-content"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.4 }}
      >
        <span className="kicker">
          <Sparkles size={14} />
          Portfolio
        </span>
        <h1>{HERO_COPY.heading}</h1>
        <p className="lead">
          I&apos;m {SITE_META.name}, {HERO_COPY.lead}
        </p>

        <div className="row">
          <a href="#projects" className="btn">
            View Work <ArrowRight size={18} />
          </a>
          <a href="#contact" className="btn ghost">
            Contact
          </a>
        </div>

        <div className="hero-points">
          {HERO_POINTS.map((item) => (
            <div key={item} className="hero-point">
              <CheckCircle2 size={16} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="hero-image-wrap"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, rotate: 1 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: shouldReduceMotion ? 0 : 0.06 }}
        whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      >
        <img
          src="/image/img.JPG"
          srcSet="/image/img.JPG 354w"
          sizes="(max-width: 980px) 100vw, 430px"
          alt={SITE_META.name}
          className="hero-img"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={354}
          height={472}
        />
      </motion.div>
    </section>
  );
}
