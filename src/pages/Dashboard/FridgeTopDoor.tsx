import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface FridgeTopDoorProps {
  houseInfo: any; // you can type this more strictly if you want
  onSectionClick: (section: 'cleaning' | 'bills' | 'review') => void;
}

const FridgeTopDoor: React.FC<FridgeTopDoorProps> = ({ houseInfo, onSectionClick }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        height: '30%',
        background: 'linear-gradient(to right, #eee, #ccc)',
        borderRadius: '80px 80px 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 4,
      }}
    >
      {/* Door Handle */}
      <Box
        sx={{
          position: 'absolute',
          left: '10%',
          top: '37%',
          width: '0.5em',
          height: '25%',
          backgroundColor: '#222',
          borderRadius: '5vmax',
        }}
      />


      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
          letterSpacing: '0.2em',
          fontFamily: 'EurostileExtendedBlack',
          color: '#344359',
          mt: 2,
        }}
      >
        FLAT
      </Typography>


      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{
            fontFamily: 'EurostileExtendedBlack',
            backgroundColor: '#344359',
            color: '#fff',
            '&:hover': { backgroundColor: '#748096' },
          }}
          onClick={() => onSectionClick('cleaning')}
        >
          Cleaning
        </Button>
        <Button
          variant="contained"
          sx={{
            fontFamily: 'EurostileExtendedBlack',
            backgroundColor: '#344359',
            color: '#fff',
            '&:hover': { backgroundColor: '#748096' },
          }}
          onClick={() => onSectionClick('bills')}
        >
          Bills
        </Button>
        <Button
          variant="contained"
          sx={{
            fontFamily: 'EurostileExtendedBlack',
            backgroundColor: '#344359',
            color: '#fff',
            '&:hover': { backgroundColor: '#748096' },
          }}
          onClick={() => onSectionClick('review')}
        >
          Review
        </Button>
      </Box>
    </Box>
  );
};

export default FridgeTopDoor;
