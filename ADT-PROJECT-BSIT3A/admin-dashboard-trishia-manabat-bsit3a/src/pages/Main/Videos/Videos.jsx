import React, { useState } from 'react';
import axios from 'axios';

const Videos = () => {
  const [videoId, setVideoId] = useState('');
  const [movieId, setMovieId] = useState('');
  const [userId, setUserId] = useState('');
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [site, setSite] = useState('YouTube');
  const [videoType, setVideoType] = useState('Clip');
  const [videoKey, setVideoKey] = useState('');
  const [official, setOfficial] = useState(0); // 0 for false, 1 for true
  const [responseMessage, setResponseMessage] = useState('');
  const [fetchedVideo, setFetchedVideo] = useState(null);
  const [token, setToken] = useState('your-auth-token'); // Replace with your token

  // Handle GET by ID
  const handleFetchById = async () => {
    if (!videoId) {
      setResponseMessage('Please enter a video ID.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost/movieproject-api/admin/videos/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFetchedVideo(response.data);
      setResponseMessage('Video fetched successfully!');
    } catch (error) {
      setResponseMessage('Error fetching video.');
      console.error('Error:', error);
    }
  };

  // Handle Create
  const handleCreateVideo = async () => {
    if (!userId || !movieId || !url || !name || !videoKey) {
      setResponseMessage('Please fill in all required fields.');
      return;
    }

    const payload = {
      userId: parseInt(userId),
      movieId: parseInt(movieId),
      url,
      name,
      site,
      videoType,
      videoKey,
      official: parseInt(official),
    };

    try {
      const response = await axios.post('http://localhost/movieproject-api/admin/videos', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponseMessage('Video created successfully!');
      console.log(response.data);
    } catch (error) {
      setResponseMessage('Error creating video.');
      console.error('Error:', error);
    }
  };

  // Handle Update
  const handleUpdateVideo = async () => {
    if (!videoId || !movieId || !url || !name || !videoKey) {
      setResponseMessage('Please fill in all required fields.');
      return;
    }

    const payload = {
      movieId: parseInt(movieId),
      url,
      name,
      site,
      videoType,
      videoKey,
      official: parseInt(official),
    };

    try {
      const response = await axios.patch(`http://localhost/movieproject-api/admin/videos/${videoId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponseMessage('Video updated successfully!');
      console.log(response.data);
    } catch (error) {
      setResponseMessage('Error updating video.');
      console.error('Error:', error);
    }
  };

  // Handle Delete
  const handleDeleteVideo = async () => {
    if (!videoId) {
      setResponseMessage('Please enter a video ID.');
      return;
    }

    try {
      await axios.delete(`http://localhost/movieproject-api/admin/videos/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponseMessage('Video deleted successfully!');
    } catch (error) {
      setResponseMessage('Error deleting video.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Manage Videos</h2>

      <div>
        <h3>Fetch Video by ID</h3>
        <input 
          type="text" 
          value={videoId} 
          onChange={(e) => setVideoId(e.target.value)} 
          placeholder="Enter video ID" 
        />
        <button onClick={handleFetchById}>Fetch Video</button>
        {fetchedVideo && <pre>{JSON.stringify(fetchedVideo, null, 2)}</pre>}
      </div>

      <div>
        <h3>Create / Update Video</h3>
        <input 
          type="text" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          placeholder="User ID" 
        />
        <input 
          type="text" 
          value={movieId} 
          onChange={(e) => setMovieId(e.target.value)} 
          placeholder="Movie ID" 
        />
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="Video URL" 
        />
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Video Name" 
        />
        <input 
          type="text" 
          value={videoKey} 
          onChange={(e) => setVideoKey(e.target.value)} 
          placeholder="Video Key" 
        />
        <select value={site} onChange={(e) => setSite(e.target.value)}>
          <option value="YouTube">YouTube</option>
          <option value="Vimeo">Vimeo</option>
        </select>
        <select value={videoType} onChange={(e) => setVideoType(e.target.value)}>
          <option value="Clip">Clip</option>
          <option value="Trailer">Trailer</option>
        </select>
        <select value={official} onChange={(e) => setOfficial(e.target.value)}>
          <option value="0">Unofficial</option>
          <option value="1">Official</option>
        </select>
        <button onClick={handleCreateVideo}>Create Video</button>
        <button onClick={handleUpdateVideo}>Update Video</button>
      </div>

      <div>
        <h3>Delete Video</h3>
        <input 
          type="text" 
          value={videoId} 
          onChange={(e) => setVideoId(e.target.value)} 
          placeholder="Enter video ID" 
        />
        <button onClick={handleDeleteVideo}>Delete Video</button>
      </div>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Videos;
