import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import {Document, ObjectId} from 'mongoose';

@Schema({timestamps: true })
export class User extends Document<ObjectId> {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;
  // Поля, добавляемые Mongoose автоматически
  @Prop()
  createdAt: Date; // Поле createdAt

  @Prop()
  updatedAt: Date; // Поле updatedAt

}

export const UserSchema = SchemaFactory.createForClass(User);
