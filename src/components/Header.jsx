import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <div className="container header-content">
                <div className="logo">
                    <span className="logo-icon">🎙️</span>
                    <span className="logo-text">TechTalks</span>
                </div>
                <nav className="nav">
                    <a href="#episodes">Episodes</a>
                    <a href="#feedback">Feedback</a>
                    <a href="#about">About</a>
                </nav>
            </div>
            <style>{`
        .header {
          background-color: rgba(15, 15, 19, 0.9);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid var(--border-color);
          padding: 1rem 0;
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .logo-icon {
          font-size: 1.8rem;
        }
        .nav {
          display: flex;
          gap: 2rem;
        }
        .nav a {
          color: var(--text-secondary);
          font-weight: 500;
        }
        .nav a:hover {
          color: var(--accent-color);
        }
      `}</style>
        </header>
    );
};

export default Header;
