import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '#src/core/users/user.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { LikeEntity } from '#src/core/proposal-posts/entities/like.entity';
import * as console from 'console';
import PostExceptions = AllExceptions.PostExceptions;

@Injectable()
export class ProposalPostsService extends BaseEntityService<ProposalPost> {
  private readonly loadRelations = {
    likeEntities: { user: true },
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
    @InjectRepository(LikeEntity)
    private readonly likesRepository: Repository<LikeEntity>,
    private readonly userService: UserService,
  ) {
    super(proposalPostRepository);
  }

  async like(id: number, type: number, userId: number) {
    const likeEntity = await this.likesRepository.findOne({
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

    if (likeEntity) {
      if (type != 0) {
        likeEntity.type = type;
        await this.likesRepository.save(likeEntity);
      } else {
        await this.likesRepository.remove(likeEntity);
        post.likes--;
      }
    } else {
      //TODO ЕБАННАЯ МАГИЯ БЛЯТЬ ЭТО TYPEORM хули id == null когда он не null блять
      console.log(id);
      await this.likesRepository.save({
        post: post,
        user: { id: userId },
        type: type,
      });
      console.log('dsad');
      post.likes++;
    }

    return post;
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
