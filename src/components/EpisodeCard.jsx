import React, { useState, useRef } from 'react';
import { formatDuration } from '../utils/formatDuration';

const EpisodeCard = ({ episode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="episode-card">
      <div
        className="episode-image"
        style={{ backgroundImage: `url(${episode.image})` }}
      >
        <div className="play-overlay" onClick={handlePlayClick}>
          <span className="play-icon">{isPlaying ? '⏸' : '▶'}</span>
        </div>
      </div>
      <div className="episode-content">
        <div className="episode-meta">
          <span className="episode-date">{episode.date}</span>
          <span className="episode-duration">{formatDuration(episode.duration)}</span>
        </div>
        <h3 className="episode-title">{episode.title}</h3>
        <p className="episode-desc">{episode.description}</p>
        {episode.audioUrl && (
          <audio
            ref={audioRef}
            src={episode.audioUrl}
            onEnded={handleAudioEnded}
          />
        )}
      </div>
      <style>{`
        .episode-card {
          background: var(--card-glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .episode-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg), var(--shadow-glow);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .episode-image {
          height: 200px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .play-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .episode-card:hover .play-overlay {
          opacity: 1;
        }
        .play-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--accent-gradient);
          color: white;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 4px;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        .play-overlay:hover .play-icon {
          transform: scale(1.1);
        }
        .episode-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .episode-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          font-weight: 500;
        }
        .episode-title {
          font-size: 1.25rem;
          margin-bottom: 0.8rem;
          line-height: 1.4;
          font-weight: 700;
        }
        .episode-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default EpisodeCard;
