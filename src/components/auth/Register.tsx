import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Link, Paper } from '@mui/material';
import { AxiosError } from 'axios';
import api from '../../api/axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // First, create the user
      const response = await api.post('/users/create-user', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if ((response.status === 200 || response.status === 201) && response.data.success) {
        // Then, automatically log in the user
        try {
          const loginResponse = await api.post('/login', {
            email: formData.email,
            password: formData.password,
          });

          if (loginResponse.data.token) {
            const token = loginResponse.data.token;
            localStorage.setItem('token', token);

            // Decode and store user info from token
            try {
              const payload = JSON.parse(atob(token.split('.')[1]));
              localStorage.setItem('user_id', payload.sub);
              localStorage.setItem('house_id', payload.house_id);
            } catch (decodeErr) {
              console.error('Failed to decode token:', decodeErr);
            }

            navigate('/house-setup');
          } else {
            setErrorMsg('Registration successful but login failed. Please try logging in.');
            navigate('/login');
          }
        } catch (loginError) {
          console.error('Auto-login error:', loginError);
          setErrorMsg('Registration successful but login failed. Please try logging in.');
          navigate('/login');
        }
      } else {
        console.log('Registration response:', response.data);
        setErrorMsg('Registration failed. Please try again.');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Registration error:', error);
        if (error.response?.status === 500) {
          setErrorMsg(
            error.response.data.error || 'Server error occurred. Please try again later.'
          );
        } else {
          setErrorMsg('Registration failed. Please try again.');
        }
      } else {
        setErrorMsg('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
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
            Create Account
          </Typography>
          {errorMsg && (
            <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
              {errorMsg}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/login" variant="body2">
                {'Already have an account? Sign In'}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
