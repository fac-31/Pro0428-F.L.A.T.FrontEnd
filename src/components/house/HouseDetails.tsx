import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Container, Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import api from '../../api/axios';
import { AxiosError } from 'axios';
import styles from '../../styles/details.module.css';

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

        const tokenResponse = await api.post('/refresh-token');
        if (tokenResponse.data.token) {
          const newToken = tokenResponse.data.token;
          localStorage.setItem('token', newToken);
        }

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
    <>
      <div className="elevator-hand-rail">
        <div className="hand-rail-fitting"></div>
        <div className="hand-rail-fitting"></div>
      </div>
      <div className={styles.house_details_container}>
        <h1 className={styles.form_title}>CREATE NEW HOUSE</h1>
        <form className={styles.house_details_form} onSubmit={handleSubmit}>
          {errorMsg && <h1>{errorMsg}</h1>}
          <label id="address-input-label" htmlFor="address-input">
            ADDRESS
          </label>
          <input
            id="address-input"
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={handleChange}
          />
          <label id="landlord-name-input-label" htmlFor="landlord-name-input">
            LANDLORD NAME
          </label>
          <input
            id="landlord-name-input"
            name="landlord_name"
            type="text"
            required
            value={formData.landlord_contact.name}
            onChange={handleChange}
          />
          <label id="landlord-email-input-label" htmlFor="landlord-email-input">
            LANDLORD EMAIL
          </label>
          <input
            id="landlord-email-input"
            name="landlord_email"
            type="email"
            required
            value={formData.landlord_contact.email}
            onChange={handleChange}
          />
          <label id="landlord-phone-input-label" htmlFor="landlord-phone-input">
            LANDLORD PHONE
          </label>
          <input
            id="landlord-phone-input"
            name="landlord_phone"
            type="text"
            required
            value={formData.landlord_contact.phone}
            onChange={handleChange}
          />

          <div>
            <button id="login-button" onClick={() => navigate('/house-setup')} disabled={loading}>
              BACK
            </button>
            <button id="create-house-button" type="submit" disabled={loading}>
              {loading ? 'CREATING HOUSE...' : 'CREATE HOUSE'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default HouseDetails;
