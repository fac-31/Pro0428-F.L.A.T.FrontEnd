import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HouseSetup from './components/house/HouseSetup';
import HouseDetails from './components/house/HouseDetails';
import HouseDashboard from './pages/Dashboard/HouseDashboard';
import Welcome from './pages/Welcome';

function App() {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;

    body.classList.remove('login-style', 'dashboard-style');

    if (location.pathname.startsWith('/login')) {
      body.classList.add('login-style');
    } else {
      body.classList.add('dashboard-style');
    }

    return () => {
      body.classList.remove('login-style', 'dashboard-style');
    };
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/house-setup" element={<HouseSetup />} />
      <Route path="/house-details" element={<HouseDetails />} />
      <Route path="/house-dashboard" element={<HouseDashboard />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
