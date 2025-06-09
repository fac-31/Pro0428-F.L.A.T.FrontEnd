import { useState } from 'react';
import { Container, Paper, Box } from '@mui/material';
import FridgeTopDoor from './FridgeTopDoor';
import FridgeBigDoor from './FridgeBigDoor';
<<<<<<< HEAD
import { fetchHouseInfo, fetchBills } from '../../api/houseInfo';
import { fetchTestDbInfo } from '../../api/testDB';
import { HouseInfo, testDBUser, Bills } from '../../types/types';
=======
import { fetchHouseInfo } from '../../api/houseInfo';
import { fetchTestDbInfo } from '../../api/testDB';
import { HouseInfo, testDBUser } from '../../types/types';
>>>>>>> c17225b39f8acd637ae8e1559966232e63b29748

const Fridge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'cleaning' | 'bills' | 'review' | null>(null);
  const [houseInfo, setHouseInfo] = useState<HouseInfo | null>(null);
<<<<<<< HEAD
  const [billsData, setBillsData] = useState<Bills[] | null>(null);
=======
>>>>>>> c17225b39f8acd637ae8e1559966232e63b29748
  const [testDbData, setTestDbData] = useState<testDBUser[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSectionClick = async (section: 'cleaning' | 'bills' | 'review') => {
    setActiveSection(section);
    setIsOpen(true);
    setLoading(true);

    try {
      if (section === 'cleaning') {
        console.log('Fetching test data...');
        const data = await fetchTestDbInfo();
        console.log('Test data received:', data);
        setTestDbData(data);
        setHouseInfo(null);
<<<<<<< HEAD
      } else if (section === 'bills') {
        console.log('fetching bills data');
        const bills = await fetchBills();
        console.log('bill data received', bills);
        setBillsData(bills);
        setHouseInfo(null);
        setTestDbData(null);
=======
>>>>>>> c17225b39f8acd637ae8e1559966232e63b29748
      } else {
        const data = await fetchHouseInfo();
        setHouseInfo(data);
        setTestDbData(null);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setHouseInfo(null);
      setTestDbData(null);
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
            testDbData={testDbData}
<<<<<<< HEAD
            billsData={billsData}
=======
>>>>>>> c17225b39f8acd637ae8e1559966232e63b29748
            loading={loading}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Fridge;
