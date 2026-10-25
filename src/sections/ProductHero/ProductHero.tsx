import './ProductHero.css'
import heroImg from '../../assets/PRODUCT-CATALOG/Asset 1@4x.webp'

export default function ProductHero() {
  return (
    <section id="product-hero" className="prh-hero" aria-label="Product catalog hero">
      <img
        src={heroImg}
        width={2266}
        height={1265}
        alt=""
        className="prh-bg"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        draggable={false}
      />
      {/* bottom scrim */}
      <div className="prh-scrim" aria-hidden="true" />
    </section>
  )
}
