import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <div className="not-found-animation">
                    <span className="error-code">404</span>
                    <div className="floating-elements">
                        <span className="float-emoji">🔍</span>
                        <span className="float-emoji">❓</span>
                        <span className="float-emoji">🤔</span>
                    </div>
                </div>

                <h1>Page Not Found</h1>
                <p>Oops! The page you're looking for doesn't exist.</p>
                <p className="suggestion">It might have been moved or deleted.</p>

                <div className="not-found-actions">
                    <Link to="/" className="btn btn-primary">
                        🏠 Go to Homepage
                    </Link>
                    <button
                        className="btn btn-secondary"
                        onClick={() => window.history.back()}
                    >
                        ← Go Back
                    </button>
                </div>

                <div className="helpful-links">
                    <h3>Helpful Links:</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
