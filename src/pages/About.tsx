import { ArcThemeProvider, Button } from '../lib/arc-ui';

// Named export
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

// Default export (the About page)
export default function About() {
  return (
    <section className="stack gap-lg">
      <h1>About Me</h1>
      <p className="lead">
        I’m Barecha, a full-stack software engineer passionate about building
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
          <h3>Skills</h3>
          <ul className="tags">
            <li>React</li><li>TypeScript</li><li>Laravel</li><li>PHP</li>
            <li>MySQL</li><li>REST APIs</li><li>Node.js</li><li>Next.js</li>
            <li>Authentication & Security</li><li>UI/UX Design Systems</li>
            <li>Performance Optimization</li><li>Multi-language Apps</li>
          </ul>
        </div>
      </div>

      <a className="btn" href="/resume.pdf" download>
        Download Résumé
      </a>
    </section>
  );
}
