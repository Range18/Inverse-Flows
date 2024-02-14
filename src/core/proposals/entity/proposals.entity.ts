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
import { UserEntity } from '#src/core/users/user.entity';
import { CategoryEntity } from '#src/core/categories/entities/category.entity';
import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { ProposalStatus } from '#src/core/proposal-status/entities/proposal-status.entity';
import { ProposalEventEntity } from '#src/core/history/entities/proposal-event.entity';
import { PrivateCommentEntity } from '#src/core/private-comments/entities/private-comment.entity';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';

@Entity('proposals')
export class ProposalsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ManyToOne(() => UserEntity, (user) => user.proposals, { nullable: false })
  @JoinColumn({ name: 'author' })
  author: UserEntity;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => CategoryEntity, (category) => category.proposal, {
    nullable: false,
  })
  @JoinColumn({ name: 'category' })
  category: CategoryEntity;

  @Column({ type: 'longtext', nullable: false })
  content: string;

  @ManyToOne(() => ProposalStatus, (status) => status.proposals, {
    nullable: false,
  })
  @JoinColumn({ name: 'status' })
  status: ProposalStatus;

  @OneToMany(() => PrivateCommentEntity, (comment) => comment.proposal, {
    nullable: true,
  })
  comments: PrivateCommentEntity[];

  @OneToOne(() => DocumentEntity, (document) => document.proposal, {
    nullable: true,
  })
  @JoinColumn({ name: 'document' })
  document?: DocumentEntity;

  @Column({ nullable: true })
  documentLink?: string;

  @OneToMany(() => ProposalEventEntity, (event) => event.proposal, {
    nullable: false,
  })
  events: ProposalEventEntity[];

  @OneToOne(() => ProposalPost, (post) => post.proposal, {
    nullable: true,
  })
  @JoinColumn({ name: 'post' })
  post?: ProposalPost;
}
