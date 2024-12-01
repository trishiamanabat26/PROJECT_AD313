import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [movies, setMovies] = useState([]); 
  const [filteredMovies, setFilteredMovies] = useState([]); 
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [totalMovies, setTotalMovies] = useState(0); 
  const [error, setError] = useState(''); 
  const [view, setView] = useState('all'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); 


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


  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  };


  useEffect(() => {
    fetchMovies();
    loadFavorites();
  }, []);


  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = (view === 'favorites' ? favorites : movies).filter((movie) =>
      movie.title.toLowerCase().includes(value)
    );
    setFilteredMovies(filtered);
  };


  const handleViewChange = (e) => {
    setView(e.target.value);

    if (e.target.value === 'favorites') {
      setFilteredMovies(favorites); 
    } else {
      setFilteredMovies(movies); 
    }
  };


  const handleRemoveFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    if (view === 'favorites') {
      setFilteredMovies(updatedFavorites);
    }

    alert(`${movie.title} removed from favorites.`);
  };


  const handleViewDetails = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };


  const handlePrint = () => {
    if (selectedMovie) {
      const printWindow = window.open('', '', 'width=800,height=600');
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Movie Details</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .movie-title { font-size: 24px; font-weight: bold; }
              .movie-detail { margin-bottom: 10px; }
              .movie-detail strong { margin-right: 5px; }
            </style>
          </head>
          <body>
            <h1>Movie Details</h1>
            <div class="movie-detail">
              <p class="movie-title">${selectedMovie.title}</p>
              <p><strong>Overview:</strong> ${selectedMovie.overview}</p>
              <p><strong>Popularity:</strong> ${selectedMovie.popularity}</p>
              <p><strong>Release Date:</strong> ${selectedMovie.releaseDate}</p>
              <p><strong>Vote Average:</strong> ${selectedMovie.voteAverage}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  return (
    <div className="dashboard">

      <header className="dashboard-header">
        <h1>🎬 Movie Dashboard</h1>
        <p>
          Total Movies: <strong>{totalMovies}</strong>
        </p>
      </header>

     
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

                <button
                  onClick={() => handleViewDetails(movie)}
                  className="view-details-button"
                >
                  View Movie Details
                </button>

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

    
      {isModalOpen && selectedMovie && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedMovie.title}</h2>
            <p><strong>Overview:</strong> {selectedMovie.overview}</p>
            <p><strong>Popularity:</strong> {selectedMovie.popularity}</p>
            <p><strong>Release Date:</strong> {selectedMovie.releaseDate}</p>
            <p><strong>Vote Average:</strong> {selectedMovie.voteAverage}</p>
            <button onClick={closeModal} className="close-modal-button">
              Close
            </button>
            {/* Print Button */}
            <button onClick={handlePrint} className="print-button">
              Print Movie Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
