import './AboutHero.css'
import heroImg from '../../assets/HOME/syndicate-image/Asset 6@4x.png'

export default function AboutHero() {
  return (
    <section id="about-hero" className="abh-hero" aria-label="About us hero">
      <img src={heroImg} alt="" className="abh-bg" draggable={false} />
      {/* bottom scrim */}
      <div className="abh-scrim" aria-hidden="true" />
    </section>
  )
}
