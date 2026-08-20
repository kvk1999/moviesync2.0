import React from 'react';
import { X, Star, Clock, Calendar, Users, Bookmark, Play } from 'lucide-react';
import './MovieDetailsModal.css';

export default function MovieDetailsModal({ movie, onClose, onCreateParty, isBookmarked, onToggleBookmark }) {
  if (!movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header-banner" style={{ backgroundImage: `linear-gradient(to top, var(--bg-card), transparent), url(${movie.bannerUrl})` }}>
          <div className="modal-banner-content">
            <span className="live-badge">FEATURED</span>
            <h2>{movie.title}</h2>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-grid">
            <div className="modal-poster">
              <img src={movie.posterUrl} alt={movie.title} />
              <button className="btn btn-primary modal-action-btn" onClick={() => onCreateParty(movie)}>
                <Users size={18} />
                Start Watch Party
              </button>
            </div>

            <div className="modal-details">
              <div className="modal-meta-row">
                <span className="rating-tag"><Star size={14} fill="#f59e0b" color="#f59e0b" /> {movie.rating}</span>
                <span className="meta-item"><Calendar size={14} /> {movie.releaseYear}</span>
                <span className="meta-item"><Clock size={14} /> {movie.runtime}</span>
              </div>

              <div className="genres-list">
                {movie.genre.map(g => (
                  <span key={g} className="genre-tag">{g}</span>
                ))}
              </div>

              <p className="modal-tagline">"{movie.tagline}"</p>
              <h4 className="section-label">Overview</h4>
              <p className="modal-overview">{movie.overview}</p>

              <h4 className="section-label">Cast</h4>
              <div className="cast-list">
                {movie.cast.map(actor => (
                  <span key={actor} className="cast-badge">{actor}</span>
                ))}
              </div>

              <div className="modal-footer-actions">
                <button
                  className={`btn ${isBookmarked ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => onToggleBookmark(movie)}
                >
                  <Bookmark size={18} fill={isBookmarked ? 'white' : 'none'} />
                  {isBookmarked ? 'In Watchlist' : 'Add to Watchlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
