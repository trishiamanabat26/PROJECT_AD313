import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cast.css';

const CastAndCrews = () => {
  const [castProfiles, setCastProfiles] = useState([]);
  const [castName, setCastName] = useState('');
  const [stageName, setStageName] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchCastProfiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/castProfiles');
      setCastProfiles(response.data);
    } catch (err) {
      setError('Error fetching cast profiles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCastProfiles();
  }, [fetchCastProfiles]);

  const handleAddProfile = async () => {
    if (!castName || !stageName || !profileLink || !description) {
      setError('All fields are required');
      return;
    }
  
    setIsLoading(true);
    try {
      const data = { castName, stageName, profileLink, description };
      await axios.post('/api/castProfiles', data);
      fetchCastProfiles(); // Re-fetch the profiles
      setCastName('');
      setStageName('');
      setProfileLink('');
      setDescription('');
    } catch (err) {
      console.error(err); // Log the error to see more details
      setError('Error adding profile');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleEditProfile = async (id) => {
    const newDescription = prompt('Enter new description');
    if (!newDescription) return;

    setIsLoading(true);
    try {
      await axios.patch(`/api/castProfiles/${id}`, { description: newDescription });
      fetchCastProfiles();
    } catch (err) {
      setError('Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProfile = async (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      setIsLoading(true);
      try {
        await axios.delete(`/api/castProfiles/${id}`);
        fetchCastProfiles();
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

      <div className="add-profile-form">
        <input
          type="text"
          placeholder="Cast Name"
          value={castName}
          onChange={(e) => setCastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Stage Name"
          value={stageName}
          onChange={(e) => setStageName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profile Link (Image URL)"
          value={profileLink}
          onChange={(e) => setProfileLink(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddProfile}>Add Cast Profile</button>
      </div>

      <div className="cast-profile-list">
        <h2>Existing Cast Profiles</h2>
        {castProfiles.map((profile) => (
          <div key={profile.id} className="cast-profile">
            <h3>{profile.castName} (Stage Name: {profile.stageName})</h3>

            {/* Render Image if profileLink exists */}
            {profile.profileLink && <img src={profile.profileLink} alt={profile.castName} className="profile-image" />}
            
            <a href={`/${profile.tmdbId}`} target="_blank" rel="noopener noreferrer">
              {profile.tmdbId} - View Profile on TMDB
            </a>
            <p>{profile.description}</p>
            <button onClick={() => handleEditProfile(profile.id)}>Edit</button>
            <button onClick={() => handleDeleteProfile(profile.id)}>Delete</button>
          </div>
        ))}
      </div>

      <button onClick={() => navigate(-1)} className="back-button">Back</button>
    </div>
  );
};

export default CastAndCrews;
