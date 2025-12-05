import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import { ThemeProvider } from './ThemeContext'
import ThemeToggle from './ThemeToggle'
import StarBackground from './StarBackground'
import ClickEffect from './ClickEffect'
import BackToTop from './BackToTop'
import LiveChat from './LiveChat'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <StarBackground />
          <ClickEffect />
          <BackToTop />
          <LiveChat />
          {/* Navigation */}
          <nav className="navbar">
            <div className="container">
              <div className="nav-content">
                <Link to="/" className="logo" onClick={closeMobileMenu}>
                  <span className="text-gradient">PromptiX</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="desktop-nav">
                  <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                  </ul>
                  <ThemeToggle />
                </div>

                {/* Mobile Menu Button */}
                <button
                  className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
                  onClick={toggleMobileMenu}
                  aria-label="Toggle menu"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
                <ul className="mobile-nav-links">
                  <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
                  <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
                  <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
                </ul>
                <div className="mobile-theme-toggle">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          {/* Footer */}
          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                <div className="footer-section">
                  <h3 className="text-gradient">PromptiX</h3>
                  <p className="footer-tagline">a solution Company</p>
                  <p>Transforming challenges into innovative solutions.</p>
                </div>

                <div className="footer-section">
                  <h4>Quick Links</h4>
                  <ul className="footer-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><a href="/#services">Services</a></li>
                  </ul>
                </div>

                <div className="footer-section">
                  <h4>Connect</h4>
                  <div className="social-links">
                    <a href="#" className="social-link">GitHub</a>
                    <a href="#" className="social-link">LinkedIn</a>
                    <a href="#" className="social-link">Twitter</a>
                  </div>
                </div>
              </div>

              <div className="footer-bottom">
                <p>&copy; 2025 PromptiX. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
