import React, { useState } from 'react';
import axios from 'axios';

const Photo = () => {
  const [imageUrl, setImageUrl] = useState('');  
  const [movieId, setMovieId] = useState('');  
  const [token, setToken] = useState('your-auth-token'); 
  const [uploadMessage, setUploadMessage] = useState('');  

  const handleMovieIdChange = (event) => {
    setMovieId(event.target.value);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!imageUrl) {
      setUploadMessage('Please paste a valid image URL.');
      return;
    }

    try {
      const response = await axios.post('http://localhost/movieproject-api/admin/photos', {
        imageUrl,
        movieId,  
      }, {
        headers: {
          'Content-Type': 'application/json',  
          'Authorization': 'Bearer ' + token, 
        }
      });

      setUploadMessage('Photo URL uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      setUploadMessage('Error uploading photo.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Upload Photo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Movie ID:</label>
          <input 
            type="text" 
            value={movieId} 
            onChange={handleMovieIdChange} 
            placeholder="Enter movie ID"
            required 
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input 
            type="text" 
            value={imageUrl} 
            onChange={handleImageUrlChange} 
            placeholder="Paste movie image URL"
            required 
          />
        </div>
        <button type="submit">Upload Photo</button>
      </form>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default Photo;
