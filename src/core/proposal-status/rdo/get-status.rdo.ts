import { ApiProperty } from '@nestjs/swagger';
import { ProposalStatus } from '#src/core/proposal-status/entities/proposal-status.entity';

export class GetStatusRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly statusType: string;

  constructor(status: ProposalStatus) {
    this.id = status.id;
    this.name = status.name;
    this.statusType = status.statusType;
  }
}
