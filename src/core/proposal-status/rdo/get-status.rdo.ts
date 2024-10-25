import { ProposalStatus } from '#src/core/proposal-status/entities/proposal-status.entity';

export class GetStatusRdo {
  readonly id: number;

  readonly name: string;

  readonly statusType: string;

  priority: number;

  isVisible: boolean;

  constructor(status: ProposalStatus) {
    this.id = status.id;
    this.name = status.name;
    this.statusType = status.statusType;
    this.priority = status.priority;
    this.isVisible = status.isVisible;
  }
}
