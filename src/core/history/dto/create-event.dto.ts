import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  user: number;

  @ApiProperty()
  proposal: number;

  @ApiProperty()
  status: number;
}
