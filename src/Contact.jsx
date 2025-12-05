import MultiStepContact from './MultiStepContact'
import './Contact.css'

function Contact() {
    return (
        <div className="contact-page">
            <div className="contact-hero">
                <div className="container">
                    <h1 className="page-title">Get In Touch</h1>
                    <p className="page-subtitle">
                        Let's discuss your project and bring your ideas to life
                    </p>
                </div>
            </div>

            <div className="contact-content">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <div className="contact-info-section">
                            <h2>Contact Information</h2>
                            <p>Fill out the form and our team will get back to you within 24 hours.</p>

                            <div className="contact-details">
                                <div className="contact-item">
                                    <div className="contact-icon">📧</div>
                                    <div>
                                        <h4>Email</h4>
                                        <p>info@promptix.com</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">📱</div>
                                    <div>
                                        <h4>Phone</h4>
                                        <p>+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">📍</div>
                                    <div>
                                        <h4>Location</h4>
                                        <p>San Francisco, CA</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">⏰</div>
                                    <div>
                                        <h4>Business Hours</h4>
                                        <p>Mon-Fri: 9 AM - 6 PM PST</p>
                                    </div>
                                </div>
                            </div>

                            <div className="social-links">
                                <h4>Follow Us</h4>
                                <div className="social-icons">
                                    <a href="#" className="social-icon">🔗 LinkedIn</a>
                                    <a href="#" className="social-icon">🐦 Twitter</a>
                                    <a href="#" className="social-icon">📘 Facebook</a>
                                    <a href="#" className="social-icon">📷 Instagram</a>
                                </div>
                            </div>
                        </div>

                        {/* Multi-Step Form */}
                        <div className="contact-form-section">
                            <MultiStepContact />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
