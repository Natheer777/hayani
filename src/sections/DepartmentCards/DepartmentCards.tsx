import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './DepartmentCards.css'

import imgWarehouse    from '../../assets/COMPANY-DEPARTMENTS/warehouse.png'
import imgWorker       from '../../assets/COMPANY-DEPARTMENTS/warehouse-worker.png'
import imgDirector     from '../../assets/COMPANY-DEPARTMENTS/director-office.jpeg'
import imgMeeting      from '../../assets/COMPANY-DEPARTMENTS/meeting-room.jpeg'

const DEPARTMENTS = [
  { key: 'warehouse',    img: imgWarehouse,  index: 1 },
  { key: 'distribution', img: imgWorker,     index: 2 },
  { key: 'director',     img: imgDirector,   index: 3 },
  { key: 'meeting',      img: imgMeeting,    index: 4 },
] as const

/* ── single row ── */
interface RowProps {
  deptKey: string
  img: string
  index: number
  reverse: boolean
  visible: boolean
}

function DepartmentRow({ deptKey, img, index, reverse, visible }: RowProps) {
  const { t } = useTranslation()

  return (
    <div
      className={`dc-row${reverse ? ' dc-row--reverse' : ''}${visible ? ' dc-row--visible' : ''}`}
      style={{ '--delay': `${(index - 1) * 0.12}s` } as React.CSSProperties}
    >
      {/* image pane */}
      <div className="dc-img-wrap">
        {/* corner brackets */}
        <span className="dc-bracket dc-bracket--tl" aria-hidden="true" />
        <span className="dc-bracket dc-bracket--br" aria-hidden="true" />

        <img
          src={img}
          alt={t(`departments.items.${deptKey}.title`)}
          className="dc-img"
          loading="lazy"
          draggable={false}
        />
        {/* index badge */}
        <span className="dc-index" aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
      </div>

      {/* text pane */}
      <div className="dc-text">
        {/* top accent line */}
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

/* ── section ── */
export default function DepartmentCards() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible]   = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.06 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="departments"
      className="dc-section"
      ref={sectionRef}
      aria-label="Company departments"
    >
      {/* ambient orbs */}
      <div className="dc-orb dc-orb--a" aria-hidden="true" />
      <div className="dc-orb dc-orb--b" aria-hidden="true" />
      <div className="dc-grid-bg"       aria-hidden="true" />

      <div className="dc-container">
        {DEPARTMENTS.map(({ key, img, index }) => (
          <DepartmentRow
            key={key}
            deptKey={key}
            img={img}
            index={index}
            /* alternate layout: odd = image-left, even = image-right */
            reverse={index % 2 === 0}
            visible={visible}
          />
        ))}
      </div>
    </section>
  )
}
