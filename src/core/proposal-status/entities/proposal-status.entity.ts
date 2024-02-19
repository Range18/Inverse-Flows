import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { ProposalHistoryEntity } from '#src/core/history/entities/proposal-history.entity';

@Entity('proposal-status')
export class ProposalStatus extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  statusType: string;

  @OneToMany(() => ProposalsEntity, (proposal) => proposal.status, {
    nullable: true,
  })
  proposals: ProposalsEntity[];

  @OneToMany(() => ProposalHistoryEntity, (event) => event.status, {
    nullable: true,
  })
  events?: ProposalHistoryEntity[];
}
