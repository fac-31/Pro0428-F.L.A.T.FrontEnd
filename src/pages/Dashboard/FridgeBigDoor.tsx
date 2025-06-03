import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { HouseInfo } from '../../types/types';

interface FridgeBigDoorProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: 'cleaning' | 'bills' | 'review' | null;
  data: HouseInfo | null;
  loading: boolean;
}

const FridgeBigDoor: React.FC<FridgeBigDoorProps> = ({
  isOpen,
  onToggle,
  activeSection,
  data,
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

    if (!data) {
      return (
        <Typography variant="body1" color="text.secondary" align="center" mt={2}>
          No data found.
        </Typography>
      );
    }

    switch (activeSection) {
      case 'cleaning':
        return (
          <Box>
            <Typography variant="h6">Cleaning Tasks</Typography>
            {/* Add more cleaning-related data */}
          </Box>
        );
      case 'bills':
        return (
          <Box>
            <Typography variant="h6">Bills Info</Typography>
            {/* Add more billing info */}
          </Box>
        );
      case 'review':
        return (
          <Box>
            <Typography variant="h6">House Review</Typography>
            {/* Add more review info */}
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
      {/* Fridge interior (white) behind the door */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff', // White interior
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
        {/* Handle */}
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
