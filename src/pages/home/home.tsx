import { About, Core, Footer, Header, Navbar, Trusted, Why, QuickStats, KeepInTouch } from '../../sections/index'
import { useTranslation } from 'react-i18next'
import './home.css'

export default function Home() {
    const { t } = useTranslation()

    return (
        <>
            <Navbar />
            <Header />
            <section className="home-seo-intro">
                <h1>{t('home.heading')}</h1>
                <p>{t('home.intro')}</p>
            </section>
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
