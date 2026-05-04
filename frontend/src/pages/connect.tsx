import Head from 'next/head';
import { Box, Container, Typography, Card, CardContent, Button, AppBar, Toolbar, Alert, Chip } from '@mui/material';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';

const platforms = [
  {
    name: 'TikTok',
    icon: '🎵',
    color: '#00f2ea',
    description: 'Post short-form golf transformation videos to TikTok',
    scopes: ['video.publish', 'user.info.basic'],
    connectUrl: '/api/auth/tiktok',
    connected: false,
  },
  {
    name: 'Instagram',
    icon: '📸',
    color: '#e1306c',
    description: 'Share Reels and posts to your Instagram golf audience',
    scopes: ['instagram_content_publish', 'instagram_basic'],
    connectUrl: '/api/auth/instagram',
    connected: false,
  },
  {
    name: 'YouTube',
    icon: '🎬',
    color: '#ff0000',
    description: 'Upload lesson highlights and tutorials to YouTube',
    scopes: ['youtube.upload', 'youtube.readonly'],
    connectUrl: '/api/auth/youtube',
    connected: false,
  },
];

export default function Connect() {
  return (
    <>
      <Head><title>Connect Accounts - GolfClip</title></Head>
      <AppBar position="static" sx={{ bgcolor: '#1a472a' }}>
        <Toolbar>
          <SportsGolfIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>GolfClip</Typography>
          <Button color="inherit" href="/">Dashboard</Button>
          <Button color="inherit" href="/upload">Upload</Button>
          <Button color="inherit" href="/videos">Videos</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Typography variant="h3" sx={{ mb: 2, color: '#4caf50', fontWeight: 'bold' }}>Connect Social Accounts</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Connect your accounts to automatically post videos to TikTok, Instagram, and YouTube.
          Each platform requires OAuth authorization — click Connect to start.
        </Typography>

        <Alert severity="info" sx={{ mb: 4, bgcolor: '#1a472a', color: '#4caf50' }}>
          🔒 Your credentials are securely stored and never shared. Auto-post can be disabled anytime.
        </Alert>

        {platforms.map(p => (
          <Card key={p.name} sx={{ mb: 3, bgcolor: '#1a472a' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h3">{p.icon}</Typography>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6">{p.name}</Typography>
                    {p.connected && <Chip label="Connected" size="small" sx={{ bgcolor: '#4caf50', color: 'black' }} />}
                  </Box>
                  <Typography color="text.secondary" variant="body2">{p.description}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    Permissions: {p.scopes.join(', ')}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant={p.connected ? 'outlined' : 'contained'}
                sx={{
                  bgcolor: p.connected ? 'transparent' : p.color,
                  borderColor: p.color,
                  color: p.connected ? p.color : 'black',
                  '&:hover': { bgcolor: p.connected ? p.color + '22' : p.color },
                }}
                href={p.connected ? undefined : p.connectUrl}
              >
                {p.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </CardContent>
          </Card>
        ))}

        <Card sx={{ mt: 4, p: 3, bgcolor: '#1a472a' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>How Auto-Posting Works</Typography>
          <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 2 }}>
            <li>Generate a video on the Upload page</li>
            <li>Your video is saved and processed</li>
            <li>Select which platforms to post to</li>
            <li>Your golf content goes live automatically</li>
          </Typography>
        </Card>
      </Container>
    </>
  );
}
