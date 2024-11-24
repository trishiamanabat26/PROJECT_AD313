<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; // For edit and delete icons
import './Cast.css'; // Custom styling for cinematic look

const CastAndCrews = () => {
  const [castProfiles, setCastProfiles] = useState([]);
  const [castName, setCastName] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const movieId = 38; // Example Movie ID
  const token = 'your_token_here'; // Replace with your valid token

  // Fetch the cast profiles for a specific movie
  const fetchCastProfiles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost/movieproject-api/admin/casts/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCastProfiles(response.data);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Error fetching cast profiles'); // Show error if fetching fails
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCastProfiles();
  }, []);

  // Create a new cast profile using form data
  const handleAddProfile = async () => {
    if (!castName || !characterName || !profileLink) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('userId', '1');  // Example userId, adjust as needed
    formData.append('movieId', movieId.toString());  // Movie ID
    formData.append('name', castName);  // Cast Name
    formData.append('characterName', characterName);  // Character Name
    formData.append('url', profileLink);  // Profile URL (Image URL)

    setIsLoading(true);
    try {
      await axios.post('http://localhost/movieproject-api/admin/casts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Re-fetch profiles and clear form on successful add
      fetchCastProfiles();
      setCastName('');
      setCharacterName('');
      setProfileLink('');
      setError('');
    } catch (err) {
      setError('Error adding profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cast">
      <h1>Cast & Crew</h1>
      {error && <div className="error">{error}</div>}  {/* Error message only shown when error occurs */}
      {isLoading && <div className="loading">Loading...</div>}

      {/* Add Profile Form */}
      <div className="add-profile-form">
        <input
          type="text"
          placeholder="Cast Name"
          value={castName}
          onChange={(e) => setCastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Character Name"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profile Link (Image URL)"
          value={profileLink}
          onChange={(e) => setProfileLink(e.target.value)}
        />
        <button onClick={handleAddProfile} disabled={isLoading}>
          Add Cast Profile
        </button>
      </div>

      {/* Cast Profiles List */}
      <div className="cast-profile-list">
        <h2>Existing Cast Profiles</h2>
        {castProfiles.length === 0 ? (
          <div>No cast profiles available.</div>
        ) : (
          castProfiles.map((profile) => (
            <div key={profile.id} className="cast-profile">
              <h3>{profile.name} (Character: {profile.characterName})</h3>
              {profile.url && (
                <img src={profile.url} alt={profile.name} className="profile-image" />
              )}
              <a href={`/${profile.movieId}`} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
              <div className="actions">
                <button onClick={() => console.log('Edit profile')}><FaEdit /> Edit</button>
                <button onClick={() => console.log('Delete profile')}><FaTrash /> Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CastAndCrews;
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; // For edit and delete icons
import './Cast.css'; // Custom styling for cinematic look

const CastAndCrews = () => {
  const [castProfiles, setCastProfiles] = useState([]);
  const [castName, setCastName] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const movieId = 38; // Example Movie ID
  const token = 'your_token_here'; // Replace with your valid token

  // Fetch the cast profiles for a specific movie
  const fetchCastProfiles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost/movieproject-api/admin/casts/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCastProfiles(response.data);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Error fetching cast profiles'); // Show error if fetching fails
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCastProfiles();
  }, []);

  // Create a new cast profile using form data
  const handleAddProfile = async () => {
    if (!castName || !characterName || !profileLink) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('userId', '1');  // Example userId, adjust as needed
    formData.append('movieId', movieId.toString());  // Movie ID
    formData.append('name', castName);  // Cast Name
    formData.append('characterName', characterName);  // Character Name
    formData.append('url', profileLink);  // Profile URL (Image URL)

    setIsLoading(true);
    try {
      await axios.post('http://localhost/movieproject-api/admin/casts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Re-fetch profiles and clear form on successful add
      fetchCastProfiles();
      setCastName('');
      setCharacterName('');
      setProfileLink('');
      setError('');
    } catch (err) {
      setError('Error adding profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cast">
      <h1>Cast & Crew</h1>
      {error && <div className="error">{error}</div>}  {/* Error message only shown when error occurs */}
      {isLoading && <div className="loading">Loading...</div>}

      {/* Add Profile Form */}
      <div className="add-profile-form">
        <input
          type="text"
          placeholder="Cast Name"
          value={castName}
          onChange={(e) => setCastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Character Name"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profile Link (Image URL)"
          value={profileLink}
          onChange={(e) => setProfileLink(e.target.value)}
        />
        <button onClick={handleAddProfile} disabled={isLoading}>
          Add Cast Profile
        </button>
      </div>

      {/* Cast Profiles List */}
      <div className="cast-profile-list">
        <h2>Existing Cast Profiles</h2>
        {castProfiles.length === 0 ? (
          <div>No cast profiles available.</div>
        ) : (
          castProfiles.map((profile) => (
            <div key={profile.id} className="cast-profile">
              <h3>{profile.name} (Character: {profile.characterName})</h3>
              {profile.url && (
                <img src={profile.url} alt={profile.name} className="profile-image" />
              )}
              <a href={`/${profile.movieId}`} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
              <div className="actions">
                <button onClick={() => console.log('Edit profile')}><FaEdit /> Edit</button>
                <button onClick={() => console.log('Delete profile')}><FaTrash /> Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CastAndCrews;
>>>>>>> 3ad5a0c22798b6a33dc73cdada055641c3c47e37
