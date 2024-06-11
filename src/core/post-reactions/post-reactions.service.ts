import { BaseEntityService } from '#src/common/base-entity.service';
import { PostReactionEntity } from '#src/core/post-reactions/entities/post-reaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class PostReactionsService extends BaseEntityService<PostReactionEntity> {
  constructor(
    @InjectRepository(PostReactionEntity)
    private readonly likesRepository: Repository<PostReactionEntity>,
  ) {
    super(likesRepository);
  }
}
