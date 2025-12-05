import { useState } from 'react';
import { useToast } from './ToastContext';
import config from './config';
import './MultiStepContact.css';

const MultiStepContact = () => {
    const toast = useToast();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        // Step 1: Basic Info
        name: '',
        email: '',
        phone: '',

        // Step 2: Project Details
        projectType: '',
        budget: '',
        timeline: '',

        // Step 3: Requirements
        message: '',
        features: [],

        // Step 4: Additional
        companyName: '',
        website: '',
        hearAbout: ''
    });

    const [errors, setErrors] = useState({});

    const steps = [
        { number: 1, title: 'Basic Info', icon: '👤' },
        { number: 2, title: 'Project Details', icon: '💼' },
        { number: 3, title: 'Requirements', icon: '📝' },
        { number: 4, title: 'Additional Info', icon: '✨' }
    ];

    const projectTypes = [
        'Website Development',
        'Web Application',
        'Mobile App',
        'E-commerce',
        'API Integration',
        'Consulting',
        'Other'
    ];

    const budgetRanges = [
        'Under $5,000',
        '$5,000 - $10,000',
        '$10,000 - $25,000',
        '$25,000 - $50,000',
        '$50,000+',
        'Not sure yet'
    ];

    const timelineOptions = [
        'ASAP (1-2 weeks)',
        'Soon (1 month)',
        'Standard (2-3 months)',
        'Flexible (3+ months)',
        'Just exploring'
    ];

    const featureOptions = [
        'User Authentication',
        'Payment Integration',
        'Admin Dashboard',
        'API Development',
        'Mobile Responsive',
        'SEO Optimization',
        'Analytics',
        'Live Chat'
    ];

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.name.trim()) newErrors.name = 'Name is required';
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Invalid email address';
            }
        }

        if (step === 2) {
            if (!formData.projectType) newErrors.projectType = 'Please select a project type';
            if (!formData.budget) newErrors.budget = 'Please select a budget range';
            if (!formData.timeline) newErrors.timeline = 'Please select a timeline';
        }

        if (step === 3) {
            if (!formData.message.trim()) {
                newErrors.message = 'Please describe your project';
            } else if (formData.message.trim().length < 20) {
                newErrors.message = 'Please provide more details (minimum 20 characters)';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleFeatureToggle = (feature) => {
        const features = formData.features.includes(feature)
            ? formData.features.filter(f => f !== feature)
            : [...formData.features, feature];
        setFormData({ ...formData, features });
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);

        try {
            const response = await fetch(`${config.API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success('🎉 Thank you! We\'ll get back to you within 24 hours.');
                setFormData({
                    name: '', email: '', phone: '', projectType: '', budget: '',
                    timeline: '', message: '', features: [], companyName: '', website: '', hearAbout: ''
                });
                setCurrentStep(1);
            } else {
                toast.error('Failed to send. Please try again or email us directly.');
            }
        } catch (error) {
            toast.error('Network error. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const progress = (currentStep / steps.length) * 100;

    return (
        <div className="multi-step-contact">
            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="steps-indicator">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className={`step-item ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
                        >
                            <div className="step-circle">
                                {currentStep > step.number ? '✓' : step.icon}
                            </div>
                            <div className="step-label">{step.title}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="contact-form-multi">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                    <div className="form-step">
                        <h3>Let's start with the basics</h3>
                        <p className="step-description">Tell us who you are</p>

                        <div className="form-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className={errors.name ? 'error' : ''}
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label>Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>Phone Number (Optional)</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 2 && (
                    <div className="form-step">
                        <h3>Tell us about your project</h3>
                        <p className="step-description">Help us understand your needs</p>

                        <div className="form-group">
                            <label>Project Type *</label>
                            <div className="radio-grid">
                                {projectTypes.map((type) => (
                                    <label key={type} className="radio-option">
                                        <input
                                            type="radio"
                                            name="projectType"
                                            value={type}
                                            checked={formData.projectType === type}
                                            onChange={handleChange}
                                        />
                                        <span>{type}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.projectType && <span className="error-message">{errors.projectType}</span>}
                        </div>

                        <div className="form-group">
                            <label>Budget Range *</label>
                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className={errors.budget ? 'error' : ''}
                            >
                                <option value="">Select budget range</option>
                                {budgetRanges.map((range) => (
                                    <option key={range} value={range}>{range}</option>
                                ))}
                            </select>
                            {errors.budget && <span className="error-message">{errors.budget}</span>}
                        </div>

                        <div className="form-group">
                            <label>Timeline *</label>
                            <select
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleChange}
                                className={errors.timeline ? 'error' : ''}
                            >
                                <option value="">Select timeline</option>
                                {timelineOptions.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            {errors.timeline && <span className="error-message">{errors.timeline}</span>}
                        </div>
                    </div>
                )}

                {/* Step 3: Requirements */}
                {currentStep === 3 && (
                    <div className="form-step">
                        <h3>Project requirements</h3>
                        <p className="step-description">What features do you need?</p>

                        <div className="form-group">
                            <label>Project Description *</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Describe your project, goals, and any specific requirements..."
                                rows="6"
                                className={errors.message ? 'error' : ''}
                            ></textarea>
                            {errors.message && <span className="error-message">{errors.message}</span>}
                        </div>

                        <div className="form-group">
                            <label>Features (Optional)</label>
                            <div className="checkbox-grid">
                                {featureOptions.map((feature) => (
                                    <label key={feature} className="checkbox-option">
                                        <input
                                            type="checkbox"
                                            checked={formData.features.includes(feature)}
                                            onChange={() => handleFeatureToggle(feature)}
                                        />
                                        <span>{feature}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Additional Info */}
                {currentStep === 4 && (
                    <div className="form-step">
                        <h3>Almost done!</h3>
                        <p className="step-description">Just a few more details</p>

                        <div className="form-group">
                            <label>Company Name (Optional)</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Your Company Inc."
                            />
                        </div>

                        <div className="form-group">
                            <label>Website (Optional)</label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://yourwebsite.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>How did you hear about us? (Optional)</label>
                            <select
                                name="hearAbout"
                                value={formData.hearAbout}
                                onChange={handleChange}
                            >
                                <option value="">Select an option</option>
                                <option value="Google Search">Google Search</option>
                                <option value="Social Media">Social Media</option>
                                <option value="Referral">Referral</option>
                                <option value="Advertisement">Advertisement</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="form-navigation">
                    {currentStep > 1 && (
                        <button type="button" onClick={prevStep} className="btn btn-secondary">
                            ← Previous
                        </button>
                    )}

                    {currentStep < 4 ? (
                        <button type="button" onClick={nextStep} className="btn btn-primary">
                            Next →
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Submit 🚀'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default MultiStepContact;
