import { ApiProperty } from '@nestjs/swagger';

export class ChatDto {
  @ApiProperty()
  key: string;
}
