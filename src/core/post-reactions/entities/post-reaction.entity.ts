import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { UserEntity } from '#src/core/users/entity/user.entity';

@Entity('reactions')
export class PostReactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ManyToOne(() => ProposalPost, (post) => post.reactions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post' })
  post: ProposalPost;

  @ManyToOne(() => UserEntity, (user) => user.likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @Column({ nullable: false, default: 1 })
  type: number;
}
