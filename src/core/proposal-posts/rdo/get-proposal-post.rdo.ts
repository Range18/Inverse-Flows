import { GetProposalRdo } from '#src/core/proposals/rdo/get-proposal.rdo';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetProposalPostRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly views: number;

  @ApiProperty()
  readonly likes: number;

  @ApiProperty()
  readonly isLiked: boolean;

  @ApiProperty({ type: GetProposalRdo })
  readonly proposal: GetProposalRdo;

  constructor(proposalPost: ProposalPost, userId?: number) {
    this.id = proposalPost.id;
    this.likes = proposalPost.likes;
    this.views = proposalPost.views;
    this.proposal = new GetProposalRdo(proposalPost.proposal);
    if (proposalPost?.likeEntities?.length > 0 && userId) {
      this.isLiked = proposalPost?.likeEntities?.some(
        (entity) => entity?.user?.id === userId,
      );
    } else {
      this.isLiked = false;
    }
  }
}
