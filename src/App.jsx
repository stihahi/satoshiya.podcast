import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EpisodeList from './components/EpisodeList';
import Forms from './components/Forms';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <EpisodeList />
        <Forms />
      </main>
      <Footer />
    </div>
  );
}

export default App;
