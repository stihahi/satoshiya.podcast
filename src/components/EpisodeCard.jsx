import React, { useState, useRef } from 'react';

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
          <span className="episode-duration">{episode.duration}</span>
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
          background-color: var(--card-bg);
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
        }
        .episode-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          border-color: var(--accent-color);
        }
        .episode-image {
          height: 180px;
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
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
          cursor: pointer;
        }
        .episode-card:hover .play-overlay {
          opacity: 1;
        }
        .play-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--accent-color);
          color: white;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 4px;
          transition: transform 0.2s;
        }
        .play-overlay:hover .play-icon {
          transform: scale(1.1);
          background-color: var(--accent-hover);
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
          margin-bottom: 0.8rem;
        }
        .episode-title {
          font-size: 1.2rem;
          margin-bottom: 0.8rem;
          line-height: 1.4;
        }
        .episode-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
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
