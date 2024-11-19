import { useNavigate } from 'react-router-dom';
import './Lists.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch movies from API
  const getMovies = async () => {
    try {
      const response = await axios.get('/movies');
      setLists(response.data);
      setLoading(false); // Hide loading spinner when data is fetched
    } catch (err) {
      setError('Failed to fetch movies');
      setLoading(false);
    }
  };

  // Call getMovies when the component mounts
  useEffect(() => {
    getMovies();
  }, []);

  // Handle delete movie
  const handleDelete = async (id) => {
    const isConfirm = window.confirm('Are you sure you want to delete this movie?');
    if (isConfirm) {
      try {
        // Delete movie from API
        await axios.delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Remove the deleted movie from the state (optimistic update)
        setLists(lists.filter((movie) => movie.id !== id));
      } catch (err) {
        alert('Failed to delete movie');
      }
    }
  };

  // Handle edit movie (navigates to the form with movie ID)
  const handleEdit = (id) => {
    navigate(`/main/movies/form/${id}`); // Navigate to the edit form with movie ID
  };

  return (
    <div className='lists-container'>
      <div className='create-container'>
        <button
          type='button'
          onClick={() => {
            navigate('/main/movies/form'); // Navigate to the form to create a new movie
          }}
          className="create-button"
        >
          Create New
        </button>
      </div>
      
      {/* Loading and error handling */}
      {loading && <div>Loading movies...</div>}
      {error && <div className='error-text'>{error}</div>}

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
            {lists.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.title}</td>
                <td>
                  {/* Edit button */}
                  <button
                    type='button'
                    className="edit-button"
                    onClick={() => handleEdit(movie.id)}
                  >
                    Edit
                  </button>
                  
                  {/* Delete button */}
                  <button 
                    type='button' 
                    className="delete-button" 
                    onClick={() => handleDelete(movie.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lists;
