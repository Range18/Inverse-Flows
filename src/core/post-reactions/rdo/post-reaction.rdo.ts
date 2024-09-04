import { PostReactionEntity } from '#src/core/post-reactions/entities/post-reaction.entity';

export class PostReactionRdo {
  readonly id: number;

  readonly userId: number;

  readonly type: number;

  constructor(reaction: PostReactionEntity) {
    this.id = reaction.id;
    this.userId = reaction.user ? reaction.user.id : undefined;
    this.type = reaction.type;
  }
}
