import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID, String } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Coach extends Document {
  @Field(() => ID)
  _id: string;
  @Field()
  @Prop({ required: true })
  name: string;
  @Field()
  @Prop({ required: true, unique: true })
  email: string;
  @Field()
  @Prop()
  studioName: string;
  @Field(() => [String])
  @Prop({ type: [String], default: [] })
  specialties: string[];
  @Field()
  @Prop({ default: 'DEFAULT' })
  videoStyle: string;
  @Field()
  @Prop()
  tiktokConnected: boolean;
  @Field()
  @Prop()
  instagramConnected: boolean;
  @Field()
  @Prop()
  youtubeConnected: boolean;
  @Field()
  @Prop()
  createdAt: Date;
}

export const CoachSchema = SchemaFactory.createForClass(Coach);