import React, { useEffect, useState } from 'react';
import './StarBackground.css';

const StarBackground = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const generateStars = () => {
            const newStars = [];
            const starCount = 150; // Increased from 100

            for (let i = 0; i < starCount; i++) {
                newStars.push({
                    id: i,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    size: `${Math.random() * 4 + 2}px`, // Larger: 2px to 6px
                    duration: `${Math.random() * 3 + 2}s`, // 2s to 5s
                    delay: `${Math.random() * 5}s`
                });
            }
            setStars(newStars);
        };

        generateStars();
    }, []);

    return (
        <div className="star-background">
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
    );
};

export default StarBackground;
