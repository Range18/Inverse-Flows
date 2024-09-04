import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { ProposalStatus } from '#src/core/proposal-status/entities/proposal-status.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';

@Entity('proposal_events')
export class ProposalHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ManyToOne(() => UserEntity, (user) => user.events, { nullable: false })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => ProposalStatus, (status) => status.events, {
    nullable: true,
  })
  @JoinColumn({ name: 'status' })
  status: ProposalStatus;

  @Column({ type: 'longtext', nullable: true })
  comment?: string;

  @ManyToOne(() => ProposalsEntity, (proposal) => proposal.history, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'proposal' })
  proposal: ProposalsEntity;
}
