# 🏌️ GolfClip

> Faceless AI video generator for golf instructors and coaches. Transform before/after swing photos into viral TikTok, Reels, and YouTube Shorts videos.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0-red)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)

## 🎯 What is GolfClip?

GolfClip lets golf instructors and coaches create engaging, faceless video content without showing their face. Upload before/after swing photos, select a video style, and let AI generate professional transformation videos ready for social media.

### Key Features

- **🎥 Swing Transformation Videos** - Before/after swing photos → viral TikTok/Reels/Shorts
- **🤖 AI-Powered** - OpenAI + ElevenLabs for voiceovers and video generation
- **📱 Multi-Platform Posting** - Auto-post to TikTok, Instagram, YouTube
- **🎨 5 Video Styles** - TECHNIQUE, POWER, PRECISION, COURSE, LESSON
- **📐 Aspect Ratio Support** - 9:16 (TikTok), 1:1 (Instagram), 16:9 (YouTube)
- **☁️ Cloudinary Integration** - Media storage and optimization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
# Navigate to project
cd ~/Documents/git/golfclip

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your API keys

# Run development server
npm run start:dev
```

### Frontend Setup

```bash
# Navigate to frontend
cd ~/Documents/git/golfclip/frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

### Access Points

- **API (GraphQL):** http://localhost:3000/graphql
- **Frontend:** http://localhost:3001

## 📁 Project Structure

```
golfclip/
├── src/
│   ├── main.ts                 # NestJS bootstrap
│   ├── app.module.ts           # Root module
│   ├── coaches/                # Coach management
│   ├── videos/                 # Video generation
│   ├── social/                 # Social posting
│   └── accounts/               # Platform connections
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── index.tsx       # Dashboard
│       │   ├── upload.tsx      # Create videos
│       │   ├── videos.tsx      # My videos
│       │   └── connect.tsx     # Connect social accounts
│       └── lib/
│           └── apollo.ts       # Apollo client setup
├── package.json
├── render.yaml                 # Deployment config
└── README.md
```

## 🎨 Video Styles

| Style | Description |
|-------|-------------|
| `TECHNIQUE` | Focus on swing mechanics and form |
| `POWER` | Highlight strength and distance gains |
| `PRECISION` | Emphasize accuracy and control |
| `COURSE` | On-course gameplay transformations |
| `LESSON` | Instructional content with tips |

## 🔧 Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/golfclip
JWT_SECRET=your-jwt-secret
PORT=3000
FRONTEND_URL=http://localhost:3001
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
OPENAI_API_KEY=your-openai-key
ELEVENLABS_API_KEY=your-elevenlabs-key
TIKTOK_APP_ID=your-tiktok-app-id
TIKTOK_APP_SECRET=your-tiktok-secret
INSTAGRAM_APP_ID=your-ig-app-id
INSTAGRAM_APP_SECRET=your-ig-secret
YOUTUBE_CLIENT_ID=your-yt-client-id
YOUTUBE_CLIENT_SECRET=your-yt-secret
```

## 🌐 Deployment

Deploy to Render:

```bash
# Push to GitHub first, then connect to Render
git push origin main
```

See `render.yaml` for deployment configuration.

## 📜 License

MIT © 2024 GolfClip