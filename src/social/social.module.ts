import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialResolver } from './social.resolver';
import { SocialPost, SocialPostSchema } from './social-post.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: SocialPost.name, schema: SocialPostSchema }])],
  providers: [SocialService, SocialResolver],
  exports: [SocialService],
})
export class SocialModule {}