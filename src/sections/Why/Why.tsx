import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Why.css';
import '../../styles/animatedTitles.css';

import iconPrecision from '../../assets/HOME/icons-why-choose-us/Asset 7@4x.png';
import iconSecurity from '../../assets/HOME/icons-why-choose-us/Asset 8@4x.png';
import iconRapid from '../../assets/HOME/icons-why-choose-us/Asset 9@4x.png';
import iconSupport from '../../assets/HOME/icons-why-choose-us/Asset 10@4x.png';

type WhyKey = 'precision' | 'security' | 'rapid' | 'support';

const whyItems: { key: WhyKey; icon: string }[] = [
  {
    key: 'precision',
    icon: iconSupport,
  },
  {
    key: 'security',
    icon: iconRapid,
  },
  {
    key: 'rapid',
    icon: iconSecurity,
  },
  {
    key: 'support',
    icon: iconPrecision,
  },
];

export default function Why() {
  const { t, i18n } = useTranslation();
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isRTL = i18n.resolvedLanguage === 'ar';

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    let rafId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            rafId = requestAnimationFrame(() => grid.classList.add('is-revealed'));
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(grid);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="why" className="why-section">
      <div className="why-background" aria-hidden="true">
        <span className="why-orb why-orb-one" />
        <span className="why-orb why-orb-two" />
        <span className="why-grid-pattern" />
      </div>

      <div className="why-container">
        <header className="why-header">
          <span className="why-label">
            <span className="why-label-line" />
            <span>Why choose us</span>
            <span className="why-label-line" />
          </span>

          <h2 className="why-title wave-gradient-title">{t('why.title')}</h2>

          <span className="why-title-accent" aria-hidden="true" />
        </header>

        <div
          ref={gridRef}
          className={`why-grid${isRTL ? ' why-grid--rtl' : ''}`}
        >
          {whyItems.map((item, index) => (
            <article
              key={item.key}
              className="why-card"
              style={{
                ['--reveal-index' as string]: index,
              }}
            >
              <div className="why-card-header">
                <span className="why-card-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="why-card-indicator" aria-hidden="true">
                  <span />
                </span>
              </div>

              <div className="why-icon-wrapper">
                <span className="why-icon-halo" aria-hidden="true" />
                <span className="why-icon-ring" aria-hidden="true" />

                <img
                  src={item.icon}
                  alt={t(`why.items.${item.key}.title`)}
                  className="why-icon"
                  loading="lazy"
                />
              </div>

              <div className="why-card-content">
                <h3 className="why-card-title">
                  {t(`why.items.${item.key}.title`)}
                </h3>

                <p className="why-card-subtitle">
                  {t(`why.items.${item.key}.subtitle`)}
                </p>
              </div>

              <span className="why-card-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
