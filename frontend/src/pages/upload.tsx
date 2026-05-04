import Head from 'next/head';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { Box, Container, Typography, Card, CardContent, Button, TextField, MenuItem, AppBar, Toolbar } from '@mui/material';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';

const GENERATE_VIDEO = gql`
  mutation GenerateVideo($coachId: String!, $title: String!, $beforeImageUrl: String!, $afterImageUrl: String!, $aspectRatio: Int!, $style: VideoStyle!) {
    generateVideo(coachId: $coachId, title: $title, beforeImageUrl: $beforeImageUrl, afterImageUrl: $afterImageUrl, aspectRatio: $aspectRatio, style: $style) {
      _id title status
    }
  }
`;

const styles = ['SWING_TRANSFORM', 'PUTTING_MASTER', 'DRILL_DEMO', 'COURSE_STRATEGY', 'LESSON_HIGHLIGHT'];
const aspects = [
  { value: 9, label: '9:16 (TikTok/Reels/Shorts)' },
  { value: 1, label: '1:1 (Instagram)' },
  { value: 16, label: '16:9 (YouTube)' },
];

const DEMO_COACH_ID = 'demo-coach';

export default function Upload() {
  const [form, setForm] = useState({
    beforeImageUrl: '',
    afterImageUrl: '',
    style: 'SWING_TRANSFORM',
    aspectRatio: 9,
    title: '',
  });
  const [generateVideo, { loading }] = useMutation(GENERATE_VIDEO);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    await generateVideo({
      variables: { ...form, coachId: DEMO_COACH_ID, style: form.style },
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <>
      <Head><title>Upload - GolfClip</title></Head>
      <AppBar position="static" sx={{ bgcolor: '#1a472a' }}>
        <Toolbar>
          <SportsGolfIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>GolfClip</Typography>
          <Button color="inherit" href="/">Dashboard</Button>
          <Button color="inherit" href="/videos">Videos</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Typography variant="h3" sx={{ mb: 4, color: '#4caf50', fontWeight: 'bold' }}>Create Swing Transformation</Typography>
        <Card sx={{ p: 4, bgcolor: '#1a472a' }}>
          <Typography variant="h6" sx={{ mb: 3 }}>Upload Before/After Photos</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 4 }}>
            <TextField
              label="Before Swing Image URL"
              fullWidth
              value={form.beforeImageUrl}
              onChange={e => setForm(f => ({ ...f, beforeImageUrl: e.target.value }))}
              placeholder="https://..."
            />
            <TextField
              label="After Swing Image URL"
              fullWidth
              value={form.afterImageUrl}
              onChange={e => setForm(f => ({ ...f, afterImageUrl: e.target.value }))}
              placeholder="https://..."
            />
          </Box>
          <TextField
            select label="Video Style"
            fullWidth sx={{ mb: 3 }}
            value={form.style}
            onChange={e => setForm(f => ({ ...f, style: e.target.value }))}
          >
            {styles.map(s => <MenuItem key={s} value={s}>{s.replace(/_/g, ' ')}</MenuItem>)}
          </TextField>
          <TextField
            select label="Aspect Ratio"
            fullWidth sx={{ mb: 4 }}
            value={form.aspectRatio}
            onChange={e => setForm(f => ({ ...f, aspectRatio: Number(e.target.value) }))}
          >
            {aspects.map(a => <MenuItem key={a.value} value={a.value}>{a.label}</MenuItem>)}
          </TextField>
          <TextField
            label="Title (optional)"
            fullWidth sx={{ mb: 4 }}
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          />
          {success && (
            <Typography sx={{ color: '#4caf50', mb: 2 }}>✅ Video generation started! Check the Videos page.</Typography>
          )}
          <Button
            variant="contained"
            size="large"
            fullWidth
            disabled={loading || !form.beforeImageUrl || !form.afterImageUrl}
            onClick={handleSubmit}
            sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}
          >
            {loading ? 'Generating...' : 'Generate Video'}
          </Button>
        </Card>
      </Container>
    </>
  );
}
