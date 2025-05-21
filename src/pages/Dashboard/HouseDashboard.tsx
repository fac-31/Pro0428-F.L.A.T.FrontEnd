import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { fetchHousehold } from 'api/houseInfo'; 
import Fridge from './Fridge';

const HouseDashboard = () => {
  const [houseInfo, setHouseInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHouseInfo = async () => {
      try {
        setLoading(true);
        const data = await fetchHousehold();
        setHouseInfo(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch household');
      } finally {
        setLoading(false);
      }
    };
    loadHouseInfo(); 
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Typography>Loading household...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  if (!houseInfo) { 
    return (
      <Container maxWidth="lg">
        <Typography>No household data found.</Typography>
      </Container>
    );
  }

  return <Fridge houseInfo={houseInfo} />;
};

export default HouseDashboard;
