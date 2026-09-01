import { useTranslation } from 'react-i18next';
import './Trusted.css';
import logo1 from '../../assets/HOME/partner-logos/Asset 17@8x.png';
import logo2 from '../../assets/HOME/partner-logos/Asset 18@8x.png';
import logo3 from '../../assets/HOME/partner-logos/Asset 19@8x.png';
import logo4 from '../../assets/HOME/partner-logos/Asset 20@8x.png';
import logo5 from '../../assets/HOME/partner-logos/Asset 21@8x.png';
import logo6 from '../../assets/HOME/partner-logos/Asset 22@8x.png';

const partnerLogos = [logo1, logo2, logo3, logo4, logo5, logo6];

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
          <h2 id="tr-title" className="tr-title">{t('trusted.title')}</h2>
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
                  key={`${i}-${src.slice(-14)}`}
                  className="tr-logo-slot"
                  aria-hidden={i >= partnerLogos.length}
                >
                  <img
                    src={src}
                    alt={i < partnerLogos.length ? `Partner ${i + 1}` : ''}
                    className="tr-logo"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>{/* /tr-strip */}
      </div>

    </section>
  );
}
