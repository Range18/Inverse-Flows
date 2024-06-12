import { GetProposalRdo } from '#src/core/proposals/rdo/get-proposal.rdo';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PostReactionRdo } from '#src/core/post-reactions/rdo/post-reaction.rdo';

export class GetProposalPostRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly views: number;

  @ApiProperty()
  readonly likes: number = 0;

  readonly dislikes: number = 0;

  @ApiProperty()
  readonly isLiked: boolean;

  @ApiProperty({ type: GetProposalRdo })
  readonly proposal: GetProposalRdo;

  readonly reactions: PostReactionRdo[];

  constructor(proposalPost: ProposalPost, userId?: number) {
    this.id = proposalPost.id;
    this.views = proposalPost.views;
    this.proposal = new GetProposalRdo(proposalPost.proposal);
    if (proposalPost?.reactions?.length > 0 && userId) {
      this.isLiked = proposalPost?.reactions?.some(
        (entity) => entity?.user?.id === userId,
      );
    } else {
      this.isLiked = false;
    }
    this.reactions = proposalPost.reactions
      ? proposalPost.reactions.map((reaction) => new PostReactionRdo(reaction))
      : [];

    for (const reaction of this.reactions) {
      if (reaction.type == 1) {
        this.likes++;
      } else {
        this.dislikes++;
      }
    }
  }
}
