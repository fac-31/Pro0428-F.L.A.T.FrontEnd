import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Container, Box, Typography, Button, TextField, Paper, Grid } from '@mui/material';
import { AxiosError } from 'axios';
import api from '../../api/axios';
import styles from '../../styles/setup.module.css';

const HouseSetup = () => {
  const navigate = useNavigate();
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [houseCode, setHouseCode] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleJoinHouse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMsg('Please log in to join a house.');
      navigate('/login');
      return;
    }

    try {
      // Updated to match the API requirements exactly
      const response = await api.post('/houses/join', {
        house_id: houseCode, // Using the input value as the house_id
      });

      if (response.status === 200 || response.status === 201) {
        // Get a new token with the updated house_id
        const tokenResponse = await api.post('/refresh-token');
        if (tokenResponse.data.token) {
          const newToken = tokenResponse.data.token;
          localStorage.setItem('token', newToken);

          // Update house_id from the new token
          try {
            const payload = JSON.parse(atob(newToken.split('.')[1]));
            localStorage.setItem('house_id', payload.house_id);
          } catch (decodeErr) {
            console.error('Failed to decode new token:', decodeErr);
          }
        }

        navigate('/welcome');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Join house error:', error);
        if (error.response?.status === 401) {
          setErrorMsg('Please log in to join a house.');
          navigate('/login');
        } else if (error.response?.status === 404) {
          setErrorMsg('House not found. Please check the house ID and try again.');
        } else {
          setErrorMsg(error.response?.data?.error || 'Failed to join house. Please try again.');
        }
      } else {
        setErrorMsg('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHouse = () => {
    navigate('/house-details');
  };

  return (
    <>
      <div className="elevator-hand-rail">
        <div className="hand-rail-fitting"></div>
        <div className="hand-rail-fitting"></div>
      </div>
      <div className={styles.setup_container}>
        <h1 className={styles.container_title}>HOUSE SETUP</h1>
        {errorMsg && <h1>{errorMsg}</h1>}

        <div>
          {!showJoinInput ? (
            <div className={styles.options_container}>
              <button
                id="join-existing-house-button"
                onClick={() => setShowJoinInput(true)}
                disabled={loading}
              >
                JOIN EXISTING HOUSE
              </button>
              <button id="create-new-house-button" onClick={handleCreateHouse} disabled={loading}>
                CREATE NEW HOUSE
              </button>
            </div>
          ) : (
            <form className={styles.join_house_form} onSubmit={handleJoinHouse}>
              <label htmlFor="houseId" id="houseId-label">
                HOUSE CODE (UUID)
              </label>
              <input
                required
                id="houseId"
                name="houseId"
                value={houseCode}
                onChange={(e) => setHouseCode(e.target.value)}
                disabled={loading}
                placeholder="e.g., 123e4567-e89b-12d3-a456-426614174000"
              />

              <div>
                <button id="back-button" onClick={() => setShowJoinInput(false)} disabled={loading}>
                  BACK
                </button>
                <button id="join-house-button" type="submit" disabled={loading}>
                  {loading ? 'Joining...' : 'Join House'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default HouseSetup;
