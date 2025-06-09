import { useNavigate } from 'react-router-dom';
import React from 'react';
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
    <div className="kitchen">
      <Poster />
      <Fridge />
      <Calendar />
    </div>
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            F.L.A.T Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Fridge />
      </Container>
    </>
  );
};

export default HouseDashboard;
