import { ArcThemeProvider, Button } from '../lib/arc-ui';

// Named export
export function ArcPreview() {
  return (
    <ArcThemeProvider defaultTheme="dark">
      <section style={{ padding: 24 }}>
        <h2>Arc UI — quick preview</h2>
        <p className="muted">Design primitives, tokens and theming demo.</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <Button variant="primary">Get started</Button>
          <Button variant="ghost">Learn more</Button>
        </div>
      </section>
    </ArcThemeProvider>
  );
}

// Default export (the About page)
export default function About() {
  return (
    <section className="stack gap-lg">
      <h1>About</h1>
      <p className="lead">
        I’m a software engineer specializing in front-end architecture, design systems, and performance.
      </p>
      <div className="grid two">
        <div className="stack">
          <h3>Highlights</h3>
          <ul>
            <li>5+ years building with React & TypeScript</li>
            <li>Led design system adopted across 6 apps</li>
            <li>Improved LCP by 45% on an e-commerce SPA</li>
            <li>Open source contributor (eslint plugins, hooks)</li>
          </ul>
        </div>
        <div className="stack">
          <h3>Skills</h3>
          <ul className="tags">
            <li>React</li><li>TypeScript</li><li>Node</li><li>Vite</li><li>Next.js</li>
            <li>GraphQL</li><li>Vercel</li><li>Jest</li><li>Playwright</li>
            <li>Accessibility (WCAG 2.2)</li><li>Perf & Core Web Vitals</li>
          </ul>
        </div>
      </div>
      <a className="btn" href="/resume.pdf" download>Download Résumé</a>
    </section>
  );
}
