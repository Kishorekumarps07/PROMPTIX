import { useState } from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import './FAQ.css';
import './ScrollAnimations.css';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [sectionRef, sectionVisible] = useScrollAnimation();

    const faqs = [
        {
            id: 1,
            question: 'What services does PromptiX offer?',
            answer: 'PromptiX specializes in digital solutions, innovation consulting, and tech integration. We create custom web and mobile applications, provide strategic guidance for digital transformation, and seamlessly integrate modern technologies into your workflow. Our comprehensive services are tailored to meet your unique business needs.'
        },
        {
            id: 2,
            question: 'How long does a typical project take?',
            answer: 'Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while a complex web application could take 2-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process with regular milestones and deliverables.'
        },
        {
            id: 3,
            question: 'What is your development process?',
            answer: 'Our process includes five key phases: Discovery & Planning, Design & Prototyping, Development & Testing, Deployment & Launch, and Ongoing Support & Maintenance. We follow agile methodologies, ensuring regular communication, iterative development, and your involvement at every stage to guarantee the final product exceeds expectations.'
        },
        {
            id: 4,
            question: 'Do you provide ongoing support after launch?',
            answer: 'Absolutely! We offer comprehensive post-launch support including bug fixes, security updates, performance optimization, and feature enhancements. We provide various support packages tailored to your needs, from basic maintenance to full-service ongoing development and consultation.'
        },
        {
            id: 5,
            question: 'What technologies do you work with?',
            answer: 'We work with cutting-edge technologies including React, Node.js, MongoDB, PostgreSQL, AWS, Docker, and more. Our tech stack is chosen based on your project requirements to ensure optimal performance, scalability, and maintainability. We stay current with industry trends to deliver modern, future-proof solutions.'
        },
        {
            id: 6,
            question: 'How do you ensure project quality?',
            answer: 'Quality is our top priority. We implement rigorous testing procedures including unit tests, integration tests, and user acceptance testing. Our code reviews, continuous integration/deployment pipelines, and adherence to best practices ensure every project meets the highest standards of quality, security, and performance.'
        },
        {
            id: 7,
            question: 'What are your pricing models?',
            answer: 'We offer flexible pricing models including fixed-price projects, time and materials, and retainer-based agreements. Pricing depends on project scope, complexity, timeline, and required resources. We provide transparent, detailed quotes with no hidden fees and work within your budget to deliver maximum value.'
        },
        {
            id: 8,
            question: 'Can you work with our existing team?',
            answer: 'Yes! We excel at collaboration and can seamlessly integrate with your existing team. Whether you need to augment your development capacity, provide specialized expertise, or take full ownership of a project, we adapt our approach to complement your team structure and workflows effectively.'
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            ref={sectionRef}
            className={`faq-section scroll-animate fade-in-up ${sectionVisible ? 'visible' : ''}`}
        >
            <div className="container">
                <div className="faq-header">
                    <h2 className="text-center">Frequently Asked Questions</h2>
                    <p className="faq-subtitle text-center">
                        Find answers to common questions about our services and process
                    </p>
                </div>

                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className={`faq-item ${openIndex === index ? 'active' : ''}`}
                        >
                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className="question-text">{faq.question}</span>
                                <span className="faq-icon">
                                    {openIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                                <div className="faq-answer-content">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="faq-cta">
                    <p>Still have questions?</p>
                    <a href="#contact" className="btn btn-primary">Contact Us</a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
