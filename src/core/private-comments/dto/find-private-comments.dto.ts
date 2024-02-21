import { ApiProperty } from '@nestjs/swagger';

export class FindPrivateCommentsDto {
  @ApiProperty()
  readonly proposalId: number;
}
