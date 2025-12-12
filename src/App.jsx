import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
import StarBackground from './StarBackground';
import ClickEffect from './ClickEffect';
import BackToTop from './BackToTop';
import ScrollProgress from './ScrollProgress';
import { useSmoothScroll, useActiveSection } from './hooks/useSmoothScroll';
import './App.css';
import './SmoothScroll.css';
import './GlobalBackground.css';
import './CleanMobileUX.css'; // CLEAN MOBILE UX - FINAL FIX
import './PortfolioScrollMobile.css'; // Portfolio horizontal scroll
import './ThemeToggleMobileFix.css'; // Theme toggle fix
import './StaggeredAnimations.css'; // Staggered card animations
import './VisualEnhancements.css'; // Visual enhancements and better styling
import './ModernFooter.css'; // Modern footer design
import './HoverEffects.css'; // Enhanced hover lift effects

// Components
import ErrorBoundary from './ErrorBoundary';

// Lazy load heavy components
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));
const LiveChat = lazy(() => import('./LiveChat'));
const NotFound = lazy(() => import('./NotFound'));

// Loading fallback component
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Enable smooth scrolling
  useSmoothScroll();

  // Track active section for navigation highlighting
  const activeSection = useActiveSection(['home', 'services', 'contact']);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <ErrorBoundary>
      {/* ThemeProvider removed */}
      <Router>
        <div className="app">
          {/* StarBackground removed for clean corporate look */}
          <ClickEffect />
          <BackToTop />
          <ScrollProgress />

          {/* Navigation */}
          <nav className="navbar">
            <div className="container">
              <div className="nav-content">
                <Link to="/" className="logo" onClick={closeMobileMenu}>
                  PromptiX
                </Link>

                {/* Desktop Navigation */}
                <div className="desktop-nav">
                  <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                  </ul>
                  {/* ThemeToggle removed */}
                </div>

                {/* Mobile Controls (Menu Button Only) */}
                <div className="mobile-controls">
                  {/* Mobile Theme Toggle removed */}

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
              </div>

              {/* Mobile Navigation */}
              <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
                <ul className="mobile-nav-links">
                  <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
                  <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
                  <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
                </ul>
                {/* Mobile Theme Toggle removed */}
              </div>
            </div>
          </nav>

          {/* Main Content with Lazy Loading */}
          <main>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          {/* Lazy load LiveChat */}
          <Suspense fallback={null}>
            <LiveChat />
          </Suspense>

          {/* Footer */}
          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                {/* Company Section */}
                <div className="footer-section">
                  <h3>PromptiX</h3>
                  <p>Building amazing digital experiences that transform businesses and delight users.</p>

                  {/* Social Links */}
                  <div className="social-links">
                    <a href="#" className="social-link" aria-label="Twitter">
                      <span>𝕏</span>
                    </a>
                    <a href="#" className="social-link" aria-label="LinkedIn">
                      <span>in</span>
                    </a>
                    <a href="#" className="social-link" aria-label="GitHub">
                      <span>⚡</span>
                    </a>
                    <a href="#" className="social-link" aria-label="Instagram">
                      <span>📷</span>
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                  <h4>Quick Links</h4>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                  </ul>
                </div>

                {/* Contact */}
                <div className="footer-section">
                  <h4>Contact</h4>
                  <p data-icon="📧">info@promptix.com</p>
                  <p data-icon="📞">+1 (555) 123-4567</p>
                  <p data-icon="📍">San Francisco, CA</p>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="footer-bottom">
                <p>&copy; 2024 PromptiX. All rights reserved.</p>
                <div className="footer-links">
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms of Service</a>
                  <a href="#">Cookie Policy</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
      {/* ThemeProvider removed */}
    </ErrorBoundary>
  );
}

export default App;
