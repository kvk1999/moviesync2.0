import React, { useState } from 'react';
import { Film, Search, Bookmark, Users, Cloud, Sparkles } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ activeTab, setActiveTab, onSearch, activeRoom, onOpenCloudRunModal }) {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => setActiveTab('explore')}>
          <div className="brand-icon">
            <Film size={24} color="#e50914" />
          </div>
          <span className="brand-name">Movie<span className="brand-highlight">Sync</span></span>
        </div>

        {/* Search Bar */}
        <div className="navbar-search">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search movies, genres, actors..."
            value={query}
            onChange={handleSearchChange}
          />
        </div>

        {/* Navigation Tabs */}
        <nav className="navbar-nav">
          <button
            className={`nav-link ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveTab('explore')}
          >
            <Sparkles size={18} />
            <span>Explore</span>
          </button>

          <button
            className={`nav-link ${activeTab === 'watchlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('watchlist')}
          >
            <Bookmark size={18} />
            <span>Watchlist</span>
          </button>

          {activeRoom && (
            <button
              className={`nav-link ${activeTab === 'room' ? 'active' : ''}`}
              onClick={() => setActiveTab('room')}
            >
              <Users size={18} />
              <span>Active Party</span>
              <span className="nav-badge">LIVE</span>
            </button>
          )}

          <button
            className="btn btn-secondary cloud-btn"
            onClick={onOpenCloudRunModal}
            title="Cloud Run Ready Status"
          >
            <Cloud size={16} color="#3b82f6" />
            <span className="cloud-btn-text">Cloud Run</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
