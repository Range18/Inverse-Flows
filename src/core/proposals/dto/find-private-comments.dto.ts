import { ApiProperty } from '@nestjs/swagger';

//TODO
export class FindPrivateCommentsDto {
  @ApiProperty()
  readonly proposalId: number;
}
