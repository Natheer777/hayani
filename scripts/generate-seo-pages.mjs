import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const clientRoot = join(root, '..')
const distRoot = join(clientRoot, 'dist')
const source = await readFile(join(distRoot, 'index.html'), 'utf8')
const seoData = JSON.parse(await readFile(join(clientRoot, 'src', 'seo', 'seoData.json'), 'utf8'))

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;')

const routeLinks = Object.entries(seoData.routes)
  .map(([path, metadata]) => `<a href="${path}">${escapeHtml(metadata.heading)}</a>`)
  .join(' | ')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(seoData.routes).map((path) => `  <url><loc>${seoData.siteUrl}${path === '/' ? '/' : path}</loc></url>`).join('\n')}
</urlset>
`

for (const [path, metadata] of Object.entries(seoData.routes)) {
  const canonical = `${seoData.siteUrl}${path === '/' ? '/' : path}`
  const noscript = `<noscript><main><h1>${escapeHtml(metadata.heading)}</h1><p>${escapeHtml(metadata.summary)}</p><nav aria-label="Site pages">${routeLinks}</nav></main></noscript>`
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${seoData.siteUrl}/` },
        ...(path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: metadata.heading, item: canonical }]),
      ],
    },
  ])
  const html = source
    .replace('<html lang="en">', '<html lang="en">')
    .replace('<title>Hayani Pharma | Pharmaceutical Distribution in Syria</title>', `<title>${escapeHtml(metadata.title)}</title>`)
    .replace('content="Hayani Pharma imports, markets, and distributes pharmaceutical products in Syria."', `content="${escapeHtml(metadata.description)}"`)
    .replace('content="index, follow"', 'content="index, follow"')
    .replace('href="https://hayani-pharma.com/"', `href="${canonical}"`)
    .replace('content="Hayani Pharma | Pharmaceutical Distribution in Syria"', `content="${escapeHtml(metadata.title)}"`)
    .replace('content="https://hayani-pharma.com/"', `content="${canonical}"`)
    .replace('</head>', `  <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />\n  <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />\n  <meta name="twitter:image" content="${seoData.defaultImage}" />\n  <script type="application/ld+json" data-seo-schema>${schema}</script>\n</head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>\n${noscript}`)

  const output = path === '/' ? join(distRoot, 'index.html') : join(distRoot, path.slice(1), 'index.html')
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}

await cp(join(clientRoot, 'public', 'robots.txt'), join(distRoot, 'robots.txt'))
await writeFile(join(distRoot, 'sitemap.xml'), sitemap)