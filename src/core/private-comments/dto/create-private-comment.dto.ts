import { ApiProperty } from '@nestjs/swagger';

export class CreatePrivateCommentDto {
  @ApiProperty()
  readonly proposalId: number;

  @ApiProperty()
  readonly text: string;
}
