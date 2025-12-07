import React from 'react';
import pipeIcon from '../assets/pipe_icon.png';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <img src={pipeIcon} alt="logo" className="logo-icon" />
          <span className="logo-text">{title || 'TechTalks'}</span>
        </div>
        <nav className="nav">
          <a href="#episodes">Episodes</a>
          <a href="#feedback">Feedback</a>

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
            width: 1.8rem;
            height: 1.8rem;
          }
          .logo-text {
            font-size: 1.5rem;
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
          @media (max-width: 600px) {
            .logo {
              font-size: 1.2rem;
            }
            .logo-text {
              font-size: 1.2rem;
            }
          }
        `}</style>
    </header>
  );
};

export default Header;
