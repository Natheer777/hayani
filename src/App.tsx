import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Home, About, Partnership, Departments, Contact, Credentials, Products } from './pages/index'
import AnimatedBackground from './components/AnimatedBackground'
import FloatingSocial from './components/FloatingSocial'
import Spinner from './components/Spinner'

function App() {
  return (
    <>
      <Spinner minDisplayTime={40000} playbackRate={2} />

      <AnimatedBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <BrowserRouter>
          <FloatingSocial />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/credentials" element={<Credentials />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
