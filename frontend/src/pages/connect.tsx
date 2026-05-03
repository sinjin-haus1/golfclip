import Head from 'next/head';
import { Box, Container, Typography, Card, CardContent, Button, AppBar, Toolbar } from '@mui/material';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';

export default function Connect() {
  return (
    <>
      <Head><title>Connect Accounts - GolfClip</title></Head>
      <AppBar position="static" sx={{ bgcolor: '#1a472a' }}>
        <Toolbar>
          <SportsGolfIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>GolfClip</Typography>
          <Button color="inherit" href="/">Dashboard</Button>
          <Button color="inherit" href="/upload">Upload</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Typography variant="h3" sx={{ mb: 4, color: '#4caf50', fontWeight: 'bold' }}>Connect Social Accounts</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Connect your accounts to automatically post videos to TikTok, Instagram, and YouTube
        </Typography>
        {['TikTok', 'Instagram', 'YouTube'].map(platform => (
          <Card key={platform} sx={{ mb: 3, bgcolor: '#1a472a' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6">{platform}</Typography>
                <Typography color="text.secondary" variant="body2">Auto-post golf videos to {platform}</Typography>
              </Box>
              <Button variant="outlined" sx={{ borderColor: '#4caf50', color: '#4caf50' }}>
                Connect
              </Button>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
}