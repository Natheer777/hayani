import { useEffect, useRef, useState } from 'react'
import './ProductHero.css'
import heroImg from '../../assets/PRODUCT-CATALOG/Asset 1@4x.png'

export default function ProductHero() {
  const [loaded, setLoaded] = useState(false)
  const progressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(id)
  }, [])

  return (
    <section
      id="product-hero"
      className={`prh-hero${loaded ? ' prh-hero--loaded' : ''}`}
      aria-label="Product catalog hero"
    >
      <img src={heroImg} alt="" className="prh-bg" draggable={false} />

      {/* cyan wash */}
      <div className="prh-wash"  aria-hidden="true" />
      {/* bottom scrim */}
      <div className="prh-scrim" aria-hidden="true" />

      {/* corner decorations */}
      <div className="prh-deco prh-deco--tl" aria-hidden="true" />
      <div className="prh-deco prh-deco--br" aria-hidden="true" />

      {/* overlay text — fixed left */}
      <div className="prh-content">
        <h1 className="prh-title">
          <span className="prh-title__line prh-title__line--1" style={{ '--i': 0 } as React.CSSProperties}>
            PRODUCT
          </span>
          <span className="prh-title__line prh-title__line--2" style={{ '--i': 1 } as React.CSSProperties}>
            CATALOG
          </span>
        </h1>
        <div className="prh-tags">
          {['ORGANIZED', 'RELIABLE', 'DIVERSE'].map((tag, i) => (
            <span
              key={tag}
              className="prh-tag"
              style={{ '--i': i + 2 } as React.CSSProperties}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* bottom accent line */}
      <div className="prh-progress" aria-hidden="true">
        <span ref={progressRef} className="prh-progress__fill" />
      </div>
    </section>
  )
}
