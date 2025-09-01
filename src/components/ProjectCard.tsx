import type { Project } from '../data/projects';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card">
      <img className="card-img" src={project.image} alt={`${project.title} preview`} loading="lazy" />
      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="muted">{project.tags.join(' • ')}</p>
        <p>{project.description}</p>
        <div className="card-actions">
          {project.demo && <a className="btn" href={project.demo} target="_blank" rel="noreferrer">Live Demo</a>}
          {project.repo && <a className="btn ghost" href={project.repo} target="_blank" rel="noreferrer">Source</a>}
        </div>
      </div>
    </article>
  );
}
