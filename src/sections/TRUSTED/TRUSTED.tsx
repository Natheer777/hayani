import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './TRUSTED.css';
import '../../styles/animatedTitles.css';
import logo1 from '../../assets/HOME/partner-logos/Asset 17@8x.webp';
import logo2 from '../../assets/HOME/partner-logos/Asset 18@8x.webp';
import logo3 from '../../assets/HOME/partner-logos/Asset 19@8x.webp';
import logo4 from '../../assets/HOME/partner-logos/Asset 20@8x.webp';
import logo5 from '../../assets/HOME/partner-logos/Asset 21@8x.webp';
import logo6 from '../../assets/HOME/partner-logos/Asset 22@8x.webp';

const partnerLogos = [
  { src: logo1, companyKey: 'alfares' },
  { src: logo2, companyKey: 'himalaya' },
  { src: logo3, companyKey: 'ibnhayyan' },
  { src: logo4, companyKey: 'unichima' },
  { src: logo5, companyKey: 'medico' },
  { src: logo6, companyKey: 'avenzor' },
];

export default function Trusted() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.resolvedLanguage === 'ar';

  // triple for seamless loop with no visible gap
  const loop = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section id="partners" className="tr-section" aria-labelledby="tr-title">

      <div className="tr-container">

        {/* ── title pill — rounded border box ── */}
        <div className="tr-title-box">
          <h2 id="tr-title" className="tr-title shimmer-gradient-title">{t('trusted.title')}</h2>
        </div>

        {/* ── white marquee strip ── */}
        <div className="tr-strip">

          {/* cyan top border line */}
          <div className="tr-strip__line tr-strip__line--top"    aria-hidden="true" />
          {/* cyan bottom border line */}
          <div className="tr-strip__line tr-strip__line--bottom" aria-hidden="true" />

          {/* edge fades */}
          <div className="tr-fade tr-fade--left"  aria-hidden="true" />
          <div className="tr-fade tr-fade--right" aria-hidden="true" />

          {/* scrolling track */}
          <div
            className="tr-marquee"
            aria-label={t('trusted.title')}
          >
            <div className={`tr-track${isRTL ? ' tr-track--rtl' : ''}`}>
              {loop.map((src, i) => (
                <div
                  key={`${i}-${src.src.slice(-14)}`}
                  className="tr-logo-slot"
                  aria-hidden={i >= partnerLogos.length}
                >
                  <img
                    src={src.src}
                    alt={i < partnerLogos.length ? t(`partnership.companies.${src.companyKey}.name`) : ''}
                    className="tr-logo"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>{/* /tr-strip */}

        {/* ── discover products CTA ── */}
        <Link to="/products" className="tr-cta">
          <span className="tr-cta__glow" aria-hidden="true" />
          <span className="tr-cta__scan" aria-hidden="true" />
          <span className="tr-cta__corner tr-cta__corner--tl" aria-hidden="true" />
          <span className="tr-cta__corner tr-cta__corner--tr" aria-hidden="true" />
          <span className="tr-cta__corner tr-cta__corner--bl" aria-hidden="true" />
          <span className="tr-cta__corner tr-cta__corner--br" aria-hidden="true" />
          <span className="tr-cta__label">
            {t('trusted.discover_products')}
          </span>
          <svg
            className="tr-cta__arrow"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <polyline points="13 6 19 12 13 18" />
          </svg>
        </Link>

      </div>

    </section>
  );
}
