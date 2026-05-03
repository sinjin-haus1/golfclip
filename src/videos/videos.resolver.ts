import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VideosService } from './videos.service';
import { Video } from './video.schema';

@Resolver(() => Video)
export class VideosResolver {
  constructor(private videosService: VideosService) {}

  @Query(() => [Video])
  videos(@Args('coachId') coachId: string) {
    return this.videosService.findByCoach(coachId);
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