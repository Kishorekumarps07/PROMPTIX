import { useState } from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import './PricingCalculator.css';
import './ScrollAnimations.css';

const PricingCalculator = () => {
    const [sectionRef, sectionVisible] = useScrollAnimation();

    const [selections, setSelections] = useState({
        projectType: 'website',
        complexity: 'basic',
        pages: 5,
        features: [],
        timeline: 'standard',
        support: 'basic'
    });

    const pricing = {
        projectType: {
            website: { base: 2000, name: 'Website' },
            webapp: { base: 5000, name: 'Web Application' },
            mobile: { base: 8000, name: 'Mobile App' },
            ecommerce: { base: 6000, name: 'E-commerce' }
        },
        complexity: {
            basic: { multiplier: 1, name: 'Basic' },
            intermediate: { multiplier: 1.5, name: 'Intermediate' },
            advanced: { multiplier: 2, name: 'Advanced' },
            enterprise: { multiplier: 3, name: 'Enterprise' }
        },
        features: {
            cms: { price: 800, name: 'Content Management System' },
            auth: { price: 600, name: 'User Authentication' },
            payment: { price: 1200, name: 'Payment Integration' },
            api: { price: 1000, name: 'API Integration' },
            analytics: { price: 400, name: 'Analytics Dashboard' },
            chat: { price: 500, name: 'Live Chat' },
            seo: { price: 700, name: 'SEO Optimization' },
            multilang: { price: 900, name: 'Multi-language Support' }
        },
        timeline: {
            rush: { multiplier: 1.5, name: 'Rush (2-3 weeks)' },
            standard: { multiplier: 1, name: 'Standard (4-6 weeks)' },
            flexible: { multiplier: 0.9, name: 'Flexible (8+ weeks)' }
        },
        support: {
            basic: { price: 200, name: 'Basic (1 month)' },
            standard: { price: 500, name: 'Standard (3 months)' },
            premium: { price: 1000, name: 'Premium (6 months)' },
            enterprise: { price: 2000, name: 'Enterprise (12 months)' }
        }
    };

    const calculatePrice = () => {
        let basePrice = pricing.projectType[selections.projectType].base;
        let complexityMultiplier = pricing.complexity[selections.complexity].multiplier;
        let pagesCost = (selections.pages - 5) * 100; // $100 per additional page after 5

        let featuresTotal = selections.features.reduce((total, feature) => {
            return total + pricing.features[feature].price;
        }, 0);

        let timelineMultiplier = pricing.timeline[selections.timeline].multiplier;
        let supportCost = pricing.support[selections.support].price;

        let subtotal = (basePrice + pagesCost + featuresTotal) * complexityMultiplier * timelineMultiplier;
        let total = subtotal + supportCost;

        return {
            base: basePrice,
            pages: pagesCost,
            features: featuresTotal,
            support: supportCost,
            subtotal: subtotal,
            total: Math.round(total)
        };
    };

    const handleFeatureToggle = (feature) => {
        setSelections(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }));
    };

    const price = calculatePrice();

    return (
        <section
            ref={sectionRef}
            className={`pricing-calculator-section scroll-animate fade-in-up ${sectionVisible ? 'visible' : ''}`}
        >
            <div className="container">
                <div className="pricing-header">
                    <h2>Pricing Calculator</h2>
                    <p className="pricing-subtitle">
                        Customize your project and get an instant estimate
                    </p>
                </div>

                <div className="pricing-content">
                    <div className="pricing-options">
                        {/* Project Type */}
                        <div className="option-group">
                            <h3>Project Type</h3>
                            <div className="option-grid">
                                {Object.entries(pricing.projectType).map(([key, value]) => (
                                    <button
                                        key={key}
                                        className={`option-btn ${selections.projectType === key ? 'active' : ''}`}
                                        onClick={() => setSelections({ ...selections, projectType: key })}
                                    >
                                        {value.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Complexity */}
                        <div className="option-group">
                            <h3>Complexity Level</h3>
                            <div className="option-grid">
                                {Object.entries(pricing.complexity).map(([key, value]) => (
                                    <button
                                        key={key}
                                        className={`option-btn ${selections.complexity === key ? 'active' : ''}`}
                                        onClick={() => setSelections({ ...selections, complexity: key })}
                                    >
                                        {value.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Number of Pages */}
                        <div className="option-group">
                            <h3>Number of Pages</h3>
                            <div className="slider-container">
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={selections.pages}
                                    onChange={(e) => setSelections({ ...selections, pages: parseInt(e.target.value) })}
                                    className="slider"
                                />
                                <div className="slider-value">{selections.pages} pages</div>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="option-group">
                            <h3>Additional Features</h3>
                            <div className="features-grid">
                                {Object.entries(pricing.features).map(([key, value]) => (
                                    <label key={key} className="feature-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={selections.features.includes(key)}
                                            onChange={() => handleFeatureToggle(key)}
                                        />
                                        <span className="checkbox-custom"></span>
                                        <span className="feature-name">{value.name}</span>
                                        <span className="feature-price">+${value.price}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="option-group">
                            <h3>Timeline</h3>
                            <div className="option-grid">
                                {Object.entries(pricing.timeline).map(([key, value]) => (
                                    <button
                                        key={key}
                                        className={`option-btn ${selections.timeline === key ? 'active' : ''}`}
                                        onClick={() => setSelections({ ...selections, timeline: key })}
                                    >
                                        {value.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Support */}
                        <div className="option-group">
                            <h3>Support Package</h3>
                            <div className="option-grid">
                                {Object.entries(pricing.support).map(([key, value]) => (
                                    <button
                                        key={key}
                                        className={`option-btn ${selections.support === key ? 'active' : ''}`}
                                        onClick={() => setSelections({ ...selections, support: key })}
                                    >
                                        {value.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="price-summary">
                        <div className="summary-card">
                            <h3>Your Estimate</h3>

                            <div className="price-breakdown">
                                <div className="breakdown-item">
                                    <span>Base Price ({pricing.projectType[selections.projectType].name})</span>
                                    <span>${price.base.toLocaleString()}</span>
                                </div>
                                {price.pages > 0 && (
                                    <div className="breakdown-item">
                                        <span>Additional Pages</span>
                                        <span>+${price.pages.toLocaleString()}</span>
                                    </div>
                                )}
                                {price.features > 0 && (
                                    <div className="breakdown-item">
                                        <span>Features ({selections.features.length})</span>
                                        <span>+${price.features.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="breakdown-item">
                                    <span>Complexity ({pricing.complexity[selections.complexity].name})</span>
                                    <span>×{pricing.complexity[selections.complexity].multiplier}</span>
                                </div>
                                <div className="breakdown-item">
                                    <span>Timeline ({pricing.timeline[selections.timeline].name})</span>
                                    <span>×{pricing.timeline[selections.timeline].multiplier}</span>
                                </div>
                                <div className="breakdown-item">
                                    <span>Support ({pricing.support[selections.support].name})</span>
                                    <span>+${price.support.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="price-total">
                                <span>Estimated Total</span>
                                <span className="total-amount">${price.total.toLocaleString()}</span>
                            </div>

                            <div className="price-note">
                                * This is an estimate. Final pricing may vary based on specific requirements.
                            </div>

                            <a href="#contact" className="btn btn-primary btn-full">
                                Get Detailed Quote
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingCalculator;
