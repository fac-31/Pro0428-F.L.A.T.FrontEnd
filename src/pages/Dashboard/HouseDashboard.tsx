import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { fetchHouseInfo } from '../../api/houseInfo';
import Fridge from './Fridge';
import { HouseInfo } from '../../types/types';

const HouseDashboard = () => {
  const [houseInfo, setHouseInfo] = useState<HouseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHouseInfo();
        setHouseInfo(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Typography>Loading houseInfo...</Typography>
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
        <Typography>No houseInfo data found.</Typography>
      </Container>
    );
  }

  return <Fridge />;
};

export default HouseDashboard;
