import { About, Core, Footer, Header, Navbar, Trusted, Why, QuickStats, KeepInTouch } from '../../sections/index'


export default function home() {
    return (
        <>
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
