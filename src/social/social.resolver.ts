import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SocialService } from './social.service';
import { SocialPost } from './social-post.schema';

@Resolver(() => SocialPost)
export class SocialResolver {
  constructor(private socialService: SocialService) {}

  @Query(() => [SocialPost])
  socialPosts(@Args('videoId') videoId: string) {
    return this.socialService.findByVideo(videoId);
  }

  @Mutation(() => SocialPost)
  schedulePost(
    @Args('videoId') videoId: string,
    @Args('platform') platform: string,
    @Args('scheduledAt') scheduledAt: Date,
  ) {
    return this.socialService.createPost({ videoId, platform, status: 'SCHEDULED', scheduledAt });
  }
}