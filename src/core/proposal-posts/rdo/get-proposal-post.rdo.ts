import { GetProposalRdo } from '#src/core/proposals/rdo/get-proposal.rdo';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { PostReactionRdo } from '#src/core/post-reactions/rdo/post-reaction.rdo';

export class GetProposalPostRdo {
  readonly id: number;

  readonly views: number;

  readonly likes: number = 0;

  readonly dislikes: number = 0;

  readonly isLiked: boolean = false;

  readonly isDisliked: boolean = false;

  readonly proposal: GetProposalRdo;

  readonly reactions: PostReactionRdo[];

  constructor(proposalPost: ProposalPost, userId?: number) {
    this.id = proposalPost.id;
    this.views = proposalPost.views;
    this.proposal = proposalPost.proposal
      ? new GetProposalRdo(proposalPost.proposal)
      : undefined;
    if (proposalPost?.reactions?.length > 0 && userId) {
      for (const reaction of proposalPost.reactions) {
        if (reaction?.user?.id == userId) {
          this.isLiked = reaction.type == 1;
          this.isDisliked = reaction.type == 2;
        }
      }
    }
    this.reactions = proposalPost.reactions
      ? proposalPost.reactions.map((reaction) => new PostReactionRdo(reaction))
      : [];

    for (const reaction of proposalPost.reactions) {
      if (reaction.type == 1) {
        this.likes++;
      } else {
        this.dislikes++;
      }
    }
  }
}
