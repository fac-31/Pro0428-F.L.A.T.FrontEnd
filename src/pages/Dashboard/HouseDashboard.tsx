import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';

const HouseDashboard = () => {
  const [isBigDoorOpen, setIsBigDoorOpen] = useState(false);

  const toggleBigDoor = () => {
    setIsBigDoorOpen(!isBigDoorOpen);
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        {/* Fridge Back */}
        <Paper
          elevation={4}
          sx={{
            width: 500,
            height: 800,
            borderRadius: '80px 80px 0px 0px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#d7ebf5',
            perspective: '800px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Top Door (Static with buttons) */}
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
            
            {/* Title */}
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

            {/* Buttons Container */}
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
                onClick={toggleBigDoor}
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
                onClick={toggleBigDoor}
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
                onClick={toggleBigDoor}
              >
                Review
              </Button>
            </Box>
          </Box>

          {/* Big Door (now at bottom) */}
          <Box
            onClick={toggleBigDoor}
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              height: '70%',
              background: 'linear-gradient(to right, #eee, #ccc)',
              transformOrigin: '100% 50%',
              transition: 'transform 1s, border-bottom 1s',
              borderBottom: '5px solid #222',
              borderRadius: '0 0 20px 20px',
              transform: isBigDoorOpen ? 'rotateY(120deg)' : 'rotateY(0deg)',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            {/* Door Handle */}
            <Box
              sx={{
                position: 'absolute',
                left: '10%',
                top: '12.5%',
                width: '0.5em',
                height: '75%',
                backgroundColor: '#222',
                borderRadius: '5vmax',
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default HouseDashboard;
