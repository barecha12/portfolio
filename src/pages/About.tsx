import { ArcThemeProvider, Button } from '../lib/arc-ui';
import SkillBar from '../components/SkillBar';
import { skills } from '../data/skills';
import { useState } from 'react';

export function ArcPreview() {
  return (
    <ArcThemeProvider defaultTheme="dark">
      <section style={{ padding: 24 }}>
        <h2>Arc UI — quick preview</h2>
        <p className="muted">
          A glimpse of my component system with theming and design tokens.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <Button variant="primary">View Projects</Button>
          <Button variant="ghost">Contact Me</Button>
        </div>
      </section>
    </ArcThemeProvider>
  );
}

export default function About() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section className="stack gap-lg">
      <h1>About Me</h1>
      <p className="lead">
        I'm Barecha, a full-stack software engineer passionate about building
        modern web applications that balance performance, scalability, and great
        user experience. I specialize in React and Laravel, with a strong focus
        on clean architecture and design systems.
      </p>

      <div className="grid two">
        <div className="stack">
          <h3>Highlights</h3>
          <ul>
            <li>Built a multi-vendor e-commerce platform with Laravel + React</li>
            <li>Experience integrating payment systems and multi-language support</li>
            <li>Internship project: Job Portal for Adama Science & Tech University</li>
            <li>Final year project: Comprehensive Lab Exercise Review App</li>
            <li>Hands-on experience with REST APIs, MySQL (XAMPP), and Google APIs</li>
          </ul>
        </div>

        <div className="stack">
          <h3>Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">4+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">20+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">10+</span>
              <span className="stat-label">Technologies</span>
            </div>
          </div>
        </div>
      </div>

      <div className="skills-section">
        <div className="skills-header">
          <h3>Technical Skills</h3>
          <div className="skill-categories">
            <button
              className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            <button
              className={`category-btn ${activeCategory === 'frontend' ? 'active' : ''}`}
              onClick={() => setActiveCategory('frontend')}
            >
              Frontend
            </button>
            <button
              className={`category-btn ${activeCategory === 'backend' ? 'active' : ''}`}
              onClick={() => setActiveCategory('backend')}
            >
              Backend
            </button>
            <button
              className={`category-btn ${activeCategory === 'tools' ? 'active' : ''}`}
              onClick={() => setActiveCategory('tools')}
            >
              Tools
            </button>
          </div>
        </div>
        <div className="skills-list">
          {filteredSkills.map(skill => (
            <SkillBar
              key={skill.name}
              skill={skill.name}
              level={skill.level}
              category={skill.category}
            />
          ))}
        </div>
      </div>

      <a className="btn" href="/resume.pdf" download style={{
    display: "inline-block",
    textAlign: "center",
  }}>
        Download Résumé
      </a>
    </section>
  );
}
