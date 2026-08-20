import React from 'react';
import { Star, Bookmark, Users, Play } from 'lucide-react';
import './MovieCard.css';

export default function MovieCard({ movie, onSelect, onCreateParty, isBookmarked, onToggleBookmark }) {
  return (
    <div className="movie-card">
      <div className="card-media" onClick={() => onSelect(movie)}>
        <img src={movie.posterUrl} alt={movie.title} loading="lazy" />
        <div className="card-overlay">
          <button className="overlay-play-btn" title="View Details">
            <Play size={24} fill="white" />
          </button>
        </div>
        <div className="card-rating">
          <Star size={12} fill="#f59e0b" color="#f59e0b" />
          <span>{movie.rating}</span>
        </div>
        <button 
          className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(movie);
          }}
          title={isBookmarked ? "Remove from Watchlist" : "Save to Watchlist"}
        >
          <Bookmark size={16} fill={isBookmarked ? "#e50914" : "none"} color={isBookmarked ? "#e50914" : "white"} />
        </button>
      </div>

      <div className="card-body">
        <h3 className="card-title" onClick={() => onSelect(movie)}>{movie.title}</h3>
        <div className="card-meta">
          <span>{movie.releaseYear}</span>
          <span className="dot">•</span>
          <span>{movie.genre[0]}</span>
          <span className="dot">•</span>
          <span>{movie.runtime}</span>
        </div>
        <button className="btn btn-primary card-sync-btn" onClick={() => onCreateParty(movie)}>
          <Users size={16} />
          Host Party
        </button>
      </div>
    </div>
  );
}
