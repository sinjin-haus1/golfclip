import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocialPost } from './social-post.schema';

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
}