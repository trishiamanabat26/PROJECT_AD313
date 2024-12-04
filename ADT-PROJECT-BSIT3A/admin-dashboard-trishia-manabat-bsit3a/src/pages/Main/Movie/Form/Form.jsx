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

  // Fetch movies based on the search query
  const handleSearch = useCallback(() => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`, // Use Bearer token here
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

  // Fetch the movie details for editing
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
                      <div className='cast-info'>
                        <h4>{cast.name}</h4>
                        <p>{cast.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='crew-card-container'>
                  {castAndCrew.crew.map((crew) => (
                    <div className='crew-card' key={crew.id}>
                      <img
                        className='crew-image'
                        src={`https://image.tmdb.org/t/p/original/${crew.profile_path}`}
                        alt={crew.name}
                      />
                      <div className='crew-info'>
                        <h4>{crew.name}</h4>
                        <p>{crew.job}</p>
                      </div>
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
                    <img
                      key={photo.file_path}
                      src={`https://image.tmdb.org/t/p/original/${photo.file_path}`}
                      alt='photo'
                      className='photo-image'
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'videos' && videos && (
              <div>
                <h3>Videos</h3>
                <div className='videos-container'>
                  {videos.results.map((video) => (
                    <div key={video.id}>
                      <h4>{video.name}</h4>
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
};

export default Form;
