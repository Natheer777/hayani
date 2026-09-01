import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './CredentialCards.css'

const ITEMS = [
  {
    key: 'accreditation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/>
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
      </svg>
    ),
  },
  {
    key: 'academic',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    key: 'vision',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/>
      </svg>
    ),
  },
  {
    key: 'documentation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
] as const

export default function CredentialCards() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="credentials"
      className="crc-section"
      ref={sectionRef}
      aria-label="Official credentials"
    >
      <div className="crc-orb crc-orb--a" aria-hidden="true" />
      <div className="crc-orb crc-orb--b" aria-hidden="true" />
      <div className="crc-grid-bg"        aria-hidden="true" />

      <div className="crc-container">
        {ITEMS.map(({ key, icon }, i) => (
          <article
            key={key}
            className={`crc-card${visible ? ' crc-card--visible' : ''}`}
            style={{ '--delay': `${i * 0.12}s` } as React.CSSProperties}
          >
            {/* corner brackets */}
            <span className="crc-bracket crc-bracket--tl" aria-hidden="true" />
            <span className="crc-bracket crc-bracket--br" aria-hidden="true" />

            {/* icon */}
            <div className="crc-icon" aria-hidden="true">
              {icon}
            </div>

            {/* index */}
            <span className="crc-index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* accent bar */}
            <div className="crc-bar" aria-hidden="true" />

            {/* title */}
            <h2 className="crc-title">
              {t(`credentials.items.${key}.title`)}
            </h2>

            {/* body */}
            <p className="crc-text">
              {t(`credentials.items.${key}.text`)}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
