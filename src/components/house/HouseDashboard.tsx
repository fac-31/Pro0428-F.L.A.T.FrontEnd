import { Container, Typography, Paper, Box } from '@mui/material';

const HouseDashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            House Dashboard
          </Typography>
          <Typography variant="body1">
            This will be the fridge. For now it's a blank basic canvas
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default HouseDashboard;
