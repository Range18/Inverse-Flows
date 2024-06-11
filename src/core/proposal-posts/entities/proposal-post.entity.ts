import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { BaseEntity } from '#src/common/base.entity';
import { CommentEntity } from '#src/core/comments/entities/comment.entity';
import { PostReactionEntity } from '#src/core/post-reactions/entities/post-reaction.entity';

@Entity('proposal_posts')
export class ProposalPost extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false, default: 0 })
  likes: number;

  @Column({ nullable: false, default: 0 })
  views: number;

  @OneToOne(() => ProposalsEntity, (proposal) => proposal.post, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'proposal' })
  proposal: ProposalsEntity;

  // @ManyToMany(() => UserEntity, (user) => user.likedPosts, {
  //   nullable: true,
  // })
  // @JoinTable({
  //   name: 'users_liked_posts',
  //   joinColumn: { name: 'post', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'user', referencedColumnName: 'id' },
  // })
  // usersLiked: UserEntity[];

  @OneToMany(() => PostReactionEntity, (like) => like.post, { nullable: true })
  likeEntities?: PostReactionEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.post, {
    nullable: true,
  })
  comments?: CommentEntity[];
}
