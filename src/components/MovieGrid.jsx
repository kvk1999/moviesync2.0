import React, { useState } from 'react';
import MovieCard from './MovieCard.jsx';
import './MovieGrid.css';

const GENRES = ["All", "Action", "Sci-Fi", "Adventure", "Drama", "Mystery", "Thriller"];

export default function MovieGrid({ movies, onSelectMovie, onCreateParty, watchlist, onToggleBookmark }) {
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredMovies = selectedGenre === "All" 
    ? movies 
    : movies.filter(m => m.genre.includes(selectedGenre));

  return (
    <section className="movie-grid-section">
      <div className="section-header">
        <h2 className="section-title">Trending Now</h2>
        
        <div className="genre-pills">
          {GENRES.map(genre => (
            <button
              key={genre}
              className={`genre-pill ${selectedGenre === genre ? 'active' : ''}`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="empty-grid">
          <p>No movies found matching your selected filter.</p>
        </div>
      ) : (
        <div className="movie-grid">
          {filteredMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
              onCreateParty={onCreateParty}
              isBookmarked={watchlist.some(m => m.id === movie.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      )}
    </section>
  );
}
