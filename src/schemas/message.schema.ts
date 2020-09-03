import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Message extends Document {
  @Prop({ required: true })
  key: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
