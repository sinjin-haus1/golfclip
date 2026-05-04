import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SocialService, SocialPlatform } from './social.service';
import { SocialPost } from './social-post.schema';
import { Account } from '../accounts/account.schema';
import { ObjectType, Field } from '@nestjs/graphql';

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

  @Mutation(() => SocialPost)
  async postToSocial(
    @Args('videoId') videoId: string,
    @Args('platform', { type: () => SocialPlatform }) platform: SocialPlatform,
    @Args('videoUrl') videoUrl: string,
    @Args('caption') caption: string,
    @Args('accessToken') accessToken: string,
    @Args('accountId') accountId: string,
  ) {
    let result: { postUrl: string; status: string };
    if (platform === SocialPlatform.TIKTOK) {
      result = await this.socialService.postToTikTok(videoUrl, caption, accessToken);
    } else if (platform === SocialPlatform.INSTAGRAM) {
      result = await this.socialService.postToInstagram(videoUrl, caption, accessToken, accountId);
    } else {
      result = await this.socialService.postToYouTube(videoUrl, caption, caption, accessToken);
    }
    return this.socialService.createPost({ videoId, platform, status: result.status, postUrl: result.postUrl });
  }
}
