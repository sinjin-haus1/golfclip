import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Account extends Document {
  @Field(() => ID)
  _id: any;
  @Field()
  @Prop({ required: true })
  coachId: string;
  @Field()
  @Prop({ required: true })
  platform: string;
  @Field()
  @Prop()
  accessToken: string;
  @Field()
  @Prop()
  refreshToken: string;
  @Field()
  @Prop()
  expiresAt: Date;
  @Field()
  @Prop()
  connected: boolean;
  @Field()
  @Prop()
  createdAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);