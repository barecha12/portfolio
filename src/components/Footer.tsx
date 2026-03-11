import { ArrowUpRight, Github, Linkedin, Mail, Send } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SITE_META, SOCIAL_LINKS, type SocialIcon } from '../config/site';

const socialIconMap: Record<SocialIcon, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  telegram: Send
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-shell">
        <div className="footer-identity">
          <strong>{SITE_META.name}</strong>
          <p className="muted">Building fast, reliable products with clear user experience.</p>
          <span className="footer-availability">Open for freelance and full-time roles</span>
        </div>

        {/* <div className="footer-actions">
          <a className="btn footer-cta" href={`mailto:${SITE_META.email}`}>
            Start a Project <ArrowUpRight size={16} />
          </a>
          <p className="footer-action-note muted">Typically replies within 24 hours.</p>
        </div> */}

        <div className="footer-socials" aria-label="Social links">
          {SOCIAL_LINKS.map((link) => {
            const Icon = socialIconMap[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                aria-label={link.label}
                className="social-icon-link"
                title={link.label}
              >
                <Icon size={17} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="footer-note muted">&copy; {year} {SITE_META.name}. Crafted with React + TypeScript.</p>
        <a href="#home" className="footer-top-link">Back to top</a>
      </div>
    </footer>
  );
}
