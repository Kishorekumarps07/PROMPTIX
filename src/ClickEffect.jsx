import React, { useEffect, useState } from 'react';
import './ClickEffect.css';

const ClickEffect = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const handleClick = (e) => {
            // Only trigger on button clicks
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
                const newParticles = [];
                const particleCount = 12; // Number of particles per click

                for (let i = 0; i < particleCount; i++) {
                    const angle = (Math.PI * 2 * i) / particleCount;
                    const velocity = 100 + Math.random() * 50;

                    newParticles.push({
                        id: Date.now() + i,
                        x: e.clientX,
                        y: e.clientY,
                        angle: angle,
                        velocity: velocity,
                        size: Math.random() * 4 + 2,
                        color: `hsl(${Math.random() * 60 + 250}, 80%, 60%)` // Purple/blue hues
                    });
                }

                setParticles(prev => [...prev, ...newParticles]);

                // Remove particles after animation
                setTimeout(() => {
                    setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
                }, 1000);
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="click-effect-container">
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="particle"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        '--angle': `${particle.angle}rad`,
                        '--velocity': `${particle.velocity}px`
                    }}
                />
            ))}
        </div>
    );
};

export default ClickEffect;
