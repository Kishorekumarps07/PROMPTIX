import './SkeletonLoader.css';

// Card Skeleton - for blog posts, portfolio items
export const CardSkeleton = () => (
    <div className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-subtitle"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line skeleton-short"></div>
            <div className="skeleton-tags">
                <div className="skeleton-tag"></div>
                <div className="skeleton-tag"></div>
                <div className="skeleton-tag"></div>
            </div>
        </div>
    </div>
);

// Team Member Skeleton
export const TeamMemberSkeleton = () => (
    <div className="skeleton-team-member">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-line skeleton-name"></div>
        <div className="skeleton-line skeleton-role"></div>
    </div>
);

// Testimonial Skeleton
export const TestimonialSkeleton = () => (
    <div className="skeleton-testimonial">
        <div className="skeleton-stars">
            <div className="skeleton-star"></div>
            <div className="skeleton-star"></div>
            <div className="skeleton-star"></div>
            <div className="skeleton-star"></div>
            <div className="skeleton-star"></div>
        </div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line skeleton-short"></div>
        <div className="skeleton-author">
            <div className="skeleton-avatar-small"></div>
            <div>
                <div className="skeleton-line skeleton-name-small"></div>
                <div className="skeleton-line skeleton-role-small"></div>
            </div>
        </div>
    </div>
);

// Form Skeleton
export const FormSkeleton = () => (
    <div className="skeleton-form">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
        <div className="skeleton-input"></div>
        <div className="skeleton-input"></div>
        <div className="skeleton-textarea"></div>
        <div className="skeleton-button"></div>
    </div>
);

// List Skeleton - for FAQ, features
export const ListSkeleton = ({ count = 5 }) => (
    <div className="skeleton-list">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="skeleton-list-item">
                <div className="skeleton-circle"></div>
                <div className="skeleton-line"></div>
            </div>
        ))}
    </div>
);

// Text Block Skeleton - for paragraphs
export const TextSkeleton = ({ lines = 3 }) => (
    <div className="skeleton-text">
        {[...Array(lines)].map((_, i) => (
            <div
                key={i}
                className={`skeleton-line ${i === lines - 1 ? 'skeleton-short' : ''}`}
            ></div>
        ))}
    </div>
);

// Grid Skeleton - for portfolio/blog grids
export const GridSkeleton = ({ count = 6, type = 'card' }) => {
    const SkeletonComponent = type === 'card' ? CardSkeleton : TeamMemberSkeleton;

    return (
        <div className={`skeleton-grid skeleton-grid-${type}`}>
            {[...Array(count)].map((_, i) => (
                <SkeletonComponent key={i} />
            ))}
        </div>
    );
};

// Page Skeleton - full page loader
export const PageSkeleton = () => (
    <div className="skeleton-page">
        <div className="skeleton-hero">
            <div className="skeleton-line skeleton-hero-title"></div>
            <div className="skeleton-line skeleton-hero-subtitle"></div>
        </div>
        <div className="skeleton-content">
            <GridSkeleton count={3} />
        </div>
    </div>
);

// Pricing Card Skeleton
export const PricingCardSkeleton = () => (
    <div className="skeleton-pricing-card">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-price"></div>
        <div className="skeleton-features">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
        </div>
        <div className="skeleton-button"></div>
    </div>
);

// Table Skeleton
export const TableSkeleton = ({ rows = 5, cols = 4 }) => (
    <div className="skeleton-table">
        <div className="skeleton-table-header">
            {[...Array(cols)].map((_, i) => (
                <div key={i} className="skeleton-table-cell"></div>
            ))}
        </div>
        {[...Array(rows)].map((_, i) => (
            <div key={i} className="skeleton-table-row">
                {[...Array(cols)].map((_, j) => (
                    <div key={j} className="skeleton-table-cell"></div>
                ))}
            </div>
        ))}
    </div>
);

// Chat Message Skeleton
export const ChatMessageSkeleton = () => (
    <div className="skeleton-chat-message">
        <div className="skeleton-avatar-small"></div>
        <div className="skeleton-message-bubble">
            <div className="skeleton-line"></div>
            <div className="skeleton-line skeleton-short"></div>
        </div>
    </div>
);

export default {
    CardSkeleton,
    TeamMemberSkeleton,
    TestimonialSkeleton,
    FormSkeleton,
    ListSkeleton,
    TextSkeleton,
    GridSkeleton,
    PageSkeleton,
    PricingCardSkeleton,
    TableSkeleton,
    ChatMessageSkeleton
};
