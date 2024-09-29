import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '#src/core/comments/entities/comment.entity';
import { Repository } from 'typeorm';
import { BaseEntityService } from '#src/common/base-entity.service';
import { CreateCommentDto } from '#src/core/comments/dto/create-comment.dto';
import { ProposalPostsService } from '#src/core/proposal-posts/proposal-posts.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { UserService } from '#src/core/users/user.service';
import PostExceptions = AllExceptions.PostExceptions;

@Injectable()
export class CommentsService extends BaseEntityService<CommentEntity> {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly postService: ProposalPostsService,
    private readonly userService: UserService,
  ) {
    super(commentRepository);
  }

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const post = await this.postService.findOne({
      where: { id: createCommentDto.postId },
    });

    if (!post) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'PostExceptions',
        PostExceptions.PostNotFound,
      );
    }

    const user = await this.userService.findOne({
      where: { id: userId },
      relations: { avatar: true },
    });

    const comment = await this.save({
      post: post,
      text: createCommentDto.text,
      user: user,
    });

    return await this.findOne({ where: { id: comment.id } });
  }
}
