import { useState } from 'react';
import FridgeTop from './FridgeTopDoor';
import FridgeBottom from './FridgeBigDoor';
import { fetchHouseInfo } from '../../api/houseInfo';
import { fetchTestDbInfo } from '../../api/testDB';
import { HouseInfo, testDBUser } from '../../types/types';

const Fridge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'cleaning' | 'bills' | 'review' | null>(null);
  const [houseInfo, setHouseInfo] = useState<HouseInfo | null>(null);
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
    <div className="fridge-container">
      <FridgeTop onSectionClick={handleSectionClick} />
      <FridgeBottom
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        activeSection={activeSection}
        data={houseInfo}
        testDbData={testDbData}
        loading={loading}
      />
    </div>
  );

  // return (
  //       <Paper
  //         elevation={4}
  //         sx={{
  //           width: 500,
  //           height: 800,
  //           borderRadius: '80px 80px 0 0',
  //           position: 'relative',
  //           display: 'flex',
  //           flexDirection: 'column',
  //           alignItems: 'center',
  //           backgroundColor: '#d7ebf5',
  //           perspective: '800px',
  //           transformStyle: 'preserve-3d',
  //         }}
  //       >
  //         <FridgeTopDoor onSectionClick={handleSectionClick} />
  //         <FridgeBigDoor
  //           isOpen={isOpen}
  //           onToggle={() => setIsOpen(!isOpen)}
  //           activeSection={activeSection}
  //           data={houseInfo}
  //           testDbData={testDbData}
  //           loading={loading}
  //         />
  //       </Paper>
  //     </Box>
  //   </Container>
};

export default Fridge;
