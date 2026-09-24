import { useTranslation } from 'react-i18next'
import './PartnerWithUsContent.css'

const listKeys = {
  opportunities: ['o1', 'o2', 'o3', 'o4', 'o5', 'o6', 'o7', 'o8', 'o9', 'o10'],
  manufacturerDocuments: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'],
  productDocuments: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11'],
  regulatory: ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12'],
  launch: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10', 'l11', 'l12'],
  exportServices: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10'],
  why: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 'w10'],
} as const

function ContentList({ keys, prefix }: { keys: readonly string[]; prefix: string }) {
  const { t } = useTranslation()

  return (
    <ul className="pwu-list">
      {keys.map((key, index) => (
        <li key={key} className="pwu-list__item">
          <span className="pwu-list__number">{String(index + 1).padStart(2, '0')}</span>
          <span>{t(`partnerWithUs.${prefix}.${key}`)}</span>
        </li>
      ))}
    </ul>
  )
}

export default function PartnerWithUsContent() {
  const { t } = useTranslation()

  return (
    <section className="pwu-content-section" aria-labelledby="pwu-title">
      <div className="pwu-content-container">
        <header className="pwu-content-header">
          <h1 id="pwu-title" className="pwu-content-title">{t('partnerWithUs.title')}</h1>
          <div className="pwu-title-line" aria-hidden="true"><span /><span /><span /></div>
          <p className="pwu-content-subtitle">{t('partnerWithUs.subtitle')}</p>
        </header>

        <div className="pwu-content-body">
          <section className="pwu-block" aria-labelledby="pwu-intro-title">
            <p>{t('partnerWithUs.intro1')}</p>
            <p>{t('partnerWithUs.intro2')}</p>
          </section>

          <section className="pwu-block" aria-labelledby="pwu-opportunities-title">
            <h2 id="pwu-opportunities-title">{t('partnerWithUs.opportunitiesTitle')}</h2>
            <p>{t('partnerWithUs.opportunitiesIntro')}</p>
            <ContentList keys={listKeys.opportunities} prefix="opportunities" />
            <p>{t('partnerWithUs.opportunitiesClosing')}</p>
          </section>

          <section className="pwu-block" aria-labelledby="pwu-market-title">
            <h2 id="pwu-market-title">{t('partnerWithUs.marketTitle')}</h2>
            <p>{t('partnerWithUs.marketIntro')}</p>
            <div className="pwu-subsection">
              <h3>{t('partnerWithUs.manufacturerTitle')}</h3>
              <p>{t('partnerWithUs.manufacturerIntro')}</p>
              <p>{t('partnerWithUs.documentsMayInclude')}</p>
              <ContentList keys={listKeys.manufacturerDocuments} prefix="manufacturerDocuments" />
              <p>{t('partnerWithUs.manufacturerSupport')}</p>
            </div>
            <div className="pwu-subsection">
              <h3>{t('partnerWithUs.productTitle')}</h3>
              <p>{t('partnerWithUs.productIntro')}</p>
              <p>{t('partnerWithUs.dossierMayInclude')}</p>
              <ContentList keys={listKeys.productDocuments} prefix="productDocuments" />
              <p>{t('partnerWithUs.productClosing')}</p>
            </div>
          </section>

          <section className="pwu-block" aria-labelledby="pwu-regulatory-title">
            <h2 id="pwu-regulatory-title">{t('partnerWithUs.regulatoryTitle')}</h2>
            <p>{t('partnerWithUs.regulatoryIntro')}</p>
            <ContentList keys={listKeys.regulatory} prefix="regulatory" />
            <p>{t('partnerWithUs.regulatoryClosing')}</p>
          </section>

          <section className="pwu-block" aria-labelledby="pwu-launch-title">
            <h2 id="pwu-launch-title">{t('partnerWithUs.launchTitle')}</h2>
            <p>{t('partnerWithUs.launchIntro')}</p>
            <ContentList keys={listKeys.launch} prefix="launch" />
            <p>{t('partnerWithUs.launchClosing')}</p>
          </section>

          <section className="pwu-block" aria-labelledby="pwu-export-title">
            <h2 id="pwu-export-title">{t('partnerWithUs.exportTitle')}</h2>
            <p>{t('partnerWithUs.exportIntro')}</p>
            <h3>{t('partnerWithUs.regionsTitle')}</h3>
            <ContentList keys={['region1', 'region2', 'region3', 'region4', 'region5']} prefix="regions" />
            <p>{t('partnerWithUs.exportServicesIntro')}</p>
            <ContentList keys={listKeys.exportServices} prefix="exportServices" />
            <p>{t('partnerWithUs.exportClosing')}</p>
          </section>

          <section className="pwu-block" aria-labelledby="pwu-why-title">
            <h2 id="pwu-why-title">{t('partnerWithUs.whyTitle')}</h2>
            <ContentList keys={listKeys.why} prefix="why" />
          </section>
        </div>
      </div>
    </section>
  )
}