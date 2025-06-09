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

    try {
      const response = await api.post('/houses/join', { house_code: houseCode });

      if (response.status === 200 || response.status === 201) {
        const houseId = response.data.house_id;
        localStorage.setItem('house_id', houseId);
        navigate('/welcome');
      } else {
        setErrorMsg('Invalid house code. Please try again.');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Join house error:', error);
        setErrorMsg(error.response?.data?.error || 'Failed to join house. Please try again.');
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
                id="houseCode"
                label="House Code"
                name="houseCode"
                value={houseCode}
                onChange={(e) => setHouseCode(e.target.value)}
                autoFocus
                disabled={loading}
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
