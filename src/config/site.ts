export const SITE_META = {
  name: 'Barecha Ashenafi',
  shortName: 'Barecha',
  role: 'Full-stack developer',
  title: 'Barecha Ashenafi | Full-Stack Developer',
  email: 'ashenafibarecha34@gmail.com'
} as const;

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' }
] as const;

export type SocialIcon = 'github' | 'linkedin' | 'mail' | 'telegram';

export type SocialLink = {
  href: string;
  label: string;
  icon: SocialIcon;
  external?: boolean;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { href: 'https://github.com/barecha12', label: 'GitHub', icon: 'github', external: true },
  { href: 'https://www.linkedin.com/in/barechashenafi', label: 'LinkedIn', icon: 'linkedin', external: true },
  { href: `mailto:${SITE_META.email}`, label: 'Email', icon: 'mail' },
  { href: 'https://t.me/Trueth45', label: 'Telegram', icon: 'telegram', external: true }
];

export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  icon: SocialIcon;
  external?: boolean;
};

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    label: 'Email',
    value: SITE_META.email,
    href: `mailto:${SITE_META.email}`,
    icon: 'mail'
  },
  {
    label: 'LinkedIn',
    value: 'barechashenafi',
    href: 'https://www.linkedin.com/in/barechashenafi',
    icon: 'linkedin',
    external: true
  },
  {
    label: 'GitHub',
    value: 'barecha12',
    href: 'https://github.com/barecha12',
    icon: 'github',
    external: true
  },
  {
    label: 'Telegram',
    value: '@Trueth45',
    href: 'https://t.me/Trueth45',
    icon: 'telegram',
    external: true
  }
];
