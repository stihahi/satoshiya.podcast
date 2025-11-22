import React from 'react';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-content">
                <h1 className="hero-title">
                    Explore the <span className="highlight">Future</span> of Technology
                </h1>
                <p className="hero-subtitle">
                    Join us as we unravel the mysteries of AI, Web3, and the digital revolution.
                    New episodes every week.
                </p>
                <div className="hero-actions">
                    <a href="#episodes" className="btn btn-primary">Listen Now</a>
                    <a href="#feedback" className="btn btn-secondary">Get Involved</a>
                </div>
            </div>
            <style>{`
        .hero {
          padding: 6rem 0;
          text-align: center;
          background: radial-gradient(circle at center, rgba(100, 108, 255, 0.1) 0%, rgba(15, 15, 19, 0) 70%);
        }
        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        .highlight {
          color: var(--accent-color);
        }
        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 2.5rem;
        }
        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        .btn-primary {
          background-color: var(--accent-color);
          color: white;
        }
        .btn-secondary {
          background-color: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        .btn-secondary:hover {
          border-color: var(--accent-color);
          background-color: rgba(100, 108, 255, 0.1);
        }
      `}</style>
        </section>
    );
};

export default Hero;
