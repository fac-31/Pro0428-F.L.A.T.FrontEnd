import { useNavigate } from 'react-router-dom';
import { Container, Button, AppBar, Toolbar, Typography } from '@mui/material';
import { logout } from '../../components/auth/auth';
import Fridge from './Fridge';

const HouseDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
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
