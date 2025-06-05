import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface FridgeTopDoorProps {
  onSectionClick: (section: 'cleaning' | 'bills' | 'review') => void;
}

const FridgeTopDoor: React.FC<FridgeTopDoorProps> = ({ onSectionClick }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        height: '30%',
        background: 'linear-gradient(to right, #e0e6ed, #cfd8e3)',
        borderRadius: '80px 80px 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 4,
        px: 2,
        boxShadow: 'inset 0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Door Handle */}
      <Box
        sx={{
          position: 'absolute',
          left: '10%',
          top: '37%',
          width: '0.6em',
          height: '25%',
          backgroundColor: '#1e1e1e',
          borderRadius: '5vmax',
        }}
      />

      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          letterSpacing: '0.15em',
          fontFamily: 'EurostileExtendedBlack, sans-serif',
          color: '#2d3e50',
          mt: 1,
        }}
      >
        FLAT
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mb: 2,
          flexWrap: 'wrap',
        }}
      >
        {['cleaning', 'bills', 'review'].map((section) => (
          <Button
            key={section}
            variant="contained"
            sx={{
              fontFamily: 'EurostileExtendedBlack, sans-serif',
              textTransform: 'uppercase',
              backgroundColor: '#344359',
              color: '#ffffff',
              px: 3,
              '&:hover': {
                backgroundColor: '#4e5e75',
              },
              transition: 'all 0.2s ease-in-out',
            }}
            onClick={() => onSectionClick(section as 'cleaning' | 'bills' | 'review')}
          >
            {section}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default FridgeTopDoor;
