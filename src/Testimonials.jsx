import { useState, useEffect } from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import './Testimonials.css';
import './ScrollAnimations.css';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [sectionRef, sectionVisible] = useScrollAnimation();

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'CEO, TechStart Inc.',
            image: '👩‍💼',
            rating: 5,
            text: 'PromptiX transformed our digital presence completely. Their innovative solutions and dedicated team helped us achieve a 300% increase in user engagement. Absolutely phenomenal work!'
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'CTO, DataFlow Systems',
            image: '👨‍💻',
            rating: 5,
            text: 'Working with PromptiX was a game-changer for our company. They delivered a cutting-edge platform that exceeded all our expectations. Their technical expertise is unmatched.'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Founder, Creative Studio',
            image: '👩‍🎨',
            rating: 5,
            text: 'The team at PromptiX is simply outstanding. They understood our vision perfectly and brought it to life with stunning design and flawless functionality. Highly recommended!'
        },
        {
            id: 4,
            name: 'David Thompson',
            role: 'Director, Global Ventures',
            image: '👨‍💼',
            rating: 5,
            text: 'PromptiX delivered beyond our wildest expectations. Their innovative approach and attention to detail resulted in a solution that has revolutionized our business operations.'
        },
        {
            id: 5,
            name: 'Lisa Anderson',
            role: 'VP Marketing, BrandCo',
            image: '👩‍🔬',
            rating: 5,
            text: 'Exceptional service and incredible results! PromptiX helped us modernize our entire tech stack. Their expertise and professionalism are second to none.'
        }
    ];

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10s
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const renderStars = (rating) => {
        return Array(rating).fill(0).map((_, i) => (
            <span key={i} className="star">⭐</span>
        ));
    };

    return (
        <section
            ref={sectionRef}
            className={`testimonials-section scroll-animate fade-in-up ${sectionVisible ? 'visible' : ''}`}
        >
            <div className="container">
                <h2 className="text-center mb-2xl">What Our Clients Say</h2>
                <p className="testimonials-subtitle text-center">
                    Don't just take our word for it - hear from our satisfied clients
                </p>

                <div className="testimonials-carousel">
                    <button
                        className="carousel-btn prev"
                        onClick={prevSlide}
                        aria-label="Previous testimonial"
                    >
                        ‹
                    </button>

                    <div className="testimonials-track">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`testimonial-card ${index === currentIndex ? 'active' : ''
                                    } ${index === (currentIndex - 1 + testimonials.length) % testimonials.length ? 'prev' : ''
                                    } ${index === (currentIndex + 1) % testimonials.length ? 'next' : ''
                                    }`}
                            >
                                <div className="quote-icon">"</div>
                                <div className="testimonial-rating">
                                    {renderStars(testimonial.rating)}
                                </div>
                                <p className="testimonial-text">{testimonial.text}</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">{testimonial.image}</div>
                                    <div className="author-info">
                                        <h4>{testimonial.name}</h4>
                                        <p>{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="carousel-btn next"
                        onClick={nextSlide}
                        aria-label="Next testimonial"
                    >
                        ›
                    </button>
                </div>

                <div className="carousel-dots">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
