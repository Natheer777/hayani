import { useRef } from 'react'
import './ContactHero.css'

import heroImg from '../../assets/CONTACT US/Asset 1@4x.png'

export default function ContactHero() {
  const progressRef = useRef<HTMLSpanElement>(null)

  return (
    <section
      id="contact-hero"
      className="ch-hero"
      aria-label="Contact us hero"
    >
      {/* background image */}
      <img src={heroImg} alt="" className="ch-bg" draggable={false} />

      {/* bottom scrim */}
      <div className="ch-scrim" aria-hidden="true" />

      {/* bottom accent line */}
      <div className="ch-progress" aria-hidden="true">
        <span ref={progressRef} className="ch-progress__fill" />
      </div>
    </section>
  )
}
