import { useTranslation } from 'react-i18next'
import './DepartmentCards.css'

import imgMain from '../../assets/COMPANY-DEPARTMENTS/warehouse.png'

const DEPARTMENTS = [{ key: 'mainCenter', img: imgMain, index: 1 }] as const

const GOVERNORATES = [
  'damascus',
  'rifDimashq',
  'aleppo',
  'homs',
  'hama',
  'latakia',
  'tartus',
  'deirEzzor',
  'alHasakah',
  'daraa',
  'asSuwayda',
  'idlib',
  'quneitra',
] as const

interface RowProps {
  deptKey: string
  img: string
  index: number
}

function DepartmentRow({ deptKey, img, index }: RowProps) {
  const { t } = useTranslation()

  return (
    <div className="dc-row" style={{ '--delay': `${(index - 1) * 0.12}s` } as React.CSSProperties}>
      <div className="dc-img-wrap">
        <span className="dc-bracket dc-bracket--tl" aria-hidden="true" />
        <span className="dc-bracket dc-bracket--br" aria-hidden="true" />

        <img
          src={img}
          alt={t(`departments.items.${deptKey}.title`)}
          className="dc-img"
          loading="lazy"
          draggable={false}
        />
        <span className="dc-index" aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
      </div>

      <div className="dc-text">
        <div className="dc-text__bar" aria-hidden="true" />

        <h2 className="dc-text__title">
          {t(`departments.items.${deptKey}.title`)}
        </h2>

        <p className="dc-text__body">
          {t(`departments.items.${deptKey}.text`)}
        </p>
      </div>
    </div>
  )
}

export default function DepartmentCards() {
  const { t } = useTranslation()

  return (
    <section id="departments" className="dc-section" aria-label="Company departments">
      <div className="dc-orb dc-orb--a" aria-hidden="true" />
      <div className="dc-orb dc-orb--b" aria-hidden="true" />
      <div className="dc-grid-bg" aria-hidden="true" />

      <div className="dc-container">
        {DEPARTMENTS.map(({ key, img, index }) => (
          <DepartmentRow key={key} deptKey={key} img={img} index={index} />
        ))}

        <div className="dc-network">
          <div className="dc-network__head">
            <span className="dc-network__eyebrow">{t('departments.network.eyebrow')}</span>
            <h3 className="dc-network__title">{t('departments.network.title')}</h3>
          </div>

          <ul className="dc-network__list">
            {GOVERNORATES.map((item) => (
              <li key={item} className="dc-network__item">
                {t(`departments.network.items.${item}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
