import './App.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
const Home = lazy(() => import('./pages/home/home'))
const About = lazy(() => import('./pages/about/About'))
const Partnership = lazy(() => import('./pages/partnership/Partnership'))
const Departments = lazy(() => import('./pages/departments/Departments'))
const Contact = lazy(() => import('./pages/contact/Contact'))
const Credentials = lazy(() => import('./pages/credentials/Credentials'))
const Products = lazy(() => import('./pages/products/Products'))
const PartnerWithUs = lazy(() => import('./pages/partner-with-us/PartnerWithUs'))
const AnimatedBackground = lazy(() => import('./components/AnimatedBackground'))
import FloatingSocial from './components/FloatingSocial'
import Spinner from './components/Spinner'
import Seo from './seo/Seo'

function App() {
  return (
    <>
      <Spinner minDisplayTime={4000} playbackRate={2} />

      <Suspense fallback={null}>
        <AnimatedBackground />
      </Suspense>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <BrowserRouter>
          <Seo />
          <FloatingSocial />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/partnership" element={<Partnership />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/credentials" element={<Credentials />} />
              <Route path="/products" element={<Products />} />
              <Route path="/partner-with-us" element={<PartnerWithUs />} />
              <Route path="/ar" element={<Home />} />
              <Route path="/ar/about" element={<About />} />
              <Route path="/ar/partnership" element={<Partnership />} />
              <Route path="/ar/departments" element={<Departments />} />
              <Route path="/ar/contact" element={<Contact />} />
              <Route path="/ar/credentials" element={<Credentials />} />
              <Route path="/ar/products" element={<Products />} />
              <Route path="/ar/partner-with-us" element={<PartnerWithUs />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
