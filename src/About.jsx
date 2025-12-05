import { useState, useEffect } from 'react'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import { TeamMemberSkeleton } from './SkeletonLoader'
import config from './config'
import './About.css'
import './ScrollAnimations.css'

function About() {
    const [teamMembers, setTeamMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Scroll animation hooks
    const [missionRef, missionVisible] = useScrollAnimation()
    const [visionRef, visionVisible] = useScrollAnimation()
    const [teamRef, teamVisible] = useScrollAnimation()
    useEffect(() => {
        fetchTeamMembers()
    }, [])

    const fetchTeamMembers = async () => {
        try {
            const response = await fetch(`${config.API_URL}/api/team`)
            if (!response.ok) {
                throw new Error('Failed to fetch team members')
            }
            const data = await response.json()
            setTeamMembers(data.data)
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }

    return (
        <div className="about-page">
            {/* Company Intro Section */}
            <section className="company-intro">
                <div className="container">
                    <div className="intro-content animate-fade-in-up">
                        <h1>About Us</h1>
                        <p className="intro-text">
                            We are a team of passionate innovators dedicated to transforming ideas into
                            exceptional digital experiences. With years of expertise in web development,
                            design, and technology, we help businesses thrive in the digital age.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="mission-vision">
                <div className="container">
                    <div className="grid grid-2">
                        <div
                            ref={missionRef}
                            className={`card mission-card scroll-animate fade-in-left ${missionVisible ? 'visible' : ''}`}
                        >
                            <div className="icon-wrapper">
                                <span className="section-icon">🎯</span>
                            </div>
                            <h2>Our Mission</h2>
                            <p>
                                To empower businesses and individuals with cutting-edge technology solutions
                                that drive growth, innovation, and success. We believe in creating digital
                                products that are not only functional but also beautiful and user-friendly.
                            </p>
                        </div>

                        <div
                            ref={visionRef}
                            className={`card vision-card scroll-animate fade-in-right ${visionVisible ? 'visible' : ''}`}
                        >
                            <div className="icon-wrapper">
                                <span className="section-icon">🚀</span>
                            </div>
                            <h2>Our Vision</h2>
                            <p>
                                To become a leading force in digital transformation, recognized for our
                                commitment to excellence, innovation, and client satisfaction. We envision
                                a future where technology seamlessly enhances every aspect of business and life.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <div className="container">
                    <h2
                        ref={teamRef}
                        className={`text-center mb-2xl scroll-animate fade-in-up ${teamVisible ? 'visible' : ''}`}
                    >
                        Meet Our Team
                    </h2>

                    {loading && (
                        <div className="grid grid-3">
                            <TeamMemberSkeleton />
                            <TeamMemberSkeleton />
                            <TeamMemberSkeleton />
                            <TeamMemberSkeleton />
                            <TeamMemberSkeleton />
                            <TeamMemberSkeleton />
                        </div>
                    )}

                    {error && (
                        <div className="error-state">
                            <p>⚠️ {error}</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="grid grid-3">
                            {teamMembers.map((member, index) => (
                                <div
                                    key={member.id}
                                    className={`card team-card animate-fade-in-up animate-delay-${index + 1}`}
                                >
                                    <div className="team-avatar">
                                        {member.avatar}
                                    </div>
                                    <h3>{member.name}</h3>
                                    <p className="team-role">{member.role}</p>
                                    <p className="team-bio">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="grid grid-3">
                        <div className="stat-card animate-fade-in-up">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Projects Completed</div>
                        </div>

                        <div className="stat-card animate-fade-in-up animate-delay-1">
                            <div className="stat-number">98%</div>
                            <div className="stat-label">Client Satisfaction</div>
                        </div>

                        <div className="stat-card animate-fade-in-up animate-delay-2">
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">Support Available</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
