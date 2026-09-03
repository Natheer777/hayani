import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FloatingSocial.css'

const FloatingSocial = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const navigate = useNavigate()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const navigationItems = [
    {
      id: 'scroll-top',
      label: 'Scroll to Top',
      onClick: scrollToTop,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'contact',
      label: 'Keep In Touch',
      onClick: () => navigate('/contact'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.592.376 3.095 1.043 4.427l-1.005 3.59a.5.5 0 0 0 .616.615l3.59-1.005A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 10h.01M12 10h.01M16 10h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'home',
      label: 'Home',
      onClick: () => navigate('/'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ]

  return (
    <div className={`floating-social ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="floating-social-container">
        {isExpanded && (
          <div className="navigation-items">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className="nav-item"
                aria-label={item.label}
                title={item.label}
              >
                {item.icon}
              </button>
            ))}
          </div>
        )}
        
        <button
          className="toggle-button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          title={isExpanded ? 'Collapse' : 'Expand'}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`chevron-icon ${isExpanded ? 'expanded' : 'collapsed'}`}
          >
            <path 
              d="M15 18l-6-6 6-6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FloatingSocial
