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
  }, []);

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

  // Handle delete
  const handleDelete = (id) => {
    const isConfirm = window.confirm('Are you sure you want to delete this movie?');
    if (isConfirm) {
      axios
        .delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          // Update lists locally
          const updatedLists = lists.filter((movie) => movie.id !== id);
          setLists(updatedLists);
          setFilteredLists(updatedLists); // Reflect deletion in the filtered list
        })
        .catch((error) => {
          console.error('Error deleting movie:', error);
          alert('Failed to delete movie. Please try again later.');
        });
    }
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
                      onClick={() => navigate('/main/movies/form/' + movie.id)}
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
