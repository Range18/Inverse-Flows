import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { BaseEntity } from '#src/common/base.entity';
import { UserEntity } from '#src/core/users/user.entity';

@Entity('comments')
export class PrivateCommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ManyToOne(() => UserEntity, (user) => user.privateComments, {
    nullable: false,
  })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @Column({ type: 'longtext', nullable: false })
  text: string;

  @ManyToOne(() => ProposalsEntity, (proposal) => proposal.comments)
  @JoinColumn({ name: 'proposal' })
  proposal: ProposalsEntity;
}
