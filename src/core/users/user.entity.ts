import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SessionEntity } from '../session/session.entity';
import { RolesEntity } from '#src/core/roles/entity/roles.entity';
import { BaseEntity } from '#src/common/base.entity';
import { ProposalsEntity } from '#src/core/proposals/proposals.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: true })
  patronymic?: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  birthday: Date;

  @Column({ nullable: true })
  vk?: string;

  @Column({ nullable: true })
  telegram?: string;

  @ManyToOne(() => RolesEntity, (role) => role.users, { nullable: false })
  @JoinColumn({ name: 'role' })
  role: RolesEntity;

  @OneToMany(() => ProposalsEntity, (proposal) => proposal.author)
  proposals: ProposalsEntity[];

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];
}
