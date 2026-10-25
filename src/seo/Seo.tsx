import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import seoData from './seoData.json'
import ar from '../locales/ar.json'
import { stripLanguagePrefix } from './paths'

const siteUrl = seoData.siteUrl
const siteName = seoData.siteName

type SeoRoute = keyof typeof seoData.routes

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }
  element.href = href
}

function setAlternateLink(language: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${language}"]`)
  if (!element) {
    element = document.createElement('link')
    element.rel = 'alternate'
    element.hreflang = language
    document.head.appendChild(element)
  }
  element.href = href
}

export default function Seo() {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  const language = pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en'
  const route = (stripLanguagePrefix(pathname).replace(/\/$/, '') || '/') as SeoRoute
  const metadata = seoData.routes[route]
  const canonicalPath = metadata ? route : '/'
  const englishUrl = `${siteUrl}${canonicalPath === '/' ? '/' : canonicalPath}`
  const arabicUrl = `${siteUrl}/ar${canonicalPath === '/' ? '' : canonicalPath}`
  const canonicalUrl = language === 'ar' ? arabicUrl : englishUrl
  const arabicMetadata = language === 'ar'
    ? route === '/'
      ? ar.seo.home
      : route === '/about'
        ? ar.seo.about
        : ar.seo.routes[route.slice(1) as keyof typeof ar.seo.routes]
    : undefined

  useEffect(() => {
    if (i18n.resolvedLanguage !== language) {
      void i18n.changeLanguage(language)
    }

    const current = seoData.routes[route]
    const isKnownRoute = Boolean(current)
    const title = arabicMetadata?.title ?? current?.title ?? 'Page not found | Hayani Pharma'
    const description = arabicMetadata?.description ?? current?.description ?? 'The requested Hayani Pharma page could not be found.'
    const heading = arabicMetadata?.heading ?? current?.heading ?? 'Page'

    document.title = title
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    setMeta('name', 'description', description)
    setMeta('name', 'robots', isKnownRoute ? 'index, follow' : 'noindex, follow')
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', siteName)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:image', seoData.defaultImage)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', seoData.defaultImage)
    setLink('canonical', canonicalUrl)
    if (isKnownRoute) {
      setAlternateLink('en', englishUrl)
      setAlternateLink('ar', arabicUrl)
      setAlternateLink('x-default', englishUrl)
    }

    const existingSchema = document.head.querySelector('script[data-seo-schema]')
    existingSchema?.remove()
    const schema = document.createElement('script')
    schema.type = 'application/ld+json'
    schema.dataset.seoSchema = 'true'
    schema.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteName,
        url: siteUrl,
        logo: seoData.defaultImage,
        email: 'mailto:Contact@hayani-pharma.com',
        telephone: '+963 944242195',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Damascus',
          addressCountry: 'SY',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${siteUrl}/`,
          },
          ...(canonicalPath === '/'
            ? []
            : [{
                '@type': 'ListItem',
                position: 2,
                name: heading,
                item: canonicalUrl,
              }]),
        ],
      },
    ])
    document.head.appendChild(schema)
  }, [arabicMetadata, canonicalUrl, canonicalPath, englishUrl, i18n, language, route, arabicUrl])

  return null
}