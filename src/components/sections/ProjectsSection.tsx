import AnimatedSection from '../AnimatedSection';
import ProjectCard from '../ProjectCard';
import { projects } from '../../data/projects';

export default function ProjectsSection() {
  const rankedProjects = [...projects].sort((a, b) => {
    const featuredDelta = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    if (featuredDelta !== 0) return featuredDelta;

    const demoDelta = Number(Boolean(b.demo)) - Number(Boolean(a.demo));
    if (demoDelta !== 0) return demoDelta;

    return a.title.localeCompare(b.title);
  });

  return (
    <section id="projects" className="section-anchor section-block">
      <AnimatedSection>
        <div className="section-header">
          <div>
            <span className="kicker">Projects</span>
            <h2>Selected Projects</h2>
            <p className="muted">Best work first, with real impact highlights.</p>
          </div>
        </div>

        <div className="grid projects-grid">
          {rankedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
