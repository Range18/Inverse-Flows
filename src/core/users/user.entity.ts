import {
  BaseEntity,
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
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { JobEntity } from '#src/core/jobs/entities/job.entity';
import { DepartmentEntity } from '#src/core/departments/entities/department.entity';
import { ProposalEventEntity } from '#src/core/history/entities/proposal-event.entity';
import { PrivateCommentEntity } from '#src/core/private-comments/entities/private-comment.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: true })
  lastname?: string;

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

  @ManyToOne(() => JobEntity, (job) => job.users)
  @JoinColumn({ name: 'job' })
  job: JobEntity;

  @OneToMany(() => ProposalsEntity, (proposal) => proposal.author)
  proposals: ProposalsEntity[];

  @Column({ nullable: false, default: 0 })
  proposalsCount: number;

  @ManyToOne(() => DepartmentEntity, (department) => department.users, {
    nullable: false,
  })
  @JoinColumn({ name: 'department' })
  department: DepartmentEntity;

  @OneToMany(() => ProposalEventEntity, (event) => event.user, {
    nullable: true,
  })
  events?: UserEntity;

  @OneToMany(() => PrivateCommentEntity, (comment) => comment.user, {
    nullable: true,
  })
  privateComments?: PrivateCommentEntity[];

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
