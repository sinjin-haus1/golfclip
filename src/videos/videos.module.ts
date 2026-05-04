import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosResolver } from './videos.resolver';
import { Video, VideoSchema } from './video.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoGeneratorService } from './video-generator.service';
import { TtsService } from '../social/tts.service';
import { CloudinaryService } from '../shared/cloudinary.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])],
  providers: [VideosService, VideosResolver, VideoGeneratorService, TtsService, CloudinaryService],
  exports: [VideosService, VideoGeneratorService],
})
export class VideosModule {}
