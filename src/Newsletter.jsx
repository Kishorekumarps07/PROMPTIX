import { useState } from 'react';
import { useToast } from './ToastContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import './Newsletter.css';
import './ScrollAnimations.css';

const Newsletter = () => {
    const toast = useToast();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sectionRef, sectionVisible] = useScrollAnimation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Success
            toast.success('🎉 Successfully subscribed! Check your inbox for confirmation.');
            setEmail('');
        } catch (error) {
            toast.error('Failed to subscribe. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            ref={sectionRef}
            className={`newsletter-section scroll-animate fade-in-up ${sectionVisible ? 'visible' : ''}`}
        >
            <div className="newsletter-background">
                <div className="newsletter-circle circle-1"></div>
                <div className="newsletter-circle circle-2"></div>
                <div className="newsletter-circle circle-3"></div>
            </div>

            <div className="container">
                <div className="newsletter-content">
                    <div className="newsletter-icon">📬</div>
                    <h2>Stay Updated with PromptiX</h2>
                    <p className="newsletter-description">
                        Subscribe to our newsletter for the latest insights, tech trends,
                        and exclusive updates delivered straight to your inbox.
                    </p>

                    <form onSubmit={handleSubmit} className="newsletter-form">
                        <div className="form-wrapper">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="newsletter-input"
                                disabled={isSubmitting}
                            />
                            <button
                                type="submit"
                                className="newsletter-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="btn-spinner"></span>
                                        Subscribing...
                                    </>
                                ) : (
                                    <>
                                        Subscribe
                                        <span className="btn-arrow">→</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="newsletter-features">
                        <div className="feature">
                            <span className="feature-icon">✓</span>
                            <span>Weekly insights</span>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">✓</span>
                            <span>Exclusive content</span>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">✓</span>
                            <span>No spam, ever</span>
                        </div>
                    </div>

                    <p className="newsletter-privacy">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
