import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import './Blog.css';
import './ScrollAnimations.css';

const Blog = () => {
    const [sectionRef, sectionVisible] = useScrollAnimation();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const blogPosts = [
        {
            id: 1,
            title: 'The Future of Web Development: Trends to Watch in 2025',
            excerpt: 'Explore the cutting-edge technologies and methodologies shaping the future of web development, from AI integration to progressive web apps.',
            category: 'Technology',
            author: 'Sarah Johnson',
            date: '2024-12-01',
            readTime: '5 min read',
            image: '🚀',
            tags: ['Web Dev', 'AI', 'Trends']
        },
        {
            id: 2,
            title: 'Building Scalable Applications: Best Practices',
            excerpt: 'Learn the essential principles and patterns for creating applications that can grow with your business needs.',
            category: 'Development',
            author: 'Michael Chen',
            date: '2024-11-28',
            readTime: '8 min read',
            image: '⚡',
            tags: ['Architecture', 'Scalability', 'Best Practices']
        },
        {
            id: 3,
            title: 'UI/UX Design Principles That Drive Conversions',
            excerpt: 'Discover how thoughtful design choices can significantly impact user engagement and conversion rates.',
            category: 'Design',
            author: 'Emily Rodriguez',
            date: '2024-11-25',
            readTime: '6 min read',
            image: '🎨',
            tags: ['UI/UX', 'Design', 'Conversion']
        },
        {
            id: 4,
            title: 'Cybersecurity Essentials for Modern Web Applications',
            excerpt: 'Protect your applications and users with these critical security measures and best practices.',
            category: 'Security',
            author: 'David Thompson',
            date: '2024-11-22',
            readTime: '7 min read',
            image: '🔒',
            tags: ['Security', 'Web Apps', 'Protection']
        },
        {
            id: 5,
            title: 'The Power of Progressive Web Apps (PWAs)',
            excerpt: 'Why PWAs are revolutionizing the mobile experience and how to implement them in your projects.',
            category: 'Technology',
            author: 'Lisa Anderson',
            date: '2024-11-20',
            readTime: '6 min read',
            image: '📱',
            tags: ['PWA', 'Mobile', 'Performance']
        },
        {
            id: 6,
            title: 'API Design: Creating Developer-Friendly Interfaces',
            excerpt: 'Best practices for designing APIs that developers love to use and integrate with.',
            category: 'Development',
            author: 'James Wilson',
            date: '2024-11-18',
            readTime: '9 min read',
            image: '🔌',
            tags: ['API', 'Development', 'Integration']
        }
    ];

    const categories = ['all', 'Technology', 'Development', 'Design', 'Security'];

    const filteredPosts = selectedCategory === 'all'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <section
            ref={sectionRef}
            className={`blog-section scroll-animate fade-in-up ${sectionVisible ? 'visible' : ''}`}
        >
            <div className="container">
                <div className="blog-header">
                    <h2>Latest Insights</h2>
                    <p className="blog-subtitle">
                        Stay updated with the latest trends, tips, and insights from our experts
                    </p>
                </div>

                {/* Category Filter */}
                <div className="blog-categories">
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

                {/* Blog Grid */}
                <div className="blog-grid">
                    {filteredPosts.map((post, index) => (
                        <article
                            key={post.id}
                            className="blog-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="blog-image">
                                <span className="blog-emoji">{post.image}</span>
                                <span className="blog-category-badge">{post.category}</span>
                            </div>

                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span className="blog-date">{formatDate(post.date)}</span>
                                    <span className="blog-read-time">{post.readTime}</span>
                                </div>

                                <h3 className="blog-title">{post.title}</h3>
                                <p className="blog-excerpt">{post.excerpt}</p>

                                <div className="blog-tags">
                                    {post.tags.map((tag, i) => (
                                        <span key={i} className="blog-tag">{tag}</span>
                                    ))}
                                </div>

                                <div className="blog-footer">
                                    <div className="blog-author">
                                        <div className="author-avatar">
                                            {post.author.charAt(0)}
                                        </div>
                                        <span>{post.author}</span>
                                    </div>
                                    <Link to={`/blog/${post.id}`} className="read-more">
                                        Read More →
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div className="blog-cta">
                    <h3>Want to stay updated?</h3>
                    <p>Subscribe to our newsletter for weekly insights and updates</p>
                    <a href="#newsletter" className="btn btn-primary">
                        Subscribe Now
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Blog;
