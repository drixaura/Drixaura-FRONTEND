import { Terminal, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand column */}
        <div>
          <a href="#home" className="logo">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="url(#footerLogoGrad)" />
              <path d="M2 23L16 30L30 23" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 16L16 23L30 16" stroke="var(--color-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
              <defs>
                <linearGradient id="footerLogoGrad" x1="2" y1="9" x2="30" y2="9" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--color-primary)" />
                  <stop offset="1" stopColor="var(--color-secondary)" />
                </linearGradient>
              </defs>
            </svg>
            <span>DRIXAURA</span>
          </a>

          <p className="footer-desc">
            Bespoke engineering, immersive design, and high-performance software architecture.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="footer-col-title">Navigation</h4>

          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#portfolio">Softwares</a></li>
            <li><a href="#security">Security</a></li>
            <li><a href="#about-now">About Now</a></li>
          </ul>
        </div>

        {/* Standards */}
        <div>
          <h4 className="footer-col-title">Core Standards</h4>

          <ul className="footer-links">
            <li><a href="#security">Privacy Policy</a></li>
            <li><a href="#security">Performance Auditing</a></li>
            <li><a href="#security">Zero Vulnerability</a></li>
            <li><a href="#security">Data Shield</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="footer-col-title">Connect</h4>

          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              marginBottom: "15px"
            }}
          >
            Follow our open source repositories and co-development projects.
          </p>

          <div className="social-links">
            <a
              href="https://github.com"
              className="social-icon"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="https://linkedin.com"
              className="social-icon"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={18} />
            </a>

            <a
              href="https://twitter.com"
              className="social-icon"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter Profile"
            >
              <FaXTwitter size={18} />
            </a>

            <a
              href="mailto:drixaura@gmail.com"
              className="social-icon"
              aria-label="Email Support"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© {currentYear} Drixaura. All rights reserved.</span>
        <span>Made with ❤️ in Gurugram, India</span>
      </div>
    </footer>
  );
}
