import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, TextField, Paper, Grid } from '@mui/material';
import { AxiosError } from 'axios';
import api from '../../api/axios';

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
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            House Setup
          </Typography>
          {errorMsg && (
            <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
              {errorMsg}
            </Typography>
          )}

          {!showJoinInput ? (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setShowJoinInput(true)}
                  sx={{ mb: 2 }}
                  disabled={loading}
                >
                  Join Existing House
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined" onClick={handleCreateHouse} disabled={loading}>
                  Create New House
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Box component="form" onSubmit={handleJoinHouse} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="houseId"
                label="House ID"
                name="houseId"
                value={houseCode}
                onChange={(e) => setHouseCode(e.target.value)}
                autoFocus
                disabled={loading}
                helperText="Enter the UUID of the house you want to join"
                placeholder="e.g., 123e4567-e89b-12d3-a456-426614174000"
              />
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setShowJoinInput(false)}
                    disabled={loading}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button type="submit" fullWidth variant="contained" disabled={loading}>
                    {loading ? 'Joining...' : 'Join House'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default HouseSetup;
