// EditMovie.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Movie.css';

const EditMovie = () => {
  const { id } = useParams();  // Get movie ID from URL
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: '',
    description: '',
    genre: '',
    releaseDate: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the movie data when the component mounts
  useEffect(() => {
    axios
      .get(`/movies/${id}`)
      .then((response) => {
        setMovie(response.data);  // Populate the form fields with movie data
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch movie details');
        setLoading(false);
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated movie data to the server
    axios
      .put(`/movies/${id}`, movie)
      .then(() => {
        navigate('/main/movies');  // Redirect to the movie list after updating
      })
      .catch((err) => {
        setError('Failed to update movie');
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-movie-container">
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit} className="edit-movie-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={movie.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={movie.releaseDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
