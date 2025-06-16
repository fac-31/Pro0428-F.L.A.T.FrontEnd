import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import api from '../../api/axios';
import styles from '../../styles/register.module.css';

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

  const handleBackToLoginButtonClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="elevator-hand-rail">
        <div className="hand-rail-fitting"></div>
        <div className="hand-rail-fitting"></div>
      </div>
      <div className={styles.register_container}>
        <h1 className={styles.form_title}>CREATE ACCOUNT</h1>
        <form className={styles.register_form} onSubmit={handleSubmit}>
          {errorMsg && <h1>{errorMsg}</h1>}
          <label id="name-input-label" htmlFor="name-input">
            FULL NAME
          </label>
          <input
            id="name-input"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
          />
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

          <label id="confirm-password-input-label" htmlFor="confirm-password-input">
            CONFIRM PASSWORD
          </label>
          <input
            id="-confirm-password-input"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button id="sign-up-button" type="submit" disabled={loading}>
            {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
          </button>
        </form>
        <div>
          <button id="login-button" onClick={handleBackToLoginButtonClick}>
            ALREADY HAVE AN ACCOUNT? SIGN IN!
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
