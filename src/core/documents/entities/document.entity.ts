import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';

@Entity('documents')
export class DocumentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @OneToOne(() => ProposalsEntity, (proposal) => proposal.document, {
    nullable: true,
  })
  proposal?: ProposalsEntity;
}
