import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import './KeepInTouch.css'
import '../../styles/animatedTitles.css'

export default function KeepInTouch() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const current = sectionRef.current
    if (!current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          current.classList.add('kit-section--visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" className="kit-section" ref={sectionRef} aria-labelledby="kit-heading">
      <div className="kit-orb kit-orb--a" aria-hidden="true" />
      <div className="kit-orb kit-orb--b" aria-hidden="true" />
      <div className="kit-grid-bg" aria-hidden="true" />

      <div className="kit-container">
        <div className="kit-card">
          <span className="kit-corner kit-corner--tl" aria-hidden="true" />
          <span className="kit-corner kit-corner--tr" aria-hidden="true" />
          <span className="kit-corner kit-corner--bl" aria-hidden="true" />
          <span className="kit-corner kit-corner--br" aria-hidden="true" />

          <div className="kit-scan" aria-hidden="true" />

          <div className="kit-card__header">
            <h2 id="kit-heading" className="kit-card__title flow-gradient-title">
              {t('contact.title')}
            </h2>
            <div className="kit-title-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="kit-card__subtitle">{t('contact.subtitle')}</p>
          </div>

          <div className="kit-contact-inline" aria-label="Contact information">
            <a href={`mailto:${t('footer.email')}`} className="kit-contact-inline__link" dir="ltr">
              <span className="kit-contact-inline__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6 12 13 2 6" />
                </svg>
              </span>
              {t('footer.email')}
            </a>
            <a href={`tel:${t('footer.phone').replace(/\s/g, '')}`} className="kit-contact-inline__link" dir="ltr">
              <span className="kit-contact-inline__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 5.18 2 2 0 0 1 4.11 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              {t('footer.phone')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
