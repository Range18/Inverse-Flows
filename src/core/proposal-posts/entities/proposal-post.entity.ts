import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';

export class ProposalPost {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false, default: 0 })
  likes: number;

  @Column({ nullable: false, default: 0 })
  views: number;

  @OneToOne(() => ProposalsEntity, (proposal) => proposal.post, {
    nullable: false,
  })
  @JoinColumn({ name: 'proposal' })
  proposal: ProposalsEntity;
}
