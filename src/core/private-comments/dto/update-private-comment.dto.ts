import { ApiProperty } from '@nestjs/swagger';

export class UpdatePrivateCommentDto {
  @ApiProperty()
  readonly text: string;
}
