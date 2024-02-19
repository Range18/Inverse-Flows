import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { BaseEntity } from '#src/common/base.entity';
import { UserEntity } from '#src/core/users/user.entity';

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
  })
  @JoinColumn({ name: 'proposal' })
  proposal: ProposalsEntity;

  @ManyToMany(() => UserEntity, (user) => user.likedPosts, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  usersLiked: UserEntity[];
}
