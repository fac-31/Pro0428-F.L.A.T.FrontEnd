import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
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
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            F.L.A.T Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className="kitchen">
        <Poster />
        <Fridge />
        <Calendar />
      </div>
    </Box>
  );
};

export default HouseDashboard;
