import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EpisodeList from './components/EpisodeList';
import Forms from './components/Forms';
import Footer from './components/Footer';
import { fetchEpisodes } from './utils/rss';

function App() {
  const [episodes, setEpisodes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const { title, description, episodes } = await fetchEpisodes();
        setEpisodes(episodes);
        setTitle(title);
        setDescription(description);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEpisodes();
  }, []);

  return (
    <div className="app">
      <Header title={title} />
      <main>
        <Hero title={title} description={description} />
        {loading && <div className="loading">Loading episodes...</div>}
        {error && <div className="error">Error loading episodes: {error}</div>}
        {!loading && !error && <EpisodeList episodes={episodes} />}
        <Forms />
      </main>
      <Footer title={title} />
      <style>{`
        .loading, .error {
          text-align: center;
          padding: 2rem;
          font-size: 1.2rem;
          color: var(--text-primary);
        }
        .error {
          color: #ff4444;
        }
      `}</style>
    </div>
  );
}

export default App;
