import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const clientRoot = join(root, '..')
const distRoot = join(clientRoot, 'dist')
const source = await readFile(join(distRoot, 'index.html'), 'utf8')
const seoData = JSON.parse(await readFile(join(clientRoot, 'src', 'seo', 'seoData.json'), 'utf8'))
const arLocale = JSON.parse(await readFile(join(clientRoot, 'src', 'locales', 'ar.json'), 'utf8'))

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;')

const arabicRoutes = Object.fromEntries(
  Object.keys(seoData.routes).map((path) => {
    const key = path === '/' ? 'home' : path.slice(1)
    const metadata = key === 'home' || key === 'about' ? arLocale.seo[key] : arLocale.seo.routes[key]
    return [path, metadata]
  })
)
const localizedPath = (path, language) => language === 'ar'
  ? `/ar${path === '/' ? '' : path}`
  : path
const absoluteUrl = (path, language) => `${seoData.siteUrl}${localizedPath(path, language) || '/'}`
const localizedRoutes = [
  ...Object.entries(seoData.routes).map(([path, metadata]) => ({ path, language: 'en', metadata })),
  ...Object.entries(arabicRoutes).map(([path, metadata]) => ({ path, language: 'ar', metadata })),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Object.keys(seoData.routes).map((path) => `  <url>
    <loc>${absoluteUrl(path, 'en')}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${absoluteUrl(path, 'en')}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${absoluteUrl(path, 'ar')}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(path, 'en')}" />
  </url>`).join('\n')}
</urlset>
`

for (const { path, language, metadata } of localizedRoutes) {
  const canonical = absoluteUrl(path, language)
  const localizedLinks = Object.entries(language === 'ar' ? arabicRoutes : seoData.routes)
    .map(([routePath, routeMetadata]) => `<a href="${localizedPath(routePath, language)}">${escapeHtml(routeMetadata.heading)}</a>`)
    .join(' | ')
  const homeLabel = language === 'ar' ? 'الرئيسية' : 'Home'
  const noscript = `<noscript><main><h1>${escapeHtml(metadata.heading)}</h1><p>${escapeHtml(metadata.summary)}</p><nav aria-label="${homeLabel}">${localizedLinks}</nav></main></noscript>`
  const schema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: seoData.siteName,
      url: seoData.siteUrl,
      logo: seoData.defaultImage,
      email: 'mailto:Contact@hayani-pharma.com',
      telephone: '+963 944242195',
      address: { '@type': 'PostalAddress', addressLocality: 'Damascus', addressCountry: 'SY' },
    },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: seoData.siteName, url: seoData.siteUrl },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeLabel, item: absoluteUrl('/', language) },
        ...(path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: metadata.heading, item: canonical }]),
      ],
    },
  ])
  const html = source
    .replace(/<html lang="[^"]*">/, `<html lang="${language}" dir="${language === 'ar' ? 'rtl' : 'ltr'}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(metadata.description)}" />`)
    .replace('content="index, follow"', 'content="index, follow"')
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace('</head>', `  <link rel="alternate" hreflang="en" href="${absoluteUrl(path, 'en')}" />\n  <link rel="alternate" hreflang="ar" href="${absoluteUrl(path, 'ar')}" />\n  <link rel="alternate" hreflang="x-default" href="${absoluteUrl(path, 'en')}" />\n  <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />\n  <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />\n  <meta name="twitter:image" content="${seoData.defaultImage}" />\n  <script type="application/ld+json" data-seo-schema>${schema}</script>\n</head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>\n${noscript}`)

  const routePath = localizedPath(path, language).replace(/^\//, '')
  const output = routePath ? join(distRoot, routePath, 'index.html') : join(distRoot, 'index.html')
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}

await cp(join(clientRoot, 'public', 'robots.txt'), join(distRoot, 'robots.txt'))
await writeFile(join(distRoot, 'sitemap.xml'), sitemap)