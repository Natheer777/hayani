import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './PartnerCards.css'

import img1 from '../../assets/PARTNERSHIPS/1.png'
import img2 from '../../assets/PARTNERSHIPS/2.png'
import img5 from '../../assets/PARTNERSHIPS/3.png'
import img6 from '../../assets/PARTNERSHIPS/4.png'
import img3 from '../../assets/PARTNERSHIPS/5.png'
import img4 from '../../assets/PARTNERSHIPS/6.png'

const COMPANY_KEYS = [
  'avenzor',
  'medico',
  'alfares',
  'himalaya',
  'unichima',
  'ibnhayyan',
] as const

const LOGOS = [img1, img2, img3, img4, img5, img6]

/* ─── single card ────────────────────────────────────────── */
interface CardProps {
  index: number
  companyKey: string
  logo: string
  visible: boolean
}

function PartnerCard({ index, companyKey, logo, visible }: CardProps) {
  const { t } = useTranslation()

  return (
    <article
      className={`pc-card${visible ? ' pc-card--visible' : ''}`}
      style={{ '--delay': `${index * 0.12}s` } as React.CSSProperties}
      aria-label={t(`partnership.companies.${companyKey}.name`)}
    >
      {/* corner brackets */}
      <span className="pc-bracket pc-bracket--tl" aria-hidden="true" />
      <span className="pc-bracket pc-bracket--br" aria-hidden="true" />

      {/* logo strip — white background, original colours */}
      <div className="pc-logo-strip">
        <img
          src={logo}
          alt={t(`partnership.companies.${companyKey}.name`)}
          className="pc-logo"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* card body */}
      <div className="pc-body">
        <h3 className="pc-name">
          {t(`partnership.companies.${companyKey}.name`)}
        </h3>

        {/* overview */}
        <p className="pc-overview">
          {t(`partnership.companies.${companyKey}.overview`)}
        </p>

        {/* key features */}
        <div className="pc-block">
          <span className="pc-block__label">
            <span className="pc-block__dot" aria-hidden="true" />
            {t('partnership.features_label')}
          </span>
          <p className="pc-block__text">
            {t(`partnership.companies.${companyKey}.features`)}
          </p>
        </div>

        {/* top products */}
        <div className="pc-block">
          <span className="pc-block__label">
            <span className="pc-block__dot" aria-hidden="true" />
            {t('partnership.products_label')}
          </span>
          <p className="pc-block__text pc-block__text--products">
            {t(`partnership.companies.${companyKey}.products`)}
          </p>
        </div>
      </div>
    </article>
  )
}

/* ─── section ────────────────────────────────────────────── */
export default function PartnerCards() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="partner-cards"
      className="pc-section"
      ref={sectionRef}
      aria-label="Partner companies"
    >
      {/* ambient orbs */}
      <div className="pc-orb pc-orb--a" aria-hidden="true" />
      <div className="pc-orb pc-orb--b" aria-hidden="true" />
      <div className="pc-grid-bg"       aria-hidden="true" />

      <div className="pc-container">
        {COMPANY_KEYS.map((key, i) => (
          <PartnerCard
            key={key}
            index={i}
            companyKey={key}
            logo={LOGOS[i]}
            visible={visible}
          />
        ))}
      </div>
    </section>
  )
}
