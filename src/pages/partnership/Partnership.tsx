import {
  Navbar,
  PartnershipHero,

  PartnerCards,
  QuickStats,
  KeepInTouch,
  Footer,
  AboutImage,
} from '../../sections/index'

export default function Partnership() {
  return (
    <>
      <Navbar />
      <PartnershipHero />
      {/* <About /> */}
      <AboutImage />
      <PartnerCards />
      <QuickStats />
      <KeepInTouch />
      <Footer />
    </>
  )
}
