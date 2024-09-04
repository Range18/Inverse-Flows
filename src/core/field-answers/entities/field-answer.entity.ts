import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProposalFieldEntity } from '#src/core/proposal-fields/entities/proposal-field.entity';

@Entity('field_answers')
export class FieldAnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  text: string;

  @ManyToOne(() => ProposalFieldEntity, (field) => field.answers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  field: ProposalFieldEntity;
}
