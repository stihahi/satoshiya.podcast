import React from 'react';
import EpisodeCard from './EpisodeCard';
import { episodes } from '../data/episodes';

const EpisodeList = () => {
    return (
        <section id="episodes" className="episodes-section">
            <div className="container">
                <h2 className="section-title">Latest Episodes</h2>
                <div className="episodes-grid">
                    {episodes.map(episode => (
                        <EpisodeCard key={episode.id} episode={episode} />
                    ))}
                </div>
            </div>
            <style>{`
        .episodes-section {
          padding: 4rem 0;
        }
        .episodes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
      `}</style>
        </section>
    );
};

export default EpisodeList;
