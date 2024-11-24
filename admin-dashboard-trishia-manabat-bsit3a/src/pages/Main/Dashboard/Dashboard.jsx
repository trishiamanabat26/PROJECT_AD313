import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [movies, setMovies] = useState([]); // All fetched movies
  const [filteredMovies, setFilteredMovies] = useState([]); // Movies after filtering
  const [searchTerm, setSearchTerm] = useState(''); // Search term input
  const [loading, setLoading] = useState(true); // Loading state
  const [totalMovies, setTotalMovies] = useState(0); // Total number of movies

  // Fetch movies from the API
  const fetchMovies = () => {
    setLoading(true);
    axios
      .get('/movies')
      .then((response) => {
        const movieData = response.data;
        setMovies(movieData);
        setFilteredMovies(movieData);
        setTotalMovies(movieData.length);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        alert('Failed to fetch movies. Please try again later.');
      })
      .finally(() => setLoading(false));
  };

  // Fetch movies on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  // Handle search filter change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter movies by title
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(value)
    );
    setFilteredMovies(filtered);
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

      {/* Search Bar */}
      <div className="dashboard-search">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

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
