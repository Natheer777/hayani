import { Link, useLocation, useParams } from 'react-router-dom'
import { Footer, Navbar } from '../../sections/index'
import { localizePath } from '../../seo/paths'
import englishBlogs from '../../content/blogs/en.json'
import arabicBlogs from '../../content/blogs/ar.json'
import './blogs.css'

export default function BlogArticlePage() {
  const { pathname } = useLocation()
  const { slug } = useParams()
  const language = pathname.startsWith('/ar/') ? 'ar' : 'en'
  const blogs = language === 'ar' ? arabicBlogs : englishBlogs
  const blog = blogs.find((item) => item.slug === slug)
  const backLabel = language === 'ar' ? 'العودة إلى المقالات' : 'Back to articles'
  const notFound = language === 'ar' ? 'المقال غير موجود' : 'Article not found'

  return (
    <>
      <Navbar />
      <main className="blog-article-page" lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {blog ? (
          <article className="blog-article">
            <Link className="blog-back-link" to={localizePath('/blogs', language)}>{backLabel}</Link>
            <h1>{blog.title}</h1>
            {blog.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {blog.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points && (
                  <ul>
                    {section.points.map((point) => (
                      <li key={point.title}>
                        <h3>{point.title}</h3>
                        <p>{point.text}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        ) : (
          <div className="blog-not-found">
            <h1>{notFound}</h1>
            <Link to={localizePath('/blogs', language)}>{backLabel}</Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
