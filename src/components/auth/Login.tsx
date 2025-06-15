import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Link, Paper } from '@mui/material';
import { login } from './auth.ts';
import styles from '../../styles/login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { token, error } = await login(formData.email, formData.password);

      if (error) {
        setErrorMsg(error.message);
      } else if (token) {
        localStorage.setItem('token', token);

        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          localStorage.setItem('user_id', payload.sub);

          // Check if user already has a house
          if (payload.house_id) {
            localStorage.setItem('house_id', payload.house_id);
            navigate('/house-dashboard');
          } else {
            // If no house_id in token, go to house setup
            navigate('/house-setup');
          }
        } catch (decodeErr) {
          console.error('Failed to decode token:', decodeErr);
          setErrorMsg('Failed to process login. Please try again.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('Server error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div className={styles.random}></div>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              required
              fullWidth
              margin="normal"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              required
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
            />
            {errorMsg && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errorMsg}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
