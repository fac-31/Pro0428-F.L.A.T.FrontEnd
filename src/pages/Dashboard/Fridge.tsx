import { useState } from 'react';
import FridgeTop from './FridgeTopDoor';
import FridgeBottom from './FridgeBigDoor';
import { fetchHouseInfo, fetchBills } from '../../api/houseInfo';
import { HouseInfo, Bills, CleaningTask } from '../../types/types';
import styles from '../../styles/dashboard.module.css';

interface FridgeProps {
  cleaningData: CleaningTask[] | null;
  refreshCleaningTasks: () => Promise<void>;
}

const Fridge: React.FC<FridgeProps> = ({ cleaningData, refreshCleaningTasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'cleaning' | 'bills' | 'review' | null>(null);
  const [houseInfo, setHouseInfo] = useState<HouseInfo | null>(null);
  const [billsData, setBillsData] = useState<Bills[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSectionClick = async (section: 'cleaning' | 'bills' | 'review') => {
    setActiveSection(section);
    setIsOpen(true);
    setLoading(true);

    try {
      if (section === 'bills') {
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

  const handleNewTaskAdded = async (section: string) => {
    try {
      if (section === 'cleaning') {
        console.log('Refreshing tasks');
        await refreshCleaningTasks();
        console.log('working');
        setHouseInfo(null);
      } else if (section === 'bills') {
        console.log('Refreshing bills');
        const bills = await fetchBills();
        console.log('Bill data received', bills);
        setBillsData(bills);
        setHouseInfo(null);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setHouseInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.fridge_container}>
      <FridgeTop onSectionClick={handleSectionClick} />
      <FridgeBottom
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        activeSection={activeSection}
        data={houseInfo}
        cleaningData={cleaningData}
        billsData={billsData}
        onNewTaskAdded={handleNewTaskAdded}
        loading={loading}
      />
    </div>
  );
};

export default Fridge;
