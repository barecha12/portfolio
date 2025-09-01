import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function Home() {
  const featured = projects.slice(0, 3);
  return (
    <section className="stack gap-xl">
      <section className="hero">
        <div className="hero-copy">
          <h1>Hi, I’m <span className="accent">Barecha Ashenafi</span> 👋</h1>
          <p className="lead">
            I build fast, accessible web apps with React and TypeScript.
            Let’s turn ideas into lovable products.
          </p>
          <div className="row">
            <Link to="/projects" className="btn">View Projects</Link>
            <Link to="/contact" className="btn ghost">Contact Me</Link>
          </div>
        </div>
        <img className="hero-img" src="/public/image/img.JPG" alt="Your portrait" />
      </section>

      <section>
        <h2>Featured work</h2>
        <div className="grid">
          {featured.map(p => <a key={p.id} href={`/projects#${p.id}`} className="card-link">
            <article className="card small">
              <img className="card-img" src={p.image} alt="" loading="lazy" />
              <div className="card-body">
                <h3 className="card-title">{p.title}</h3>
                <p className="muted">{p.tags.join(' • ')}</p>
              </div>
            </article>
          </a>)}
        </div>
      </section>

      <section className="cta">
        <h2>Available for freelance & full-time</h2>
        <p>Need a React expert on your team? I can help with design systems, performance, and DX.</p>
        <Link to="/contact" className="btn">Let’s talk</Link>
      </section>
    </section>
  );
}
