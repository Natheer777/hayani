import './ProductHero.css'
import heroImg from '../../assets/PRODUCT-CATALOG/Asset 1@4x.png'

export default function ProductHero() {
  return (
    <section id="product-hero" className="prh-hero" aria-label="Product catalog hero">
      <img src={heroImg} alt="" className="prh-bg" draggable={false} />
      {/* bottom scrim */}
      <div className="prh-scrim" aria-hidden="true" />
    </section>
  )
}
