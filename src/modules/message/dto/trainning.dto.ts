import { ApiProperty } from '@nestjs/swagger';

export class TrainDto {
  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;
}
