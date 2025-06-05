import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { HouseInfo, testDBUser } from '../../types/types';

interface FridgeBigDoorProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: 'cleaning' | 'bills' | 'review' | null;
  data: HouseInfo | null;
  testDbData?: testDBUser[] | null;
  loading: boolean;
}

const FridgeBigDoor: React.FC<FridgeBigDoorProps> = ({
  isOpen,
  onToggle,
  activeSection,
  data,
  testDbData, // <- now used!
  loading,
}) => {
  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      );
    }

    if (activeSection === 'cleaning') {
      if (!testDbData || testDbData.length === 0) {
        return (
          <Typography variant="body1" color="text.secondary" align="center" mt={2}>
            No cleaning (test DB) data found.
          </Typography>
        );
      }

      return (
        <Box>
          <Typography variant="h6" gutterBottom>
            Cleaning Test Data
          </Typography>
          {testDbData.map((user) => (
            <Box key={user.user_id} mb={2} p={1} border="1px solid #ccc" borderRadius={2}>
              <Typography>Name: {user.name}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>Created At: {new Date(user.created_at).toLocaleString()}</Typography>
              <Typography>House ID: {user.house_id}</Typography>
            </Box>
          ))}
        </Box>
      );
    }

    // If not cleaning section, fallback to house info
    if (!data) {
      return (
        <Typography variant="body1" color="text.secondary" align="center" mt={2}>
          No house info data found.
        </Typography>
      );
    }

    switch (activeSection) {
      case 'bills':
        return (
          <Box>
            <Typography variant="h6">Bills Info</Typography>
            {/* Render bills-related content */}
          </Box>
        );
      case 'review':
        return (
          <Box>
            <Typography variant="h6">House Review</Typography>
            {/* Render review-related content */}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        height: '70%',
        borderBottom: '5px solid #1e1e1e',
        borderRadius: '0 0 40px 40px',
        perspective: '800px',
        overflow: 'visible',
      }}
    >
      {/* Fridge interior */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '0 0 40px 40px',
          padding: 3,
          overflowY: 'auto',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: isOpen ? 'auto' : 'none',
          boxShadow: 'inset 0 4px 10px rgba(0, 0, 0, 0.05)',
          zIndex: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
      </Box>

      {/* Fridge door */}
      <Box
        onClick={onToggle}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, #e0e6ed, #cfd8e3)',
          transformOrigin: '100% 50%',
          transition: 'transform 1s',
          borderRadius: '0 0 40px 40px',
          transform: isOpen ? 'rotateY(120deg)' : 'rotateY(0deg)',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: '10%',
            top: '12%',
            width: '0.6em',
            height: '75%',
            backgroundColor: '#1e1e1e',
            borderRadius: '5vmax',
          }}
        />
      </Box>
    </Box>
  );
};

export default FridgeBigDoor;
