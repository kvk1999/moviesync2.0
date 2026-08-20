import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroBanner from './components/HeroBanner.jsx';
import MovieGrid from './components/MovieGrid.jsx';
import MovieDetailsModal from './components/MovieDetailsModal.jsx';
import SyncRoom from './components/SyncRoom.jsx';
import Watchlist from './components/Watchlist.jsx';
import DeployStatus from './components/DeployStatus.jsx';
import { getFeaturedMovie, getTrendingMovies, searchMovies } from './services/tmdbApi.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'watchlist' | 'room'
  const [movies, setMovies] = useState(getTrendingMovies());
  const [featuredMovie] = useState(getFeaturedMovie());
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Watchlist persistent state
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('moviesync_watchlist');
    return saved ? JSON.parse(saved) : [movies[0], movies[1]];
  });

  // Active Sync Room state
  const [activeRoom, setActiveRoom] = useState(null); // { movie, roomCode }
  const [showDeployModal, setShowDeployModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('moviesync_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const handleSearch = (query) => {
    setMovies(searchMovies(query));
  };

  const handleToggleBookmark = (movie) => {
    setWatchlist(prev => {
      const exists = prev.some(m => m.id === movie.id);
      if (exists) {
        return prev.filter(m => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const handleCreateParty = (movie) => {
    const roomCode = 'ROOM-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    setActiveRoom({ movie, roomCode });
    setSelectedMovie(null);
    setActiveTab('room');
  };

  const handleLeaveRoom = () => {
    setActiveRoom(null);
    setActiveTab('explore');
  };

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearch={handleSearch}
        activeRoom={activeRoom}
        onOpenCloudRunModal={() => setShowDeployModal(true)}
      />

      <main className="main-content">
        {activeTab === 'explore' && (
          <>
            <HeroBanner
              movie={featuredMovie}
              onSelectMovie={setSelectedMovie}
              onCreateParty={handleCreateParty}
            />
            <MovieGrid
              movies={movies}
              onSelectMovie={setSelectedMovie}
              onCreateParty={handleCreateParty}
              watchlist={watchlist}
              onToggleBookmark={handleToggleBookmark}
            />
          </>
        )}

        {activeTab === 'watchlist' && (
          <Watchlist
            watchlist={watchlist}
            onSelectMovie={setSelectedMovie}
            onCreateParty={handleCreateParty}
            onToggleBookmark={handleToggleBookmark}
            onExplore={() => setActiveTab('explore')}
          />
        )}

        {activeTab === 'room' && activeRoom && (
          <SyncRoom
            movie={activeRoom.movie}
            roomCode={activeRoom.roomCode}
            onLeaveRoom={handleLeaveRoom}
          />
        )}
      </main>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onCreateParty={handleCreateParty}
          isBookmarked={watchlist.some(m => m.id === selectedMovie.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* Cloud Run Deployment Readiness Modal */}
      {showDeployModal && (
        <DeployStatus onClose={() => setShowDeployModal(false)} />
      )}
    </div>
  );
}
