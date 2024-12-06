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
  const [videoDuration, setVideoDuration] = useState(15);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const BEARER_TOKEN = 'your-bearer-token-here';

  const getMovies = () => {
    axios
      .get('/movies')
      .then((response) => {
        setMovieList(response.data);
        const random = Math.floor(Math.random() * response.data.length);
        setFeaturedMovie(response.data[random]);
        fetchVideos(response.data[random].tmdbId);
      })
      .catch((e) => console.log(e));
  };

  const fetchVideos = (tmdbId) => {
    axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/videos`, {
      headers: { Authorization: `${BEARER_TOKEN}` },
    })
      .then((response) => {
        const officialTrailer = response.data.results.filter(video => video.type === 'Trailer' && video.name.includes('Official'));
        setVideos(officialTrailer.length > 0 ? officialTrailer : response.data.results);
      })
      .catch((error) => console.error(error));
  };

  const handleNextMovie = () => {
    if (movieList.length) {
      const random = Math.floor(Math.random() * movieList.length);
      setFeaturedMovie(movieList[random]);
      fetchVideos(movieList[random].tmdbId);
      setCurrentVideoIndex(0);
      setVideoDuration(20);
    } else {
      console.log("Movie list is empty or not loaded.");
    }
  };

  const handleNextTrailer = () => {
    if (videos && videos.length > 1) {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      setVideoDuration(20);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoDuration(prev => (prev > 0 ? prev - 1 : 20));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [currentVideoIndex]);

  useEffect(() => {
    if (videoDuration === 0) {
      handleNextMovie();
    }
  }, [videoDuration]);

  const filteredMovies = movieList.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='main-containerr'>
      <h1 className='page-title'>Preview Movies</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-box"
      />
      {featuredMovie && movieList.length ? (
        <div className='featured-list-container'>
          {videos && videos.length > 0 && (
            <div className="trailer-container">
              <h3>Watch Official Trailer</h3>
              <div className="trailer-video">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${videos[currentVideoIndex].key}?autoplay=1`}
                  title={videos[currentVideoIndex].name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="overlay">
                  <button
                    onClick={() => navigate(`/main/view/${featuredMovie.id}`)}
                    className="watch-now-button"
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="movie-title-container">
            <span className='featured-movie-title'>{featuredMovie.title}</span>
          </div>
          <button onClick={handleNextTrailer} className="next-trailer-button">
            Next Trailer
          </button>
          <button onClick={handleNextMovie} className="next-button">
            Next Movie
          </button>
        </div>
      ) : (
        <div className="featured-list-container-loader">
          <div className="spinner"></div>
        </div>
      )}
      <div className="list-container">
        {filteredMovies.map((movie) => (
          <MovieCards
            key={movie.id}
            movie={movie}
            onClick={() => {
              navigate(`/main/view/${movie.id}`);
              setMovie(movie);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
