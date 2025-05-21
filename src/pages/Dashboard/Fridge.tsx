import React, { useState, useEffect } from 'react';
import { Container, Paper, Box } from '@mui/material';
import FridgeTopDoor from './FridgeTopDoor';
import FridgeBigDoor from './FridgeBigDoor';
import { fetchCleaningTasks, fetchBills, fetchReviews } from 'api/houseInfo';

interface FridgeProps {
  houseInfo: any;
}

type Section = 'cleaning' | 'bills' | 'review' | null;

  const Fridge: React.FC<FridgeProps> = ({ houseInfo }) => {
    const [isBigDoorOpen, setIsBigDoorOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<Section>(null);
    const [sectionData, setSectionData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

  const toggleBigDoor = () => {
    setIsBigDoorOpen(!isBigDoorOpen);
    if (isBigDoorOpen) {
      // closing door resets section
      setActiveSection(null);
      setSectionData(null);
    }
  };

  const handleSectionClick = (section: Section) => {
    setActiveSection(section);
    setIsBigDoorOpen(true);
  };

  useEffect(() => {
    if (!activeSection) return;

    setLoading(true);

    const fetchData = async () => {
      try {
        let data;
        if (activeSection === 'cleaning') {
          data = await fetchCleaningTasks(houseInfo.id);
        } else if (activeSection === 'bills') {
          data = await fetchBills(houseInfo.id);
        } else if (activeSection === 'review') {
          data = await fetchReviews(houseInfo.id);
        }
        setSectionData(data);
      } catch (error) {
        console.error('Error fetching section data:', error);
        setSectionData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeSection, houseInfo.id]);

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Paper
          elevation={4}
          sx={{
            width: 500,
            height: 800,
            borderRadius: '80px 80px 0px 0px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#d7ebf5',
            perspective: '800px',
            transformStyle: 'preserve-3d',
          }}
        >
          <FridgeTopDoor houseInfo={houseInfo} onSectionClick={handleSectionClick} />
          <FridgeBigDoor
            isOpen={isBigDoorOpen}
            onToggle={toggleBigDoor}
            activeSection={activeSection}
            data={sectionData}
            loading={loading}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Fridge;
