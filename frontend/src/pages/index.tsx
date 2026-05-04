import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { Box, Container, Typography, Button, AppBar, Toolbar, Card, CardContent, Grid } from '@mui/material';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Link from 'next/link';

const GET_STATS = gql`
  query GetStats($coachId: String!) {
    videos(coachId: $coachId) {
      _id title style status resultVideoUrl createdAt
    }
  }
`;

const VIDEOS_QUERY = gql`
  query Videos($coachId: String!) {
    videos(coachId: $coachId) {
      _id title style status resultVideoUrl createdAt
    }
  }
`;

// Default coach for demo
const DEMO_COACH_ID = 'demo-coach';

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <Card sx={{ bgcolor: '#1a472a', textAlign: 'center', p: 2 }}>
      <Typography variant="h3" sx={{ color, fontWeight: 'bold' }}>{value}</Typography>
      <Typography color="text.secondary">{label}</Typography>
    </Card>
  );
}

export default function Dashboard() {
  const { data } = useQuery(VIDEOS_QUERY, { variables: { coachId: DEMO_COACH_ID }, pollInterval: 10000 });
  const videos = data?.videos || [];
  const doneCount = videos.filter((v: any) => v.status === 'DONE').length;
  const processingCount = videos.filter((v: any) => v.status === 'PROCESSING').length;

  return (
    <>
      <Head><title>Dashboard - GolfClip</title></Head>
      <AppBar position="static" sx={{ bgcolor: '#1a472a' }}>
        <Toolbar>
          <SportsGolfIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>GolfClip</Typography>
          <Button color="inherit" href="/">Dashboard</Button>
          <Button color="inherit" href="/videos">Videos</Button>
          <Button color="inherit" href="/connect">Connect</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#4caf50', mb: 2 }}>
            Transform Your Golf Instruction Content
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Upload before/after swing photos → AI generates viral TikTok/Reels/Shorts videos
          </Typography>
          <Button variant="contained" size="large" href="/upload"
            sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
            Create New Video
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={4}><StatCard label="Total Videos" value={videos.length} color="#ffffff" /></Grid>
          <Grid item xs={12} sm={4}><StatCard label="Completed" value={doneCount} color="#4caf50" /></Grid>
          <Grid item xs={12} sm={4}><StatCard label="Processing" value={processingCount} color="#ff9800" /></Grid>
        </Grid>

        <Typography variant="h4" sx={{ mb: 3 }}>Recent Videos</Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {videos.length === 0 ? (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'background.paper', borderRadius: 2 }}>
                <Typography color="text.secondary">No videos yet. Create your first one!</Typography>
                <Button href="/upload" variant="contained" sx={{ mt: 2, bgcolor: '#4caf50' }}>Upload Photos</Button>
              </Box>
            </Grid>
          ) : videos.slice(0, 6).map((v: any) => (
            <Grid item xs={12} sm={6} md={4} key={v._id}>
              <Card sx={{ bgcolor: '#1a472a' }}>
                <Box sx={{ bgcolor: '#2e5e38', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {v.status === 'DONE' && v.resultVideoUrl ? (
                    <Typography sx={{ color: '#4caf50', fontSize: 12, textAlign: 'center', px: 2 }}>
                      🎬 Video Ready
                    </Typography>
                  ) : (
                    <PlayCircleIcon sx={{ fontSize: 64, color: '#4caf50' }} />
                  )}
                </Box>
                <CardContent>
                  <Typography variant="h6" noWrap>{v.title || 'Untitled'}</Typography>
                  <Typography sx={{ color: '#4caf50', mt: 1 }}>Style: {v.style}</Typography>
                  <Typography sx={{ color: v.status === 'DONE' ? '#4caf50' : '#ff9800', mt: 1 }}>{v.status}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 4 }}>
          {['SWING_TRANSFORM', 'PUTTING_MASTER', 'DRILL_DEMO', 'COURSE_STRATEGY', 'LESSON_HIGHLIGHT'].map(style => (
            <Button key={style} variant="outlined" sx={{ borderColor: '#4caf50', color: '#4caf50' }}>{style.replace('_', ' ')}</Button>
          ))}
        </Box>
      </Container>
    </>
  );
}
