import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  FaCode,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaNodeJs,
  FaReact
} from 'react-icons/fa';
import {
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
  SiVite
} from 'react-icons/si';

type IconNode = {
  icon: IconType;
  x: number;
  y: number;
  size: number;
  color: string;
  drift: number;
  duration: number;
};

const ICON_NODES: IconNode[] = [
  { icon: FaReact, x: 8, y: 18, size: 36, color: '#61DAFB', drift: -18, duration: 11 },
  { icon: SiTypescript, x: 88, y: 16, size: 30, color: '#3178C6', drift: 16, duration: 13 },
  { icon: FaNodeJs, x: 15, y: 66, size: 34, color: '#339933', drift: -14, duration: 10 },
  { icon: FaDocker, x: 86, y: 62, size: 33, color: '#2496ED', drift: 15, duration: 12 },
  { icon: SiMongodb, x: 31, y: 82, size: 28, color: '#47A248', drift: -12, duration: 11 },
  { icon: SiPostgresql, x: 73, y: 80, size: 29, color: '#4169E1', drift: 13, duration: 12 },
  { icon: SiTailwindcss, x: 52, y: 10, size: 26, color: '#06B6D4', drift: -10, duration: 10 },
  { icon: FaGithub, x: 51, y: 90, size: 26, color: '#9ca3af', drift: 8, duration: 13 },
  { icon: FaGitAlt, x: 40, y: 54, size: 24, color: '#F1502F', drift: -8, duration: 9 },
  { icon: SiVite, x: 63, y: 40, size: 27, color: '#646CFF', drift: 11, duration: 12 },
  { icon: FaCode, x: 27, y: 35, size: 23, color: '#22a7ff', drift: 10, duration: 11 }
];

const CODE_CHIPS = [
  { text: 'const app = createApp();', x: '7%', y: '23%', delay: 0 },
  { text: 'useEffect(() => sync(), []);', x: '64%', y: '21%', delay: 0.9 },
  { text: 'interface Project { title: string }', x: '19%', y: '72%', delay: 1.6 },
  { text: 'SELECT * FROM portfolio_projects;', x: '62%', y: '70%', delay: 2.2 },
  { text: 'npm run build && npm run deploy', x: '38%', y: '43%', delay: 2.8 }
] as const;

export default function TechStackBackground() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const gridY = useTransform(scrollY, [0, 2000], [0, -160]);
  const chipY = useTransform(scrollY, [0, 2000], [0, -220]);
  const iconY = useTransform(scrollY, [0, 2000], [0, -280]);
  const layerOpacity = useTransform(scrollY, [0, 500, 2200], [0.7, 0.9, 0.62]);

  return (
    <motion.div className="dev-bg" aria-hidden style={shouldReduceMotion ? undefined : { opacity: layerOpacity }}>
      <motion.div className="dev-bg-grid" style={shouldReduceMotion ? undefined : { y: gridY }} />
      <div className="dev-bg-noise" />

      <motion.div className="dev-bg-code" style={shouldReduceMotion ? undefined : { y: chipY }}>
        {CODE_CHIPS.map((chip) => (
          <motion.span
            key={chip.text}
            className="code-chip"
            style={{ left: chip.x, top: chip.y }}
            animate={shouldReduceMotion ? undefined : { y: [0, -7, 0], opacity: [0.45, 0.8, 0.45] }}
            transition={{
              duration: 8.5,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: chip.delay
            }}
          >
            {chip.text}
          </motion.span>
        ))}
      </motion.div>

      <motion.div className="dev-icon-cloud" style={shouldReduceMotion ? undefined : { y: iconY }}>
        {ICON_NODES.map((item) => {
          const Icon = item.icon;

          return (
            <motion.span
              key={`${item.x}-${item.y}-${item.size}`}
              className="dev-icon"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                fontSize: `${item.size}px`,
                color: item.color
              }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, item.drift, 0], x: [0, item.drift * 0.25, 0], rotate: [0, item.drift * 0.5, 0] }
              }
              transition={{
                duration: item.duration,
                ease: 'easeInOut',
                repeat: Infinity
              }}
            >
              <Icon />
            </motion.span>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
