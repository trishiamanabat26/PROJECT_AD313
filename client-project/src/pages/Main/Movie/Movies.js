import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Movies = () => {
  const { movies, setMovies } = useContext(UserContext);

  const addMovie = () => {
    const newMovie = { id: movies.length + 1, title: `Movie ${movies.length + 1}` };
    setMovies([...movies, newMovie]);
  };

  return (
    <div>
      <h1>Movies List</h1>
      <button onClick={addMovie}>Add Movie</button>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
