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
import { ApiProperty } from '@nestjs/swagger';
import { FieldTypes } from '#src/core/proposal-fields/types/field.type';
import { FieldInputTypes } from '#src/core/proposal-fields/types/field-input.type';

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

  @ApiProperty({ examples: FieldTypes })
  @Column()
  type: string;

  @ApiProperty({ examples: FieldInputTypes, default: 'text' })
  @Column({ default: 'text' })
  inputType: string;

  @Column({ nullable: true })
  columnName?: string;

  @Column()
  place: number;

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
