import { ApiProperty } from '@nestjs/swagger';

export class UpdateProposalStatusDto {
  @ApiProperty()
  status: string;
}
