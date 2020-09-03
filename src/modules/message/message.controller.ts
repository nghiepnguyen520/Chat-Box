import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrainDto } from './dto/trainning.dto';
import { MessageService } from './message.service';
import { Message } from 'src/schemas/message.schema';
@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/train')
  async createKeyValue(@Body() dto: TrainDto) {
    this.messageService.createKeyValueService(dto);
  }

  @Get()
  async getAllMessage(): Promise<Message[]> {
    return this.messageService.getAllMessageService();
  }
}
