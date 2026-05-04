import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { TtsService } from '../social/tts.service';
import { CloudinaryService } from '../shared/cloudinary.service';

const execAsync = promisify(exec);

export enum VideoStyle {
  SWING_TRANSFORM = 'SWING_TRANSFORM',
  PUTTING_MASTER = 'PUTTING_MASTER',
  DRILL_DEMO = 'DRILL_DEMO',
  COURSE_STRATEGY = 'COURSE_STRATEGY',
  LESSON_HIGHLIGHT = 'LESSON_HIGHLIGHT',
}

export enum AspectRatio {
  TIKTOK = 9,   // 9:16 vertical
  SQUARE = 1,   // 1:1 square
  YOUTUBE = 16, // 16:9 horizontal
}

export interface VideoGenInput {
  coachId: string;
  title: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  style: VideoStyle;
  aspectRatio: AspectRatio;
  narration?: string;
  hook?: string;
}

@Injectable()
export class VideoGeneratorService {
  constructor(
    private ttsService: TtsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  private getOutputDir() {
    const dir = '/tmp/golfclip/output';
    fs.mkdirSync(dir, { recursive: true });
    return dir;
  }

  /**
   * Main entry point — generate a video
   * Returns the Cloudinary URL of the final video
   */
  async generate(input: VideoGenInput): Promise<string> {
    const { beforeImageUrl, afterImageUrl, style, aspectRatio, coachId, title, narration, hook } = input;
    const outputDir = this.getOutputDir();
    const timestamp = Date.now();
    const outputPath = path.join(outputDir, `video_${timestamp}.mp4`);

    // 1. Generate narration audio if not provided
    const script = narration || this.ttsService.generateScript(style);
    const audioBuffer = await this.ttsService.textToSpeech(script);
    const audioPath = path.join(outputDir, `audio_${timestamp}.mp3`);
    fs.writeFileSync(audioPath, audioBuffer);

    // 2. Build FFmpeg filter based on style + aspect ratio
    const filter = this.buildFilter(style, aspectRatio, beforeImageUrl, afterImageUrl, script, hook);

    // 3. Download images
    const beforePath = path.join(outputDir, `before_${timestamp}.jpg`);
    const afterPath = path.join(outputDir, `after_${timestamp}.jpg`);
    await this.downloadImage(beforeImageUrl, beforePath);
    await this.downloadImage(afterImageUrl, afterPath);

    // 4. Run FFmpeg
    const scaleW = aspectRatio === AspectRatio.TIKTOK ? 720 : aspectRatio === AspectRatio.SQUARE ? 1080 : 1920;
    const scaleH = aspectRatio === AspectRatio.TIKTOK ? 1280 : aspectRatio === AspectRatio.SQUARE ? 1080 : 1080;

    const ffmpegCmd = [
      'ffmpeg -y',
      `-loop 1 -i "${beforePath}"`,
      `-loop 1 -i "${afterPath}"`,
      `-i "${audioPath}"`,
      `-filter_complex "`,
      `[0:v]scale=${scaleW}x${scaleH},setpts=PTS-STARTPTS,bg=browns@0.3:size=${scaleW}x${scaleH},format=yuv420p[left];`,
      `[1:v]scale=${scaleW}x${scaleH},setpts=PTS-STARTPTS,bg=browns@0.3:size=${scaleW}x${scaleH},format=yuv420p[right];`,
      `[left][right]hstack=inputs=2:duration=5[slides];`,
      `[slides]drawtext=text='${this.escapeFFmpeg(title || 'Swing Transformation')}':fontsize=48:fontcolor=white:borderw=2:x=(w-text_w)/2:y=h-80:bordercolor=black@0.5:fontcolor=yellow@0.9[vout]"`,
      `-map "[vout]" -map 2:a -c:v libx264 -preset fast -pix_fmt yuv420p -shortest "${outputPath}"`,
    ].join(' ');

    try {
      await execAsync(ffmpegCmd);
    } catch (err) {
      // If ffmpeg fails, try fallback without complex filter
      const fallback = [
        'ffmpeg -y',
        `-loop 1 -i "${beforePath}" -i "${afterPath}" -i "${audioPath}"`,
        `-filter_complex "[0:v][1:v]concat=n=2:v=1:a=0[slides]"`,
        `-map "[slides]" -map 2:a`,
        `-c:v libx264 -preset fast -pix_fmt yuv420p -shortest "${outputPath}"`,
      ].join(' ');
      await execAsync(fallback);
    }

    // 5. Upload to Cloudinary
    const videoBuffer = fs.readFileSync(outputPath);
    const resultUrl = await this.cloudinaryService.uploadVideo(
      { buffer: videoBuffer, originalname: `golfclip_${timestamp}.mp4` } as Express.Multer.File,
      `golfclip/${coachId}/videos`,
    );

    // 6. Cleanup temp files
    [beforePath, afterPath, audioPath, outputPath].forEach(f => {
      try { fs.unlinkSync(f); } catch {}
    });

    return resultUrl;
  }

  private buildFilter(style: VideoStyle, aspectRatio: AspectRatio, beforeUrl: string, afterUrl: string, script: string, hook?: string): string {
    const w = aspectRatio === AspectRatio.TIKTOK ? 720 : aspectRatio === AspectRatio.SQUARE ? 1080 : 1920;
    const h = aspectRatio === AspectRatio.TIKTOK ? 1280 : 1080;

    const hookText = hook || this.ttsService.getRandomHook(style);

    switch (style) {
      case VideoStyle.SWING_TRANSFORM:
        return `[0:v]scale=${w}:${h}[a];[1:v]scale=${w}:${h}[b];[a][b]hstack=inputs=2[v]`;
      case VideoStyle.PUTTING_MASTER:
        return `[0:v]scale=${w}:${h}[a];[1:v]scale=${w}:${h}[b];[a][b]vstack=inputs=2[v]`;
      default:
        return `[0:v]scale=${w}:${h}[a];[1:v]scale=${w}:${h}[b];[a][b]hstack=inputs=2[v]`;
    }
  }

  private async downloadImage(url: string, destPath: string): Promise<void> {
    await execAsync(`curl -s -L "${url}" -o "${destPath}"`);
  }

  private escapeFFmpeg(text: string): string {
    return text.replace(/'/g, "'\\''").replace(/:/g, '\\:').replace(/\\/g, '\\\\');
  }
}
