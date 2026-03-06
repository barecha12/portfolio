import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../data/projects';
import { useMemo, useState } from 'react';
import { getImageFallbacks, getResponsiveImageAttrs } from '../lib/images';

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const entryDelay = shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.28);
  const fallbacks = useMemo(() => getImageFallbacks(project.image, project.repo), [project.image, project.repo]);
  const [imageIndex, setImageIndex] = useState(0);
  const imageAttrs = getResponsiveImageAttrs(fallbacks[Math.min(imageIndex, fallbacks.length - 1)]);

  return (
    <motion.article
      className="card"
      id={project.id}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.98 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.22 }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
            y: -7,
            scale: 1.012,
            transition: { duration: 0.2, ease: 'easeOut' }
          }
      }
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.32, delay: entryDelay, ease: 'easeOut' }}
    >
      <img
        className="card-img"
        src={imageAttrs.src}
        srcSet={imageAttrs.srcSet}
        sizes={imageAttrs.sizes}
        alt={project.title}
        loading="lazy"
        decoding="async"
        onError={() => {
          setImageIndex((current) => {
            if (current >= fallbacks.length - 1) return current;
            return current + 1;
          });
        }}
      />
      <div className="card-body">
        <div className="card-tags">
          {project.featured && <span className="mini-tag feature-tag">Top project</span>}
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="mini-tag">{tag}</span>
          ))}
        </div>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">{project.description}</p>
        {project.impact && project.impact.length > 0 && (
          <ul className="impact-list">
            {project.impact.slice(0, 2).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <div className="card-status">
          <span className={`status-pill ${project.demo ? 'live' : 'code-only'}`}>
            {project.demo ? 'Live demo available' : 'Code repository'}
          </span>
        </div>
        <div className="card-actions">
          {project.demo && (
            <a className="btn" href={project.demo} target="_blank" rel="noreferrer">
              Live <ExternalLink size={16} />
            </a>
          )}
          {project.repo && (
            <a className="btn ghost" href={project.repo} target="_blank" rel="noreferrer">
              Code <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
