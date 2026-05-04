import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coach } from './coach.schema';

@Injectable()
export class CoachesService {
  constructor(@InjectModel(Coach.name) private coachModel: Model<Coach>) {}

  async create(data: Partial<Coach>): Promise<Coach> {
    return this.coachModel.create(data);
  }

  async findAll(): Promise<Coach[]> {
    return this.coachModel.find().exec();
  }

  async findByEmail(email: string): Promise<Coach> {
    return this.coachModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<Coach> {
    return this.coachModel.findById(id).exec();
  }

  async updateVideoStyle(id: string, style: string): Promise<Coach> {
    return this.coachModel.findByIdAndUpdate(id, { videoStyle: style }, { new: true }).exec();
  }
}