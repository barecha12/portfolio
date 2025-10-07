import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 ||
                       selectedTags.some(tag => project.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <section className="stack gap-lg">
      <div>
        <h1>Projects</h1>
        <p className="muted">A selection of things I've designed, built, and shipped.</p>
      </div>

      <div className="project-filters">
        <div className="search-box">
          <FiSearch size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="clear-btn">
              <FiX size={18} />
            </button>
          )}
        </div>

        <div className="filter-tags">
          <span className="filter-label">Filter by:</span>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`filter-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
            >
              {tag}
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button onClick={() => setSelectedTags([])} className="clear-filters">
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="project-count">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>

      <div className="grid">
        {filteredProjects.map(p => (
          <div key={p.id} id={p.id}><ProjectCard project={p} /></div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-results">
          <p>No projects found matching your criteria.</p>
          <button onClick={() => { setSearchTerm(''); setSelectedTags([]); }} className="btn">
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
