import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MyBaseEntity } from '#src/common/myBaseEntity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';

@Entity('documents')
export class DocumentEntity extends MyBaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @OneToOne(() => ProposalsEntity, (proposal) => proposal.document, {
    nullable: false,
  })
  proposal: ProposalsEntity;
}
