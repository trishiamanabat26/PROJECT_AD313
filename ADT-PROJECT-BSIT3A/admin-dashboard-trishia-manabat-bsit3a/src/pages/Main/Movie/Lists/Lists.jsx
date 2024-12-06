import { useNavigate } from 'react-router-dom';
import './Lists.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const [lists, setLists] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMessage, setEditMessage] = useState('');

  const getMovies = () => {
    axios
      .get('/movies', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setLists(response.data);
        setFilteredLists(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        alert('Failed to fetch movies. Please try again later.');
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = lists.filter((movie) =>
      movie.title.toLowerCase().includes(value)
    );
    setFilteredLists(filtered);
  };

  const handleAddToFavorites = (movie) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.some((fav) => fav.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(`${movie.title} added to favorites!`);

      setFilteredLists((prevLists) =>
        prevLists.map((m) =>
          m.id === movie.id ? { ...m, isFavorite: true } : m
        )
      );
    } else {
      alert(`${movie.title} is already in your favorites.`);
    }
  };

  const handleDelete = (id) => {
    const isConfirm = window.confirm('Are you sure you want to delete this movie?');
    if (isConfirm) {
      axios
        .delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.status === 200 || response.status === 204) {
            setLists((prevLists) => prevLists.filter((movie) => movie.id !== id));
            setFilteredLists((prevLists) => prevLists.filter((movie) => movie.id !== id));
          } else {
            console.error('Unexpected response:', response);
            alert('Failed to delete movie. Please try again later.');
          }
        })
        .catch((error) => {
          console.error('Error deleting movie:', error.response || error);
          alert('Failed to delete movie. Please try again later.');
        });
    }
  };

  const handleEditClick = (movieId) => {
    setEditMessage('You are about to view this movie. Please wait...');
    setTimeout(() => {
      navigate('/main/movies/form/' + movieId);
    }, 1500);
  };

  return (
    <div className='lists-container'>
      <div className='create-container'>
        <button
          type='button'
          onClick={() => navigate('/main/movies/form')}
          className='create-button'
        >
          Create New
        </button>
      </div>

      <div className='search-container'>
        <input
          type='text'
          placeholder='Search movies...'
          value={searchTerm}
          onChange={handleSearch}
          className='search-input'
        />
      </div>

      {editMessage && (
        <div className="edit-message">
          <p>{editMessage}</p>
        </div>
      )}

      <div className='table-container'>
        <table className='movie-lists'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLists.length > 0 ? (
              filteredLists.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>{movie.title}</td>
                  <td>
                    <button
                      type='button'
                      onClick={() => handleEditClick(movie.id)}
                      className='edit-button'
                    >
                      View
                    </button>
                    <button
                      type='button'
                      onClick={() => handleDelete(movie.id)}
                      className='delete-button'
                    >
                      Delete
                    </button>
                    <button
                      type='button'
                      onClick={() => handleAddToFavorites(movie)}
                      className='favorites-button'
                    >
                      Add to Favorites
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3'>No movies found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lists;
