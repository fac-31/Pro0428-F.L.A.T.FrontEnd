import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import api from '../../api/axios';
import { AxiosError } from 'axios';

interface LandlordContact {
  name: string;
  email: string;
  phone: string;
}

interface HousePreferences {
  [key: string]: string | number | boolean | null | HousePreferences; 
}

const HouseDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: '',
    landlord_contact: {
      name: '',
      email: '',
      phone: '',
    } as LandlordContact,
    house_preferences: {} as HousePreferences,
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const response = await api.post('/houses/create', formData);

      if (response.status === 201 || response.status === 200) {
        const houseId = response.data.house_id;
        localStorage.setItem('house_id', houseId);
        navigate('/welcome');
      } else {
        setErrorMsg('Failed to create house. Please try again.');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('House creation error:', error);
        if (error.response?.status === 401) {
          setErrorMsg('Please log in to create a house.');
          navigate('/login');
        } else {
          setErrorMsg(error.response?.data?.error || 'Failed to create house. Please try again.');
        }
      } else {
        setErrorMsg('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle nested landlord_contact fields
    if (name.startsWith('landlord_')) {
      const field = name.replace('landlord_', '');
      setFormData((prev) => ({
        ...prev,
        landlord_contact: {
          ...prev.landlord_contact,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
            Create New House
          </Typography>
          {errorMsg && (
            <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
              {errorMsg}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              autoFocus
            />

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Landlord Contact
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              id="landlord_name"
              label="Landlord Name"
              name="landlord_name"
              value={formData.landlord_contact.name}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="landlord_email"
              label="Landlord Email"
              name="landlord_email"
              type="email"
              value={formData.landlord_contact.email}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="landlord_phone"
              label="Landlord Phone"
              name="landlord_phone"
              value={formData.landlord_contact.phone}
              onChange={handleChange}
            />

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/house-setup')}
                  disabled={loading}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" fullWidth variant="contained" disabled={loading}>
                  {loading ? 'Creating...' : 'Create House'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default HouseDetails;
