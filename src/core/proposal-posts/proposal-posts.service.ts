import { Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProposalPostsService extends BaseEntityService<ProposalPost> {
  constructor(
    @InjectRepository(ProposalPost)
    private readonly proposalPostRepository: Repository<ProposalPost>,
  ) {
    super(proposalPostRepository);
  }

  async like(id: number) {}

  async view(id: number) {}
}
