import { useState } from 'react';
import { Container, Paper, Box } from '@mui/material';
import FridgeTopDoor from './FridgeTopDoor';
import FridgeBigDoor from './FridgeBigDoor';
import { fetchHouseInfo } from '../../api/houseInfo';
import { HouseInfo } from '../../types/types';

const Fridge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'cleaning' | 'bills' | 'review' | null>(null);
  const [houseInfo, setHouseInfo] = useState<HouseInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSectionClick = async (section: 'cleaning' | 'bills' | 'review') => {
    setActiveSection(section);
    setIsOpen(true);
    setLoading(true);

    try {
      const data = await fetchHouseInfo();
      setHouseInfo(data);
    } catch (error) {
      console.error('Failed to fetch house info:', error);
      setHouseInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Paper
          elevation={4}
          sx={{
            width: 500,
            height: 800,
            borderRadius: '80px 80px 0 0',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#d7ebf5',
            perspective: '800px',
            transformStyle: 'preserve-3d',
          }}
        >
          <FridgeTopDoor onSectionClick={handleSectionClick} />
          <FridgeBigDoor
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)} // optional: remove if not needed
            activeSection={activeSection}
            data={houseInfo}
            loading={loading}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Fridge;
