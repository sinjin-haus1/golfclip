import Head from 'next/head';
import { Box, Container, Typography, Grid, Card, CardContent, AppBar, Toolbar, Button } from '@mui/material';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const videos = [
  { id: 1, title: 'Driver Swing Transformation', status: 'DONE', style: 'POWER' },
  { id: 2, title: 'Putting Technique Fix', status: 'PROCESSING', style: 'PRECISION' },
  { id: 3, title: 'Irons Practice Session', status: 'DONE', style: 'TECHNIQUE' },
];

export default function Videos() {
  return (
    <>
      <Head><title>My Videos - GolfClip</title></Head>
      <AppBar position="static" sx={{ bgcolor: '#1a472a' }}>
        <Toolbar>
          <SportsGolfIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>GolfClip</Typography>
          <Button color="inherit" href="/">Dashboard</Button>
          <Button color="inherit" href="/upload">Upload</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography variant="h3" sx={{ mb: 4, color: '#4caf50', fontWeight: 'bold' }}>My Videos</Typography>
        <Grid container spacing={3}>
          {videos.map(v => (
            <Grid item xs={12} sm={6} md={4} key={v.id}>
              <Card sx={{ bgcolor: '#1a472a' }}>
                <Box sx={{ bgcolor: '#2e5e38', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PlayCircleIcon sx={{ fontSize: 64, color: '#4caf50' }} />
                </Box>
                <CardContent>
                  <Typography variant="h6">{v.title}</Typography>
                  <Typography color="#4caf50" sx={{ mt: 1 }}>Style: {v.style}</Typography>
                  <Typography color={v.status === 'DONE' ? '#4caf50' : '#ff9800'} sx={{ mt: 1 }}>
                    {v.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}