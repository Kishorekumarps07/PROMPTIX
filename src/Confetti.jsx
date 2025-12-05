import { useEffect, useState } from 'react';
import './Confetti.css';

const Confetti = ({ active = false, duration = 3000, onComplete }) => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (active) {
            // Generate confetti particles
            const newParticles = [];
            const particleCount = 150;
            const colors = [
                '#667eea', // Primary purple
                '#764ba2', // Secondary purple
                '#f093fb', // Pink
                '#4facfe', // Blue
                '#43e97b', // Green
                '#fa709a', // Rose
                '#fee140', // Yellow
                '#30cfd0'  // Cyan
            ];

            for (let i = 0; i < particleCount; i++) {
                newParticles.push({
                    id: i,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    left: Math.random() * 100,
                    animationDelay: Math.random() * 0.5,
                    animationDuration: 2 + Math.random() * 2,
                    size: 8 + Math.random() * 8,
                    rotation: Math.random() * 360,
                    shape: Math.random() > 0.5 ? 'circle' : 'square'
                });
            }

            setParticles(newParticles);

            // Clear confetti after duration
            const timer = setTimeout(() => {
                setParticles([]);
                if (onComplete) onComplete();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [active, duration, onComplete]);

    if (!active || particles.length === 0) return null;

    return (
        <div className="confetti-container">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className={`confetti-particle ${particle.shape}`}
                    style={{
                        left: `${particle.left}%`,
                        backgroundColor: particle.color,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDelay: `${particle.animationDelay}s`,
                        animationDuration: `${particle.animationDuration}s`,
                        transform: `rotate(${particle.rotation}deg)`
                    }}
                />
            ))}
        </div>
    );
};

// Hook to trigger confetti
export const useConfetti = () => {
    const [showConfetti, setShowConfetti] = useState(false);

    const triggerConfetti = () => {
        setShowConfetti(true);
    };

    const resetConfetti = () => {
        setShowConfetti(false);
    };

    return {
        showConfetti,
        triggerConfetti,
        resetConfetti,
        ConfettiComponent: () => (
            <Confetti
                active={showConfetti}
                onComplete={resetConfetti}
            />
        )
    };
};

export default Confetti;
