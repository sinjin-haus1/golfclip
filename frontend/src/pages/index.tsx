import Head from 'next/head';
import { Box, Container, Typography, Button, AppBar, Toolbar } from '@mui/material';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';

export default function Dashboard() {
  return (
    <>
      <Head><title>GolfClip - Faceless Video for Golf Instructors</title></Head>
      <AppBar position="static" sx={{ bgcolor: '#1a472a' }}>
        <Toolbar>
          <SportsGolfIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>GolfClip</Typography>
          <Button color="inherit">Dashboard</Button>
          <Button color="inherit">Videos</Button>
          <Button color="inherit">Connect</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#4caf50', mb: 2 }}>
            Transform Your Golf Instruction Content
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Upload before/after swing photos → AI generates viral TikTok/Reels/Shorts videos
          </Typography>
          <Button variant="contained" size="large" sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
            Start Free Trial
          </Button>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, mt: 8 }}>
          <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, textAlign: 'center' }}>
            <SportsGolfIcon sx={{ fontSize: 48, color: '#4caf50', mb: 2 }} />
            <Typography variant="h6">Swing Transformations</Typography>
            <Typography color="text.secondary">Show clients the dramatic before/after of their swing technique</Typography>
          </Box>
          <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, textAlign: 'center' }}>
            <SportsGolfIcon sx={{ fontSize: 48, color: '#4caf50', mb: 2 }} />
            <Typography variant="h6">Pro Tips Videos</Typography>
            <Typography color="text.secondary">Generate instructional content that builds your authority</Typography>
          </Box>
          <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, textAlign: 'center' }}>
            <SportsGolfIcon sx={{ fontSize: 48, color: '#4caf50', mb: 2 }} />
            <Typography variant="h6">Auto-Post Everywhere</Typography>
            <Typography color="text.secondary">Connect TikTok, Instagram, YouTube — post automatically</Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 3 }}>Video Styles</Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['TECHNIQUE', 'POWER', 'PRECISION', 'COURSE', 'LESSON'].map(style => (
              <Button key={style} variant="outlined" sx={{ borderColor: '#4caf50', color: '#4caf50' }}>{style}</Button>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}