export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
}

export const skills: Skill[] = [
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'JavaScript', level: 95, category: 'frontend' },
  { name: 'Next.js', level: 85, category: 'frontend' },
  { name: 'CSS/SCSS', level: 90, category: 'frontend' },
  { name: 'Laravel', level: 88, category: 'backend' },
  { name: 'PHP', level: 85, category: 'backend' },
  { name: 'Node.js', level: 82, category: 'backend' },
  { name: 'MySQL', level: 85, category: 'backend' },
  { name: 'REST APIs', level: 90, category: 'backend' },
  { name: 'Git', level: 88, category: 'tools' },
  { name: 'Vite', level: 85, category: 'tools' },
  { name: 'Performance Optimization', level: 80, category: 'tools' },
];
