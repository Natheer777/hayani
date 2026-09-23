import {
  Navbar,
  CredentialsHero,
  Why,
  CredentialCards,
  Core,
  QuickStats,
  Footer,
} from '../../sections/index'

export default function Credentials() {
  return (
    <>
      <h1 className="seo-only-heading">Official Credentials</h1>
      <Navbar />
      <CredentialsHero />
      <Why />
      <CredentialCards />
      <Core />
      <QuickStats />
      <Footer />
    </>
  )
}
