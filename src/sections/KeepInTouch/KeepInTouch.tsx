import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import './KeepInTouch.css'
import '../../styles/animatedTitles.css'

const MAIL_ENDPOINT = 'https://hayani-pharma.com/hayani/send_mail.php'


type FormStatus = 'idle' | 'sending' | 'success' | 'error'

interface FieldProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  required?: boolean
}

/* ─────────────────────────────────────────
   Labelled field (input or textarea)
───────────────────────────────────────── */
function Field({ id, label, type = 'text', value, onChange, multiline, required }: FieldProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={`kit-field${focused ? ' kit-field--focused' : ''}${value ? ' kit-field--filled' : ''}`}>
      <label className="kit-field__label" htmlFor={id}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          className="kit-field__input kit-field__textarea"
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          rows={4}
          aria-required={required}
        />
      ) : (
        <input
          id={id}
          className="kit-field__input"
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          aria-required={required}
        />
      )}
      {/* animated bottom border */}
      <span className="kit-field__line" aria-hidden="true" />
    </div>
  )
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function KeepInTouch() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus]   = useState<FormStatus>('idle')

  /* entrance observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  /* form submit — sends email via PHP backend */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch(MAIL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_name:  name,
          from_email: email,
          message:    message,
        }),
      })

      const data = await response.json() as { status: string }

      if (data.status === 'success') {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section
      id="contact"
      className={`kit-section${visible ? ' kit-section--visible' : ''}`}
      ref={sectionRef}
      aria-labelledby="kit-heading"
    >
      {/* ambient orbs */}
      <div className="kit-orb kit-orb--a" aria-hidden="true" />
      <div className="kit-orb kit-orb--b" aria-hidden="true" />

      {/* grid texture */}
      <div className="kit-grid-bg" aria-hidden="true" />

      <div className="kit-container">
        {/* glass card */}
        <div className="kit-card">
          {/* corner bracket decorations */}
          <span className="kit-corner kit-corner--tl" aria-hidden="true" />
          <span className="kit-corner kit-corner--tr" aria-hidden="true" />
          <span className="kit-corner kit-corner--bl" aria-hidden="true" />
          <span className="kit-corner kit-corner--br" aria-hidden="true" />

          {/* scanning line animation */}
          <div className="kit-scan" aria-hidden="true" />

          {/* header */}
          <div className="kit-card__header">
            <h2 id="kit-heading" className="kit-card__title flow-gradient-title">
              {t('contact.title')}
            </h2>
            <div className="kit-title-lines" aria-hidden="true">
              <span /><span /><span />
            </div>
            <p className="kit-card__subtitle">{t('contact.subtitle')}</p>
          </div>

          {/* form */}
          <form
            className="kit-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label={t('contact.title')}
          >
            <Field
              id="kit-name"
              label={t('contact.name_label')}
              value={name}
              onChange={setName}
              required
            />
            <Field
              id="kit-email"
              label={t('contact.email_label')}
              type="email"
              value={email}
              onChange={setEmail}
              required
            />
            <Field
              id="kit-message"
              label={t('contact.message_label')}
              value={message}
              onChange={setMessage}
              multiline
              required
            />

            {/* status feedback */}
            {status === 'success' && (
              <p className="kit-feedback kit-feedback--ok" role="status" aria-live="polite">
                <span className="kit-feedback__icon" aria-hidden="true">✓</span>
                {t('contact.success')}
              </p>
            )}
            {status === 'error' && (
              <p className="kit-feedback kit-feedback--err" role="alert" aria-live="assertive">
                <span className="kit-feedback__icon" aria-hidden="true">✕</span>
                {t('contact.error')}
              </p>
            )}

            {/* submit button */}
            <button
              type="submit"
              className={`kit-btn${status === 'sending' ? ' kit-btn--loading' : ''}`}
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
            >
              {status === 'sending' ? (
                <span className="kit-btn__spinner" aria-hidden="true" />
              ) : null}
              <span className="kit-btn__label">{t('contact.send_btn')}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
