import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import './Header.css';

import slide1 from '../../assets/HOME/sliderHome/Asset 3@4x.png';
import slide2 from '../../assets/HOME/sliderHome/Asset 4@4x.png';
import slide3 from '../../assets/HOME/sliderHome/Asset 5@4x.png';

const slides = [
  { image: slide1, id: 1 },
  { image: slide2, id: 2 },
  { image: slide3, id: 3 },
];

export default function Header() {
  const { i18n } = useTranslation();
  const isRTL = i18n.resolvedLanguage === 'ar';
  const progressRef = useRef<HTMLSpanElement>(null);

  const onAutoplayTimeLeft = (_: unknown, __: number, ratio: number) => {
    if (progressRef.current) {
      progressRef.current.style.transform = `scaleX(${1 - ratio})`;
    }
  };

  return (
    <section
      id="home"
      className="hdr-hero"
      aria-label="Homepage hero slider"
    >
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        speed={1100}
        pagination={{ clickable: true, el: '.hdr-pagination' }}
        navigation={{ nextEl: '.hdr-btn-next', prevEl: '.hdr-btn-prev' }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="hdr-swiper"
        aria-roledescription="carousel"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} aria-roledescription="slide">
            <img
              src={slide.image}
              alt=""
              className="hdr-slide-img"
              draggable={false}
            />
            {/* bottom scrim keeps pagination readable */}
            <div className="hdr-scrim" aria-hidden="true" />
          </SwiperSlide>
        ))}

        {/* progress bar */}
        <div className="hdr-progress-bar" aria-hidden="true">
          <span ref={progressRef} className="hdr-progress-bar__fill" />
        </div>

        {/* pagination dots */}
        <div className="hdr-pagination" role="tablist" aria-label="Slide navigation" />

        {/* prev / next */}
        <div className="hdr-nav">
          <button type="button" className="hdr-btn-prev hdr-nav__btn"
            aria-label={isRTL ? 'التالي' : 'Previous slide'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/>
            </svg>
          </button>
          <button type="button" className="hdr-btn-next hdr-nav__btn"
            aria-label={isRTL ? 'السابق' : 'Next slide'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>
            </svg>
          </button>
        </div>

      </Swiper>
    </section>
  );
}
