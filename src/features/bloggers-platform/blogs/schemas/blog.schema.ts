import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import {Document, ObjectId} from 'mongoose';

@Schema({timestamps: true })
export class Blog extends Document<ObjectId> {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    websiteUrl: string;

    @Prop({ default: false })
    isMembership: boolean;

    // Поля, добавляемые Mongoose автоматически
    @Prop()
    createdAt: Date; // Поле createdAt

    @Prop()
    updatedAt: Date; // Поле updatedAt


}

export const BlogSchema = SchemaFactory.createForClass(Blog);
