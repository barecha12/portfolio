import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // adjust scroll threshold
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <Link className="brand" to="/">BA<span className="accent">.</span></Link>
      <nav className="links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <ThemeToggle />
      </nav>
    </header>
  );
}
