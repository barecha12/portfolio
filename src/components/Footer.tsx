import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaTelegram } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} Your Name. All rights reserved.</p>
      {/* Inline styling added to the social div */}
      <div 
        className="social"
        style={{
          display: 'flex',
          gap: '1.5rem', // Adds space between the icons
          alignItems: 'center', // Centers icons vertically
          justifyContent: 'center' // Centers icons horizontally
        }}
      >
        <a href="https://github.com/barecha12" target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/yourname" target="_blank" rel="noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/barechashenafi" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://t.me/Trueth45" target="_blank" rel="noreferrer">
          <FaTelegram />
        </a>
      </div>
    </footer>
  );
}