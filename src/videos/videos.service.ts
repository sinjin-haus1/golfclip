import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './video.schema';

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  async create(data: Partial<Video>): Promise<Video> {
    return this.videoModel.create(data);
  }

  async findByCoach(coachId: string): Promise<Video[]> {
    return this.videoModel.find({ coachId }).sort({ createdAt: -1 }).exec();
  }

  async updateStatus(id: string, status: string, resultVideoUrl?: string): Promise<Video> {
    return this.videoModel.findByIdAndUpdate(id, { status, ...(resultVideoUrl && { resultVideoUrl }) }, { new: true }).exec();
  }
}