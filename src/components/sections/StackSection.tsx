import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Database, Gauge, Server, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import { STACK_PILLARS, STACK_STATS, SUPPORT_SIGNALS, type StackPillarIcon, type SupportSignalIcon } from '../../content/home';

const stackIconMap: Record<StackPillarIcon, LucideIcon> = {
  code: Code2,
  server: Server,
  database: Database
};

const supportIconMap: Record<SupportSignalIcon, LucideIcon> = {
  gauge: Gauge,
  shield: ShieldCheck
};

export default function StackSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="stack" className="section-anchor section-block">
      <AnimatedSection>
        <div className="section-header">
          <div>
            <span className="kicker">
              <Code2 size={14} />
              Stack
            </span>
            <h2>Core Technologies</h2>
          </div>
        </div>

        <div className="panel stack-showcase">
          <p className="muted">
            Built for production delivery: polished UI, stable backend services, and pragmatic data decisions.
          </p>
          <div className="stack-metrics" aria-label="Stack highlights">
            {STACK_STATS.map((item) => (
              <div key={item.label} className="stack-metric">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="stack-grid">
            {STACK_PILLARS.map((pillar) => {
              const Icon = stackIconMap[pillar.icon];
              return (
                <motion.article
                  key={pillar.title}
                  className="stack-card"
                  whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="stack-card-head">
                    <span className="stack-icon">
                      <Icon size={16} />
                    </span>
                    <h3>{pillar.title}</h3>
                  </div>
                  <p className="muted">{pillar.summary}</p>
                  <div className="tool-chips">
                    {pillar.items.map((item) => (
                      <span key={item} className="mini-tag">{item}</span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
          <div className="stack-support">
            {SUPPORT_SIGNALS.map((signal) => {
              const Icon = supportIconMap[signal.icon];
              return (
                <span key={signal.label} className="support-chip">
                  <Icon size={14} />
                  {signal.label}
                </span>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
