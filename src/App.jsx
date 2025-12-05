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
import './UltimateMobileFix.css'; // ULTIMATE MOBILE FIX - MUST BE LAST!
import './ThemeToggleMobileFix.css'; // Theme toggle fix

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
      <ThemeProvider>
        <Router>
          <div className="app">
            <StarBackground />
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
                    <ThemeToggle />
                  </div>

                  {/* Mobile Controls (Theme + Menu Button) */}
                  <div className="mobile-controls">
                    {/* Mobile Theme Toggle - Always visible */}
                    <div className="mobile-header-theme">
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
                  <div className="footer-section">
                    <h3>PromptiX</h3>
                    <p>Building amazing digital experiences</p>
                  </div>
                  <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/about">About</Link></li>
                      <li><Link to="/contact">Contact</Link></li>
                    </ul>
                  </div>
                  <div className="footer-section">
                    <h4>Contact</h4>
                    <p>info@promptix.com</p>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="footer-bottom">
                  <p>&copy; 2024 PromptiX. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
