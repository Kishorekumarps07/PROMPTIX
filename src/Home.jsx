import { useState } from 'react'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import { useTypingEffect } from './hooks/useTypingEffect'
import { useToast } from './ToastContext'
import Testimonials from './Testimonials'
import FAQ from './FAQ'
import config from './config'
import './Home.css'
import './ScrollAnimations.css'

function Home() {
    const toast = useToast()

    // Typing effect for hero subtitle
    const phrases = [
        'a solution Company',
        'Innovative Technology',
        'Digital Transformation',
        'Creative Excellence',
        'Your Success Partner'
    ]
    const typedText = useTypingEffect(phrases, 100, 50, 2000)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [submitStatus, setSubmitStatus] = useState('')
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

    // Scroll animation hooks
    const [servicesRef, servicesVisible] = useScrollAnimation()
    const [card1Ref, card1Visible] = useScrollAnimation()
    const [card2Ref, card2Visible] = useScrollAnimation()
    const [card3Ref, card3Visible] = useScrollAnimation()
    const [contactRef, contactVisible] = useScrollAnimation()

    const handleMouseMove = (e) => {
        setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitStatus('sending')

        try {
            const response = await fetch(`${config.API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setSubmitStatus('')
                setFormData({ name: '', email: '', message: '' })
                toast.success('Message sent successfully! We\'ll get back to you soon.')
            } else {
                setSubmitStatus('')
                toast.error('Failed to send message. Please try again or contact us directly.')
            }
        } catch (error) {
            console.error('Error:', error)
            setSubmitStatus('')
            toast.error('Network error. Please check your connection and try again.')
        }
    }

    return (
        <div className="home-page" onMouseMove={handleMouseMove}>
            <div
                className="cursor-flare"
                style={{
                    left: cursorPosition.x,
                    top: cursorPosition.y
                }}
            ></div>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background"></div>
                <div className="container">
                    <div className="hero-content">
                        <h1 className="animate-fade-in-up">
                            Welcome to PromptiX
                        </h1>
                        <p className="hero-tagline animate-fade-in-up animate-delay-1">
                            {typedText}<span className="typing-cursor">|</span>
                        </p>
                        <p className="hero-subtitle animate-fade-in-up animate-delay-2">
                            Transforming challenges into innovative solutions with cutting-edge technology and creative excellence
                        </p>
                        <div className="hero-buttons animate-fade-in-up animate-delay-3">
                            <a href="#services" className="btn btn-primary">Explore Solutions</a>
                            <a href="#contact" className="btn btn-secondary">Get Started</a>
                        </div>
                    </div>
                    <div className="hero-decoration animate-float">
                        <div className="decoration-circle"></div>
                        <div className="decoration-circle"></div>
                        <div className="decoration-circle"></div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="services">
                <div className="container">
                    <h2
                        ref={servicesRef}
                        className={`text-center mb-2xl scroll-animate fade-in-up ${servicesVisible ? 'visible' : ''}`}
                    >
                        Our Solutions
                    </h2>
                    <div className="grid grid-3">
                        <div
                            ref={card1Ref}
                            className={`card scroll-animate scale-in ${card1Visible ? 'visible' : ''}`}
                        >
                            <div className="service-icon">🚀</div>
                            <h3>Digital Solutions</h3>
                            <p>
                                Custom web and mobile applications tailored to your business needs.
                                We transform your ideas into powerful digital experiences that drive growth.
                            </p>
                        </div>

                        <div
                            ref={card2Ref}
                            className={`card scroll-animate scale-in stagger-1 ${card2Visible ? 'visible' : ''}`}
                        >
                            <div className="service-icon">💡</div>
                            <h3>Innovation Consulting</h3>
                            <p>
                                Strategic guidance to navigate digital transformation.
                                We help you identify opportunities and implement solutions that matter.
                            </p>
                        </div>

                        <div
                            ref={card3Ref}
                            className={`card scroll-animate scale-in stagger-2 ${card3Visible ? 'visible' : ''}`}
                        >
                            <div className="service-icon">⚡</div>
                            <h3>Tech Integration</h3>
                            <p>
                                Seamless integration of modern technologies into your workflow.
                                From APIs to automation, we make technology work for you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <Testimonials />

            {/* FAQ Section */}
            <FAQ />

            {/* Contact Section */}
            <section id="contact" className="contact">
                <div className="container">
                    <h2
                        ref={contactRef}
                        className={`text-center mb-2xl scroll-animate fade-in-down ${contactVisible ? 'visible' : ''}`}
                    >
                        Get In Touch
                    </h2>
                    <div className="contact-wrapper">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={submitStatus === 'sending'}>
                                {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
