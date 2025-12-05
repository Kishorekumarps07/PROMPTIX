import { useState, useEffect } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const calculateScrollProgress = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            const totalScroll = documentHeight - windowHeight;
            const progress = (scrollTop / totalScroll) * 100;

            setScrollProgress(Math.min(progress, 100));
        };

        // Initial calculation
        calculateScrollProgress();

        // Throttled scroll listener
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    calculateScrollProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', calculateScrollProgress);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', calculateScrollProgress);
        };
    }, []);

    return (
        <div className="scroll-progress">
            <div
                className="scroll-progress-bar"
                style={{ width: `${scrollProgress}%` }}
            ></div>
        </div>
    );
};

export default ScrollProgress;
