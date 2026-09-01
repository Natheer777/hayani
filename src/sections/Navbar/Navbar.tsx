import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/HOME/logo/Asset 26@4x.png';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const next = i18n.resolvedLanguage === 'ar' ? 'en' : 'ar';
    void i18n.changeLanguage(next);
  };

  /* anchor links resolve against the home page */
  const homeHref = (hash: string) => isHome ? hash : `/${hash}`;

  const navLinks = [
    { label: t('navbar.home'),        href: homeHref('#home'),     page: false },
    { label: t('navbar.about'),       href: homeHref('#about'),    page: false },
    { label: t('navbar.why'),         href: homeHref('#why'),      page: false },
    { label: t('navbar.products'),    href: '/products',           page: true  },
    { label: t('navbar.services'),    href: '/departments',        page: true  },
    { label: t('navbar.partners'),    href: '/partnership',        page: true  },
    { label: t('navbar.contact'),     href: '/contact',            page: true  },
  ];

  return (
    <nav className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <img src={logo} alt="Hayani Pharma" className="navbar-logo" />
          </Link>
        </div>

        <div className="navbar-links-desktop">
          {navLinks.map((link) =>
            link.page ? (
              <Link
                key={link.label}
                to={link.href}
                className="navbar-link"
              >
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className="navbar-link">
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="navbar-actions-desktop">
          <button className="lang-btn" onClick={toggleLanguage}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>{t('navbar.language')}</span>
          </button>

          <button
            className={`burger-btn ${isMenuOpen ? 'burger-open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="burger-line burger-line-1" />
            <span className="burger-line burger-line-2" />
            <span className="burger-line burger-line-3" />
          </button>
        </div>

        <button
          className={`burger-btn burger-btn-mobile ${isMenuOpen ? 'burger-open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="burger-line burger-line-1" />
          <span className="burger-line burger-line-2" />
          <span className="burger-line burger-line-3" />
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-content">

          {/* ── close button ── */}
          <button
            className="mobile-close-btn"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button className="mobile-lang-btn" onClick={toggleLanguage}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>{t('navbar.language')}</span>
          </button>
          <div className="mobile-menu-divider" />
          {navLinks.map((link, index) =>
            link.page ? (
              <Link
                key={link.label}
                to={link.href}
                className="mobile-link"
                style={{ animationDelay: `${index * 0.08}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="mobile-link"
                style={{ animationDelay: `${index * 0.08}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
