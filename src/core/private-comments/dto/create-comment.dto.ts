import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  readonly ProposalId: number;

  @ApiProperty()
  readonly text: string;
}
