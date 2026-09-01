import { useTranslation } from 'react-i18next';
import './Why.css';

import iconPrecision from '../../assets/HOME/ايقوناتWhy Choose Us/Asset 7@4x.png';
import iconSecurity from '../../assets/HOME/ايقوناتWhy Choose Us/Asset 8@4x.png';
import iconRapid from '../../assets/HOME/ايقوناتWhy Choose Us/Asset 9@4x.png';
import iconSupport from '../../assets/HOME/ايقوناتWhy Choose Us/Asset 10@4x.png';

type WhyKey = 'precision' | 'security' | 'rapid' | 'support';

const whyItems: { key: WhyKey; icon: string }[] = [
  {
    key: 'precision',
    icon: iconPrecision,
  },
  {
    key: 'security',
    icon: iconSecurity,
  },
  {
    key: 'rapid',
    icon: iconRapid,
  },
  {
    key: 'support',
    icon: iconSupport,
  },
];

export default function Why() {
  const { t } = useTranslation();

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

          <h2 className="why-title">{t('why.title')}</h2>

          <span className="why-title-accent" aria-hidden="true" />
        </header>

        <div className="why-grid">
          {whyItems.map((item, index) => (
            <article
              key={item.key}
              className="why-card"
              style={{
                animationDelay: `${index * 100}ms`,
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
