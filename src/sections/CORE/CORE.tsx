import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './CORE.css';
import '../../styles/animatedTitles.css';
import iconInventory from '../../assets/HOME/icons-core-services/Asset 23@4x.png';
import iconDistribution from '../../assets/HOME/icons-core-services/Asset 24@4x.png';
import iconQuality from '../../assets/HOME/icons-core-services/Asset 25@4x.png';

type CoreKey = 'inventory' | 'distribution' | 'quality';

const coreItems: { key: CoreKey; icon: string }[] = [
  { key: 'inventory', icon: iconQuality },
  { key: 'distribution', icon: iconDistribution },
  { key: 'quality', icon: iconInventory },
];

export default function Core() {
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
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(grid);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="services" className="core-section">
      <div className="core-ambient-glow glow-one" />
      <div className="core-ambient-glow glow-two" />

      <div className="core-container">
        <div className="core-title-pill">
          <span className="core-title-side-line" />
          <h2 className="core-title glow-gradient-title">{t('core.title')}</h2>
          <span className="core-title-side-line" />
        </div>

        <div
          ref={gridRef}
          className={`core-grid${isRTL ? ' core-grid--rtl' : ''}`}
        >
          {coreItems.map((item, index) => (
            <article
              key={item.key}
              className="core-card"
              style={{
                ['--reveal-index' as string]: index,
              }}
            >
              <div className="core-card-shine" />

              <div className="core-icon-wrapper">
                <div className="core-icon-glow" />
                <img
                  src={item.icon}
                  alt={t(`core.items.${item.key}.title`)}
                  className="core-icon"
                  loading="lazy"
                />
                <div className="core-icon-shine-top" />
                <div className="core-icon-shine-bottom" />
              </div>

              <div className="core-card-text">
                <h3 className="core-card-title">
                  {t(`core.items.${item.key}.title`)}
                </h3>
                <p className="core-card-subtitle">
                  {t(`core.items.${item.key}.subtitle`)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="core-bottom-accent" />
      </div>
    </section>
  );
}
