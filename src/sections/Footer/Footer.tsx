import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/HOME/logo hayani pharma/Asset 26@4x.png'
import './Footer.css'

export default function Footer() {
  const { t } = useTranslation()

  const footerRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.08 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <footer
      id="footer"
      className={`ft-footer${visible ? ' ft-footer--visible' : ''}`}
      ref={footerRef}
      aria-label="Site footer"
    >
      {/* ambient glows */}
      <div className="ft-orb ft-orb--a" aria-hidden="true" />
      <div className="ft-orb ft-orb--b" aria-hidden="true" />

      {/* top accent line */}
      <div className="ft-topline" aria-hidden="true" />

      {/* ── CONTACT BODY ── */}
      <div className="ft-body">
        <div className="ft-container">
          <div className="ft-inner">

            {/* logo */}
            <a href="#home" className="ft-logo-link" aria-label="Hayani Pharma — back to top">
              <img src={logo} alt="Hayani Pharma" className="ft-logo" />
            </a>

            {/* contact block */}
            <div className="ft-contact">
              <h2 className="ft-contact__title">{t('footer.contact_title')}</h2>
              <div className="ft-contact__bar" aria-hidden="true" />

              <ul className="ft-contact__list">

                {/* address */}
                <li className="ft-contact__item">
                  <span className="ft-contact__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span className="ft-contact__value">{t('footer.address')}</span>
                </li>

                {/* phone */}
                <li className="ft-contact__item">
                  <span className="ft-contact__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07
                        19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3
                        a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09
                        9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573
                        2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <a
                    href={`tel:${t('footer.phone').replace(/\s/g, '')}`}
                    className="ft-contact__link"
                    dir="ltr"
                  >
                    {t('footer.phone')}
                  </a>
                </li>

                {/* email */}
                <li className="ft-contact__item">
                  <span className="ft-contact__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4
                        c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  <a
                    href={`mailto:${t('footer.email')}`}
                    className="ft-contact__link"
                    dir="ltr"
                  >
                    {t('footer.email')}
                  </a>
                </li>

              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── LEGAL BOTTOM BAR ── */}
      <div className="ft-legal">
        <div className="ft-container ft-legal__inner">
          <p className="ft-legal__copyright">{t('footer.copyright')}</p>
          <div className="ft-legal__rule" aria-hidden="true" />
          <p className="ft-legal__text">{t('footer.legal_line1')}</p>
          <p className="ft-legal__text">{t('footer.legal_line2')}</p>
          <p className="ft-legal__text">{t('footer.legal_line3')}</p>
        </div>
      </div>

    </footer>
  )
}
