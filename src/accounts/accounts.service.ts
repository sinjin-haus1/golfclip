import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './account.schema';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) {}

  async createOrUpdate(coachId: string, platform: string, data: Partial<Account>): Promise<Account> {
    return this.accountModel.findOneAndUpdate(
      { coachId, platform },
      { ...data, coachId, platform },
      { upsert: true, new: true },
    ).exec();
  }

  async findByCoach(coachId: string): Promise<Account[]> {
    return this.accountModel.find({ coachId }).exec();
  }

  async disconnect(coachId: string, platform: string): Promise<void> {
    await this.accountModel.findOneAndDelete({ coachId, platform }).exec();
  }
}