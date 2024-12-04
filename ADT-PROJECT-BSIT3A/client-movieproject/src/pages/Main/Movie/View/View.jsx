import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './View.css';

const View = () => {
  const [movie, setMovie] = useState(null);
  const [castAndCrew, setCastAndCrew] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [videos, setVideos] = useState(null);
  const [activeTab, setActiveTab] = useState('cast');
  const navigate = useNavigate();
  const { movieId } = useParams();
  const BEARER_TOKEN = 'bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWViMTNmZjdjZDVmNjI1MDA3M2IyZmNkMTQ0NTdlZCIsIm5iZiI6MTczMzI5OTMwMi4yNDQsInN1YiI6IjY3NTAwYzY2MjFlMWVhY2FjNmYwMWNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LSSKNU-NMbJBYgIsZmNnaQpyjIyRlTl1tYlL8JB-uJg'; 

  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
          fetchCastAndCrew(response.data.tmdbId);
          fetchPhotos(response.data.tmdbId);
          fetchVideos(response.data.tmdbId);
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
      .then((response) => setVideos(response.data))
      .catch((error) => console.error(error));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="view-container">
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
              <li
                onClick={() => handleTabClick('cast')}
                className={activeTab === 'cast' ? 'active' : ''}
              >
                Cast & Crew
              </li>
              <li
                onClick={() => handleTabClick('photos')}
                className={activeTab === 'photos' ? 'active' : ''}
              >
                Photos
              </li>
              <li
                onClick={() => handleTabClick('videos')}
                className={activeTab === 'videos' ? 'active' : ''}
              >
                Videos
              </li>
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
        </>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default View;
