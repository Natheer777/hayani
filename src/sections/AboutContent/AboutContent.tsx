import { useTranslation } from 'react-i18next'
import './AboutContent.css'

export default function AboutContent() {
  const { t } = useTranslation()
  const serviceKeys = ['s1', 's2', 's3', 's4', 's5', 's6'] as const

  return (
    <section className="about-content-section">
      <div className="about-content-container">
        <div className="about-content-header">
          <span className="about-content-eyebrow">{t('about.title')}</span>
          <h1 className="about-content-title">{t('about.pageHeading')}</h1>
          <div className="about-title-line">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="about-content-body">
          <p className="about-paragraph">{t('about.intro_p1')}</p>
          <p className="about-paragraph">{t('about.intro_p2')}</p>

          <h2 className="about-services-heading">{t('about.experience_title')}</h2>
          <p className="about-paragraph">{t('about.experience_p1')}</p>
          <p className="about-paragraph">{t('about.experience_p2')}</p>

          <h2 className="about-services-heading">{t('about.services_title')}</h2>

          <ul className="about-services-grid">
            {serviceKeys.map((key, index) => (
              <li key={key} className="about-service-card">
                <span className="service-number-badge">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="service-text">{t(`about.services.${key}`)}</p>
              </li>
            ))}
          </ul>

          <h2 className="about-services-heading">{t('about.partner_title')}</h2>
          <p className="about-paragraph">{t('about.partners_p')}</p>

          <blockquote className="about-mission-quote">
            <span className="quote-mark">"</span>
            <h2 className="about-services-heading">{t('about.mission_title')}</h2>
            <p>{t('about.mission_p')}</p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
