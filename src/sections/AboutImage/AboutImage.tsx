import './AboutImage.css';
import aboutImage from '../../assets/HOME/syndicate-image/Asset 6@4x.png';

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
              alt="Al-Hayani Company"
              className="about-image"
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
