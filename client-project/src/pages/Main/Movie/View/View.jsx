import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMovieContext } from '../../../../context/MovieContext';
import axios from 'axios';

const View = () => {
  const { movieId } = useParams(); 
  const navigate = useNavigate(); 
  const [movie, setMovie] = useState(null);
  const { setMovie: setContextMovie } = useMovieContext();

  useEffect(() => {
    axios
      .get(`/movies/${movieId}`)
      .then((response) => {
        setMovie(response.data);
        setContextMovie(response.data); 
      })
      .catch((e) => console.error('Error fetching movie details:', e));
  }, [movieId, setContextMovie]);

  return (
    <div className="movie-details">
      <button onClick={() => navigate('/main')}>Back to Home</button>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <img src={movie.posterPath} alt={movie.title} />
          <p>{movie.description}</p>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default View;
