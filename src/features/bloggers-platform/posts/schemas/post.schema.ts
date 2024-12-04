import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import {Document, ObjectId} from 'mongoose';

@Schema({timestamps: true })
export class Post extends Document<ObjectId> {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  blogId: string;

  @Prop({ required: true })
  blogName: string;
  // Поля, добавляемые Mongoose автоматически
  @Prop()
  createdAt: Date; // Поле createdAt

  @Prop()
  updatedAt: Date; // Поле updatedAt


}

export const PostSchema = SchemaFactory.createForClass(Post);


