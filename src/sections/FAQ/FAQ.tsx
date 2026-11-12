import { useTranslation } from 'react-i18next'
import ar from '../../locales/ar.json'
import en from '../../locales/en.json'
import './FAQ.css'

export default function FAQ() {
  const { i18n, t } = useTranslation()
  const items = i18n.resolvedLanguage === 'ar' ? ar.faq.items : en.faq.items

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-container">
        <h1 id="faq-title" className="faq-title">{t('faq.title')}</h1>
        <div className="faq-list">
          {items.map(({ question, answer }) => (
            <details className="faq-item" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
