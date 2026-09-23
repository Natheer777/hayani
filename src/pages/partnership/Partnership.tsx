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
      <h1 className="seo-only-heading">Our Partnerships</h1>
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
