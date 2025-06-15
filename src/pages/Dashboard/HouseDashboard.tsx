import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';
import Fridge from './Fridge';
import Poster from './Poster';
import { logout } from '../../components/auth/auth';

const HouseDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <button id="logout-button" onClick={handleLogout}>
        LOGOUT
      </button>
      <div className="kitchen">
        <Poster />
        <Fridge />
        <Calendar />
      </div>
    </>
  );
};

export default HouseDashboard;
