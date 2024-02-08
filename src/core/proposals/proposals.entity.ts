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
import { Category } from '#src/core/categories/entities/category.entity';
import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { CommentEntity } from '#src/core/comments/entities/comment.entity';

@Entity('proposals')
export class ProposalsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ManyToOne(() => UserEntity, (user) => user.proposals, { nullable: false })
  @JoinColumn({ name: 'author' })
  author: UserEntity;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Category, (category) => category.proposal, {
    nullable: false,
  })
  @JoinColumn({ name: 'category' })
  category: Category;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @OneToMany(() => CommentEntity, (comment) => comment.proposal, {
    nullable: true,
  })
  comments: CommentEntity[];

  @OneToOne(() => DocumentEntity, (document) => document.proposal, {
    nullable: true,
  })
  @JoinColumn({ name: 'document' })
  document: DocumentEntity;
}
