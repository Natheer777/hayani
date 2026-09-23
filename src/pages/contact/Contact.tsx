import {
  Navbar,
  ContactHero,

  KeepInTouch,
  Footer,
  AboutText,
} from '../../sections/index'

export default function Contact() {
  return (
    <>
      <h1 className="seo-only-heading">Contact Hayani Pharma</h1>
      <Navbar />
      <ContactHero />
      <AboutText />
      {/* <About /> */}
      <KeepInTouch />
      <Footer />
    </>
  )
}
