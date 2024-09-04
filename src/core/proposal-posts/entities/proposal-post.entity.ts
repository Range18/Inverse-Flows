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
  views: number;

  @OneToOne(() => ProposalsEntity, (proposal) => proposal.post, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'proposal' })
  proposal: ProposalsEntity;

  @OneToMany(() => PostReactionEntity, (reaction) => reaction.post, {
    nullable: true,
  })
  reactions?: PostReactionEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.post, {
    nullable: true,
  })
  comments?: CommentEntity[];
}
