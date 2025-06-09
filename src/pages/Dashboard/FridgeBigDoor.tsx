import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
<<<<<<< HEAD
import { HouseInfo, testDBUser, Bills } from '../../types/types';
=======
import { HouseInfo, testDBUser } from '../../types/types';
>>>>>>> c17225b39f8acd637ae8e1559966232e63b29748

interface FridgeBigDoorProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: 'cleaning' | 'bills' | 'review' | null;
  data: HouseInfo | null;
  testDbData?: testDBUser[] | null;
<<<<<<< HEAD
  billsData?: Bills[] | null;
=======
>>>>>>> c17225b39f8acd637ae8e1559966232e63b29748
  loading: boolean;
}

const FridgeBigDoor: React.FC<FridgeBigDoorProps> = ({
  isOpen,
  onToggle,
  activeSection,
  data,
<<<<<<< HEAD
  testDbData,
  billsData,
=======
  testDbData, // <- now used!
>>>>>>> c17225b39f8acd637ae8e1559966232e63b29748
  loading,
}) => {
  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
<<<<<<< HEAD
=======
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
>>>>>>> c17225b39f8acd637ae8e1559966232e63b29748
      );
    }

    switch (activeSection) {
<<<<<<< HEAD
      case 'cleaning':
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

=======
>>>>>>> c17225b39f8acd637ae8e1559966232e63b29748
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
<<<<<<< HEAD
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

=======
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
>>>>>>> c17225b39f8acd637ae8e1559966232e63b29748
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
