import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import seoData from './seoData.json'

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

export default function Seo() {
  const { pathname } = useLocation()
  const route = (pathname.replace(/\/$/, '') || '/') as SeoRoute
  const metadata = seoData.routes[route]
  const canonicalPath = metadata ? route : '/'
  const canonicalUrl = `${siteUrl}${canonicalPath === '/' ? '/' : canonicalPath}`

  useEffect(() => {
    const current = seoData.routes[route]
    const isKnownRoute = Boolean(current)
    const title = current?.title ?? 'Page not found | Hayani Pharma'
    const description = current?.description ?? 'The requested Hayani Pharma page could not be found.'

    document.title = title
    document.documentElement.lang = 'en'
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
                name: current?.heading ?? 'Page',
                item: canonicalUrl,
              }]),
        ],
      },
    ])
    document.head.appendChild(schema)
  }, [canonicalUrl, canonicalPath, route])

  return null
}