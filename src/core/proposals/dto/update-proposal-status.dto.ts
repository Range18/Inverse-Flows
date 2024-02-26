import { ApiProperty } from '@nestjs/swagger';

export class UpdateProposalStatusDto {
  @ApiProperty()
  status: string;

  @ApiProperty({
    nullable: true,
    required: false,
    description: 'Применяется только когда status: proposalRejected',
  })
  comment?: string;
}
