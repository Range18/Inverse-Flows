import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProposalsEntity } from '#src/core/proposals/proposals.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ManyToOne(() => ProposalsEntity, (proposal) => proposal.comments)
  @JoinColumn({ name: 'proposal' })
  proposal: ProposalsEntity;
}
