import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';
import aboutImage from '../../assets/HOME/صورة النقابة للهوم/Asset 6@4x.png';

export default function About() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const serviceKeys = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'] as const;

  return (
    <section id="about" className="about-section">
      <div className="about-background-shape about-shape-one" />
      <div className="about-background-shape about-shape-two" />

      <div className="about-container">
        <div className="about-card-wrapper">
          <span className="corner-bracket corner-tl" />
          <span className="corner-bracket corner-tr" />
          <span className="corner-bracket corner-bl" />
          <span className="corner-bracket corner-br" />

          <article className="about-glass-card">
            <div className="glass-card-glow" />
            <div className="glass-card-line" />

            <div className="about-card-content">
              <h2 className="about-title">{t('about.title')}</h2>

              <div className="about-title-line">
                <span />
                <span />
                <span />
              </div>

              <div className="about-body">
                <p className="about-text">{t('about.intro_p1')}</p>
                <p className="about-text">{t('about.intro_p2')}</p>

                {expanded && (
                  <div
                    id="about-more-content"
                    className="about-expanded"
                    aria-live="polite"
                  >
                    <p className="about-text">{t('about.intro_p3')}</p>

                    <h3 className="about-services-title">
                      {t('about.services_title')}
                    </h3>

                    <ul className="about-services-list">
                      {serviceKeys.map((key, index) => (
                        <li key={key} className="about-service-item">
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

                    <p className="about-text">{t('about.partners_p')}</p>

                    <p className="about-text about-mission">
                      <span className="mission-mark">“</span>
                      {t('about.mission_p')}
                    </p>
                  </div>
                )}

                <div className="about-footer-actions">
                  <button
                    type="button"
                    className="about-readmore-btn"
                    onClick={() => setExpanded((current) => !current)}
                    aria-expanded={expanded}
                    aria-controls="about-more-content"
                  >
                    <span>
                      {expanded
                        ? t('about.collapse')
                        : t('about.readMore')}
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
                      className={`readmore-arrow ${
                        expanded ? 'arrow-up' : ''
                      }`}
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

        <div className="about-image-wrapper">
          <div className="image-orbit orbit-one" />
          <div className="image-orbit orbit-two" />

          <div className="about-image-border">
            <div className="about-image-inner">
              <img
                src={aboutImage}
                alt="Al-Hayani Company"
                className="about-image"
              />

              <div className="image-overlay" />
              <div className="image-highlight" />
            </div>
          </div>

          <div className="image-floating-dot dot-one" />
          <div className="image-floating-dot dot-two" />
          <div className="image-floating-dot dot-three" />
        </div>
      </div>
    </section>
  );
}
