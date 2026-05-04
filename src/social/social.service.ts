import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { SocialPost } from './social-post.schema';

export enum SocialPlatform {
  TIKTOK = 'TIKTOK',
  INSTAGRAM = 'INSTAGRAM',
  YOUTUBE = 'YOUTUBE',
}

@Injectable()
export class SocialService {
  constructor(@InjectModel(SocialPost.name) private socialPostModel: Model<SocialPost>) {}

  async createPost(data: Partial<SocialPost>): Promise<SocialPost> {
    return this.socialPostModel.create(data);
  }

  async findByVideo(videoId: string): Promise<SocialPost[]> {
    return this.socialPostModel.find({ videoId }).exec();
  }

  async updateStatus(id: string, status: string, postUrl?: string): Promise<SocialPost> {
    return this.socialPostModel.findByIdAndUpdate(id, { status, ...(postUrl && { postUrl }) }, { new: true }).exec();
  }

  /**
   * Auto-post video to TikTok via unofficial API (basic upload URL + token approach)
   * Note: Full TikTok API requires business SDK — this is a placeholder that logs intent
   */
  async postToTikTok(videoUrl: string, caption: string, accessToken: string): Promise<{ postUrl: string; status: string }> {
    console.log(`[SocialService] Posting to TikTok: ${caption}`);
    // TikTok API v2 endpoint (requires beta access + access token)
    // POST https://open.tiktokapis.com/v2/post/publish/creator/ 
    try {
      const response = await axios.post(
        'https://open.tiktokapis.com/v2/post/publish/creator/',
        { video_url: videoUrl, caption, privacy_level: 'SELF_ONLY' },
        { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' } },
      );
      return { postUrl: response.data?.share_url || videoUrl, status: 'POSTED' };
    } catch (err) {
      console.warn('[SocialService] TikTok post failed (API not authorized yet):', err.message);
      return { postUrl: videoUrl, status: 'SCHEDULED' };
    }
  }

  /**
   * Post to Instagram via Graph API
   */
  async postToInstagram(videoUrl: string, caption: string, accessToken: string, instagramAccountId: string): Promise<{ postUrl: string; status: string }> {
    console.log(`[SocialService] Posting to Instagram: ${caption}`);
    try {
      // Create media container
      const containerRes = await axios.post(
        `https://graph.facebook.com/v18.0/${instagramAccountId}/media`,
        { video_url: videoUrl, caption, media_type: 'REELS' },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      // Publish
      const publishRes = await axios.post(
        `https://graph.facebook.com/v18.0/${instagramAccountId}/media_publish`,
        { creation_id: containerRes.data.id },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      const postId = publishRes.data.id;
      // Get permalink
      const permalinkRes = await axios.get(`https://graph.facebook.com/v18.0/${postId}?fields=permalink`, { headers: { Authorization: `Bearer ${accessToken}` } });
      return { postUrl: permalinkRes.data.permalink || videoUrl, status: 'POSTED' };
    } catch (err) {
      console.warn('[SocialService] Instagram post failed:', err.message);
      return { postUrl: videoUrl, status: 'SCHEDULED' };
    }
  }

  /**
   * Post to YouTube via Data API
   */
  async postToYouTube(videoUrl: string, title: string, description: string, accessToken: string): Promise<{ postUrl: string; status: string }> {
    console.log(`[SocialService] Posting to YouTube: ${title}`);
    try {
      // Upload via resumable upload session
      const videoRes = await axios.post(
        'https://www.googleapis.com/upload/youtube/v3/videos',
        { snippet: { title, description, tags: ['golf', 'golfinstruction', 'golftip'], categoryId: 27 }, status: { privacyStatus: 'public' } },
        { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' } },
      );
      return { postUrl: `https://youtu.be/${videoRes.data.id}`, status: 'POSTED' };
    } catch (err) {
      console.warn('[SocialService] YouTube post failed:', err.message);
      return { postUrl: videoUrl, status: 'SCHEDULED' };
    }
  }

  /**
   * Auto-post a GolfClip video to all connected platforms
   */
  async autoPost(videoId: string, videoUrl: string, caption: string, connectedAccounts: Array<{ platform: string; accessToken: string; accountId?: string }>) {
    const posts = [];
    for (const account of connectedAccounts) {
      let result: { postUrl: string; status: string };
      if (account.platform === SocialPlatform.TIKTOK) {
        result = await this.postToTikTok(videoUrl, caption, account.accessToken);
      } else if (account.platform === SocialPlatform.INSTAGRAM) {
        result = await this.postToInstagram(videoUrl, caption, account.accessToken, account.accountId || '');
      } else if (account.platform === SocialPlatform.YOUTUBE) {
        result = await this.postToYouTube(videoUrl, caption, caption, account.accessToken);
      } else {
        result = { postUrl: videoUrl, status: 'SKIPPED' };
      }
      posts.push(await this.createPost({ videoId, platform: account.platform, status: result.status, postUrl: result.postUrl }));
    }
    return posts;
  }
}
