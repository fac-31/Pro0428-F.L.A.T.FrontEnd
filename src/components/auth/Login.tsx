import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Container, Box, Typography, TextField, Button, Link, Paper } from '@mui/material';
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

  const handleAccountCreationButtonClick = () => {
    navigate('/register');
  };

  return (
    <>
      <div className="elevator-hand-rail">
        <div className="hand-rail-fitting"></div>
        <div className="hand-rail-fitting"></div>
      </div>
      <div className={styles.login_container}>
        <form className={styles.sign_in_form} onSubmit={handleSubmit}>
          <label id="email-input-label" htmlFor="email-input">
            EMAIL ADDRESS
          </label>
          <input
            id="email-input"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <label id="password-input-label" htmlFor="password-input">
            PASSWORD
          </label>
          <input
            id="password-input"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          {errorMsg && <h1>{errorMsg}</h1>}
          <button id="sign-in-button" type="submit">
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>
        <div>
          <button id="create-account-button" onClick={handleAccountCreationButtonClick}>
            DON'T HAVE AN ACCOUNT? SIGN UP!
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
