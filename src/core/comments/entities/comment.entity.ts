import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { BaseEntity } from '#src/common/base.entity';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';

@Entity('post_comments')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @Column({ type: 'longtext', nullable: false })
  text: string;

  @ManyToOne(() => ProposalPost, (post) => post.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post' })
  post: ProposalPost;
}
