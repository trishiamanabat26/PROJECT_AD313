import React, { createContext, useState, useContext } from 'react';

// Create a MovieContext with default values
const MovieContext = createContext({
  movieList: [],
  setMovieList: () => {},
  movie: undefined,
  setMovie: () => {},
});

function MovieContextProvider({ children }) {
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState(undefined);

  return (
    <MovieContext.Provider value={{ movieList, setMovieList, movie, setMovie }}>
      {children}
    </MovieContext.Provider>
  );
}

// Custom hook to use MovieContext
export const useMovieContext = () => {
  return useContext(MovieContext);
};

export default MovieContextProvider;
