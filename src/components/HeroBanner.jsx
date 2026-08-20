import React from 'react';
import { Play, Users, Info, Star } from 'lucide-react';
import './HeroBanner.css';

export default function HeroBanner({ movie, onSelectMovie, onCreateParty }) {
  if (!movie) return null;

  return (
    <div className="hero-banner animate-fade-in" style={{ backgroundImage: `linear-gradient(to top, var(--bg-dark), rgba(15, 16, 21, 0.4)), url(${movie.bannerUrl})` }}>
      <div className="hero-content">
        <div className="hero-tags">
          <span className="live-badge">FEATURED RELEASE</span>
          <span className="hero-rating"><Star size={14} fill="#f59e0b" color="#f59e0b" /> {movie.rating}</span>
          <span className="hero-year">{movie.releaseYear}</span>
        </div>

        <h1 className="hero-title">{movie.title}</h1>
        <p className="hero-tagline">{movie.tagline}</p>
        <p className="hero-overview">{movie.overview}</p>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => onCreateParty(movie)}>
            <Users size={18} />
            Start Watch Party
          </button>
          
          <button className="btn btn-secondary" onClick={() => onSelectMovie(movie)}>
            <Info size={18} />
            Details & Trailer
          </button>
        </div>
      </div>
    </div>
  );
}
