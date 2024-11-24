import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCards from '../../../../components/MovieCards/MovieCards';
import { useMovieContext } from '../../../../context/MovieContext';

const Home = () => {
  const navigate = useNavigate();
  const { movieList, setMovieList, setMovie } = useMovieContext();

  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch movies from the API
  const getMovies = async () => {
    try {
      const response = await axios.get('/movies');
      setMovieList(response.data);

      // Pick a random featured movie
      const random = Math.floor(Math.random() * response.data.length);
      setFeaturedMovie(response.data[random]);
      setLoading(false); // Set loading to false after data is fetched
    } catch (e) {
      console.error('Error fetching movies:', e);
      setError('Failed to fetch movies. Please try again later.');
      setLoading(false);
    }
  };

  // Fetch movies on component mount
  useEffect(() => {
    getMovies();
  }, []);

  // Change featured movie every 5 seconds
  useEffect(() => {
    if (movieList.length) {
      const timer = setInterval(() => {
        const random = Math.floor(Math.random() * movieList.length);
        setFeaturedMovie(movieList[random]);
      }, 5000);

      return () => clearInterval(timer); // Cleanup interval
    }
  }, [movieList]);

  // Helper function for featured movie image path
  const getImagePath = (movie) =>
    movie.backdropPath && movie.backdropPath !== 'undefined'
      ? movie.backdropPath
      : movie.posterPath;

  // Render error or loader if necessary
  if (loading) {
    return <div className="loader">Loading movies...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="main-container">
      <h1 className="page-title">Movies</h1>

      {/* Featured Movie Section */}
      {featuredMovie ? (
        <div className="featured-list-container">
          <div
            className="featured-backdrop"
            style={{
              backgroundImage: `url(${getImagePath(featuredMovie)})`,
            }}
          >
            <span className="featured-movie-title">{featuredMovie.title}</span>
          </div>
        </div>
      ) : (
        <div className="featured-list-container-loader">
          <div className="spinner"></div>
        </div>
      )}

      {/* Movie List */}
      <div className="list-container">
        {movieList.map((movie) => (
          <MovieCards
            key={movie.id}
            movie={movie}
            onClick={() => {
              navigate(`/main/view/${movie.id}`); // Navigate to movie detail page
              setMovie(movie); // Set selected movie in context
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
