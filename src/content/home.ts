export const HERO_COPY = {
  heading: 'Clean, modern products with clear user experience.',
  lead: 'I build polished interfaces and reliable implementation for real products.'
} as const;

export const HERO_POINTS = [
  'Clear UX and clean code',
  'Fast delivery and support'
] as const;

export type StackPillarIcon = 'code' | 'server' | 'database';
export type SupportSignalIcon = 'gauge' | 'shield';

export type StackPillar = {
  title: string;
  icon: StackPillarIcon;
  summary: string;
  items: string[];
};

export const STACK_PILLARS: StackPillar[] = [
  {
    title: 'Frontend Engineering',
    icon: 'code',
    summary: 'Responsive, clean interfaces focused on clarity and user trust.',
    items: ['React', 'TypeScript', 'Framer Motion']
  },
  {
    title: 'Backend Services',
    icon: 'server',
    summary: 'Stable APIs and business logic with maintainable architecture.',
    items: ['Node.js', 'Laravel', 'REST APIs']
  },
  {
    title: 'Data and Delivery',
    icon: 'database',
    summary: 'Reliable storage design and deployment for real-world usage.',
    items: ['MySQL', 'MongoDB', 'PostgreSQL']
  }
];

export const STACK_STATS = [
  { value: '6+', label: 'Shipped projects' },
  { value: '3', label: 'Core domains' },
  { value: '24/7', label: 'Reliability mindset' }
] as const;

export const SUPPORT_SIGNALS = [
  { label: 'Performance minded', icon: 'gauge' },
  { label: 'Security aware', icon: 'shield' }
] as const;
