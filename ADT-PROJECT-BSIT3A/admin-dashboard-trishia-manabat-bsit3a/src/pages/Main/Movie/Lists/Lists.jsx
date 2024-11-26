import { useNavigate } from 'react-router-dom';
import './Lists.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const [lists, setLists] = useState([]); // Full list of movies
  const [filteredLists, setFilteredLists] = useState([]); // Filtered movies for display
  const [searchTerm, setSearchTerm] = useState(''); // Search term input
  const [editMessage, setEditMessage] = useState(''); // State to show edit message

  // Fetch movies from API
  const getMovies = () => {
    axios
      .get('/movies', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setLists(response.data);
        setFilteredLists(response.data); // Initialize filtered list
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        alert('Failed to fetch movies. Please try again later.');
      });
  };

  useEffect(() => {
    getMovies();
  }, []); // Only fetch movies once on component mount

  // Handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase(); // Normalize input
    setSearchTerm(value);

    // Filter movies based on the search term
    const filtered = lists.filter((movie) =>
      movie.title.toLowerCase().includes(value)
    );
    setFilteredLists(filtered);
  };

  // Handle add to favorites
  const handleAddToFavorites = (movie) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if movie is already in favorites
    if (!favorites.some((fav) => fav.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(`${movie.title} added to favorites!`);

      // Update filtered list to reflect the change
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
            // Deletion was successful, update the UI
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

  // Handle edit button click
  const handleEditClick = (movieId) => {
    setEditMessage('You are about to edit this movie. Please wait...');

    // Delay navigation to show message for a moment
    setTimeout(() => {
      navigate('/main/movies/form/' + movieId);
    }, 1500); // Show the message for 1.5 seconds before navigating
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

      {/* Search Input */}
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search movies...'
          value={searchTerm}
          onChange={handleSearch}
          className='search-input'
        />
      </div>

      {/* Edit Message Display */}
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
                      Edit
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
