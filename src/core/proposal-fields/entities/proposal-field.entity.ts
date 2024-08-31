import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProposalFormEntity } from '#src/core/proposal-forms/entities/proposal-form.entity';
import { FieldAnswerEntity } from '#src/core/field-answers/entities/field-answer.entity';

@Entity('proposal_fields')
export class ProposalFieldEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  label: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  placeholder?: string;

  @Column()
  type: string;

  @Column({ default: false })
  isRequired: boolean;

  @Column({ default: false })
  isDisabled: boolean;

  @Column({ nullable: true })
  userAutoCompleteProperty?: string;

  @ManyToOne(() => ProposalFormEntity, (form) => form.fields, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  form: ProposalFormEntity;

  @OneToMany(() => FieldAnswerEntity, (answer) => answer.field, {
    nullable: true,
    eager: true,
  })
  answers?: FieldAnswerEntity[];
}
