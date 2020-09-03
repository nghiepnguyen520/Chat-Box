import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Reply extends Document {
  @Prop([String])
  value: string[];
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
