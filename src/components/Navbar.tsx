import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="nav">
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
