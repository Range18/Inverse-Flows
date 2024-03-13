import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '#src/core/users/user.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import PostExceptions = AllExceptions.PostExceptions;

@Injectable()
export class ProposalPostsService extends BaseEntityService<ProposalPost> {
  private readonly loadRelations = {
    usersLiked: true,
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
    private readonly userService: UserService,
  ) {
    super(proposalPostRepository);
  }

  async like(id: number, userId: number) {
    const post = await this.findOne({
      where: { id },
      relations: this.loadRelations,
    });

    const user = await this.userService.findOne({
      where: { id: userId },
      relations: { likedPosts: true },
    });

    if (!post) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'PostExceptions',
        PostExceptions.PostNotFound,
      );
    }

    if (post.usersLiked?.length > 0) {
      const index = post.usersLiked.findIndex(
        (entity) => entity.id === user.id,
      );

      if (index > -1) {
        post.usersLiked.splice(index);
        post.likes--;
      } else {
        post.usersLiked.push(user);
        post.likes++;
      }
    } else {
      post.usersLiked.push(user);
      post.likes++;
    }

    return await this.save(post);
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
