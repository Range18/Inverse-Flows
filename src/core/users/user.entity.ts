import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SessionEntity } from '../session/session.entity';
import { RolesEntity } from '#src/core/roles/entity/roles.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { JobEntity } from '#src/core/jobs/entities/job.entity';
import { DepartmentEntity } from '#src/core/departments/entities/department.entity';
import { ProposalHistoryEntity } from '#src/core/history/entities/proposal-history.entity';
import { PrivateCommentEntity } from '#src/core/private-comments/entities/private-comment.entity';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';

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

  @OneToMany(() => ProposalHistoryEntity, (event) => event.user, {
    nullable: true,
  })
  events?: UserEntity;

  @OneToMany(() => PrivateCommentEntity, (comment) => comment.user, {
    nullable: true,
  })
  privateComments?: PrivateCommentEntity[];

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];

  @ManyToMany(() => ProposalPost, (post) => post.usersLiked, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  likedPosts: ProposalPost[];

  @OneToOne(() => AssetEntity, (avatar) => avatar.user, { nullable: true })
  avatar?: AssetEntity;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
