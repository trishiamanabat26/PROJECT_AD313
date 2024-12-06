import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [castAndCrew, setCastAndCrew] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [videos, setVideos] = useState(null);
  const [activeTab, setActiveTab] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let { movieId } = useParams();

  const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWViMTNmZjdjZDVmNjI1MDA3M2IyZmNkMTQ0NTdlZCIsIm5iZiI6MTczMzI5OTMwMi4yNDQsInN1YiI6IjY3NTAwYzY2MjFlMWVhY2FjNmYwMWNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LSSKNU-NMbJBYgIsZmNnaQpyjIyRlTl1tYlL8JB-uJg'; // Replace with your Bearer token
const handleSearch = useCallback(() => {
  setIsLoading(true);
  axios({
    method: 'get',
    url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  })
    .then((response) => {
      setSearchedMovieList(response.data.results);
      setIsLoading(false);
      console.log(response.data.results);
    })
    .catch((error) => {
      setIsLoading(false);
      console.error("Error fetching movie data: ", error);
      alert('Failed to fetch movies. Please try again later.');
    });
}, [query]);

const handleSelectMovie = (movie) => {
  setSelectedMovie(movie);

  // Fetch additional details: Cast, Crew, Photos, and Videos
  const movieId = movie.id;
  Promise.all([
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    }),
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    }),
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    }),
  ])
    .then(([creditsResponse, imagesResponse, videosResponse]) => {
      // Set the fetched data for Cast, Crew, Photos, and Videos
      setSelectedMovie(prev => ({
        ...prev,
        cast: creditsResponse.data.cast,
        crew: creditsResponse.data.crew,
        photos: imagesResponse.data.backdrops,
        videos: videosResponse.data.results,
      }));
      console.log("Cast & Crew:", creditsResponse.data);
      console.log("Photos:", imagesResponse.data);
      console.log("Videos:", videosResponse.data);
    })
    .catch((error) => {
      console.error("Error fetching additional details: ", error);
      alert('Failed to fetch additional movie details. Please try again later.');
    });
};

const handleSave = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (selectedMovie === undefined) {
    alert('Please search and select a movie.');
    return;
  }

  if (!selectedMovie.original_title || !selectedMovie.overview) {
    alert('Please fill out all required fields.');
    return;
  }

  const data = {
    tmdbId: selectedMovie.id,
    title: selectedMovie.original_title,
    overview: selectedMovie.overview,
    popularity: selectedMovie.popularity,
    releaseDate: selectedMovie.release_date,
    voteAverage: selectedMovie.vote_average,
    backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
    posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
    isFeatured: 0,
    cast: selectedMovie.cast,  // Include cast in the saved data
    crew: selectedMovie.crew,  // Include crew in the saved data
    photos: selectedMovie.photos, // Include photos in the saved data
    videos: selectedMovie.videos, // Include videos in the saved data
  };

  axios({
    method: 'post',
    url: '/movies',
    data: data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((saveResponse) => {
      console.log(saveResponse);
      alert('Movie saved successfully');
    })
    .catch((error) => {
      console.error("Error saving movie: ", error);
      alert('Failed to save movie. Please try again.');
    });
};

useEffect(() => {
  if (movieId) {
    axios.get(`/movies/${movieId}`).then((response) => {
      setMovie(response.data);
      const tempData = {
        id: response.data.tmdbId,
        original_title: response.data.title,
        overview: response.data.overview,
        popularity: response.data.popularity,
        poster_path: response.data.posterPath,
        release_date: response.data.releaseDate,
        vote_average: response.data.voteAverage,
      };
      setSelectedMovie(tempData);
      console.log(response.data);
    });
  }
}, [movieId]);


  // Fetch Cast & Crew
  const fetchCastAndCrew = (movieId) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`, // Use Bearer token here
        },
      })
      .then((response) => setCastAndCrew(response.data));
  };

  // Fetch Photos
  const fetchPhotos = (movieId) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`, // Use Bearer token here
        },
      })
      .then((response) => setPhotos(response.data));
  };

  // Fetch Videos
  const fetchVideos = (movieId) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`, // Use Bearer token here
        },
      })
      .then((response) => setVideos(response.data));
  };

  // Handle tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set active tab
    if (selectedMovie) {
      switch (tab) {
        case 'cast':
          fetchCastAndCrew(selectedMovie.id);
          break;
        case 'photos':
          fetchPhotos(selectedMovie.id);
          break;
        case 'videos':
          fetchVideos(selectedMovie.id);
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <h1>{movieId !== undefined ? 'Edit ' : 'Create '} Movie</h1>

      {movieId === undefined && (
        <>
          <div className='search-container'>
            Search Movie:{' '}
            <input
              type='text'
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type='button' onClick={handleSearch}>
              Search
            </button>
            {isLoading && <p>Loading...</p>}
            <div className='searched-movie'>
              {searchedMovieList.map((movie) => (
                <p onClick={() => handleSelectMovie(movie)} key={movie.id}>
                  {movie.original_title}
                </p>
              ))}
            </div>
          </div>
          <hr />
        </>
      )}

      <div className='container'>
        <form>
          {selectedMovie && (
            <img
              className='poster-image'
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
              alt={selectedMovie.original_title}
            />
          )}
          <div className='field'>
            Title:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.original_title : ''}
            />
          </div>
          <div className='field'>
            Overview:
            <textarea
              rows={10}
              value={selectedMovie ? selectedMovie.overview : ''}
            />
          </div>

          <div className='field'>
            Popularity:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.popularity : ''}
            />
          </div>

          <div className='field'>
            Release Date:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.release_date : ''}
            />
          </div>

          <div className='field'>
            Vote Average:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.vote_average : ''}
            />
          </div>

          <button type='button' onClick={handleSave}>
            Save
          </button>
        </form>
      </div>

      {movieId !== undefined && selectedMovie && (
        <div>
          <hr />
          <nav>
            <ul className='tabs'>
              <li
                onClick={() => handleTabClick('cast')}
                className={activeTab === 'cast' ? 'active' : ''}
              >
                Cast & Crew
              </li>
              <li
                onClick={() => handleTabClick('videos')}
                className={activeTab === 'videos' ? 'active' : ''}
              >
                Videos
              </li>
              <li
                onClick={() => handleTabClick('photos')}
                className={activeTab === 'photos' ? 'active' : ''}
              >
                Photos
              </li>
            </ul>
          </nav>

          <div className='data-section'>
            {activeTab === 'cast' && castAndCrew && (
              <div>
                <h3>Cast & Crew</h3>
                <div className='cast-card-container'>
                  {castAndCrew.cast.map((cast) => (
                    <div className='cast-card' key={cast.id}>
                      <img
                        className='cast-image'
                        src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                        alt={cast.name}
                      />
                      <p>{cast.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'videos' && videos && (
              <div>
                <h3>Videos</h3>
                <div className='videos-container'>
                  {videos.results.map((video) => (
                    <div className='video-item' key={video.id}>
                      <h4>{video.name}</h4>
                      <iframe
                        width='560'
                        height='315'
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        frameBorder='0'
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'photos' && photos && (
              <div>
                <h3>Photos</h3>
                <div className='photos-container'>
                  {photos.backdrops.map((photo) => (
                    <div className='photo-item' key={photo.file_path}>
                      <img
                        className='photo-image'
                        src={`https://image.tmdb.org/t/p/original/${photo.file_path}`}
                        alt='Movie Photo'
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <hr />
      <Outlet />
    </>
  );
};

export default Form;
