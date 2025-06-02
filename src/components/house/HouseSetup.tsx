import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, TextField, Paper, Grid } from '@mui/material';

const HouseSetup = () => {
  const navigate = useNavigate();
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [houseCode, setHouseCode] = useState('');

  const handleJoinHouse = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual house joining logic - currently accepts anything
    navigate('/welcome');
  };

  const handleCreateHouse = () => {
    navigate('/welcome');
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

          {!showJoinInput ? (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setShowJoinInput(true)}
                  sx={{ mb: 2 }}
                >
                  Join Existing House
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="outlined" onClick={handleCreateHouse}>
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
              />
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined" onClick={() => setShowJoinInput(false)}>
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button type="submit" fullWidth variant="contained">
                    Join House
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
