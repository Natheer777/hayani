import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './QuickStats.css'
import '../../styles/animatedTitles.css'

/* ─────────────────────────────────────────
   Animated counter hook
   Counts from 0 → target over `duration` ms
   using requestAnimationFrame
───────────────────────────────────────── */
function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return
    startRef.current = null

    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [active, target, duration])

  return count
}

/* ─────────────────────────────────────────
   Single stat card
───────────────────────────────────────── */
interface StatCardProps {
  label: string
  value: number
  suffix: string
  delay: number
  active: boolean
  index: number
}

function StatCard({ label, value, suffix, delay, active, index }: StatCardProps) {
  const count = useCounter(value, 2200, active)

  return (
    <div
      className="qs-card"
      style={{ animationDelay: `${delay}s` }}
      aria-label={`${label}: ${value}${suffix}`}
    >
      {/* glowing corner brackets */}
      <span className="qs-bracket qs-bracket--tl" aria-hidden="true" />
      <span className="qs-bracket qs-bracket--br" aria-hidden="true" />

      {/* index pill */}
      <span className="qs-index" aria-hidden="true">
        0{index + 1}
      </span>

      {/* counter */}
      <div className="qs-counter" aria-live="polite">
        <span className="qs-number">
          {count.toLocaleString()}
        </span>
        <span className="qs-suffix">{suffix}</span>
      </div>

      {/* accent line — matches the cyan bar in the design */}
      <div className="qs-bar" aria-hidden="true">
        <span className="qs-bar__fill" />
      </div>

      <p className="qs-label">{label}</p>
    </div>
  )
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function QuickStats() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  /* trigger counters + entrance once section enters viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    {
      key: 'availability',
      value: Number(t('quickstats.items.availability.value')),
      suffix: t('quickstats.items.availability.suffix'),
      label: t('quickstats.items.availability.label'),
    },
    {
      key: 'shipments',
      value: Number(t('quickstats.items.shipments.value')),
      suffix: t('quickstats.items.shipments.suffix'),
      label: t('quickstats.items.shipments.label'),
    },
    {
      key: 'pharmacies',
      value: Number(t('quickstats.items.pharmacies.value')),
      suffix: t('quickstats.items.pharmacies.suffix'),
      label: t('quickstats.items.pharmacies.label'),
    },
  ]

  return (
    <section
      id="quickstats"
      className={`qs-section${visible ? ' qs-section--visible' : ''}`}
      ref={sectionRef}
      aria-labelledby="qs-heading"
    >
      {/* ambient background orbs */}
      <div className="qs-orb qs-orb--a" aria-hidden="true" />
      <div className="qs-orb qs-orb--b" aria-hidden="true" />

      {/* grid texture */}
      <div className="qs-grid" aria-hidden="true" />

      <div className="qs-container">
        {/* heading */}
        <div className="qs-header">
          <h2 id="qs-heading" className="qs-title pulse-gradient-title">
            {t('quickstats.title')}
          </h2>
          <div className="qs-title-lines" aria-hidden="true">
            <span /><span /><span />
          </div>
        </div>

        {/* cards grid */}
        <div className="qs-grid-cards" role="list">
          {stats.map((stat, i) => (
            <div key={stat.key} role="listitem">
              <StatCard
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                delay={0.1 + i * 0.15}
                active={visible}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
