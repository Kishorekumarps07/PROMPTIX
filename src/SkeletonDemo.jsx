import { useState } from 'react';
import {
    CardSkeleton,
    TeamMemberSkeleton,
    TestimonialSkeleton,
    FormSkeleton,
    ListSkeleton,
    TextSkeleton,
    GridSkeleton,
    PricingCardSkeleton,
    TableSkeleton,
    ChatMessageSkeleton
} from './SkeletonLoader';
import './SkeletonDemo.css';

const SkeletonDemo = () => {
    const [showSkeletons, setShowSkeletons] = useState(true);

    return (
        <div className="skeleton-demo-page">
            <div className="container">
                <div className="demo-header">
                    <h1>Skeleton Loader Showcase</h1>
                    <p>Beautiful loading states that improve perceived performance</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowSkeletons(!showSkeletons)}
                    >
                        {showSkeletons ? 'Hide' : 'Show'} Skeletons
                    </button>
                </div>

                {showSkeletons && (
                    <>
                        <section className="demo-section">
                            <h2>Card Skeleton</h2>
                            <p>Used for blog posts, portfolio items</p>
                            <div className="demo-grid">
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                            </div>
                        </section>

                        <section className="demo-section">
                            <h2>Team Member Skeleton</h2>
                            <p>Used for team member cards</p>
                            <div className="demo-grid">
                                <TeamMemberSkeleton />
                                <TeamMemberSkeleton />
                                <TeamMemberSkeleton />
                            </div>
                        </section>

                        <section className="demo-section">
                            <h2>Testimonial Skeleton</h2>
                            <p>Used for testimonial cards</p>
                            <TestimonialSkeleton />
                        </section>

                        <section className="demo-section">
                            <h2>Form Skeleton</h2>
                            <p>Used for contact forms</p>
                            <FormSkeleton />
                        </section>

                        <section className="demo-section">
                            <h2>List Skeleton</h2>
                            <p>Used for FAQ, feature lists</p>
                            <ListSkeleton count={5} />
                        </section>

                        <section className="demo-section">
                            <h2>Text Skeleton</h2>
                            <p>Used for paragraphs and text blocks</p>
                            <TextSkeleton lines={4} />
                        </section>

                        <section className="demo-section">
                            <h2>Pricing Card Skeleton</h2>
                            <p>Used for pricing tables</p>
                            <div className="demo-grid">
                                <PricingCardSkeleton />
                                <PricingCardSkeleton />
                                <PricingCardSkeleton />
                            </div>
                        </section>

                        <section className="demo-section">
                            <h2>Table Skeleton</h2>
                            <p>Used for data tables</p>
                            <TableSkeleton rows={5} cols={4} />
                        </section>

                        <section className="demo-section">
                            <h2>Chat Message Skeleton</h2>
                            <p>Used for chat interfaces</p>
                            <ChatMessageSkeleton />
                            <ChatMessageSkeleton />
                            <ChatMessageSkeleton />
                        </section>

                        <section className="demo-section">
                            <h2>Grid Skeleton</h2>
                            <p>Complete grid of skeletons</p>
                            <GridSkeleton count={6} type="card" />
                        </section>
                    </>
                )}

                <div className="demo-usage">
                    <h2>How to Use</h2>
                    <div className="code-block">
                        <pre>{`import { CardSkeleton, TeamMemberSkeleton } from './SkeletonLoader';

function MyComponent() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    return (
        <div>
            {loading ? (
                <div className="grid">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
            ) : (
                <div className="grid">
                    {data.map(item => (
                        <Card key={item.id} {...item} />
                    ))}
                </div>
            )}
        </div>
    );
}`}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonDemo;
