import { Link, useLocation } from 'react-router-dom'
import { Footer, Navbar } from '../../sections/index'
import { localizePath } from '../../seo/paths'
import englishBlogs from '../../content/blogs/en.json'
import arabicBlogs from '../../content/blogs/ar.json'
import './blogs.css'

export default function BlogsPage() {
  const { pathname } = useLocation()
  const language = pathname.startsWith('/ar/') ? 'ar' : 'en'
  const blogs = language === 'ar' ? arabicBlogs : englishBlogs
  const labels = language === 'ar'
    ? { title: 'المقالات الدوائية', description: 'مقالات وإرشادات حول التوزيع الدوائي وإدارة المخزون وجودة الأدوية.', read: 'اقرأ المقال' }
    : { title: 'Pharmaceutical Insights', description: 'Guides and insights on pharmaceutical distribution, inventory management, and medicine quality.', read: 'Read article' }

  return (
    <>
      <Navbar />
      <main className="blogs-page" lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <header className="blogs-header">
          <h1 className='why-title wave-gradient-title'>{labels.title}</h1>
          <p>{labels.description}</p>
        </header>
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <article className="blog-card" key={blog.slug}>
              <h2 className='why-title'>{blog.title}</h2>
              <p>{blog.intro[0]}</p>
              <Link to={localizePath(`/blogs/${blog.slug}`, language)}>
                {labels.read}
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
