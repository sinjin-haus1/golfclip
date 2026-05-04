import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialResolver } from './social.resolver';
import { SocialPost, SocialPostSchema } from './social-post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TtsService } from './tts.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: SocialPost.name, schema: SocialPostSchema }])],
  providers: [SocialService, SocialResolver, TtsService],
  exports: [SocialService, TtsService],
})
export class SocialModule {}
