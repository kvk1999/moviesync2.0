import React from 'react';
import MovieCard from './MovieCard.jsx';
import { Bookmark, Sparkles } from 'lucide-react';
import './Watchlist.css';

export default function Watchlist({ watchlist, onSelectMovie, onCreateParty, onToggleBookmark, onExplore }) {
  return (
    <section className="watchlist-section animate-fade-in">
      <div className="watchlist-header">
        <div className="title-with-icon">
          <Bookmark size={24} color="#e50914" />
          <h2>My Watchlist ({watchlist.length})</h2>
        </div>
        <p className="watchlist-subtitle">Your saved movie collection for upcoming synchronized watch parties.</p>
      </div>

      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <Bookmark size={48} className="empty-icon" />
          <h3>Your watchlist is empty</h3>
          <p>Explore movies and click the bookmark icon on any card to save it here for later.</p>
          <button className="btn btn-primary" onClick={onExplore}>
            <Sparkles size={16} />
            Explore Movies
          </button>
        </div>
      ) : (
        <div className="movie-grid">
          {watchlist.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
              onCreateParty={onCreateParty}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      )}
    </section>
  );
}
