import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './View.css';

const View = () => {
  const [movie, setMovie] = useState(null);
  const [castAndCrew, setCastAndCrew] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [videos, setVideos] = useState(null);
  const [whereToWatch, setWhereToWatch] = useState(null);
  const [activeTab, setActiveTab] = useState('cast');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); 
  const navigate = useNavigate();
  const { movieId } = useParams();
  const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWViMTNmZjdjZDVmNjI1MDA3M2IyZmNkMTQ0NTdlZCIsIm5iZiI6MTczMzI5OTMwMi4yNDQsInN1YiI6IjY3NTAwYzY2MjFlMWVhY2FjNmYwMWNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LSSKNU-NMbJBYgIsZmNnaQpyjIyRlTl1tYlL8JB-uJg'; 

  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
          fetchCastAndCrew(response.data.tmdbId);
          fetchPhotos(response.data.tmdbId);
          fetchVideos(response.data.tmdbId);
          fetchWhereToWatch(response.data.tmdbId);
        })
        .catch((error) => {
          console.error(error);
          navigate('/');
        });
    }
  }, [movieId, navigate]);

  const fetchCastAndCrew = (tmdbId) => {
    axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/credits`, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    })
      .then((response) => setCastAndCrew(response.data))
      .catch((error) => console.error(error));
  };

  const fetchPhotos = (tmdbId) => {
    axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/images`, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    })
      .then((response) => setPhotos(response.data))
      .catch((error) => console.error(error));
  };

  const fetchVideos = (tmdbId) => {
    axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/videos`, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    })
      .then((response) => {
        const officialTrailer = response.data.results.filter(video => video.type === 'Trailer' && video.name.toLowerCase().includes('official'));
        const otherVideos = response.data.results.filter(video => video.type === 'Trailer' && !video.name.toLowerCase().includes('official'));
        setVideos({
          results: [...officialTrailer, ...otherVideos],
        });

        if (officialTrailer.length > 0) {
          setCurrentVideoIndex(0);
        }
      })
      .catch((error) => console.error(error));
  };

  const fetchWhereToWatch = (tmdbId) => {
    axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/watch/providers`, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    })
      .then((response) => {
        const providers = response.data.results;
        const usProviders = providers['GB'];
        
        if (usProviders && usProviders.flatrate) {
          setWhereToWatch(usProviders.flatrate);
        } else {
          setWhereToWatch([]);
        }
      })
      .catch((error) => console.error('Error fetching where to watch data:', error));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="view-container">
      <nav>
        <ul className="nav-buttons">
          <li>
            <button className="back-button" onClick={handleBackClick}>← Back</button>
          </li>
        </ul>
      </nav>

      {movie ? (
        <>
          <h1>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`}
            alt={movie.title}
            className="movie-poster"
          />
          <p>{movie.overview}</p>

          <nav>
            <ul className="tabs">
              <li onClick={() => handleTabClick('cast')} className={activeTab === 'cast' ? 'active' : ''}>Cast & Crew</li>
              <li onClick={() => handleTabClick('photos')} className={activeTab === 'photos' ? 'active' : ''}>Photos</li>
              <li onClick={() => handleTabClick('videos')} className={activeTab === 'videos' ? 'active' : ''}>Videos</li>
              <li onClick={() => handleTabClick('whereToWatch')} className={activeTab === 'whereToWatch' ? 'active' : ''}>Where to Watch</li>
            </ul>
          </nav>

          {activeTab === 'cast' && castAndCrew && (
            <div className="cast-crew-section">
              <h3>Cast & Crew</h3>
              <div className="cast-list">
                {castAndCrew.cast.map((cast) => (
                  <div className="cast-item" key={cast.id}>
                    <img
                      className="cast-image"
                      src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                      alt={cast.name}
                    />
                    <p>{cast.name} as {cast.character}</p>
                  </div>
                ))}
              </div>
              <div className="crew-list">
                {castAndCrew.crew.map((crew) => (
                  <div className="crew-item" key={crew.id}>
                    <img
                      className="crew-image"
                      src={`https://image.tmdb.org/t/p/original/${crew.profile_path}`}
                      alt={crew.name}
                    />
                    <p>{crew.name} - {crew.job}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'photos' && photos && (
            <div className="photos-section">
              <h3>Photos</h3>
              <div className="photos-container">
                {photos.backdrops.map((photo) => (
                  <img
                    key={photo.file_path}
                    src={`https://image.tmdb.org/t/p/original/${photo.file_path}`}
                    alt="photo"
                    className="photo-image"
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'videos' && videos && (
            <div className="videos-section">
              <h3>Videos</h3>
              <div className="videos-container">
                {videos.results.length > 0 && (
                  <div>
                    <h4>{videos.results[currentVideoIndex].name}</h4>
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${videos.results[currentVideoIndex].key}?autoplay=1`}
                      title={videos.results[currentVideoIndex].name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <div className="other-videos">
                  {videos.results.slice(1).map((video) => (
                    <div key={video.key} className="video-item">
                      <h5>{video.name}</h5>
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
            </div>
          )}

          {activeTab === 'whereToWatch' && whereToWatch && whereToWatch.length > 0 ? (
            <div className="where-to-watch-section">
              <h3>Where to Watch</h3>
              <ul>
                {whereToWatch.map((provider) => (
                  <li key={provider.provider_id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                      alt={provider.provider_name}
                      style={{ width: '50px', height: '50px' }}
                    />
                    <p>{provider.provider_name}</p>
                    {provider.link && (
                      <a href={provider.link} target="_blank" rel="noopener noreferrer">
                        Watch Now
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No streaming providers available.</p>
          )}
        </>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default View;
