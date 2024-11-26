import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [movies, setMovies] = useState([]); // All fetched movies
  const [filteredMovies, setFilteredMovies] = useState([]); // Movies after filtering
  const [favorites, setFavorites] = useState([]); // Favorite movies state
  const [searchTerm, setSearchTerm] = useState(''); // Search term input
  const [loading, setLoading] = useState(true); // Loading state
  const [totalMovies, setTotalMovies] = useState(0); // Total number of movies
  const [error, setError] = useState(''); // Error handling
  const [view, setView] = useState('all'); // State to track selected view ('all' or 'favorites')

  // Fetch movies from the API
  const fetchMovies = () => {
    setLoading(true);
    setError('');
    axios
      .get('/movies')
      .then((response) => {
        const movieData = response.data;
        setMovies(movieData);
        setFilteredMovies(movieData);
        setTotalMovies(movieData.length);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setError('Failed to fetch movies. Please try again later.');
      })
      .finally(() => setLoading(false));
  };

  // Fetch favorites from localStorage
  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  };

  // Fetch movies and favorites on mount
  useEffect(() => {
    fetchMovies();
    loadFavorites();
  }, []);

  // Handle search filter change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter movies by title based on the selected view
    const filtered = (view === 'favorites' ? favorites : movies).filter((movie) =>
      movie.title.toLowerCase().includes(value)
    );
    setFilteredMovies(filtered);
  };

  // Toggle between showing all movies or only favorites
  const handleViewChange = (e) => {
    setView(e.target.value);

    // Update filteredMovies based on the selected view
    if (e.target.value === 'favorites') {
      setFilteredMovies(favorites); // Show only favorites
    } else {
      setFilteredMovies(movies); // Show all movies
    }
  };

  // Handle removing a movie from favorites
  const handleRemoveFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Update filtered list if we're currently viewing favorites
    if (view === 'favorites') {
      setFilteredMovies(updatedFavorites);
    }

    alert(`${movie.title} removed from favorites.`);
  };

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  return (
    <div className="dashboard">
      {/* Header with total movie count */}
      <header className="dashboard-header">
        <h1>🎬 Movie Dashboard</h1>
        <p>Total Movies: <strong>{totalMovies}</strong></p>
      </header>

      {/* Dropdown or buttons to toggle view */}
      <div className="view-toggle">
        <label htmlFor="view-selector">View: </label>
        <select
          id="view-selector"
          value={view}
          onChange={handleViewChange}
          className="view-select"
        >
          <option value="all">All Movies</option>
          <option value="favorites">Favorites</option>
        </select>
      </div>

      {/* Search Bar */}
      <div className="dashboard-search">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Movie Previews Grid */}
      <div className="movie-previews">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={movie.posterPath}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <p>{movie.releaseDate}</p>

                {/* Show 'Remove from Favorites' button for movies in favorites view */}
                {view === 'favorites' && (
                  <button
                    onClick={() => handleRemoveFromFavorites(movie)}
                    className="remove-favorite-button"
                  >
                    Remove from Favorites
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
