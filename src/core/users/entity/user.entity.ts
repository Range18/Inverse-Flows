import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionEntity } from '../../session/session.entity';
import { RolesEntity } from '#src/core/roles/entity/roles.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { JobEntity } from '#src/core/jobs/entities/job.entity';
import { DepartmentEntity } from '#src/core/departments/entities/department.entity';
import { ProposalHistoryEntity } from '#src/core/history/entities/proposal-history.entity';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';
import { CommentEntity } from '#src/core/comments/entities/comment.entity';
import { AchievementEntity } from '#src/core/achievements/entities/achievement.entity';
import { BaseEntity } from '#src/common/base.entity';
import { Company } from '#src/core/companies/entities/company.entity';
import { PostReactionEntity } from '#src/core/post-reactions/entities/post-reaction.entity';

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
  address?: string;

  @Column({ nullable: true })
  city?: string;

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

  @OneToMany(() => ProposalsEntity, (proposal) => proposal.author, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  proposals?: ProposalsEntity[];

  @Column({ nullable: false, default: 0 })
  proposalsCount: number;

  @ManyToOne(() => DepartmentEntity, (department) => department.users, {
    nullable: false,
  })
  @JoinColumn({ name: 'department' })
  department: DepartmentEntity;

  @OneToMany(() => ProposalHistoryEntity, (event) => event.user, {
    nullable: true,
  })
  events?: UserEntity;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];

  @ManyToMany(() => PostReactionEntity, (like) => like.user, {
    nullable: true,
  })
  likes?: PostReactionEntity[];

  @OneToOne(() => AssetEntity, (avatar) => avatar.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  avatar?: AssetEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.user, { nullable: true })
  comments?: CommentEntity[];

  @ManyToMany(() => AchievementEntity, (achievement) => achievement.usersDone, {
    nullable: true,
  })
  achievements?: AchievementEntity[];

  @ManyToOne(() => Company, (company) => company.users, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company' })
  company?: Company;
}
