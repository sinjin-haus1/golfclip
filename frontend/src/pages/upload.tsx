import Head from 'next/head';
import { Box, Container, Typography, Card, CardContent, Button, TextField, MenuItem, AppBar, Toolbar } from '@mui/material';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';

const styles = ['TECHNIQUE', 'POWER', 'PRECISION', 'COURSE', 'LESSON'];
const aspects = [
  { value: 9, label: '9:16 (TikTok/Reels/Shorts)' },
  { value: 1, label: '1:1 (Instagram)' },
  { value: 16, label: '16:9 (YouTube)' },
];

export default function Upload() {
  return (
    <>
      <Head><title>Upload - GolfClip</title></Head>
      <AppBar position="static" sx={{ bgcolor: '#1a472a' }}>
        <Toolbar>
          <SportsGolfIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>GolfClip</Typography>
          <Button color="inherit" href="/">Dashboard</Button>
          <Button color="inherit" href="/upload">Upload</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Typography variant="h3" sx={{ mb: 4, color: '#4caf50', fontWeight: 'bold' }}>Create Swing Transformation</Typography>
        <Card sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>Upload Before/After Photos</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 4 }}>
            <TextField label="Before Swing Image URL" fullWidth />
            <TextField label="After Swing Image URL" fullWidth />
          </Box>
          <TextField select label="Video Style" fullWidth sx={{ mb: 3 }}>
            {styles.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
          <TextField select label="Aspect Ratio" fullWidth sx={{ mb: 4 }}>
            {aspects.map(a => <MenuItem key={a.value} value={a.value}>{a.label}</MenuItem>)}
          </TextField>
          <TextField label="Title (optional)" fullWidth sx={{ mb: 4 }} />
          <Button variant="contained" size="large" fullWidth sx={{ bgcolor: '#4caf50' }}>
            Generate Video
          </Button>
        </Card>
      </Container>
    </>
  );
}