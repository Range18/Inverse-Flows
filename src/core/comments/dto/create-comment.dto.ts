import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  readonly postId: number;

  @ApiProperty()
  readonly text: string;
}
