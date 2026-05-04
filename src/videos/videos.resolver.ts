import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VideosService } from './videos.service';
import { VideosModule } from './videos.module';
import { Video, VideoStyle } from './video.schema';
import { VideoGeneratorService, AspectRatio } from './video-generator.service';

@Resolver(() => Video)
export class VideosResolver {
  constructor(
    private videosService: VideosService,
    private videoGenerator: VideoGeneratorService,
  ) {}

  @Query(() => [Video])
  videos(@Args('coachId') coachId: string) {
    return this.videosService.findByCoach(coachId);
  }

  @Mutation(() => Video)
  async generateVideo(
    @Args('coachId') coachId: string,
    @Args('title') title: string,
    @Args('beforeImageUrl') beforeImageUrl: string,
    @Args('afterImageUrl') afterImageUrl: string,
    @Args('aspectRatio', { type: () => Int }) aspectRatio: number,
    @Args('style', { type: () => VideoStyle }) style: VideoStyle,
  ) {
    const video = await this.videosService.create({
      coachId,
      title,
      beforeImageUrl,
      afterImageUrl,
      aspectRatio,
      style,
      status: 'PROCESSING',
    });

    // Fire-and-forget video generation (non-blocking)
    this.videoGenerator.generate({
      coachId,
      title,
      beforeImageUrl,
      afterImageUrl,
      style,
      aspectRatio,
    }).then((resultVideoUrl) => {
      this.videosService.updateStatus(video._id.toString(), 'DONE', resultVideoUrl);
    }).catch((err) => {
      console.error('Video generation failed:', err);
      this.videosService.updateStatus(video._id.toString(), 'FAILED');
    });

    return video;
  }

  @Mutation(() => Video)
  createVideo(
    @Args('coachId') coachId: string,
    @Args('title') title: string,
    @Args('beforeImageUrl') beforeImageUrl: string,
    @Args('afterImageUrl') afterImageUrl: string,
    @Args('aspectRatio', { type: () => Int }) aspectRatio: number,
    @Args('style') style: string,
  ) {
    return this.videosService.create({ coachId, title, beforeImageUrl, afterImageUrl, aspectRatio, style, status: 'PENDING' });
  }
}
