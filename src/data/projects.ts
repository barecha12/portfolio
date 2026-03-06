export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  impact?: string[];
  image: string;
  repo?: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'skillswap',
    title: 'SkillSwap',
    description: 'SkillSwap project repository.',
    tags: ['JavaScript'],
    impact: [
      'Live platform deployed for real user skill exchange workflows.',
      'Focused on smooth matching and interaction between participants.'
    ],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&fm=webp&w=1200&h=760&q=80',
    repo: 'https://github.com/barecha12/SkillSwap',
    demo: 'https://skill-swap-gold-phi.vercel.app/',
    featured: true
  },
  {
    id: 'qirtas',
    title: 'Qirtas',
    description: 'Qirtas is a simple and intuitive expense tracking app that helps individuals and groups manage shared finances effortlessly.',
    tags: ['JavaScript'],
    impact: [
      'Designed for practical personal and shared expense tracking.',
      'Helps users maintain clear visibility of spending categories.'
    ],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&fm=webp&w=1200&h=760&q=80',
    repo: 'https://github.com/barecha12/Qirtas',
    featured: true
  },
  {
    id: 'job-portal',
    title: 'Job Portal',
    description: 'Full-stack Job Portal built with Laravel (backend) and React (frontend)',
    tags: ['JavaScript'],
    impact: [
      'Built as a full-stack hiring workflow with posting and applications.',
      'Supports clear role discovery and application management.'
    ],
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&fm=webp&w=1200&h=760&q=80',
    repo: 'https://github.com/barecha12/job-portal',
    featured: true
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: 'Portfolio project repository.',
    tags: ['TypeScript'],
    impact: [
      'Showcases full-stack projects with refined UI and accessibility.',
      'Continuously improved with performance, SEO, and maintainability updates.'
    ],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&fm=webp&w=1200&h=760&q=80',
    repo: 'https://github.com/barecha12/portfolio',
    featured: false
  },
  {
    id: 'irreecha',
    title: 'Irreecha',
    description: 'Irreecha project repository.',
    tags: ['TypeScript'],
    impact: [
      'Highlights Oromo cultural celebration content in a dedicated product.',
      'Delivered as a publicly accessible experience with modern frontend tooling.'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Irreecha_Festival.jpg',
    repo: 'https://github.com/barecha12/Irreecha',
    demo: 'https://irreecha.vercel.app/',
    featured: false
  },
  {
    id: 'techdocs',
    title: 'TechDocs',
    description: 'Technical documentation workspace for structured guides, API references, and developer onboarding.',
    tags: ['TypeScript', 'Documentation', 'Developer Experience'],
    impact: [
      'Organizes technical guides and references for faster developer onboarding.',
      'Improves knowledge sharing with clearer documentation structure.'
    ],
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&fm=webp&w=1200&h=760&q=80',
    repo: 'https://github.com/barecha12/TechDocs',
    featured: false
  },
];
