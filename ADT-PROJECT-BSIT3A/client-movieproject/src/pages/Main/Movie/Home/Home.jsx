import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCards from '../../../../components/MovieCards/MovieCards';
import { useMovieContext } from '../../../../context/MovieContext';

const Home = () => {
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [videos, setVideos] = useState(null);
  const { movieList, setMovieList, setMovie } = useMovieContext();
  
  const BEARER_TOKEN = 'bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWViMTNmZjdjZDVmNjI1MDA3M2IyZmNkMTQ0NTdlZCIsIm5iZiI6MTczMzI5OTMwMi4yNDQsInN1YiI6IjY3NTAwYzY2MjFlMWVhY2FjNmYwMWNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LSSKNU-NMbJBYgIsZmNnaQpyjIyRlTl1tYlL8JB-uJg';

  const getMovies = () => {
    axios
      .get('/movies')
      .then((response) => {
        setMovieList(response.data);
        const random = Math.floor(Math.random() * response.data.length);
        setFeaturedMovie(response.data[random]);
        fetchVideos(response.data[random].tmdbId); // Fetch the video for the first movie
      })
      .catch((e) => console.log(e));
  };

  const fetchVideos = (tmdbId) => {
    axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/videos`, {
      headers: { Authorization: `${BEARER_TOKEN}` },
    })
      .then((response) => setVideos(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (movieList.length) {
        const random = Math.floor(Math.random() * movieList.length);
        setFeaturedMovie(movieList[random]);
        fetchVideos(movieList[random].tmdbId); // Fetch video when the featured movie changes
      }
    }, 15000); // Change every 15 seconds
    return () => clearInterval(interval);
  }, [movieList]);

  return (
    <div className='main-containerr'>
      <h1 className='page-title'>Preview Movies</h1>
      
      {featuredMovie && movieList.length ? (
        <div className='featured-list-container'>
          <div
            className='featured-backdrop'
            style={{
              background: `url(${
                featuredMovie.backdropPath !==
                'https://image.tmdb.org/t/p/original/undefined'
                  ? featuredMovie.backdropPath
                  : featuredMovie.posterPath
              }) no-repeat center center / cover`,
            }}
          >
            <span className='featured-movie-title'>{featuredMovie.title}</span>
          </div>

          {/* Video Section */}
          {videos && videos.results.length > 0 && (
            <div className="videos-section">
              <h3>Videos</h3>
              <div className="videos-container">
                {videos.results.map((video) => (
                  <div key={video.id}>
                    <h4>{video.name}</h4>
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          )}
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
