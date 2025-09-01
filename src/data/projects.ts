export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    id: 'arc-ui',
    title: 'Arc UI — Design System',
    description:
      'A scalable design system with theming, composable primitives, and a tokens pipeline. Shipped to 6 apps.',
    tags: ['React', 'TypeScript', 'Storybook', 'Accessibility'],
    image: '/projects/design-system.png',
    repo: 'https://github.com/yourname/arc-ui', // replace with real repo
    demo: 'https://arc-ui.demo.yourdomain.com'   // optional demo url
  },
  {
    id: 'ecommerce',
    title: 'Multivendor E-commerce',
    description:
      'Headless e-commerce frontend with React Query, GraphQL, and route-level code-splitting.',
    tags: ['React', 'GraphQL', 'Vite', 'PWAs'],
    image: '/projects/hydra-store.png',
    repo: 'https://github.com/barecha12/Ecommerce',
    demo: 'https://hydra-store.vercel.app'
  },
  {
    id: 'analytics',
    title: 'Lighthouse Monitor',
    description:
      'Monitors and visualizes Core Web Vitals with scheduled Lighthouse runs.',
    tags: ['Node', 'React', 'Charts', 'Perf'],
    image: '/projects/lighthouse-monitor.png',
    repo: 'https://github.com/yourname/lh-monitor',
    demo: 'https://lh-monitor.vercel.app'
  }
];
