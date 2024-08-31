import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';

@Entity('proposal_assets')
export class ProposalAssetEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  originalname: string;

  @Column()
  size: number;

  @Column()
  destination: string;

  @Column()
  mimetype: string;

  @ManyToOne(() => ProposalsEntity, (proposal) => proposal.assets, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  proposal: ProposalsEntity;
}
