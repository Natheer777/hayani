import './AboutHero.css'
import heroImg from '../../assets/HOME/syndicate-image/Asset 6@4x.webp'

export default function AboutHero() {
  return (
    <section id="about-hero" className="abh-hero" aria-label="About us hero">
      <img
        src={heroImg}
        width={2239}
        height={739}
        alt=""
        className="abh-bg"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        draggable={false}
      />
      {/* bottom scrim */}
      <div className="abh-scrim" aria-hidden="true" />
    </section>
  )
}
