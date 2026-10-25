import './AboutImage.css';
import aboutImage from '../../assets/HOME/syndicate-image/Asset 6@4x.webp';

export default function AboutImage() {
  return (
    <section className="about-image-section">
      <div className="about-image-wrapper">
        <div className="image-orbit orbit-one" />
        <div className="image-orbit orbit-two" />

        <div className="about-image-border">
          <div className="about-image-inner">
            <img
              src={aboutImage}
              width={2239}
              height={739}
              alt="Pharmacists' syndicate building in Damascus"
              className="about-image"
              loading="lazy"
              decoding="async"
            />

            <div className="image-overlay" />
            <div className="image-highlight" />
          </div>
        </div>

        <div className="image-floating-dot dot-one" />
        <div className="image-floating-dot dot-two" />
        <div className="image-floating-dot dot-three" />
      </div>
    </section>
  );
}
