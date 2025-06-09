import { useState } from 'react';
import { Container, Paper, Box } from '@mui/material';
import FridgeTopDoor from './FridgeTopDoor';
import FridgeBigDoor from './FridgeBigDoor';
import { fetchHouseInfo, fetchBills, fetchCleaningTasks } from '../../api/houseInfo';
import { HouseInfo, Bills, CleaningTask } from '../../types/types';

const Fridge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'cleaning' | 'bills' | 'review' | null>(null);
  const [houseInfo, setHouseInfo] = useState<HouseInfo | null>(null);
  const [billsData, setBillsData] = useState<Bills[] | null>(null);
  const [cleaningData, setCleaningData] = useState<CleaningTask[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSectionClick = async (section: 'cleaning' | 'bills' | 'review') => {
    setActiveSection(section);
    setIsOpen(true);
    setLoading(true);

    try {
      if (section === 'cleaning') {
        console.log('Fetching cleaning data...');
        const data = await fetchCleaningTasks();
        console.log('Cleaning data received:', data);
        setCleaningData(data);
        setHouseInfo(null);
      } else if (section === 'bills') {
        console.log('Fetching bills data');
        const bills = await fetchBills();
        console.log('Bill data received', bills);
        setBillsData(bills);
        setHouseInfo(null);
      } else {
        const data = await fetchHouseInfo();
        setHouseInfo(data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
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
            onToggle={() => setIsOpen(!isOpen)}
            activeSection={activeSection}
            data={houseInfo}
            cleaningData={cleaningData}
            billsData={billsData}
            loading={loading}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Fridge;
