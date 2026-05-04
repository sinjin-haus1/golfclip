import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { Box, Container, Typography, Grid, Card, CardContent, AppBar, Toolbar, Button, Chip } from '@mui/material';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DownloadIcon from '@mui/icons-material/Download';

const VIDEOS_QUERY = gql`
  query Videos($coachId: String!) {
    videos(coachId: $coachId) {
      _id title style status resultVideoUrl createdAt beforeImageUrl afterImageUrl
    }
  }
`;

const DEMO_COACH_ID = 'demo-coach';

const statusColors: Record<string, string> = {
  DONE: '#4caf50',
  PROCESSING: '#ff9800',
  PENDING: '#9e9e9e',
  FAILED: '#f44336',
};

export default function Videos() {
  const { data, loading } = useQuery(VIDEOS_QUERY, {
    variables: { coachId: DEMO_COACH_ID },
    pollInterval: 5000,
  });
  const videos = data?.videos || [];

  return (
    <>
      <Head><title>My Videos - GolfClip</title></Head>
      <AppBar position="static" sx={{ bgcolor: '#1a472a' }}>
        <Toolbar>
          <SportsGolfIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>GolfClip</Typography>
          <Button color="inherit" href="/">Dashboard</Button>
          <Button color="inherit" href="/upload">Upload</Button>
          <Button color="inherit" href="/connect">Connect</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography variant="h3" sx={{ mb: 4, color: '#4caf50', fontWeight: 'bold' }}>My Videos</Typography>
        {loading && <Typography color="text.secondary">Loading...</Typography>}
        <Grid container spacing={3}>
          {videos.map((v: any) => (
            <Grid item xs={12} sm={6} md={4} key={v._id}>
              <Card sx={{ bgcolor: '#1a472a' }}>
                <Box sx={{ bgcolor: '#2e5e38', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {v.status === 'DONE' && v.resultVideoUrl ? (
                    <Box sx={{ textAlign: 'center' }}>
                      <PlayCircleIcon sx={{ fontSize: 64, color: '#4caf50' }} />
                      <Typography variant="caption" sx={{ color: '#4caf50', display: 'block', mt: 1 }}>Click to preview</Typography>
                    </Box>
                  ) : v.status === 'PROCESSING' ? (
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography sx={{ color: '#ff9800' }}>⚙️ Processing...</Typography>
                      <Typography variant="caption" color="text.secondary">Your video is being generated</Typography>
                    </Box>
                  ) : (
                    <PlayCircleIcon sx={{ fontSize: 64, color: '#4caf50' }} />
                  )}
                  {v.status === 'DONE' && v.resultVideoUrl && (
                    <Button
                      variant="contained"
                      size="small"
                      href={v.resultVideoUrl}
                      target="_blank"
                      startIcon={<DownloadIcon />}
                      sx={{ position: 'absolute', bottom: 8, right: 8, bgcolor: '#4caf50' }}
                    >
                      Download
                    </Button>
                  )}
                </Box>
                <CardContent>
                  <Typography variant="h6" noWrap>{v.title || 'Untitled'}</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                    <Chip label={v.style?.replace(/_/g, ' ')} size="small" sx={{ bgcolor: '#2e5e38', color: '#4caf50' }} />
                    <Chip
                      label={v.status}
                      size="small"
                      sx={{ bgcolor: statusColors[v.status] + '33', color: statusColors[v.status] }}
                    />
                  </Box>
                  {v.beforeImageUrl && (
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <img src={v.beforeImageUrl} alt="Before" style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4 }} />
                      {v.afterImageUrl && <img src={v.afterImageUrl} alt="After" style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4 }} />}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
          {videos.length === 0 && !loading && (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">No videos yet</Typography>
                <Button href="/upload" variant="contained" sx={{ mt: 2, bgcolor: '#4caf50' }}>Create Your First Video</Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
