import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProposalFormEntity } from '#src/core/proposal-forms/entities/proposal-form.entity';

@Entity('proposal_fields')
export class ProposalFieldEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  text: string;

  @Column()
  type: string;

  @ManyToOne(() => ProposalFormEntity, (form) => form.fields, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  form: ProposalFormEntity;
}
