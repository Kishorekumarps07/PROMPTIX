import React, { useEffect, useState } from 'react';
import './StarBackground.css';

const StarBackground = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const generateStars = () => {
            const newStars = [];
            // Reduce stars on mobile for better performance
            const isMobile = window.innerWidth < 768;
            const starCount = isMobile ? 75 : 150;

            for (let i = 0; i < starCount; i++) {
                newStars.push({
                    id: i,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    size: `${Math.random() * 4 + 2}px`,
                    duration: `${Math.random() * 3 + 2}s`,
                    delay: `${Math.random() * 5}s`
                });
            }
            setStars(newStars);
        };

        generateStars();
    }, []);

    return (
        <div className="weather-background">
            {/* Sun for light mode */}
            <div className="sun"></div>
            <div className="sun-rays">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="sun-ray" style={{ '--i': i }}></div>
                ))}
            </div>

            {/* Moon and stars for dark mode */}
            <div className="moon">
                <div className="moon-crater crater-1"></div>
                <div className="moon-crater crater-2"></div>
                <div className="moon-crater crater-3"></div>
            </div>

            {/* Stars */}
            <div className="stars-container">
                {stars.map(star => (
                    <div
                        key={star.id}
                        className="star"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                            animationDuration: star.duration,
                            animationDelay: star.delay
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default StarBackground;
