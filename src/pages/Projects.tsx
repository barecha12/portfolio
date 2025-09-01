import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { useEffect } from 'react';

export default function Projects() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section className="stack gap-lg">
      <h1>Projects</h1>
      <p className="muted">A selection of things I’ve designed, built, and shipped.</p>
      <div className="grid">
        {projects.map(p => (
          <div key={p.id} id={p.id}><ProjectCard project={p} /></div>
        ))}
      </div>
    </section>
  );
}
