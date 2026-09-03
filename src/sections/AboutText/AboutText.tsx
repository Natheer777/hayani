import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './AboutText.css';
import TypewriterText from '../../components/TypewriterText';

export default function AboutText() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const serviceKeys = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'] as const;

  // Trigger typewriter effect when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('about-text');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [isVisible]);

  return (
    <section id="about-text" className="about-text-section">
      <div className="about-text-card-wrapper">
        <span className="corner-bracket corner-tl" />
        <span className="corner-bracket corner-tr" />
        <span className="corner-bracket corner-bl" />
        <span className="corner-bracket corner-br" />

        <article className="about-text-glass-card">
          <div className="glass-card-glow" />
          <div className="glass-card-line" />

          <div className="about-text-card-content">
            <h2 className="about-text-title">{t('about.title')}</h2>

            <div className="about-text-title-line">
              <span />
              <span />
              <span />
            </div>

            <div className="about-text-body">
              <TypewriterText
                text={t('about.intro_p1')}
                speed={30}
                delay={300}
                className="about-text-text"
                enabled={isVisible}
              />
              <TypewriterText
                text={t('about.intro_p2')}
                speed={30}
                delay={1500}
                className="about-text-text"
                enabled={isVisible}
              />

              {expanded && (
                <div
                  id="about-text-more-content"
                  className="about-text-expanded"
                  aria-live="polite"
                >
                  <p className="about-text-text">{t('about.intro_p3')}</p>

                  <h3 className="about-text-services-title">
                    {t('about.services_title')}
                  </h3>

                  <ul className="about-text-services-list">
                    {serviceKeys.map((key, index) => (
                      <li key={key} className="about-text-service-item">
                        <span className="service-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <span className="service-bullet" />

                        <span className="service-text">
                          {t(`about.services.${key}`)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="about-text-text">{t('about.partners_p')}</p>

                  <p className="about-text-text about-text-mission">
                    <span className="mission-mark">"</span>
                    {t('about.mission_p')}
                  </p>
                </div>
              )}

              <div className="about-text-footer-actions">
                <button
                  type="button"
                  className="about-text-readmore-btn"
                  onClick={() => setExpanded((current) => !current)}
                  aria-expanded={expanded}
                  aria-controls="about-text-more-content"
                >
                  <span>
                    {expanded ? t('about.collapse') : t('about.readMore')}
                  </span>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`readmore-arrow ${expanded ? 'arrow-up' : ''}`}
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <polyline points="13 6 19 12 13 18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
