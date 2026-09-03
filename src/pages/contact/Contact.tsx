import {
  Navbar,
  ContactHero,
  About,
  KeepInTouch,
  Footer,
  AboutText,
} from '../../sections/index'

export default function Contact() {
  return (
    <>
      <Navbar />
      <ContactHero />
      <AboutText />
      {/* <About /> */}
      <KeepInTouch />
      <Footer />
    </>
  )
}
