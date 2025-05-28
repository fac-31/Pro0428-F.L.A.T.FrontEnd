import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { CleaningTask, Bills } from 'types/types';

interface FridgeBigDoorProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: 'cleaning' | 'bills' | 'reviews' | null;
  data: CleaningTask[] | Bills[] | null;
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

    if (!activeSection)
      return (
        <Typography variant="h6" sx={{ mt: 4 }}>
          Select a section above
        </Typography>
      );

    if (!data || data.length === 0)
      return <Typography sx={{ mt: 4 }}>No data found for {activeSection}</Typography>;

    switch (activeSection) {
      case 'cleaning':
        return (
          <Box>
            <Typography variant="h5">Cleaning Tasks</Typography>
            {(data as CleaningTask[]).map((CleaningTask) => (
              <Typography key={CleaningTask.cleaning_task_id}>
                • {CleaningTask.description}: {CleaningTask.task_complete}
              </Typography>
            ))}
          </Box>
        );
      case 'bills':
        return (
          <Box>
            <Typography variant="h5">Bills</Typography>
            {(data as Bills[]).map((bills) => (
              <Typography key={bills.bill_id}>
                • {bills.bill_type}: ${parseFloat(bills.bill_amount).toFixed(2)}
                {bills.paid ? '(✅ Paid)' : '(❌ Unpaid)'}
              </Typography>
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
