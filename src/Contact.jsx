import { useState } from 'react'
import { useToast } from './ToastContext'
import config from './config'
import './Contact.css'

function Contact() {
    const toast = useToast()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [submitStatus, setSubmitStatus] = useState('')
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required'
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setSubmitStatus('sending')

        try {
            const response = await fetch(`${config.API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                setSubmitStatus('')
                setFormData({ name: '', email: '', message: '' })
                setErrors({})
                toast.success('Message sent successfully! We\'ll get back to you soon.')
            } else {
                setSubmitStatus('')
                toast.error('Failed to send message. Please try again or contact us directly.')
                console.error('Server error:', data)
            }
        } catch (error) {
            console.error('Error:', error)
            setSubmitStatus('')
            toast.error('Network error. Please check your connection and try again.')
        }
    }

    return (
        <div className="contact-page">
            {/* Header Section */}
            <section className="contact-header">
                <div className="contact-decoration animate-float">
                    <div className="decoration-circle"></div>
                    <div className="decoration-circle"></div>
                </div>
                <div className="container">
                    <div className="header-content animate-fade-in-up">
                        <h1>Get In Touch</h1>
                        <p className="header-subtitle">
                            Ready to transform your challenges into solutions? We'd love to hear from you.
                            Reach out to PromptiX and let's create something amazing together.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact-form-section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Information */}
                        <div className="contact-info animate-fade-in-up">
                            <h2>Contact Information</h2>
                            <div className="info-items">
                                <div className="info-item animate-fade-in-up animate-delay-1">
                                    <div className="info-icon">📧</div>
                                    <div className="info-content">
                                        <h3>Email</h3>
                                        <p>hello@promptix.com</p>
                                    </div>
                                </div>

                                <div className="info-item animate-fade-in-up animate-delay-2">
                                    <div className="info-icon">📱</div>
                                    <div className="info-content">
                                        <h3>Phone</h3>
                                        <p>+1 (555) 789-0123</p>
                                    </div>
                                </div>

                                <div className="info-item animate-fade-in-up animate-delay-3">
                                    <div className="info-icon">📍</div>
                                    <div className="info-content">
                                        <h3>Location</h3>
                                        <p>San Francisco, CA</p>
                                    </div>
                                </div>

                                <div className="info-item animate-fade-in-up animate-delay-4">
                                    <div className="info-icon">⏰</div>
                                    <div className="info-content">
                                        <h3>Business Hours</h3>
                                        <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-wrapper animate-fade-in-up animate-delay-1">
                            <form onSubmit={handleSubmit} className="contact-form">
                                <h2>Send Us a Message</h2>

                                <div className="form-group">
                                    <label htmlFor="name">Your Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={errors.name ? 'error' : ''}
                                    />
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Your Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Your Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell us about your project or inquiry..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={errors.message ? 'error' : ''}
                                        rows="6"
                                    ></textarea>
                                    {errors.message && <span className="error-message">{errors.message}</span>}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={submitStatus === 'sending'}
                                >
                                    {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                </button>

                                {submitStatus === 'success' && (
                                    <div className="status-message success">
                                        <span className="status-icon">✅</span>
                                        <p>Message sent successfully! We'll get back to you soon.</p>
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div className="status-message error">
                                        <span className="status-icon">❌</span>
                                        <p>Failed to send message. Please try again or contact us directly.</p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
