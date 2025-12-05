import { useState, useEffect, useCallback } from 'react';
import './ImageLightbox.css';

const ImageLightbox = ({ images, initialIndex = 0, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isZoomed, setIsZoomed] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const currentImage = images[currentIndex];

    // Keyboard navigation
    const handleKeyDown = useCallback((e) => {
        switch (e.key) {
            case 'Escape':
                onClose();
                break;
            case 'ArrowLeft':
                goToPrevious();
                break;
            case 'ArrowRight':
                goToNext();
                break;
            case 'z':
            case 'Z':
                toggleZoom();
                break;
            default:
                break;
        }
    }, [currentIndex, onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [handleKeyDown]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsZoomed(false);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setIsZoomed(false);
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    // Touch handlers for mobile swipe
    const handleTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrevious();
        }
    };

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="lightbox-close" onClick={onClose} aria-label="Close">
                    ✕
                </button>

                {/* Image Counter */}
                <div className="lightbox-counter">
                    {currentIndex + 1} / {images.length}
                </div>

                {/* Zoom Toggle */}
                <button
                    className="lightbox-zoom"
                    onClick={toggleZoom}
                    aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
                >
                    {isZoomed ? '🔍−' : '🔍+'}
                </button>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            className="lightbox-nav lightbox-prev"
                            onClick={goToPrevious}
                            aria-label="Previous image"
                        >
                            ‹
                        </button>
                        <button
                            className="lightbox-nav lightbox-next"
                            onClick={goToNext}
                            aria-label="Next image"
                        >
                            ›
                        </button>
                    </>
                )}

                {/* Main Image */}
                <div
                    className={`lightbox-image-container ${isZoomed ? 'zoomed' : ''}`}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onClick={toggleZoom}
                >
                    {currentImage.type === 'emoji' ? (
                        <div className="lightbox-emoji">
                            {currentImage.src}
                        </div>
                    ) : (
                        <img
                            src={currentImage.src}
                            alt={currentImage.alt || `Image ${currentIndex + 1}`}
                            className="lightbox-image"
                        />
                    )}
                </div>

                {/* Image Info */}
                {currentImage.caption && (
                    <div className="lightbox-caption">
                        <h3>{currentImage.title}</h3>
                        <p>{currentImage.caption}</p>
                    </div>
                )}

                {/* Thumbnail Strip */}
                {images.length > 1 && (
                    <div className="lightbox-thumbnails">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                className={`lightbox-thumbnail ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setIsZoomed(false);
                                }}
                            >
                                {image.type === 'emoji' ? (
                                    <span className="thumbnail-emoji">{image.src}</span>
                                ) : (
                                    <img src={image.thumbnail || image.src} alt={`Thumbnail ${index + 1}`} />
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* Keyboard Shortcuts Hint */}
                <div className="lightbox-shortcuts">
                    <span>← → Navigate</span>
                    <span>Z Zoom</span>
                    <span>ESC Close</span>
                </div>
            </div>
        </div>
    );
};

export default ImageLightbox;
