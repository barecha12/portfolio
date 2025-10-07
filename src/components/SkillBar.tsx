import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface SkillBarProps {
  skill: string;
  level: number;
  category: string;
}

export default function SkillBar({ skill, level, category }: SkillBarProps) {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setProgress(level), 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, level]);

  return (
    <div ref={ref as any} className="skill-bar-wrapper">
      <div className="skill-bar-header">
        <span className="skill-name">{skill}</span>
        <span className="skill-level">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: `${progress}%`,
            transitionDelay: '0.1s'
          }}
          data-category={category}
        />
      </div>
    </div>
  );
}
