import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID, String } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class SocialPost extends Document {
  @Field(() => ID)
  _id: string;
  @Field()
  @Prop({ required: true })
  videoId: string;
  @Field()
  @Prop()
  platform: string;
  @Field()
  @Prop()
  status: string;
  @Field()
  @Prop()
  postUrl: string;
  @Field()
  @Prop()
  scheduledAt: Date;
  @Field()
  @Prop()
  createdAt: Date;
}

export const SocialPostSchema = SchemaFactory.createForClass(SocialPost);