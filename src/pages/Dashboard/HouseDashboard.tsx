import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';
import Fridge from './Fridge';
import Poster from './Poster';
import { logout } from '../../components/auth/auth';
import { fetchCleaningTasks, fetchSingleUserTask, updateTaskStatus } from '../../api/houseInfo';
import { CleaningTask, usersCleaningTask } from '../../types/types';

const HouseDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [cleaningData, setCleaningData] = useState<CleaningTask[] | null>(null);
  const [userTaskData, setUserTaskData] = useState<usersCleaningTask[]>([]);

  const refreshCleaningTasks = async () => {
    const allTasks = await fetchCleaningTasks();
    const userTasks = await fetchSingleUserTask();
    setCleaningData(allTasks);
    setUserTaskData(userTasks);
  };

  const updateTasks = async (taskId: string, currentStatus: boolean) => {
    await updateTaskStatus(taskId, currentStatus);
    await refreshCleaningTasks();
  };

  useEffect(() => {
    refreshCleaningTasks();
  }, []);

  return (
    <>
      <button id="logout-button" onClick={handleLogout}>
        LOGOUT
      </button>
      <div className="kitchen">
        <Poster />
        <Fridge cleaningData={cleaningData} refreshCleaningTasks={refreshCleaningTasks} />
        <Calendar userTaskData={userTaskData} updateTasks={updateTasks} />
      </div>
    </>
  );
};

export default HouseDashboard;
