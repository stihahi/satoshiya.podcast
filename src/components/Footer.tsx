import React from 'react';
import pipeIcon from '../assets/pipe_icon.png';

interface FooterProps {
  title: string;
}

const Footer: React.FC<FooterProps> = ({ title }) => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-logo">
          <img src={pipeIcon} alt="logo" className="logo-icon" />
          <span>{title}</span>
        </div>
        <div className="footer-links">
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">Spotify</a>
          <a href="#">Apple Podcasts</a>
        </div>
        <p className="copyright">© 2023 TechTalks Podcast. All rights reserved.</p>
      </div>
      <style>{`
          .footer {
            padding: 3rem 0;
            border-top: 1px solid var(--border-color);
            margin-top: 2rem;
            text-align: center;
          }
          .footer-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          .footer-logo {
            font-size: 1.5rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .footer-logo .logo-icon {
            width: 1.8rem;
            height: 1.8rem;
          }
          .footer-links {
            display: flex;
            gap: 1.5rem;
          }
          .footer-links a {
            color: var(--text-secondary);
            font-size: 0.9rem;
          }
          .footer-links a:hover {
            color: var(--accent-color);
          }
          .copyright {
            color: var(--text-secondary);
            font-size: 0.8rem;
            opacity: 0.6;
          }
          @media (max-width: 600px) {
            .footer-logo {
              font-size: 1.2rem;
            }
          }
        `}</style>
    </footer>
  );
};

export default Footer;
