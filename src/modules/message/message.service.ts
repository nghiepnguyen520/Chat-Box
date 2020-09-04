import { Injectable } from '@nestjs/common';
import { TrainDto } from './dto/trainning.dto';
import { Message } from 'src/schemas/message.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Reply } from 'src/schemas/reply.schema';
import * as _ from 'lodash';
import { ChatDto } from './dto/chat.dto';
import { plainToClass } from 'class-transformer';
import { ResponseDto } from './dto/response.dto';
@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
    @InjectModel(Reply.name)
    private readonly replyModel: Model<Reply>,
  ) {}
  async createKeyValueService(data: TrainDto): Promise<Message> {
    const { key, value } = data;
    let isKey;
    let isReply;

    //Find Key
    isKey = await this.messageModel.findOne({ key }).exec();

    //Find Reply Value
    isReply = await this.replyModel.findOne({ value }).exec();

    //If !isReply create Reply DB
    if (!isReply) {
      isReply = await new this.replyModel({ value }).save();
    }

    //Create Data To Train
    const dataTrain = {};
    dataTrain['key'] = key;
    dataTrain['replyMessage'] = [...isReply['value']];

    if (!isKey) {
      isKey = await new this.messageModel(dataTrain).save();
    }

    //Check Value Train Exit
    const isIndexValueInKey = _.includes(
      isKey['replyMessage'],
      dataTrain['replyMessage'][0],
    );

    if (isIndexValueInKey) {
      dataTrain['replyMessage'] = [...isKey['replyMessage']];
      const convertKey = { ...dataTrain };
      isKey = await this.messageModel.findByIdAndUpdate(isKey._id, convertKey);
    } else {
      dataTrain['replyMessage'] = [
        ...isKey['replyMessage'],
        ...isReply['value'],
      ];
      const convertKey = { ...dataTrain };
      isKey = await this.messageModel.findByIdAndUpdate(isKey._id, convertKey);
    }
    return isKey;
  }

  async getAllMessageService(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async replyService(data: ChatDto) {
    const { key } = data;
    const isKey = await this.messageModel.findOne({ key });
    if (!isKey) return plainToClass(ResponseDto, { data: '...' });
    const lengthReply = isKey.replyMessage.length;
    if (lengthReply < 0) return plainToClass(ResponseDto, { data: '...' });
    const numberRandom = Math.floor(Math.random() * lengthReply);
    return plainToClass(ResponseDto, {
      data: isKey.replyMessage[numberRandom],
    });
  }
}
