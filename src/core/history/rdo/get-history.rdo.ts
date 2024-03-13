import { ApiProperty } from '@nestjs/swagger';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { ProposalHistoryEntity } from '#src/core/history/entities/proposal-history.entity';
import { GetStatusRdo } from '#src/core/proposal-status/rdo/get-status.rdo';

export class GetHistoryRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly user: GetUserRdo;

  @ApiProperty({ type: GetStatusRdo })
  readonly status: GetStatusRdo;

  @ApiProperty({ nullable: true })
  readonly comment?: string;

  @ApiProperty()
  readonly createdAt: Date;

  constructor(history: ProposalHistoryEntity) {
    this.id = history.id;
    this.user = new GetUserRdo(history.user);
    this.status = new GetStatusRdo(history.status);
    this.comment = history.comment;
    this.createdAt = history.createdAt;
  }
}
