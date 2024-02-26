import { ApiProperty } from '@nestjs/swagger';

//TODO
export class UpdatePrivateCommentDto {
  @ApiProperty()
  readonly text: string;
}
