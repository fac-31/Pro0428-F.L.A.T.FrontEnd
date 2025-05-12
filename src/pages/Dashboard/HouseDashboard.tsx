import { Container, Typography, Paper, Box, Button } from '@mui/material';

const HouseDashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Paper
          elevation={4}
          sx={{
            width: 500,
            height: 800,
            borderRadius: '80px 80px 20px 20px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 4,
            backgroundColor: '#d7ebf5',
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 500, letterSpacing: '0.2em', fontFamily: 'EurostileExtendedBlack', color: '#344359'}}>
            FLAT
          </Typography>

          <div className="navbar-container">
            <Box display="flex" justifyContent="center" mb={2}
                        sx={{ position: 'absolute', top: '18%', right: 100}}
>
              <Button href="#" variant="contained" sx={{ mx: 1, fontFamily: 'EurostileExtendedBlack', backgroundColor:'#344359', color:'#fff', '&:hover': {backgroundColor: '#748096'}}}>
                Cleaning
              </Button>
              <Button href="#" variant="contained" sx={{ mx: 1, fontFamily: 'EurostileExtendedBlack', backgroundColor:'#344359', color:'#fff', '&:hover': {backgroundColor: '#748096'}}}>
                Bills
              </Button>
              <Button href="#" variant="contained" sx={{ mx: 1, fontFamily: 'EurostileExtendedBlack', backgroundColor:'#344359', color:'#fff', '&:hover': {backgroundColor: '#748096'}}}>
                Review
              </Button>
        </Box>
          </div>
          {/* Fridge handle */}
          <Box
            sx={{
              position: 'absolute',
              right: 24,
              top: '20%',
              width: 60,
              height: 12,
              bgcolor: '#ededed',
              borderRadius: 2,
              boxShadow: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 24,
                bgcolor: '#a8a4b0',
                borderRadius: 1,
                ml: 1,
              }}
            />
          </Box>
          {/* End fridge handle */}
          <Box
            sx={{
              position: 'absolute',
              right: 24,
              top: '30%',
              width: 60,
              height: 12,
              bgcolor: '#ededed',
              borderRadius: 2,
              boxShadow: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 24,
                bgcolor: '#a8a4b0',
                borderRadius: 1,
                ml: 1,
              }}
            />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              right: 24,
              top: '25%',
              left: 24,
              height: 2,
              bgcolor: '#ededed',
              borderRadius: 1,
              boxShadow: 1,
            }}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default HouseDashboard; 