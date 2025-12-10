import { useCountUp, formatNumber } from './hooks/useCountUp';
import './Stats.css';

const Stats = () => {
    const [clientsCount, clientsRef] = useCountUp(150, 2000);
    const [projectsCount, projectsRef] = useCountUp(200, 2000);
    const [satisfactionCount, satisfactionRef] = useCountUp(98, 2000);
    const [yearsCount, yearsRef] = useCountUp(5, 2000);

    return (
        <section className="stats-section">
            <div className="container">
                <div className="stats-grid">
                    {/* Clients Worldwide */}
                    <div className="stat-card" ref={clientsRef}>
                        <div className="stat-icon">🌍</div>
                        <div className="stat-number">
                            {clientsCount}+
                        </div>
                        <div className="stat-label">Clients Worldwide</div>
                        <div className="stat-description">
                            Trusted by businesses across the globe
                        </div>
                    </div>

                    {/* Projects Completed */}
                    <div className="stat-card" ref={projectsRef}>
                        <div className="stat-icon">✅</div>
                        <div className="stat-number">
                            {projectsCount}+
                        </div>
                        <div className="stat-label">Projects Completed</div>
                        <div className="stat-description">
                            Successfully delivered solutions
                        </div>
                    </div>

                    {/* Satisfaction Rate */}
                    <div className="stat-card" ref={satisfactionRef}>
                        <div className="stat-icon">⭐</div>
                        <div className="stat-number">
                            {satisfactionCount}%
                        </div>
                        <div className="stat-label">Satisfaction Rate</div>
                        <div className="stat-description">
                            Client happiness is our priority
                        </div>
                    </div>

                    {/* Years of Experience */}
                    <div className="stat-card" ref={yearsRef}>
                        <div className="stat-icon">🏆</div>
                        <div className="stat-number">
                            {yearsCount}+
                        </div>
                        <div className="stat-label">Years of Excellence</div>
                        <div className="stat-description">
                            Industry expertise and innovation
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
