import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { NAV_LINKS, SITE_META } from '../config/site';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(NAV_LINKS[0].id);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const activeLabel = NAV_LINKS.find((link) => link.id === activeId)?.label ?? 'Home';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const updateActive = () => {
      const scrollPosition = window.scrollY + 140;
      let currentId = sections[0].id;

      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          currentId = section.id;
        } else {
          break;
        }
      }

      setActiveId((prev) => (prev === currentId ? prev : currentId));
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.classList.remove('menu-open');
      return;
    }

    const focusableSelectors = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(
      mobilePanelRef.current?.querySelectorAll<HTMLElement>(focusableSelectors) ?? []
    );

    focusables[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || focusables.length === 0) return;

      const firstElement = focusables[0];
      const lastElement = focusables[focusables.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.classList.add('menu-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', onKeyDown);
      mobileToggleRef.current?.focus();
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a className="brand" href="#home">
          <span className="brand-mark">BA</span>
          <span className="brand-name">{SITE_META.shortName}</span>
        </a>

        <div className="nav-center">
          <nav className="desktop-links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link ${activeId === link.id ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <AnimatePresence initial={false}>
            {scrolled && (
              <motion.span
                className="nav-state"
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                {activeLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="nav-right">
          <ThemeToggle />
          <button
            ref={mobileToggleRef}
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-panel"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="mobile-backdrop"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              ref={mobilePanelRef}
              id="mobile-menu-panel"
              className="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
            >
              <nav className="mobile-nav-links" aria-label="Mobile Primary">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={activeId === link.id ? 'active' : ''}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
