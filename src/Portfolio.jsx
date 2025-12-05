import { useState } from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import './Portfolio.css';
import './ScrollAnimations.css';

const Portfolio = () => {
    const [sectionRef, sectionVisible] = useScrollAnimation();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform Redesign',
            category: 'E-commerce',
            client: 'ShopHub',
            year: '2024',
            image: '🛒',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            description: 'Complete redesign and development of a modern e-commerce platform with advanced features.',
            challenge: 'The client needed a scalable e-commerce solution that could handle high traffic and provide excellent UX.',
            solution: 'Built a modern, responsive platform with real-time inventory, payment integration, and admin dashboard.',
            results: [
                '150% increase in conversion rate',
                '40% faster page load times',
                '200% growth in mobile sales',
                '95% customer satisfaction'
            ],
            metrics: { conversion: '+150%', speed: '40%', sales: '+200%' }
        },
        {
            id: 2,
            title: 'Healthcare Management System',
            category: 'Web App',
            client: 'MediCare Pro',
            year: '2024',
            image: '🏥',
            tags: ['React', 'Express', 'PostgreSQL', 'AWS'],
            description: 'Comprehensive healthcare management system for patient records and appointments.',
            challenge: 'Required HIPAA-compliant system with complex scheduling and patient data management.',
            solution: 'Developed secure, scalable system with role-based access, automated scheduling, and encrypted data storage.',
            results: [
                '80% reduction in scheduling errors',
                '60% faster patient check-in',
                '100% HIPAA compliance',
                '500+ daily active users'
            ],
            metrics: { efficiency: '+80%', users: '500+', compliance: '100%' }
        },
        {
            id: 3,
            title: 'Real Estate Listing Portal',
            category: 'Website',
            client: 'PropertyFinder',
            year: '2023',
            image: '🏠',
            tags: ['Next.js', 'Tailwind', 'Firebase', 'Maps API'],
            description: 'Modern real estate portal with advanced search and virtual tours.',
            challenge: 'Needed fast, SEO-friendly platform with map integration and virtual tour capabilities.',
            solution: 'Built with Next.js for optimal SEO, integrated Google Maps, and 360° virtual tour functionality.',
            results: [
                '300% increase in organic traffic',
                '45% higher engagement rate',
                '2M+ monthly visitors',
                '4.8/5 user rating'
            ],
            metrics: { traffic: '+300%', engagement: '+45%', visitors: '2M+' }
        },
        {
            id: 4,
            title: 'Financial Dashboard Analytics',
            category: 'Web App',
            client: 'FinTech Solutions',
            year: '2023',
            image: '📊',
            tags: ['React', 'D3.js', 'Python', 'Redis'],
            description: 'Real-time financial analytics dashboard with advanced data visualization.',
            challenge: 'Complex data visualization requirements with real-time updates and high performance needs.',
            solution: 'Implemented D3.js for interactive charts, WebSocket for real-time data, and Redis for caching.',
            results: [
                '99.9% uptime achieved',
                'Sub-second data refresh',
                '10K+ concurrent users',
                '50% faster insights'
            ],
            metrics: { uptime: '99.9%', speed: '<1s', users: '10K+' }
        },
        {
            id: 5,
            title: 'Social Media Management Tool',
            category: 'SaaS',
            client: 'SocialBoost',
            year: '2023',
            image: '📱',
            tags: ['Vue.js', 'Laravel', 'MySQL', 'OAuth'],
            description: 'All-in-one social media management and analytics platform.',
            challenge: 'Integration with multiple social platforms while maintaining security and performance.',
            solution: 'Built modular architecture with OAuth integration, scheduled posting, and comprehensive analytics.',
            results: [
                '5K+ active subscribers',
                '25+ platform integrations',
                '1M+ posts scheduled',
                '4.9/5 app store rating'
            ],
            metrics: { subscribers: '5K+', integrations: '25+', posts: '1M+' }
        },
        {
            id: 6,
            title: 'Educational Learning Platform',
            category: 'E-learning',
            client: 'EduLearn',
            year: '2024',
            image: '📚',
            tags: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
            description: 'Interactive e-learning platform with live classes and progress tracking.',
            challenge: 'Needed video streaming, interactive quizzes, and progress tracking for thousands of students.',
            solution: 'Integrated WebRTC for live classes, built quiz engine, and implemented gamification features.',
            results: [
                '50K+ enrolled students',
                '90% course completion',
                '4.7/5 average rating',
                '100+ courses available'
            ],
            metrics: { students: '50K+', completion: '90%', courses: '100+' }
        }
    ];

    const categories = ['all', 'E-commerce', 'Web App', 'Website', 'SaaS', 'E-learning'];

    const filteredProjects = selectedCategory === 'all'
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    return (
        <section
            ref={sectionRef}
            className={`portfolio-section scroll-animate fade-in-up ${sectionVisible ? 'visible' : ''}`}
        >
            <div className="container">
                <div className="portfolio-header">
                    <h2>Our Portfolio</h2>
                    <p className="portfolio-subtitle">
                        Explore our successful projects and the impact we've made
                    </p>
                </div>

                {/* Category Filter */}
                <div className="portfolio-categories">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="portfolio-grid">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="portfolio-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="portfolio-image">
                                <span className="portfolio-emoji">{project.image}</span>
                                <div className="portfolio-overlay">
                                    <button className="view-details-btn">View Case Study</button>
                                </div>
                            </div>

                            <div className="portfolio-content">
                                <div className="portfolio-meta">
                                    <span className="portfolio-category">{project.category}</span>
                                    <span className="portfolio-year">{project.year}</span>
                                </div>

                                <h3>{project.title}</h3>
                                <p className="portfolio-client">Client: {project.client}</p>
                                <p className="portfolio-description">{project.description}</p>

                                <div className="portfolio-tags">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="portfolio-tag">{tag}</span>
                                    ))}
                                </div>

                                <div className="portfolio-metrics">
                                    {Object.entries(project.metrics).map(([key, value]) => (
                                        <div key={key} className="metric">
                                            <div className="metric-value">{value}</div>
                                            <div className="metric-label">{key}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <div className="portfolio-modal" onClick={() => setSelectedProject(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedProject(null)}>
                            ✕
                        </button>

                        <div className="modal-header">
                            <span className="modal-emoji">{selectedProject.image}</span>
                            <div>
                                <h2>{selectedProject.title}</h2>
                                <p>{selectedProject.client} • {selectedProject.year}</p>
                            </div>
                        </div>

                        <div className="modal-body">
                            <div className="modal-section">
                                <h3>🎯 The Challenge</h3>
                                <p>{selectedProject.challenge}</p>
                            </div>

                            <div className="modal-section">
                                <h3>💡 Our Solution</h3>
                                <p>{selectedProject.solution}</p>
                            </div>

                            <div className="modal-section">
                                <h3>📈 Results Achieved</h3>
                                <ul className="results-list">
                                    {selectedProject.results.map((result, i) => (
                                        <li key={i}>✓ {result}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="modal-section">
                                <h3>🛠️ Technologies Used</h3>
                                <div className="tech-tags">
                                    {selectedProject.tags.map((tag, i) => (
                                        <span key={i} className="tech-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={() => setSelectedProject(null)}>
                                Close Case Study
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
