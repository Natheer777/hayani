import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import './KeepInTouch.css'
import '../../styles/animatedTitles.css'

const MAIL_ENDPOINT = 'https://hayani-pharma.com/send.php'


type FormStatus = 'idle' | 'sending' | 'success' | 'error' | 'invalid'

interface FieldProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  required?: boolean
  error?: boolean
}

/* ─────────────────────────────────────────
   Labelled field (input or textarea)
───────────────────────────────────────── */
function Field({ id, label, type = 'text', value, onChange, multiline, required, error }: FieldProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={`kit-field${focused ? ' kit-field--focused' : ''}${value ? ' kit-field--filled' : ''}${error ? ' kit-field--error' : ''}`}>
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
          aria-invalid={error}
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
          aria-invalid={error}
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
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function KeepInTouch() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus]   = useState<FormStatus>('idle')
  const [emailError, setEmailError] = useState(false)
  const [fieldsEmpty, setFieldsEmpty] = useState(false)

  /* entrance observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (email) {
      setEmailError(!EMAIL_REGEX.test(email))
    } else {
      setEmailError(false)
    }
  }, [email])

  /* form submit — sends email via PHP backend with multi-format support */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFieldsEmpty(true)
      setStatus('invalid')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true)
      setStatus('invalid')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    setFieldsEmpty(false)
    setStatus('sending')

    // Build application/x-www-form-urlencoded payload (PHP reads this via $_POST natively)
    const params = new URLSearchParams()
    params.append('from_name',  name)
    params.append('from_email', email)
    params.append('message',    message)
    const formBody = params.toString()

    // Also prepare JSON for endpoints that prefer it
    const jsonBody = JSON.stringify({
      from_name:  name,
      from_email: email,
      message:    message,
    })

    try {
      // 1) Try URL-encoded first — PHP $_POST works natively with this
      let response = await fetch(MAIL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Accept': 'application/json, text/plain, */*',
        },
        body: formBody,
      })

      // 2) Fallback: if server does not like form-urlencoded (e.g. 415), try JSON
      if (response.status === 415) {
        response = await fetch(MAIL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
          },
          body: jsonBody,
        })
      }

      // 3) Second fallback: multipart FormData (another PHP-friendly format)
      if (!response.ok && response.status !== 415) {
        const fd = new FormData()
        fd.append('from_name',  name)
        fd.append('from_email', email)
        fd.append('message',    message)
        const secondTry = await fetch(MAIL_ENDPOINT, { method: 'POST', body: fd })
        if (secondTry.ok) response = secondTry
      }

      // Always read as text first to avoid JSON parse crashes
      const rawText = await response.text()
      let data: { status?: string; success?: boolean | string; message?: string; error?: string } = {}

      try {
        const parsed = JSON.parse(rawText)
        if (parsed && typeof parsed === 'object') data = parsed
      } catch {
        // Not valid JSON — detect success/failure from plain text keywords
        const lower = rawText.toLowerCase().trim()
        if (
          lower.includes('success') ||
          lower.includes('message sent') ||
          lower.includes('email sent') ||
          lower.includes('ok') ||
          lower.includes('sent successfully') ||
          lower.includes('تم الإرسال') ||
          lower.includes('تم بنجاح') ||
          lower.includes('تم') ||
          lower === '1' ||
          lower === 'true'
        ) {
          data = { status: 'success' }
        } else if (
          lower.includes('error') ||
          lower.includes('failed') ||
          lower.includes('fail') ||
          lower.includes('خطأ') ||
          lower.includes('فشل') ||
          lower === '0' ||
          lower === 'false'
        ) {
          data = { status: 'error', message: rawText }
        } else if (response.ok && rawText.length <= 4) {
          // Tiny / empty body with 2xx — lean toward success
          data = { status: 'success' }
        }
      }

      const ok =
        response.ok &&
        (
          data.status  === 'success' ||
          data.success === true      ||
          data.success === 'true'    ||
          // Backstop: HTTP 2xx + no explicit failure marker = treat as success
          (
            data.status  === undefined &&
            data.success === undefined &&
            data.error   === undefined &&
            response.status >= 200 &&
            response.status < 300
          )
        )

      if (ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
        setEmailError(false)
        setFieldsEmpty(false)
      } else {
        // eslint-disable-next-line no-console
        console.warn('[KeepInTouch] Mail endpoint rejected request:', {
          status:   response.status,
          rawText,
          parsed:   data,
        })
        setStatus('error')
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[KeepInTouch] Network / fetch error:', err)
      setStatus('error')
    } finally {
      setTimeout(() => setStatus('idle'), 5000)
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
              error={emailError}
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
            {status === 'invalid' && (
              <p className="kit-feedback kit-feedback--err" role="alert" aria-live="assertive">
                <span className="kit-feedback__icon" aria-hidden="true">⚠</span>
                {fieldsEmpty ? t('contact.required_fields') : (emailError ? t('contact.invalid_email') : t('contact.error'))}
              </p>
            )}
            {emailError && status !== 'invalid' && (
              <p className="kit-feedback kit-feedback--warn" role="alert" aria-live="polite">
                <span className="kit-feedback__icon" aria-hidden="true">⚠</span>
                {t('contact.invalid_email')}
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
