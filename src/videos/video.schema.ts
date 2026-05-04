import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

export enum VideoStyle {
  SWING_TRANSFORM = 'SWING_TRANSFORM',
  PUTTING_MASTER = 'PUTTING_MASTER',
  DRILL_DEMO = 'DRILL_DEMO',
  COURSE_STRATEGY = 'COURSE_STRATEGY',
  LESSON_HIGHLIGHT = 'LESSON_HIGHLIGHT',
}

@ObjectType()
@Schema({ timestamps: true })
export class Video extends Document {
  @Field(() => ID)
  _id: any;
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
  @Field(() => String)
  @Prop()
  style: string;
  @Field()
  @Prop()
  narrationText: string;
  @Field()
  @Prop()
  hook: string;
  @Field()
  @Prop()
  createdAt: Date;
}

export const VideoSchema = SchemaFactory.createForClass(Video);