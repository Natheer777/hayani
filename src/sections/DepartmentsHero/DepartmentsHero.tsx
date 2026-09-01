import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import './DepartmentsHero.css'

import slide2 from '../../assets/COMPANY DEPARTMENTS/صورة العامل في المستودع.png'

const slides = [slide2]

export default function DepartmentsHero() {
  const progressRef = useRef<HTMLSpanElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(id)
  }, [])

  const onAutoplayTimeLeft = (_: unknown, __: number, ratio: number) => {
    if (progressRef.current)
      progressRef.current.style.transform = `scaleX(${1 - ratio})`
  }

  return (
    <section
      id="departments-hero"
      className={`dh-hero${loaded ? ' dh-hero--loaded' : ''}`}
      aria-label="Company departments hero"
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        speed={1100}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="dh-swiper"
        aria-roledescription="carousel"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i} aria-roledescription="slide">
            <img src={src} alt="" className="dh-slide-img" draggable={false} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* cyan wash */}
      <div className="dh-wash" aria-hidden="true" />

      {/* bottom scrim */}
      <div className="dh-scrim" aria-hidden="true" />

      {/* ── overlay text ── */}
      <div className="dh-content">
        <h1 className="dh-title">
          <span className="dh-title__line dh-title__line--1" style={{ '--i': 0 } as React.CSSProperties}>
            QUALITY
          </span>
          <span className="dh-title__line dh-title__line--2" style={{ '--i': 1 } as React.CSSProperties}>
            FIRST
          </span>
        </h1>
        <div className="dh-tags">
          {['RELIABILITY', 'QUALITY', 'SAFETY'].map((tag, i) => (
            <span
              key={tag}
              className="dh-tag"
              style={{ '--i': i + 2 } as React.CSSProperties}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* corner decorations */}
      <div className="dh-deco dh-deco--tl" aria-hidden="true" />
      <div className="dh-deco dh-deco--br" aria-hidden="true" />

      {/* autoplay progress bar */}
      <div className="dh-progress" aria-hidden="true">
        <span ref={progressRef} className="dh-progress__fill" />
      </div>
    </section>
  )
}
