import { Injectable } from '@nestjs/common';
import { TrainDto } from './dto/trainning.dto';
import { Message } from 'src/schemas/message.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Reply } from 'src/schemas/reply.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
    @InjectModel(Reply.name)
    private readonly replyModel: Model<Reply>,
  ) {}
  async createKeyValueService(data: TrainDto) {
    console.log(
      'DEBUG_CODE: MessageService -> createKeyValueService -> data',
      data,
    );
    const { key, value } = data;
    const createMessage = new this.messageModel({ key });
    const createReply = new this.replyModel({ value });
    createReply.save();
    createMessage.save();
  }

  async getAllMessageService(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }
}
