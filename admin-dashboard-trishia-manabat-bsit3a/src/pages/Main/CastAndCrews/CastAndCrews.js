import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cast.css'; // Custom styling for cinematic look
import { FaEdit, FaTrash } from 'react-icons/fa'; // For edit and delete icons

const CastAndCrews = () => {
  const [castProfiles, setCastProfiles] = useState([]);
  const [castName, setCastName] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const movieId = 38; // Example Movie ID (you can replace this with a dynamic value)
  const token = 'your_token_here'; // Ensure you have the correct token to authorize API calls

  // Fetch the cast profiles for a specific movie
  const fetchCastProfiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost/movieproject-api/casts/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCastProfiles(response.data);
    } catch (err) {
      setError('Error fetching cast profiles');
    } finally {
      setIsLoading(false);
    }
  }, [movieId, token]);

  useEffect(() => {
    fetchCastProfiles();
  }, [fetchCastProfiles]);

  // Create a new cast profile using the form
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
          'Content-Type': 'multipart/form-data', // Ensure the correct content type for form data
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

  // Update a cast profile
  const handleEditProfile = async (id) => {
    const newCharacterName = prompt('Enter new character name');
    if (!newCharacterName) return;

    const newProfileLink = prompt('Enter new profile link');
    if (!newProfileLink) return;

    setIsLoading(true);
    try {
      const data = {
        movieId: movieId,
        name: castName,
        characterName: newCharacterName,
        url: newProfileLink,
      };
      await axios.patch(`http://localhost/movieproject-api/admin/casts/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCastProfiles(); // Re-fetch the profiles after updating
    } catch (err) {
      setError('Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a cast profile
  const handleDeleteProfile = async (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      setIsLoading(true);
      try {
        await axios.delete(`http://localhost/movieproject-api/admin/casts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchCastProfiles(); // Re-fetch the profiles after deleting
      } catch (err) {
        setError('Error deleting profile');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="cast">
      <h1>Cast & Crew</h1>
      {error && <div className="error">{error}</div>}
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
        <button onClick={handleAddProfile} disabled={isLoading}>Add Cast Profile</button>
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
                <button onClick={() => handleEditProfile(profile.id)}><FaEdit /> Edit</button>
                <button onClick={() => handleDeleteProfile(profile.id)}><FaTrash /> Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <button onClick={() => navigate(-1)} className="back-button">Back</button>
    </div>
  );
};

export default CastAndCrews;
