import './CredentialsHero.css'
import heroImg from '../../assets/OFFICIAL-CREDENTIALS/Asset 1@4x.webp'

export default function CredentialsHero() {
  return (
    <section
      id="credentials-hero"
      className="crh-hero"
      aria-label="Official credentials hero"
    >
      <img
        src={heroImg}
        alt=""
        className="crh-bg"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        draggable={false}
      />
      <div className="crh-scrim" aria-hidden="true" />
      <div className="crh-progress" aria-hidden="true">
        <span className="crh-progress__fill" />
      </div>
    </section>
  )
}
