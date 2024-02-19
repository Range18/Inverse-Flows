import { ApiProperty } from '@nestjs/swagger';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { ProposalStatus } from '#src/core/proposal-status/entities/proposal-status.entity';
import { ProposalHistoryEntity } from '#src/core/history/entities/proposal-history.entity';

export class GetHistoryRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly user: GetUserRdo;

  @ApiProperty()
  readonly status: ProposalStatus;

  constructor(history: ProposalHistoryEntity) {
    this.id = history.id;
    this.user = new GetUserRdo(history.user);
    this.status = history.status;
  }
}
