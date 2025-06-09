import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { HouseInfo, Bills, CleaningTask } from '../../types/types';

interface FridgeBigDoorProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: 'cleaning' | 'bills' | 'review' | null;
  data: HouseInfo | null;
  cleaningData?: CleaningTask[] | null;
  billsData?: Bills[] | null;
  loading: boolean;
}

const FridgeBigDoor: React.FC<FridgeBigDoorProps> = ({
  isOpen,
  onToggle,
  activeSection,
  data,
  cleaningData,
  billsData,
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

    switch (activeSection) {
case 'cleaning':
  if (!cleaningData || cleaningData.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" align="center" mt={2}>
        No cleaning data found.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Cleaning Tasks
      </Typography>
      {cleaningData.map((task, index) => (
        <Box
          key={task.cleaning_task_id || index}
          mb={2}
          p={1}
          border="1px solid #ccc"
          borderRadius={2}
        >
          <Typography>Task: {task.description}</Typography>
          <Typography>Assigned To: {task.assigned_to_user}</Typography>
          <Typography>Status: {task.task_complete ? 'Completed' : 'Pending'}</Typography>
          {task.due_date && (
            <Typography>
              Due Date: {new Date(task.due_date).toLocaleDateString()}
            </Typography>
          )}
          {task.created_at && (
            <Typography>
              Created At: {new Date(task.created_at).toLocaleString()}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );


      case 'bills':
        if (!billsData || billsData.length === 0) {
          return (
            <Typography variant="body2" color="text.secondary" align="center" mt={2}>
              No bills available.
            </Typography>
          );
        }
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Bills Info
            </Typography>
            {billsData.map((bill) => (
              <Box
                key={bill.bill_id}
                sx={{
                  mb: 2,
                  p: 2,
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  backgroundColor: bill.paid ? '#e0f7e9' : '#fff4f4',
                }}
              >
                <Typography variant="subtitle1">{bill.bill_type}</Typography>
                <Typography variant="body2">Amount: £{bill.bill_amount}</Typography>
                {bill.due_date && (
                  <Typography variant="body2">
                    Due: {new Date(bill.due_date).toLocaleDateString()}
                  </Typography>
                )}
                <Typography variant="body2" color={bill.paid ? 'green' : 'error'}>
                  {bill.paid ? 'Paid' : 'Unpaid'}
                </Typography>
              </Box>
            ))}
          </Box>
        );

      case 'review':
        if (!data) {
          return (
            <Typography variant="body1" color="text.secondary" align="center" mt={2}>
              No house info data found.
            </Typography>
          );
        }
        return (
          <Box>
            <Typography variant="h6">House Review</Typography>
            {/* Render review-related content here */}
          </Box>
        );

      default:
        return (
          <Typography variant="body1" color="text.secondary" align="center" mt={2}>
            Select a section to view data.
          </Typography>
        );
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
