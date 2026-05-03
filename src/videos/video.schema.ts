import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID, String, Int } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Video extends Document {
  @Field(() => ID)
  _id: string;
  @Field()
  @Prop({ required: true })
  coachId: string;
  @Field()
  @Prop()
  title: string;
  @Field()
  @Prop()
  beforeImageUrl: string;
  @Field()
  @Prop()
  afterImageUrl: string;
  @Field()
  @Prop()
  resultVideoUrl: string;
  @Field(() => String)
  @Prop({ default: 'PENDING', enum: ['PENDING', 'PROCESSING', 'DONE', 'FAILED'] })
  status: string;
  @Field(() => Int)
  @Prop({ default: 0 })
  aspectRatio: number;
  @Field()
  @Prop()
  style: string;
  @Field()
  @Prop()
  createdAt: Date;
}

export const VideoSchema = SchemaFactory.createForClass(Video);