import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { CategoryEntity } from '#src/core/categories/entities/category.entity';
import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { ProposalStatus } from '#src/core/proposal-status/entities/proposal-status.entity';
import { ProposalHistoryEntity } from '#src/core/history/entities/proposal-history.entity';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { DepartmentEntity } from '#src/core/departments/entities/department.entity';
import { ProposalAssetEntity } from '#src/core/proposal-assets/entities/proposal-asset.entity';

@Entity('proposals')
export class ProposalsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ManyToOne(() => UserEntity, (user) => user.proposals, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author' })
  author: UserEntity;

  @ManyToOne(() => DepartmentEntity, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'responsibleDepartment' })
  responsibleDepartment?: DepartmentEntity;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => CategoryEntity, (category) => category.proposal, {
    nullable: true,
  })
  @JoinColumn({ name: 'category' })
  category?: CategoryEntity;

  @Column({ type: 'longtext', nullable: true })
  content: string;

  @ManyToOne(() => ProposalStatus, (status) => status.proposals, {
    nullable: false,
  })
  @JoinColumn({ name: 'status' })
  status: ProposalStatus;

  @OneToOne(() => DocumentEntity, (document) => document.proposal, {
    nullable: true,
  })
  @JoinColumn({ name: 'document' })
  document?: DocumentEntity;

  @Column({ nullable: true })
  documentLink?: string;

  @OneToMany(() => ProposalHistoryEntity, (history) => history.proposal, {
    nullable: false,
  })
  history: ProposalHistoryEntity[];

  @OneToOne(() => ProposalPost, (post) => post.proposal, {
    nullable: true,
  })
  post?: ProposalPost;

  @Column({ nullable: true })
  dueDate?: Date;

  @OneToMany(() => ProposalAssetEntity, (asset) => asset.proposal, {
    nullable: true,
    eager: true,
  })
  assets?: ProposalAssetEntity[];
}
