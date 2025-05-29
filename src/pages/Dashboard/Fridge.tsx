import { useState, useEffect } from 'react';
import { Container, Paper, Box, Typography } from '@mui/material';
import FridgeTopDoor from './FridgeTopDoor';
import FridgeBigDoor from './FridgeBigDoor';
import { fetchHouseInfo, fetchCleaningTasks, fetchBills } from '../../api/houseInfo';
import { Section, SectionData, HouseInfo } from 'types/types';

const Fridge = () => {
  const [isBigDoorOpen, setIsBigDoorOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>(null);
  const [sectionData, setSectionData] = useState<SectionData>(null);
  const [houseInfo, setHouseInfo] = useState<HouseInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHouseInfo = async () => {
      try {
        const data = await fetchHouseInfo();
        setHouseInfo(data);
      } catch (error) {
        console.error('Error fetching house info:', error);
      }
    };
    loadHouseInfo();
  }, []);

  useEffect(() => {
    if (!activeSection || !houseInfo) return;

    setLoading(true);

    const fetchData = async () => {
      try {
        let data: SectionData = null;
        if (activeSection === 'cleaning') {
          data = await fetchCleaningTasks();
        } else if (activeSection === 'bills') {
          data = await fetchBills();
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
  }, [activeSection, houseInfo]);

  const toggleBigDoor = () => {
    setIsBigDoorOpen(!isBigDoorOpen);
    if (isBigDoorOpen) {
      setActiveSection(null);
      setSectionData(null);
    }
  };

  const handleSectionClick = (section: Section) => {
    setActiveSection(section);
    setIsBigDoorOpen(true);
  };

  if (!houseInfo) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <Typography>Loading house info...</Typography>
        </Box>
      </Container>
    );
  }

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
          <FridgeTopDoor onSectionClick={handleSectionClick} />
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
