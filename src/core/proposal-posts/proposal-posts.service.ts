import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { PostReactionsService } from '#src/core/post-reactions/post-reactions.service';
import PostExceptions = AllExceptions.PostExceptions;

@Injectable()
export class ProposalPostsService extends BaseEntityService<ProposalPost> {
  private readonly loadRelations = {
    reactions: { user: true },
    proposal: {
      author: {
        job: true,
        department: true,
        role: true,
      },
      category: true,
      status: true,
      document: true,
      history: {
        user: true,
        status: true,
      },
    },
  };

  constructor(
    @InjectRepository(ProposalPost)
    private readonly proposalPostRepository: Repository<ProposalPost>,
    private readonly reactionsService: PostReactionsService,
  ) {
    super(proposalPostRepository);
  }

  async like(id: number, type: number, userId: number): Promise<ProposalPost> {
    const reaction = await this.reactionsService.findOne({
      where: { user: { id: userId }, post: { id: id } },
      relations: { user: true },
    });

    const post = await this.findOne({
      where: { id },
      relations: this.loadRelations,
    });

    if (!post) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'PostExceptions',
        PostExceptions.PostNotFound,
      );
    }

    if (reaction) {
      if (reaction.type != type) {
        // change reaction
        reaction.type = type;
        await this.reactionsService.save(reaction);
      } else {
        // delete reaction
        await this.reactionsService.removeOne(reaction);
      }
    } else {
      // give reaction
      await this.reactionsService.save({
        post: post,
        user: { id: userId },
        type: type,
      });
    }

    return await this.findOne({
      where: { id: post.id },
      relations: this.loadRelations,
    });
  }

  async view(entity: ProposalPost);
  async view(id: number);
  async view(entityOrId: number | ProposalPost) {
    const post =
      typeof entityOrId === 'number'
        ? await this.findOne({ where: { id: entityOrId } })
        : entityOrId;

    if (!post) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'PostExceptions',
        PostExceptions.PostNotFound,
      );
    }

    post.views++;

    return await this.save(post);
  }
}
