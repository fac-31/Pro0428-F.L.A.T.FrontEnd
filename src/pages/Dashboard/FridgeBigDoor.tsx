import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface FridgeBigDoorProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: 'cleaning' | 'bills' | 'review' | null;
  data: any;
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
    if (loading) return <CircularProgress />;

    if (!activeSection) return <Typography variant="h6" sx={{ mt: 4 }}>Select a section above</Typography>;

    if (!data || data.length === 0)
      return <Typography sx={{ mt: 4 }}>No data found for {activeSection}</Typography>;

    
    switch (activeSection) {
      case 'cleaning':
        return (
          <Box>
            <Typography variant="h5">Cleaning Tasks</Typography>
            {data.map((task: any) => (
              <Typography key={task.id}>• {task.description}</Typography>
            ))}
          </Box>
        );
      case 'bills':
        return (
          <Box>
            <Typography variant="h5">Bills</Typography>
            {data.map((bill: any) => (
              <Typography key={bill.id}>
                • {bill.name}: ${bill.amount.toFixed(2)}
              </Typography>
            ))}
          </Box>
        );
      case 'review':
        return (
          <Box>
            <Typography variant="h5">Reviews</Typography>
            {data.map((review: any) => (
              <Typography key={review.id}>• {review.comment}</Typography>
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      onClick={onToggle}
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
        transform: isOpen ? 'rotateY(120deg)' : 'rotateY(0deg)',
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.9,
        },
        padding: 3,
        overflowY: 'auto',
      }}
    >

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

      <Box
        sx={{
          marginTop: '5rem',
          color: '#344359',
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default FridgeBigDoor;
