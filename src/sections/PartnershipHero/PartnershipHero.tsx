import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import './PartnershipHero.css'

// import slide1 from '../../assets/HOME/sliderHome/Asset 3@4x.webp'
import slide2 from '../../assets/HOME/sliderHome/Asset 4@4x.webp'
// import slide3 from '../../assets/HOME/sliderHome/Asset 5@4x.webp'

const slides = [ slide2]

export default function PartnershipHero() {
  const progressRef = useRef<HTMLSpanElement>(null)

  const onAutoplayTimeLeft = (_: unknown, __: number, ratio: number) => {
    if (progressRef.current)
      progressRef.current.style.transform = `scaleX(${1 - ratio})`
  }

  return (
    <section
      id="partnership-hero"
      className="ph-hero"
      aria-label="Partnerships hero"
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        speed={1100}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="ph-swiper"
        aria-roledescription="carousel"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i} aria-roledescription="slide">
            <img
              src={src}
              width={2265}
              height={1264}
              alt=""
              className="ph-slide-img"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* bottom scrim keeps progress bar readable */}
      <div className="ph-scrim" aria-hidden="true" />

      {/* autoplay progress bar */}
      <div className="ph-progress" aria-hidden="true">
        <span ref={progressRef} className="ph-progress__fill" />
      </div>
    </section>
  )
}
