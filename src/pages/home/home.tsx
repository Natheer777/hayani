import { About, Core, Footer, Header, Navbar, Trusted, Why, QuickStats, KeepInTouch } from '../../sections/index'


export default function home() {
    return (
        <>
            <h1 className="seo-only-heading">Hayani Pharma</h1>
            <Navbar />
            <Header />
            <About />
            <Why />
            <Trusted />
            <Core />
            <QuickStats />
            <KeepInTouch />
            <Footer />
        </>
    )
}
