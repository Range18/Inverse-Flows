import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProposalFieldEntity } from '#src/core/proposal-fields/entities/proposal-field.entity';

@Entity('proposal_forms')
export class ProposalFormEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  subTitle?: string;

  @Column({ type: 'longtext', nullable: true })
  description?: string;

  @Column({ nullable: true })
  place: number;

  @OneToMany(() => ProposalFieldEntity, (field) => field.form, {
    nullable: true,
    eager: true,
  })
  fields?: ProposalFieldEntity[];
}
